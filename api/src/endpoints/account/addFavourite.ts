import { error, query, send } from "../utils";

const SQL_ADD = `
  INSERT INTO Favourites (
    \`user\`,
    \`recipe\`
  ) VALUES (?, ?);
`;

export default async function addFavourite(req, res) {
  let recipe = parseInt(req.body.recipe);

  if (!recipe || recipe <= 0)
    return error(res);

  let result = await query(res, SQL_ADD, [recipe, req.user]);

  send(res, {
    favourite: result[0]["insertId"]
  });
}
