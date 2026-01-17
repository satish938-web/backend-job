import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany, updateCompanyStatus, approveCompany, rejectCompany, deleteCompany, getAllApprovedCompanies } from "../controllers/company.controller.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

router.post("/register",isAuthenticated,registerCompany);
router.get("/get",isAuthenticated,getCompany);
router.get("/get-all", getAllApprovedCompanies); // Public route - get all approved companies
router.get("/get/:id",getCompanyById); // Public route - users can view company details
router.put("/update/:id" ,isAuthenticated,singleUpload, updateCompany);
router.put("/status/:id", isAuthenticated, updateCompanyStatus);

// Admin routes for company management
router.put("/approve/:id", isAuthenticated, approveCompany);
router.put("/reject/:id", isAuthenticated, rejectCompany);
router.delete("/:id", isAuthenticated, deleteCompany);

export default router;

