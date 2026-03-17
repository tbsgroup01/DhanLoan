
const PaymentConfig = require("../models/PaymentConfig");
const LoanApplication = require("../models/LoanApplication");
const Razorpay = require("razorpay");
const crypto = require("crypto");

/* =========================
   ADMIN: UPDATE CONFIG
   (Triggered from Admin Panel)
========================= */
exports.updatePaymentConfig = async (req, res) => {
  try {
    const {
      processing_fee,
      razorpay_key_id, // Match this with your DB model
      razorpay_secret,
      account_name,
      account_number,
      ifsc,
      bank_name,
    } = req.body;

    let [config] = await PaymentConfig.findOrCreate({ where: { id: 1 } });

    // Cloudinary puts the URL in req.file.path
    const qrImageUrl = req.file ? req.file.path : config.qr_image;

    await config.update({
      processing_fee: processing_fee || config.processing_fee,
      razorpay_key_id: razorpay_key_id || config.razorpay_key_id,
      razorpay_secret: razorpay_secret || config.razorpay_secret,
      account_name: account_name || config.account_name,
      account_number: account_number || config.account_number,
      ifsc: ifsc || config.ifsc,
      bank_name: bank_name || config.bank_name,
      qr_image: qrImageUrl,
    });

    // CRITICAL: Always return a response to stop the "buffering"
    return res.status(200).json({ 
      success: true, 
      message: "Config Updated", 
      data: config 
    });

  } catch (error) {
    console.error("UPLOAD_ERROR_LOG:", error); // Check your cloud console for this!
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const config = await PaymentConfig.findByPk(1);
    
    // FIX: Ensure you use the exact field name from your Model/DB
    const key_id = config.razorpay_key_id; 
    const secret = config.razorpay_secret;

    if (!key_id) throw new Error("Razorpay Key ID is missing in DB");

    const razorpay = new Razorpay({ key_id, key_secret: secret });

    const order = await razorpay.orders.create({
      amount: Math.round(Number(config.processing_fee) * 100),
      currency: "INR",
      receipt: `rcpt_${Date.now()}`
    });

    res.json({ success: true, order, key: key_id });
  } catch (error) {
    console.error("ORDER_ERROR_LOG:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
/* =========================
   GET PAYMENT CONFIG
========================= */
exports.getPaymentConfig = async (req, res) => {
  try {
    const config = await PaymentConfig.findByPk(1);
    res.json(config || {});
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch config" });
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
      razorpay_signature,
    } = req.body;

    const config = await PaymentConfig.findByPk(1);
    const secret = process.env.RAZORPAY_SECRET || config?.razorpay_secret;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }

    const loanId = "LN" + Date.now();
    await LoanApplication.update(
      { payment_status: "paid", loan_id: loanId },
      { where: { id: applicationId } },
    );

    res.json({ success: true, message: "Payment verified", loanId });
  } catch (error) {
    res.status(500).json({ success: false, message: "Verification failed" });
  }
};
