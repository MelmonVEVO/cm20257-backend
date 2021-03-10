import {
  query,
  send
} from "../utils";

const SQL_FOLLOWERS = `
  SELECT
    Followers.\`id\`,
    Users.\`username\`,
    Followers.\`approved\`
  FROM Followers
  LEFT JOIN Users ON Followers.\`following\` = Users.\`id\`
  WHERE Followers.\`following\` = ?;
`;

export default async function getFollowers(req, res) {
  let followers = await query(res, SQL_FOLLOWERS, [req.user]);
  send(res, followers);
}
