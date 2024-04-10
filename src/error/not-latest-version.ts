import { ApiError } from "./api.js";

export class NotLatestVersionError extends ApiError {
  public constructor() {
    super({
      status: 400,
      code: "NotLatestVersion",
      message: "Not latest version"
    });
  }
}
