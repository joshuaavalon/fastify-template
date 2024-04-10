import { Type } from "@sinclair/typebox";

import type { Static } from "@sinclair/typebox";

export const system = Type.Object({
  host: Type.Optional(Type.String({ default: "localhost" })),
  port: Type.Optional(Type.Number({ minimum: 1, maximum: 65535, default: 8080 })),
  cookieSecret: Type.Array(Type.String({ minLength: 32 }), { minItems: 1 }),
  trustProxy: Type.Boolean({ default: false }),
  session: Type.Object({
    secret: Type.String(),
    salt: Type.String({ minLength: 16, maxLength: 16 })
  })
}, { default: {} });

export type SystemConfig = Static<typeof system>;
