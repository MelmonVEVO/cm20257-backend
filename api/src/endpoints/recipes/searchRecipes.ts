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
  ingredients: string;
  imageUrl: string;
  url: string;
};

// Very basic recipe search.
export default async function searchRecipes(req, res) {
  let user = req.user;

  let userFood: Array<{
    name: string;
  }> = (await query(res, SQL_FOOD, [user]));
  let recipes: Array<Recipe> = (await query(res, SQL_ALL_RECIPES));

  let canMake: Array<{
    title: string;
    time: string;
    ingredients: Array<{
      name: string;
      got: boolean;
    }>;
    imageUrl: string;
    url: string;
  }> = [];

  for (let recipe of recipes) {
    let canMakeRecipe = false;
    let ingredients: Array<{ name: string, got: boolean }> = [];
    for (let ingredient of JSON.parse(recipe.ingredients)) {
      let hasIngredient = false;
      for (let food of userFood) {
        if (ingredient.toLowerCase().includes(food.name.toLowerCase())) {
          hasIngredient = true;
          break;
        }
      }

      if (hasIngredient)
        canMakeRecipe = true;

      ingredients.push({
        name: ingredient,
        got: hasIngredient
      });
    }

    if (canMakeRecipe)
      canMake.push({
        title: recipe.title,
        time: recipe.time,
        ingredients: ingredients,
        imageUrl: recipe.imageUrl,
        url: recipe.url
      });
  }

  send(res, {
    recipes: canMake
  });
}
