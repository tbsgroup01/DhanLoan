const LoanApplication = require("../models/LoanApplication");
const generateLoanId = require("../services/generateLoanId");


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

    res.status(500).json({ error: error.message });

  }

};


exports.step2 = async (req, res) => {

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

};


exports.step3 = async (req, res) => {

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

};


exports.step4 = async (req, res) => {

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

};



exports.paymentSuccess = async (req, res) => {

  const { applicationId } = req.body;

  const application = await LoanApplication.findByPk(applicationId);

  const loanId = generateLoanId(application.id);

  await application.update({
    loan_id: loanId,
    payment_status: "paid",
    step_completed: 5
  });

  res.json({ loanId });

};


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


exports.getAllLoans = async (req, res) => {

  const loans = await LoanApplication.findAll({
    order: [["createdAt", "DESC"]]
  });

  res.json(loans);

};


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
      message: "Server error",
      error: error.message
    });

  }

};
