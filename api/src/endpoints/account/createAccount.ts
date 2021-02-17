import * as bcrypt from "bcrypt";

import * as log from "../../logging";
import { generateSign } from "../token";
import {
  error,
  query
} from "../utils";

const SQL_CREATE_ACCOUNT = `
  INSERT INTO Users (
    \`username\`,
    \`password\`,
    \`sign\`
  ) VALUES (?, ?, ?);
`;

const SALT_ROUNDS = 10;

export default async function createAccount(req, res) {
  let username = req.body.username;
  let password = req.body.password;

  if (!username || !password)
    return error(res);

  try {
    let hash = await bcrypt.hash(password, SALT_ROUNDS);
    let sign = generateSign();

    query(res, SQL_CREATE_ACCOUNT, [username, hash, sign], false);
  } catch (err) {
    log.logError(["Error when creating account!", err]);
    error(res);
  }
}
