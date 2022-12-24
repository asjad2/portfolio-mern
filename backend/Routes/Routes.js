import { postMessages,postMembers,getMessages } from "./../Controllers/Controllers.js";
import express from "express";

const router = express.Router();

router.post("/postMessages", postMessages);
router.post("/postMembers",postMembers);
router.get("/getMessages",getMessages);

export default router;
