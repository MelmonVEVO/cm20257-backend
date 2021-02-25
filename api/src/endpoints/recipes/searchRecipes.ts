import {
  query,
  send
} from "../utils";

const SQL_FOOD = `
  SELECT
    \`name\`
  FROM UserFood
  WHERE \`user\` = ?
  AND \`expiryDate\`<= NOW();
`;

const SQL_ALL_RECIPES = `
  SELECT
    \`title\`,
    \`time\`,
    \`ingredients\`,
    \`imageUrl\`,
    \`url\`
  FROM Recipes;
`;

type Recipe = {
  title: string;
  time: string;
  ingredients: Array<string>;
  imageUrl: string;
  url: string;
};

export default async function searchRecipes(req, res) {
  let user = req.user;

  let userFood: Array<{
    name: string;
  }> = (await query(res, SQL_FOOD, [user]));
  let recipes: Array<Recipe> = (await query(res, SQL_ALL_RECIPES));

  let canMake: Array<Recipe> = [];
  for (let recipe of recipes) {
    let canMakeRecipe = true;
    for (let ingredient of recipe.ingredients) {
      let hasIngredient = false;
      for (let food of userFood) {
        if (!ingredient.toLowerCase().includes(food.name.toLowerCase()))
          continue;

        hasIngredient = true;
        break;
      }
      if (!hasIngredient) {
        canMakeRecipe = false;
        break;
      }
    }

    if (canMakeRecipe)
      canMake.push(recipe);
  }

  send(res, {
    recipes: canMake
  });
}
