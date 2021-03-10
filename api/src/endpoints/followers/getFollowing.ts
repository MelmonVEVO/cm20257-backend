import {
  query,
  send
} from "../utils";

const SQL_FOLLOWING = `
  SELECT
    Followers.\`id\`,
    Followers.\`following\`,
    Users.\`username\`,
    Followers.\`approved\`
  FROM Followers
  LEFT JOIN Users ON Followers.\`follower\` = Users.\`id\`
  WHERE Followers.\`follower\` = ?;
`;

export default async function getFollowing(req, res) {
  let following = query(res, SQL_FOLLOWING, [req.user]);
  send(res, following);
}
