const express = require("express");

const router = express.Router();

const loanController = require("../controllers/loanController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/start", loanController.startApplication);

router.post("/step2", loanController.step2);

router.post("/step3", loanController.step3);

router.post("/step4", loanController.step4);

router.post("/payment-success", loanController.paymentSuccess);

router.get("/status/:loanId", loanController.checkStatus);

router.post("/verify-user", loanController.verifyLoanUser);

router.post("/create-password", loanController.createPassword);

router.post("/register-user", loanController.registerLoanUser);
router.post("/login-user", loanController.loginLoanUser);

router.get("/user-dashboard", authMiddleware, loanController.getUserDashboard);

module.exports = router;
