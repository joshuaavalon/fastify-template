import type { Static, TSchema } from "@sinclair/typebox";


declare module "fastify" {
  interface FastifyTypeProviderDefault {
    output: this["input"] extends TSchema ? Static<this["input"]> : unknown;
  }
}
