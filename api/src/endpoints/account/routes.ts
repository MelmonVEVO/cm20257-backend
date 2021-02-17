import { create } from "domain";
import { Router } from "express";

import createAccount from "./createAccount";
import login from "./login";

let router = Router();

router.post("/login", login);
router.post("/create", createAccount);

export default router;
