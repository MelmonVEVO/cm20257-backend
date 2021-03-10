import { query } from "../utils";

const SQL_UNFOLLOW = `
  DELETE FROM Followers
  WHERE \`id\` = ?
  AND \`follower\` = ?;
`;

export default async function unfollow(req, res) {
  let followId = req.body.who;
  query(res, SQL_UNFOLLOW, [followId, req.user], false);
}
