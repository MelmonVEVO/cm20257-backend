import {
  query,
  send
} from "../utils";

const SQL_GET_FOOD = `
  SELECT
    \`id\`,
    \`name\`,
    \`quantity\`,
    \`quantityType\`,
    \`expiryDate\`
  FROM UserFood
  WHERE \`user\` = ?;
`;

export default async function getFood(req, res) {
  let results = await query(res, SQL_GET_FOOD, [req.user]);
  send(res, results);
}
