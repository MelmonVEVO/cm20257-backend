import {
  error,
  query,
  send
} from "../utils";

const SQL_ADD_ITEM = `
  INSERT INTO UserFood (
    \`user\`,
    \`name\`,
    \`quantity\`,
    \`quantityType\`,
    \`expiryDate\`
  ) VALUES (?, ?, ?, ?, ?);
`;

export default async function addFoodItem(req, res) {
  let name = req.body.name;
  let quantity = req.body.quantity;
  let quantityType = req.body.quantityType;
  let expiryDate = req.body.expiryDate;

  if (!name || !quantity || !quantityType || !expiryDate)
    return error(res);

  let result = await query(res, SQL_ADD_ITEM, [
    req.user,
    name,
    quantity,
    quantityType,
    expiryDate
  ]);

  send(res, {
    id: result["insertId"]
  });
}
