import { postMessages,postMembers,getMessages,deleteMessages,Login,getMembers,verifiedToken,Logout } from "./../Controllers/Controllers.js";

import express from "express";

const router = express.Router();

router.post("/postMessages", postMessages);
router.post("/postMembers",postMembers);
router.get("/getMessages" ,getMessages);
router.delete("/deleteMessages/:id",deleteMessages)
router.post("/loginMembers",Login)
router.get("/getMembers",verifiedToken,getMembers)
router.get("/Logout",Logout)
export default router;

