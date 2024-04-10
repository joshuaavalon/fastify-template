import { Type } from "@sinclair/typebox";

import type { Static } from "@sinclair/typebox";

export const database = Type.Object({ url: Type.String() }, { default: {} });

export type LoggingConfig = Static<typeof database>;
