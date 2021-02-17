import * as crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

function shaHash(...elements: Array<string>): string {
  let hash = crypto.createHash("sha512");
  for (let i = (elements.length - 1); i >= 0; i--)
    hash.update(elements[i]);

  return hash.digest("hex");
}

export function generateToken(userId: number, sign: string) {
  let unique = uuidv4();
  return `${unique}-${shaHash(userId.toString(), sign, unique)}`;
}

export function validToken(token: string, userId: number, sign: string): boolean {
  let split = token.split("-");
  if (split.length !== 2)
    return false;

  return split[1] === shaHash(userId.toString(), sign, split[0]);
}

export function generateSign(): string {
  let time = Date.now().toString();
  let random = (Math.floor(Math.random() * 1000000) + 1).toString();
  return shaHash(time, random);
}
