import * as bcrypt from "bcrypt";

import { TOKEN_SPLIT, generateToken } from "../token";
import {
  error,
  query,
  send
} from "../utils";

const SQL_GET_HASH = `
  SELECT
    \`id\`,
    \`password\`,
    \`sign\`
  FROM Users
  WHERE \`username\` = ?;
`;

const SQL_SESSION = `
  INSERT INTO UserSessions (
    \`user\`,
    \`token\`
  ) VALUES (?, ?);
`;

export default async function login(req, res) {
  let username = req.body.username;
  let password = req.body.password;

  let result = await query(res, SQL_GET_HASH, [username]);

  let encrypted = result[0]["password"];
  // Account doesn't exist.
  if (!encrypted)
    return error(res);

  let correctPassword = await bcrypt.compare(password, encrypted);

  if (!correctPassword)
    return error(res);

  // Generate token to be used for future requests.
  let generated = generateToken(result[0]["id"], result[0]["sign"]);
  await query(res, SQL_SESSION, [result[0]["id"], generated.token]);

  send(res, {
    token: `${generated.token}${TOKEN_SPLIT}${generated.hash}`
  });
}
