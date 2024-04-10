import type { FastifyReply } from "fastify";
import type { StatusCodes } from "#utils";


export function httpSend(status: StatusCodes) {
  return function (this: FastifyReply, payload?: unknown): FastifyReply {
    return this.status(status).send(payload);
  };
}

declare module "fastify" {
  type FastifyHttpReply = {
    [key in keyof typeof StatusCodes]: OmitThisParameter<ReturnType<typeof httpSend>>;
  };

  interface FastifyReply extends FastifyHttpReply {
  }
}
