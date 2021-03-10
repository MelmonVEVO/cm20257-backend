import {
  query,
  send
} from "../utils";

const SQL_FOLLOW = `
  INSERT INTO Followers (
    \`follower\`,
    \`following\`
  ) VALUES (?, ?);
`;

export default async function follow(req, res) {
  let who = req.body.who;
  let result = await query(res, SQL_FOLLOW, [req.user, who]);

  send(res, {
    followId: result[0]["insertId"]
  });
}
