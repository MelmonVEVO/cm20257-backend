import { Router } from "express";

import userSearch from "./userSearch";

let router = Router();

router.post("/", userSearch);

export default router;
