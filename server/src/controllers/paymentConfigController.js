const PaymentConfig = require("../models/PaymentConfig");
const LoanApplication = require("../models/LoanApplication");
const Razorpay = require("razorpay");
const crypto = require("crypto");


/* =========================
   UPDATE PAYMENT CONFIG
========================= */

// const PaymentConfig = require("../models/PaymentConfig");

exports.updatePaymentConfig = async (req, res) => {
  try {
    const {
      processing_fee,
      razorpay_key_id,
      razorpay_secret,
      account_name,
      account_number,
      ifsc,
      bank_name,
    } = req.body;

    let qrImagePath = null;

    if (req.file) {
      qrImagePath = `/public/payment-config/${req.file.filename}`;
    }

    const config = await PaymentConfig.findByPk(1);

    if (!config) {
      return res.status(404).json({ success: false, message: "Config not found" });
    }

    await config.update({
      processing_fee: processing_fee ? parseInt(processing_fee) : 0,
      razorpay_key_id: razorpay_key_id || "",
      razorpay_secret: razorpay_secret || "",
      account_name: account_name || "",
      account_number: account_number || "",
      ifsc: ifsc || "",
      bank_name: bank_name || "",
      qr_image: qrImagePath || config.qr_image,
    });

    res.json({
      success: true,
      message: "Payment config updated",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


/* =========================
   GET PAYMENT CONFIG
========================= */

exports.getPaymentConfig = async (req, res) => {

  try {

    const config = await PaymentConfig.findOne();

    if (!config) {
      return res.json({});
    }

    res.json(config);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch payment config"
    });

  }

};


/* ===============================
   CREATE RAZORPAY ORDER
================================ */

exports.createOrder = async (req, res) => {

  try {

    const config = await PaymentConfig.findOne();

    if (!config) {
      return res.status(400).json({
        success: false,
        message: "Payment settings not configured"
      });
    }

    const razorpay = new Razorpay({
      key_id: config.razorpay_key,
      key_secret: config.razorpay_secret
    });

    const amount = Number(config.processing_fee) * 100;

    const order = await razorpay.orders.create({
      amount,
      currency: "INR"
    });

    res.json({
      success: true,
      order,
      key: config.razorpay_key
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order"
    });

  }

};


/* ===============================
   VERIFY PAYMENT
================================ */

exports.verifyPayment = async (req, res) => {

  try {

    const {
      applicationId,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature
    } = req.body;

    const config = await PaymentConfig.findOne();

    if (!config) {
      return res.status(400).json({
        success: false,
        message: "Payment configuration missing"
      });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", config.razorpay_secret)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {

      return res.status(400).json({
        success: false,
        message: "Payment verification failed"
      });

    }

    const loanId = "LN" + Date.now();

    await LoanApplication.update(
      {
        payment_status: "paid",
        loan_id: loanId
      },
      {
        where: { id: applicationId }
      }
    );

    res.json({
      success: true,
      message: "Payment verified successfully",
      loanId
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Payment verification failed"
    });

  }

};