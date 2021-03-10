import { Router } from "express";

import follow from "./follow";
import followingFood from "./followingFood";
import getFollowers from "./getFollowers";
import getFollowing from "./getFollowing";
import unfollow from "./unfollow";

let router = Router();

router.get("/", getFollowers);
router.get("/following", getFollowing);
router.get("/food/:following", followingFood);

router.post("/follow", follow);
router.post("/unfollow", unfollow);

export default router;
