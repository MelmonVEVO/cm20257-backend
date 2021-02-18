import * as crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

import { mysql } from "../server";

export const TOKEN_SPLIT = ":";

const SQL_VALIDATE = `
  SELECT
    UserSessions.\`user\` AS \`user\`,
    Users.\`sign\` AS \`sign\`
  FROM UserSessions
  INNER JOIN Users ON UserSessions.\`user\` = Users.\`id\`
  WHERE UserSessions.\`token\` = ?;
`;

function shaHash(...elements: Array<string>): string {
  let hash = crypto.createHash("sha512");
  for (let i = (elements.length - 1); i >= 0; i--)
    hash.update(elements[i]);

  return hash.digest("hex");
}

export function generateToken(userId: number, sign: string): { hash: string, token: string } {
  let unique = uuidv4();
  return {
    token: unique,
    hash: shaHash(userId.toString(), sign, unique)
  };
}

export async function validToken(token: string): Promise<{ valid: boolean, user?: number }> {
  let split = token.split(TOKEN_SPLIT);
  if (split.length !== 2)
    return { valid: false };

  let query = await mysql.query(SQL_VALIDATE, [split[0]]);
  if (!query[0]["user"] || !query[0]["sign"])
    return { valid: false };

  let valid = split[1] === shaHash(query[0]["user"].toString(), query[0]["sign"], split[0]);
  return {
    valid: valid,
    user: query[0]["user"]
  };
}

export function generateSign(): string {
  let time = Date.now().toString();
  let random = (Math.floor(Math.random() * 1000000) + 1).toString();
  return shaHash(time, random);
}
