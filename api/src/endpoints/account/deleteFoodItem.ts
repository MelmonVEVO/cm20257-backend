import {
  error,
  query
} from "../utils";

const SQL_DELETE_ITEM = `
  DELETE FROM UserFood
  WHERE \`id\` = ?;
`;

export default async function deleteFoodItem(req, res) {
  let id = parseInt(req.body.id);

  if (!id || id <= 0)
    return error(res);

  query(res, SQL_DELETE_ITEM, [id], false);
}
