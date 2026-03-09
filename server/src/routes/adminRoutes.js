const express = require("express");

const router = express.Router();

const adminController = require("../controllers/adminController");

router.get("/loans", adminController.getAllLoans);
router.get("/pending-loans", adminController.getPendingLoans);
router.patch("/approve/:id", adminController.approveLoan);
router.patch("/reject/:id", adminController.rejectLoan);
router.get("/dashboard", adminController.getDashboardStats);
router.get("/loan-analytics", adminController.getLoanAnalytics);
router.delete("/delete-bulk", adminController.deleteApplicationsBulk);
router.get("/loan/:id", adminController.getLoanById);



module.exports = router;