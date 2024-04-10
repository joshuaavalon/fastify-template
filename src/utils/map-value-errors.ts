import type { ValueErrorIterator } from "@sinclair/typebox/errors";
import type { ValidationError } from "#type";

export function mapValueErrors(errors: ValueErrorIterator): ValidationError[] {
  const errs: ValidationError[] = [];
  for (const e of errors) {
    const { path, value, message } = e;
    errs.push({ path, value, message });
  }
  return errs;
}
