import {
  query,
  send
} from "../utils";

const SQL_RECIPES = `
  SELECT
    *
  FROM Recipes;
`;

export default async function getRecipes(req, res) {
  let results = await query(res, SQL_RECIPES);
  send(res, results);
}
