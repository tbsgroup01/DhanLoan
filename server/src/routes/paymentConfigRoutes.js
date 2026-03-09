const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadPaymentConfig");

const {
  updatePaymentConfig,
  getPaymentConfig,
  createOrder,
  verifyPayment
} = require("../controllers/paymentConfigController");

/* =============================
   GET PAYMENT CONFIG
============================= */

router.get("/", getPaymentConfig);

/* =============================
   UPDATE PAYMENT CONFIG (ADMIN)
============================= */

router.post(
  "/update",
  upload.single("qr_image"),
  updatePaymentConfig
);

/* =============================
   CREATE RAZORPAY ORDER
============================= */

router.post("/create-order", createOrder);

/* =============================
   VERIFY PAYMENT
============================= */

router.post("/verify", verifyPayment);

module.exports = router;