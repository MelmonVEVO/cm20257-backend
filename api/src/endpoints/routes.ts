import { Router } from "express";

import * as log from "../logging";

import createAccount from "./account/createAccount";
import login from "./account/login";
import accountRoutes from "./account/routes";
import followerRoutes from "./followers/routes";
import recipeRoutes from "./recipes/routes";
import searchRoutes from "./search/routes";
import { validToken } from "./token";
import { error } from "./utils";

let router = Router();

// Don't need to be authenticated.
router.post("/account/login", login);
router.post("/account/create", createAccount);

// Authenticate requests.
router.use(async (req, res, next) => {
  let token = req.headers.token;

  if (!token) {
    log.logWarn(`No authentication token provided! ${req.url}`);
    return error(res);
  }

  let auth = await validToken(token);

  if (!auth.valid) {
    log.logWarn(`Invalid authentication token provided! ${req.url}`);
    return error(res);
  }

  req.user = auth.user;
  next();
});

router.use("/account", accountRoutes);
router.use("/recipes", recipeRoutes);
router.use("/followers", followerRoutes);
router.use("/search", searchRoutes);

export default router;
