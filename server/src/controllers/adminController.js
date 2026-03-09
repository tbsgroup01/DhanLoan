const LoanApplication = require("../models/LoanApplication");
const sequelize = require("../config/mysql");

// Get All Loan Applications
exports.getAllLoans = async (req, res) => {

  try {

    const loans = await LoanApplication.findAll({
      order: [["createdAt", "DESC"]]
    });

    res.json(loans);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching loans",
      error: error.message
    });

  }

};



// Get Only Pending Applications
exports.getPendingLoans = async (req, res) => {

  try {

    const loans = await LoanApplication.findAll({
      where: { status: "pending" },
      order: [["createdAt", "DESC"]]
    });

    res.json(loans);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching pending loans"
    });

  }

};



// Approve Loan
exports.approveLoan = async (req, res) => {

  try {

    const { id } = req.params;

    const loan = await LoanApplication.findByPk(id);

    if (!loan) {
      return res.status(404).json({
        message: "Loan application not found"
      });
    }

    await loan.update({
      status: "approved",
      rejection_reason: null
    });

    res.json({
      message: "Loan approved successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Error approving loan",
      error: error.message
    });

  }

};



// Reject Loan
exports.rejectLoan = async (req, res) => {

  try {

    const { id } = req.params;
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({
        message: "Rejection reason required"
      });
    }

    const loan = await LoanApplication.findByPk(id);

    if (!loan) {
      return res.status(404).json({
        message: "Loan application not found"
      });
    }

    await loan.update({
      status: "rejected",
      rejection_reason: reason
    });

    res.json({
      message: "Loan rejected successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Error rejecting loan",
      error: error.message
    });

  }

};



// Dashboard Stats
exports.getDashboardStats = async (req, res) => {

  try {

    const total = await LoanApplication.count();

    const pending = await LoanApplication.count({
      where: { status: "pending" }
    });

    const approved = await LoanApplication.count({
      where: { status: "approved" }
    });

    const rejected = await LoanApplication.count({
      where: { status: "rejected" }
    });

    const paid = await LoanApplication.count({
      where: { payment_status: "paid" }
    });

    res.json({
      total,
      pending,
      approved,
      rejected,
      processingFeesPaid: paid
    });

  } catch (error) {

    res.status(500).json({
      message: "Error fetching dashboard stats"
    });

  }

};

exports.getLoanAnalytics = async (req, res) => {

  const data = await LoanApplication.findAll({
    attributes: [
      [sequelize.fn("DATE", sequelize.col("createdAt")), "date"],
      [sequelize.fn("COUNT", sequelize.col("id")), "applications"]
    ],
    group: ["date"],
    order: [["date", "ASC"]]
  });

  res.json(data);

};

exports.deleteApplicationsBulk = async (req, res) => {

  try {

    const { ids } = req.body;

    if (!ids || ids.length === 0) {
      return res.status(400).json({
        message: "No applications selected"
      });
    }

    await LoanApplication.destroy({
      where: {
        id: ids
      }
    });

    res.json({
      message: "Applications deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Error deleting applications"
    });

  }

};


// Get Single Loan Application
exports.getLoanById = async (req, res) => {

  try {

    const { id } = req.params;

    const loan = await LoanApplication.findByPk(id);

    if (!loan) {
      return res.status(404).json({
        message: "Loan application not found"
      });
    }

    res.json(loan);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching loan application",
      error: error.message
    });

  }

};