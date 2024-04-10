import { TypeCompiler } from "@sinclair/typebox/compiler";
import { Value } from "@sinclair/typebox/value";

import type { FastifySchemaCompiler } from "fastify";
import type { TSchema } from "@sinclair/typebox";

export const validatorCompiler: FastifySchemaCompiler<TSchema> = def => {
  const { schema } = def;
  const typeCheck = TypeCompiler.Compile(schema);
  return (value): any => {
    const witHDefault = Value.Default(schema, value);
    if (typeCheck.Check(witHDefault)) {
      return { value: witHDefault };
    }
    const errors = [...typeCheck.Errors(witHDefault)];
    return {
      error: errors.map(error => {
        return {
          message: `${error.message}`,
          instancePath: error.path
        };
      })
    };
  };
};
