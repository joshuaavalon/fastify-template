import addAuth from "./auth/index.js";
import addLogin from "./login.js";
import addLogout from "./logout.js";

import type { FastifyInstance } from "fastify";

export async function addRoutes(app: FastifyInstance): Promise<void> {
  await addAuth(app);
  await addLogin(app);
  await addLogout(app);
}
