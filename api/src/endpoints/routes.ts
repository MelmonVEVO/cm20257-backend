import { Router } from "express";

let router = Router();

import accountRoutes from "./account/routes";
import recipeRoutes from "./recipes/routes";

router.use("/account", accountRoutes);
router.use("/recipes", recipeRoutes);

export default router;
