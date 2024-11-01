import express from "express";
import authController from "../controllers/authController.js";
import validateToken from "../middlewares/authorize.js";
const router = express.Router();

router.post("/register", authController.registerUser);
router.get("/validate", validateToken, (req, res) => {
    console.log("abc");
    res.status(200).json({ success: true, message: "Token is valid" });
});

router.post("/login", authController.loginUser);

export default router;
