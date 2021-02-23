import { error, query } from "../utils";

const SQL_DELETE_FAVOURITE = `
  DELETE FROM Favourites
  WHERE \`id\` = ? AND \`user\` = ?;
`;

export default async function deleteFavourite(req, res) {
  let favourite = parseInt(req.body.favourite);
  let user = req.user;

  if (!favourite || favourite <= 0)
    return error(res);

  query(res, SQL_DELETE_FAVOURITE, [favourite, user], false);
}
