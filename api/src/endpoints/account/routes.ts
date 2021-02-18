import { Router } from "express";

import addFoodItem from "./addFoodItem";
import deleteFoodItem from "./deleteFoodItem";
import getFood from "./getFood";

let router = Router();

router.get("/food", getFood);

router.post("/add-food", addFoodItem);
router.post("/delete-food", deleteFoodItem);

export default router;
