export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

export function apiSuccess<T>(payload: T, message = ""): ApiSuccessResponse<T> {
  return { success: true, message, data: payload };
}

export interface ApiErrorResponse {
  success: false;
  code: string;
  message: string;
  reqId: string;
}


export interface ApiErrorInput {
  code: string;
  message: string;
  reqId: string;
}

export function apiError(input: ApiErrorInput): ApiErrorResponse {
  const { code, message, reqId } = input;
  return { success: false, code, message, reqId };
}
