import { postMessages,postMembers,getMessages,deleteMessages,Login } from "./../Controllers/Controllers.js";
import express from "express";

const router = express.Router();

router.post("/postMessages", postMessages);
router.post("/postMembers",postMembers);
router.get("/getMessages",getMessages);
router.delete("/deleteMessages/:id",deleteMessages)
router.post("/loginMembers",Login)

export default router;

