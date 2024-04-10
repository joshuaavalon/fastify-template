import { Readable } from "node:stream";
import { eTagOf } from "#utils";

import type { FastifyReply } from "fastify";

interface FileSendOptions {
  mime?: string;
  eTag?: string;
  cacheControl?: string;
}

export function fileSend(this: FastifyReply, payload: Uint8Array, opts: FileSendOptions = {}): FastifyReply {
  const { mime, eTag, cacheControl } = opts;
  const contentType = mime ?? "application/octet-stream";
  this.raw.writeHead(200, {
    "Content-Type": contentType,
    "Cache-Control": cacheControl ?? "public, max-age=31536000",
    "Content-Length": Buffer.byteLength(payload),
    ETag: eTag ?? eTagOf(payload)
  });
  this.hijack();
  Readable.from(payload).pipe(this.raw);
  return this;
}

declare module "fastify" {
  interface FastifyReply {
    fileSend: OmitThisParameter<typeof fileSend>;
  }
}
