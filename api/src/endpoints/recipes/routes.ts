import { Router } from "express";

import getRecipes from "./getRecipes";
import searchRecipes from "./searchRecipes";
import selectRecipe from "./selectRecipe";

let router = Router();

router.get("/", getRecipes);

router.post("/search", searchRecipes);
router.post("/select", selectRecipe);

export default router;
