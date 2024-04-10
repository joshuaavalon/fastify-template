import { hash, verify } from "argon2";

export function verifyPassword(hash: string, password: string): Promise<boolean> {
  return verify(hash, password);
}

export function hashPassword(password: string): Promise<string> {
  return hash(password);
}
