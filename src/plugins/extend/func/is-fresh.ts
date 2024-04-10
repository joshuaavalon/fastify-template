import type { FastifyReply } from "fastify";

/**
 * Check `if-none-match` and `if-modified-since` is fresh.
 * Return true if fresh
 */
export async function isFresh(this: FastifyReply, metadata: { eTag?: string; lastModified?: Date }): Promise<boolean> {
  const req = this.request;
  const reqETag = req.headers["if-none-match"];
  if (!reqETag) {
    return false;
  }
  const reqLastModified = req.headers["if-modified-since"]
    ? new Date(req.headers["if-modified-since"])
    : undefined;
  const { eTag, lastModified } = metadata;
  const validReqLastModified = !reqLastModified // Missing if-modified-since
    || isNaN(reqLastModified.getTime()) // Invalid if-modified-since
    || reqLastModified.getTime() === lastModified?.getTime();
  if (reqETag === eTag && validReqLastModified) {
    this.notModified();
    return true;
  }
  return false;
}

declare module "fastify" {
  interface FastifyReply {

    /**
     * Check `if-none-match` and `if-modified-since` is fresh.
     * Return true if fresh
     */
    isFresh: OmitThisParameter<typeof isFresh>;
  }
}
