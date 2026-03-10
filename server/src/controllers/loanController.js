const LoanApplication = require("../models/LoanApplication");
const generateLoanId = require("../services/generateLoanId");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "loan_super_secret_key";


/* ===============================
   STEP 1 - START APPLICATION
================================ */
exports.startApplication = async (req, res) => {
  try {

    const { aadhar, pan } = req.body;

    const application = await LoanApplication.create({
      aadhar,
      pan,
      step_completed: 1
    });

    res.json({
      applicationId: application.id
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};


/* ===============================
   STEP 2 - PERSONAL DETAILS
================================ */
exports.step2 = async (req, res) => {

  try {

    const {
      applicationId,
      name,
      mobile,
      email,
      occupation,
      address,
      pincode
    } = req.body;

    await LoanApplication.update(
      {
        name,
        mobile,
        email,
        occupation,
        address,
        pincode,
        step_completed: 2
      },
      { where: { id: applicationId } }
    );

    res.json({ message: "Step 2 saved" });

  } catch (error) {

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

    await LoanApplication.update(
      {
        amount,
        tenure,
        loanType,
        emi,
        total,
        step_completed: 3
      },
      { where: { id: applicationId } }
    );

    res.json({ message: "Step 3 saved" });

  } catch (error) {

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

    await LoanApplication.update(
      {
        accountHolder,
        accountNumber,
        ifsc,
        bankName,
        step_completed: 4
      },
      { where: { id: applicationId } }
    );

    res.json({ message: "Step 4 saved" });

  } catch (error) {

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

    res.json({ loanId });

  } catch (error) {

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