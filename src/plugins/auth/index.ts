import fp from "fastify-plugin";
import { verifySession } from "./verify-session.js";
import { verifyUser } from "./verify-user.js";
import { onRoute } from "./on-route.js";

import type { User } from "@prisma/client";

const name = "#plugins/auth";


export default fp(
  async app => {
    app.decorateRequest("user", null);
    app.addHook("onRoute", onRoute);
    app.addHook("onRequest", verifySession);
    app.addHook("onRequest", verifyUser);
  },
  {
    name,
    fastify: "4.x",
    dependencies: [],
    decorators: { fastify: ["db"] }
  }
);


declare module "fastify" {
  interface RouteOptions extends AuthPluginRouteOptions {
  }

  interface RouteShorthandOptions extends AuthPluginRouteOptions {
  }

  interface FastifyContextConfig extends AuthPluginRouteOptions {

  }

  interface AuthPluginRouteOptions {
    auth?: {
      isUser?: boolean;
      isAdmin?: boolean;
    };
  }

  interface FastifyRequest {
    user?: User | null;
  }
}

declare module "@fastify/secure-session" {
  interface SessionData {
    userId: string;
    expiredAt: string;
  }
}
