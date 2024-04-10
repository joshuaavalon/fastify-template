import type { FastifyInstance } from "fastify";

export default async function addRoute(app: FastifyInstance): Promise<void> {
  app.post("/api/logout", {}, async function (req) {
    req.session.delete();
  });
}
