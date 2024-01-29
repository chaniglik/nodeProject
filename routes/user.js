import express from "express";
import * as userController from "../controllers/user.js";
import { auth, authAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/",authAdmin, userController.getAllUsers)
router.post("/login", userController.login)
router.post("/", userController.addUser)


export default router;