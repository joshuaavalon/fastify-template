import { ApiError } from "./api.js";

// TODO: Handle error
export class InvalidInputError extends ApiError {
  public constructor(message = "Invalid input(s)") {
    super({
      status: 422,
      code: "InvalidInput",
      message
    });
  }
}
