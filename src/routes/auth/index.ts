import type { FastifyInstance } from "fastify";

export default async function addRoutes(app: FastifyInstance): Promise<void> {
  app.get("/auth", { auth: { isUser: true } }, async function (req, res) {
    res.ok({ message: "Hello World" });
  });
  app.get("/", async function (req, res) {
    res.ok({ message: "Hello World" });
  });
}
