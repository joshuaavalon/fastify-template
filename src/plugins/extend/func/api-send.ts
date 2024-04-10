import { apiSuccess } from "#utils";

import type { FastifyReply } from "fastify";


export function apiSend(this: FastifyReply, payload: unknown): FastifyReply {
  return this.ok(apiSuccess(payload));
}

declare module "fastify" {
  interface FastifyReply {
    apiSend: OmitThisParameter<typeof apiSend>;
  }
}
