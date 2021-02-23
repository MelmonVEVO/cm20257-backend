import * as log from "./logging";
import { mysql } from "./server";

const SQL_INSERT = `
  INSERT INTO Recipes (
    \`title\`,
    \`time\`,
    \`ingredients\`,
    \`imageUrl\`,
    \`url\`
  ) VALUES (?, ?, ?, ?, ?);
`;

const SQL_RECIPE_EXISTS = `
  SELECT EXISTS (
    SELECT
      \`id\`
    FROM Recipes
    WHERE \`title\` = ?
  ) AS \`exists\`;
`;

type Recipe = {
  Name: string;
  Time: string;
  Ingredients: Array<string>;
  Image: string;
  Link: string;
};

export async function saveRecipes(recipes: Array<Recipe>): Promise<void> {
  let written = 0;
  for (let recipe of recipes) {
    let exists: boolean = (await mysql.query(SQL_RECIPE_EXISTS, [recipe.Name]))[0]["exists"];
    if (exists)
      continue;
    await mysql.query(SQL_INSERT, [
      recipe.Name,
      recipe.Time,
      JSON.stringify(recipe.Ingredients),
      recipe.Image,
      recipe.Link
    ]);
    written++;
  }
  log.logInfo(`Saved ${written} recipes to db!`);
}
