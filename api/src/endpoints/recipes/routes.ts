import { Router } from "express";

import getRecipes from "./getRecipes";

let router = Router();

router.get("/", getRecipes);

export default router;
