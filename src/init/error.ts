import { ApiError, httpError } from "#error";
import { StatusCodes, apiError } from "#utils";

import type {
  FastifyError,
  FastifyInstance,
  FastifyReply,
  FastifyRequest
} from "fastify";

function sendApiError(res: FastifyReply, err: ApiError): void {
  const { status, code, message } = err;
  if (status >= 500) {
    res.log.error({ err });
  }
  res.status(status).send(apiError({ code, message, reqId: res.request.id }));
}

// TODO: Handle Prisma.PrismaClientKnownRequestError
export async function errorHandler(
  this: FastifyInstance,
  err: FastifyError,
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> {
  if (err instanceof ApiError) {
    sendApiError(res, err);
    return;
  }
  const internalErr = httpError(StatusCodes.internalServerError);
  internalErr.cause = err;
  sendApiError(res, internalErr);
}

export async function notFoundHandler(
  this: FastifyInstance,
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> {
  const err = httpError(StatusCodes.notFound);
  sendApiError(res, err);
}
