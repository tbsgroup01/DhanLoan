const express = require("express");
const router = express.Router();

// Ensure this points to your new Cloudinary-based multer config
const { upload } = require("../config/cloudinary"); 

const {
  updatePaymentConfig,
  getPaymentConfig,
  createOrder,
  verifyPayment
} = require("../controllers/paymentConfigController");

/* =============================
   GET PAYMENT CONFIG
   (Used by both Admin and App)
============================= */
router.get("/", getPaymentConfig);

/* =============================
   UPDATE PAYMENT CONFIG (ADMIN)
   (Cloudinary handles the upload here)
============================= */
router.post(
  "/update",
  upload.single("qr_image"), // 'qr_image' must match the Key in Postman
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