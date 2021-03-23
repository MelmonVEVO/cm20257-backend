import {
  error,
  query
} from "../utils";

const SQL_INGREDIENTS = `
  SELECT
    \`ingredients\`
  FROM Recipes
  WHERE \`id\` = ?;
`;

export default async function selectRecipe(req, res) {
  let recipe = parseInt(req.body.recipe);

  if (!recipe || recipe <= 0)
    return error(res);

  let queryRes = await query(res, SQL_INGREDIENTS);
  console.log(queryRes);
}
