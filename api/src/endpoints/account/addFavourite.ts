import {
  error,
  query,
  send
} from "../utils";

const SQL_ADD = `
  INSERT INTO Favourites (
    \`user\`,
    \`recipe\`
  ) VALUES (?, ?);
`;

const SQL_FAVOURITE_EXISTS = `
  SELECT EXISTS (
    SELECT
      \`id\`
    FROM Favourites
    WHERE \`user\` = ?
    AND \`recipe\` = ?
  ) AS \`exists\`;
`;

export default async function addFavourite(req, res) {
  let recipe = parseInt(req.body.recipe);

  if (!recipe || recipe <= 0)
    return error(res);

  let existsQuery = await query(res, SQL_FAVOURITE_EXISTS, [req.user, recipe]);
  if (existsQuery[0]["exists"] == 1)
    return error(res);

  let result = await query(res, SQL_ADD, [req.user, recipe]);

  send(res, {
    favourite: result["insertId"]
  });
}
