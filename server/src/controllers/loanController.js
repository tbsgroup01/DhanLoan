const LoanApplication = require("../models/LoanApplication");
const LoanRecovery = require("../models/LoanRecovery"); // Import the new model
const generateLoanId = require("../services/generateLoanId");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "loan_super_secret_key";


/* ===============================
   STEP 1 - START APPLICATION
   (Homepage form)
================================ */
exports.startApplication = async (req, res) => {
  try {

    const { name, mobile, email } = req.body;

    if (!name || !mobile || !email) {
      return res.status(400).json({
        message: "Name, mobile and email are required"
      });
    }

    const application = await LoanApplication.create({
      name,
      mobile,
      email,
      step_completed: 1
    });

    res.json({
      applicationId: application.id
    });

  } catch (error) {

    console.error("START APPLICATION ERROR:", error);

    res.status(500).json({
      message: "Server error"
    });

  }
};


/* ===============================
   STEP 2 - IDENTITY DETAILS
================================ */
exports.step2 = async (req, res) => {

  try {

    const {
      applicationId,
      aadhar,
      pan,
      occupation,
      address,
      pincode
    } = req.body;

    if (!applicationId) {
      return res.status(400).json({
        message: "Application ID required"
      });
    }

    const application = await LoanApplication.findByPk(applicationId);

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    await application.update({
      aadhar,
      pan,
      occupation,
      address,
      pincode,
      step_completed: 2
    });

    res.json({
      message: "Step 2 saved"
    });

  } catch (error) {

    console.error("STEP2 ERROR:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

};


/* ===============================
   STEP 3 - LOAN DETAILS
================================ */
exports.step3 = async (req, res) => {

  try {

    const {
      applicationId,
      amount,
      tenure,
      loanType,
      emi,
      total
    } = req.body;

    const application = await LoanApplication.findByPk(applicationId);

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    await application.update({
      amount,
      tenure,
      loanType,
      emi,
      total,
      step_completed: 3
    });

    res.json({
      message: "Step 3 saved"
    });

  } catch (error) {

    console.error("STEP3 ERROR:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

};


/* ===============================
   STEP 4 - BANK DETAILS
================================ */
exports.step4 = async (req, res) => {

  try {

    const {
      applicationId,
      accountHolder,
      accountNumber,
      ifsc,
      bankName
    } = req.body;

    const application = await LoanApplication.findByPk(applicationId);

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    await application.update({
      accountHolder,
      accountNumber,
      ifsc,
      bankName,
      step_completed: 4
    });

    res.json({
      message: "Step 4 saved"
    });

  } catch (error) {

    console.error("STEP4 ERROR:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

};


/* ===============================
   PAYMENT SUCCESS
================================ */
exports.paymentSuccess = async (req, res) => {

  try {

    const { applicationId } = req.body;

    const application = await LoanApplication.findByPk(applicationId);

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    const loanId = generateLoanId(application.id);

    await application.update({
      loan_id: loanId,
      payment_status: "paid",
      step_completed: 5
    });

    res.json({
      loanId
    });

  } catch (error) {

    console.error("PAYMENT ERROR:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

};

/* ===============================
   CHECK LOAN STATUS
================================ */
exports.checkStatus = async (req, res) => {

  try {

    const { loanId } = req.params;

    const loan = await LoanApplication.findOne({
      where: { loan_id: loanId }
    });

    if (!loan) {
      return res.status(404).json({
        message: "Loan not found"
      });
    }

    res.json({
      loan_id: loan.loan_id,
      status: loan.status,
      amount: loan.amount,
      loanType: loan.loanType,
      rejection_reason: loan.rejection_reason
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};


/* ===============================
   VERIFY USER (LOAN ID + PHONE)
================================ */
exports.verifyLoanUser = async (req, res) => {

  try {

    const { loan_id, mobile } = req.body;

    const loan = await LoanApplication.findOne({
      where: { loan_id }
    });

    if (!loan) {
      return res.status(404).json({
        message: "Loan ID not found"
      });
    }

    if (loan.mobile !== mobile) {
      return res.status(401).json({
        message: "Enter valid phone number"
      });
    }

    res.json({
      success: true,
      passwordCreated: !!loan.password,
      loan_id: loan.loan_id
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};


/* ===============================
   CREATE PASSWORD
================================ */
exports.createPassword = async (req, res) => {

  try {

    const { loan_id, password } = req.body;

    const loan = await LoanApplication.findOne({
      where: { loan_id }
    });

    if (!loan) {
      return res.status(404).json({
        message: "Loan not found"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await loan.update({
      password: hashedPassword
    });

    const token = jwt.sign(
      { loan_id: loan.loan_id },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Password created",
      token
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};



/* ===============================
   ADMIN - GET ALL LOANS
================================ */
exports.getAllLoans = async (req, res) => {

  try {

    const loans = await LoanApplication.findAll({
      order: [["createdAt", "DESC"]]
    });

    res.json(loans);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};


/* ===============================
   GET APPLICANT DETAILS
================================ */
exports.getApplicantDetails = async (req, res) => {

  try {

    const { loanId } = req.params;

    const application = await LoanApplication.findOne({
      where: { loan_id: loanId }
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    res.json(application);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};


/* ===============================
   USER DASHBOARD
================================ */
exports.getUserDashboard = async (req, res) => {

  try {

    const loan = await LoanApplication.findOne({
      where: { loan_id: req.user.loan_id }
    });

    if (!loan) {
      return res.status(404).json({
        message: "Loan not found"
      });
    }

    res.json(loan);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};

exports.registerLoanUser = async (req, res) => {

  try {

    const { loan_id, mobile, password } = req.body;

    const loan = await LoanApplication.findOne({
      where: { loan_id }
    });

    if (!loan) {
      return res.status(404).json({
        message: "Loan not found"
      });
    }

    if (loan.mobile !== mobile) {
      return res.status(401).json({
        message: "Mobile number mismatch"
      });
    }

    if (loan.password) {
      return res.status(400).json({
        message: "User already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await loan.update({
      password: hashedPassword
    });

    const token = jwt.sign(
      { loan_id: loan.loan_id },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Registration successful",
      token
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};


exports.loginLoanUser = async (req, res) => {
  try {

    const { mobile, password } = req.body;

    if (!mobile || !password) {
      return res.status(400).json({
        message: "Mobile and password are required"
      });
    }

    const loan = await LoanApplication.findOne({
      where: { mobile }
    });

    if (!loan) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // user never registered
    if (!loan.password) {
      return res.status(400).json({
        message: "User not registered yet. Please register first."
      });
    }

    const validPassword = await bcrypt.compare(password, loan.password);

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      { loan_id: loan.loan_id },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {

    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      message: "Server error"
    });

  }
};



// At the top of your controller file
const otpStore = new Map(); // Temporary storage for OTPs

/* ===============================
   OTP LOGIN - STEP 1: REQUEST OTP
================================ */
exports.requestLoginOtp = async (req, res) => {
  try {
    const { loan_id, mobile } = req.body;

    const loan = await LoanApplication.findOne({
      where: { loan_id, mobile }
    });

    if (!loan) {
      return res.status(404).json({
        success: false,
        message: "No application found with these details."
      });
    }

    // 2. SET DUMMY OTP (Hardcoded for all users)
    const otp = "123456"; 

    // 3. Store OTP with 5-minute expiry
    otpStore.set(loan_id, {
      otp,
      expiresAt: Date.now() + 300000 // 5 minutes
    });

    // 4. Log to console for debugging
    console.log(`[AUTH] Dummy OTP triggered for Loan ID ${loan_id}: ${otp}`);

    res.json({
      success: true,
      message: "OTP sent successfully (Use 123456 for testing)."
    });

  } catch (error) {
    console.error("REQUEST OTP ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ===============================
   OTP LOGIN - STEP 2: VERIFY OTP
================================ */
exports.verifyLoginOtp = async (req, res) => {
  try {
    const { loan_id, otp } = req.body;

    const storedData = otpStore.get(loan_id);

    // 1. Validate OTP (Checks against the dummy "123456" stored in Step 1)
    if (!storedData || storedData.otp !== otp || Date.now() > storedData.expiresAt) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP. (Try 123456)"
      });
    }

    // 2. Clear OTP after successful use
    otpStore.delete(loan_id);

    const loan = await LoanApplication.findOne({ where: { loan_id } });

    // 4. Generate JWT
    const token = jwt.sign(
      { loan_id: loan.loan_id },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      name: loan.name
    });

  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};



exports.submitRecoveryRequest = async (req, res) => {
  try {
    const { loan_id, mobile, name, pendingAmount, totalAmount } = req.body;

    // 1. Validation
    if (!loan_id || !mobile) {
      return res.status(400).json({ message: "Loan ID and Mobile are required" });
    }

    // 2. Check if Loan exists and mobile matches
    const loan = await LoanApplication.findOne({
      where: { loan_id: loan_id }
    });

    if (!loan) {
      return res.status(404).json({ message: "Invalid Loan ID" });
    }

    if (loan.mobile !== mobile) {
      return res.status(401).json({ 
        message: "Mobile number does not match our records for this Loan ID" 
      });
    }

    // 3. Store Recovery Request in DB
    const recoveryEntry = await LoanRecovery.create({
      loan_id,
      name: name || loan.name, // Use provided name or fallback to original
      mobile,
      pending_amount: pendingAmount,
      total_loan_amount: totalAmount,
      status: "pending"
    });

    res.status(201).json({
      success: true,
      message: "Recovery request submitted successfully",
      recoveryId: recoveryEntry.id
    });

  } catch (error) {
    console.error("RECOVERY ERROR:", error);
    res.status(500).json({ message: "Server error processing recovery" });
  }
};

// GET ALL RECOVERY REQUESTS (Admin Only)
exports.getAllRecoveries = async (req, res) => {
  try {
    const recoveries = await LoanRecovery.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(recoveries);
  } catch (error) {
    console.error("GET_RECOVERIES_ERROR:", error);
    res.status(500).json({ message: "Server error fetching recoveries" });
  }
};

