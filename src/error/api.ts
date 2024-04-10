export interface ApiErrorOptions {
  status: number;
  code: string;
  message: string;
}

export class ApiError extends Error {
  public readonly status: number;
  public readonly code: string;

  public constructor(opts: ApiErrorOptions) {
    super(opts.message);
    this.status = opts.status;
    this.code = opts.code;
  }
}
