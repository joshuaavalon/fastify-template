import { Type } from "@sinclair/typebox";

import type { Static } from "@sinclair/typebox";

export const logging = Type.Object({
  level: Type.Union(
    [
      Type.Const("trace" as const),
      Type.Const("debug" as const),
      Type.Const("info" as const),
      Type.Const("warn" as const),
      Type.Const("error" as const),
      Type.Const("fatal" as const),
      Type.Const("silent" as const)
    ],
    { default: "info", description: "See https://github.com/pinojs/pino/blob/master/docs/api.md#level" }
  ),
  logRequest: Type.Optional(Type.Boolean()),
  logDatabase: Type.Optional(Type.Boolean())
}, { default: {} });

export type LoggingConfig = Static<typeof logging>;
