export interface ValidationError {
  path: string;
  value: unknown;
  message: string;
}
