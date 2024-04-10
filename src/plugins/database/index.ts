import fp from "fastify-plugin";
import { PrismaClient } from "@prisma/client";

const name = "#plugins/database";

interface Options {
  url?: string;
  logging?: boolean;
}


export default fp<Options>(
  async (app, opts) => {
    const { url, logging } = opts;
    const db = new PrismaClient({
      datasourceUrl: url,
      log: [
        { emit: "event", level: "query" },
        { emit: "event", level: "error" },
        { emit: "event", level: "info" },
        { emit: "event", level: "warn" }
      ]
    });
    if (logging) {
      db.$on("query", e => {
        const { query, params, duration } = e;
        app.log.debug({ query, params, duration });
      });
      db.$on("error", e => {
        app.log.error(e.message);
      });
      db.$on("info", e => {
        app.log.info(e.message);
      });
      db.$on("warn", e => {
        app.log.warn(e.message);
      });
    }
    app.decorate("db", db);
    app.addHook("onReady", async function () {
      await this.db.$queryRaw`PRAGMA journal_mode = WAL;`;
    });
    app.addHook("onClose", async app => {
      await app.db.$disconnect();
    });
  },
  {
    name,
    fastify: "4.x",
    decorators: {}
  }
);

declare module "fastify" {
  interface FastifyInstance {
    db: PrismaClient;
  }
}
