const express = require("express");

const router = express.Router();

const loanController = require("../controllers/loanController");

router.post("/start", loanController.startApplication);

router.post("/step2", loanController.step2);

router.post("/step3", loanController.step3);

router.post("/step4", loanController.step4);

router.post("/payment-success", loanController.paymentSuccess);

router.get("/status/:loanId", loanController.checkStatus);

// router.get("/admin/application/:loanId", loanController.getApplicantDetails);

module.exports = router;
