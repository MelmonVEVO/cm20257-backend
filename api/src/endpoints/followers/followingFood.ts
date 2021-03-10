import {
  error,
  query,
  send
} from "../utils";

const SQL_IS_FOLLOWER = `
  SELECT EXISTS (
    SELECT
      \`id\`
    FROM Followers
    WHERE \`following\` = ?
    AND \`follower\` = ?
    AND \`approved\`
  ) AS \`exists\`;
`;

const SQL_FOLLOWING_FOOD = `
  SELECT
    UserFood.\`name\`,
    UserFood.\`quantity\`,
    UserFood.\`quantityType\`,
    UserFood.\`expiryDate\`
  FROM UserFood
  WHERE \`user\` = ?;
`;

export default async function followingFood(req, res) {
  let following = parseInt(req.params.following);
  if (!following || following <= 0)
    return error(res);

  let valid = await query(res, SQL_IS_FOLLOWER, [following, req.user]);
  if (valid[0]["exists"] != 1)
    return error(res);

  let food = await query(res, SQL_FOLLOWING_FOOD, [following]);
  send(res, food);
}
