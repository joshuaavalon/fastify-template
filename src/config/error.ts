import type { ValidationError } from "#type";

export class InvalidConfigError extends Error {
  public readonly fields: ValidationError[];

  public constructor(errors: ValidationError[]) {
    super("Invalid Config");
    console.log(errors);
    this.fields = errors;
  }
}
