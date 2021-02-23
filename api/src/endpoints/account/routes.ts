import { Router } from "express";

import addFavourite from "./addFavourite";
import addFoodItem from "./addFoodItem";
import deleteFavourite from "./deleteFavourite";
import deleteFoodItem from "./deleteFoodItem";
import getFavourites from "./getFavourites";
import getFood from "./getFood";

let router = Router();

router.get("/food", getFood);
router.get("/favourites", getFavourites);

router.post("/add-food", addFoodItem);
router.post("/delete-food", deleteFoodItem);

router.post("/add-favourite", addFavourite);
router.post("/delete-favourite", deleteFavourite);

export default router;
