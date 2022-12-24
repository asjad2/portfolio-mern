import { postMessages,postMembers,getMessages,deleteMessages } from "./../Controllers/Controllers.js";
import express from "express";

const router = express.Router();

router.post("/postMessages", postMessages);
router.post("/postMembers",postMembers);
router.get("/getMessages",getMessages);
router.delete("/deleteMessages/:id",deleteMessages)

export default router;

