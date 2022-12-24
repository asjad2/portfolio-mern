import { postMessages,postMembers } from "./../Controllers/Controllers.js";
import express from "express";

const router = express.Router();

router.post("/postMessages", postMessages);
router.post("/postMembers",postMembers);

export default router;
