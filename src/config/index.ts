import { TypeCompiler } from "@sinclair/typebox/compiler";
import { Value } from "@sinclair/typebox/value";
import readEnv from "read-env-vars";
import { mapValueErrors } from "#utils";
import { schema } from "./schema/index.js";
import { InvalidConfigError } from "./error.js";

import type { Config } from "./schema/index.js";

export * from "./schema/index.js";


const validator = TypeCompiler.Compile(schema);

export function readConfig(): Config {
  const values = readEnv("APP");
  const config = Value.Default(schema, values);
  if (!validator.Check(config)) {
    const errors = validator.Errors(Value.Default(schema, values));
    throw new InvalidConfigError(mapValueErrors(errors));
  }
  return config;
}
