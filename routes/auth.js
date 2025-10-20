import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  refreshToken,
  logOut,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js"


const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);
router.post("/log-out", logOut);
router.get("/profile", authMiddleware,  getProfile);

export default router;