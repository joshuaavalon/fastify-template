import { Type } from "@sinclair/typebox";
import { DateTime } from "luxon";
import { apiError, verifyPassword } from "#utils";

import type { FastifyInstance } from "fastify";

export default async function addRoute(app: FastifyInstance): Promise<void> {
  app.post("/api/login", {
    schema: {
      body: Type.Object({
        email: Type.String(),
        password: Type.String()
      })
    }
  }, async function (req, res) {
    const { email, password } = req.body;
    const user = await this.db.user.findUnique({ where: { email } });
    if (!user) {
      res.forbidden(apiError({ code: "INVALID_CREDENTIALS", message: "Invalid email or password", reqId: req.id }));
      return;
    }
    if (!await verifyPassword(user.passwordHash, password)) {
      res.forbidden(apiError({ code: "INVALID_CREDENTIALS", message: "Invalid email or password", reqId: req.id }));
      return;
    }
    const newExpiredDateTime = DateTime.now().plus({ days: 1 });
    req.session.options({ expires: newExpiredDateTime.toJSDate() });
    req.session.expiredAt = newExpiredDateTime.toISO();
    req.session.userId = user.id;
    res.apiSend({ id: user.id });
  });
}
