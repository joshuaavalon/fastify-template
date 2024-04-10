import fastify from "fastify";
import qs from "qs";
import { v4 as uuid } from "uuid";
import cookiePlugin from "@fastify/cookie";
import sessionPlugin from "@fastify/secure-session";
import extendPlugin from "#plugins/extend";
import databasePlugin from "#plugins/database";
import authPlugin from "#plugins/auth";
import { addRoutes } from "#routes";
import { validatorCompiler } from "./validator-compiler.js";
import { errorHandler, notFoundHandler } from "./error.js";

import type { FastifyInstance } from "fastify";
import type { Config, LoggingConfig } from "#config";

function shouldLogRequest(cfg: LoggingConfig): boolean {
  const { level, logRequest } = cfg;
  if (logRequest === true || logRequest === false) {
    return logRequest;
  }
  return level === "debug" || level === "trace";
}

export async function init(cfg: Config): Promise<FastifyInstance> {
  const app = fastify({
    logger: { level: cfg.logging.level },
    querystringParser: str => qs.parse(str),
    trustProxy: cfg.system.trustProxy,
    genReqId: () => uuid(),
    disableRequestLogging: !shouldLogRequest(cfg.logging)
    // pluginTimeout: isDev ? 120000 : undefined
  }).setValidatorCompiler(validatorCompiler)
    .setNotFoundHandler(notFoundHandler)
    .setErrorHandler(errorHandler);
  await app.register(cookiePlugin, {
    secret: cfg.system.cookieSecret,
    parseOptions: {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: "auto"
    }
  });
  await app.register(sessionPlugin, {
    secret: cfg.system.session.secret,
    salt: cfg.system.session.salt,
    cookie: {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: "auto",
      maxAge: 24 * 60 * 60
    }
  });
  await app.register(extendPlugin);
  await app.register(databasePlugin, {
    url: cfg.database.url,
    logging: cfg.logging.logDatabase
  });
  await app.register(authPlugin);
  await addRoutes(app);
  return app;
}
