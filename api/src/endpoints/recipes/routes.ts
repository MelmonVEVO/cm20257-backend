import { Router } from "express";

import getRecipes from "./getRecipes";
import searchRecipes from "./searchRecipes";

let router = Router();

router.get("/", getRecipes);
router.post("/search", searchRecipes);

export default router;
