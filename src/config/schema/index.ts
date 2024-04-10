import { Type } from "@sinclair/typebox";
import { database } from "./database.js";
import { logging } from "./logging.js";
import { system } from "./system.js";


import type { Static } from "@sinclair/typebox";
export type { LoggingConfig } from "./logging.js";

export const schema = Type.Object({ logging, system, database });

export type Config = Static<typeof schema>;
