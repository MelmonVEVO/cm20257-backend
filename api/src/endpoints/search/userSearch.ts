import {
  error,
  query,
  send
} from "../utils";

const SQL_SEARCH = `
  SELECT
    \`id\`,
    \`username\`
  FROM Users
  WHERE \`username\` LIKE ?;
`;

export default async function userSearch(req, res) {
  let username: string = req.body.username;
  if (!username || username.length <= 0)
    return error(res);

  let results = await query(res, SQL_SEARCH, [
    `%${username}%`
  ]);

  send(res, results);
}
