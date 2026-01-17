import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";
 
const router = express.Router();

router.post("/register",singleUpload,register);
router.post("/login",login);
router.get("/logout",logout);
router.get("/check-auth", isAuthenticated, (req, res) => {
    // Test endpoint to verify authentication is working
    res.status(200).json({
        message: "Authentication successful",
        success: true,
        userId: req.id
    });
});
router.post("/profile/update",isAuthenticated,singleUpload,updateProfile);

export default router;

