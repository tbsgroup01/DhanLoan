const { DataTypes } = require("sequelize");
const sequelize = require("../config/mysql");

const LoanApplication = sequelize.define("LoanApplication", {
  loan_id: {
    type: DataTypes.STRING,
  },

  // Step 1
  aadhar: DataTypes.STRING,
  pan: DataTypes.STRING,

  // Step 2
  name: DataTypes.STRING,
  mobile: DataTypes.STRING,
  email: DataTypes.STRING,
  occupation: DataTypes.STRING,
  address: DataTypes.TEXT,
  pincode: DataTypes.STRING,

  // Step 3
  amount: DataTypes.INTEGER,
  tenure: DataTypes.INTEGER,
  loanType: DataTypes.STRING,
  emi: DataTypes.FLOAT,
  total: DataTypes.FLOAT,

  // Step 4
  accountHolder: DataTypes.STRING,
  accountNumber: DataTypes.STRING,
  ifsc: DataTypes.STRING,
  bankName: DataTypes.STRING,

  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  step_completed: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },

  payment_status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
  },

  rejection_reason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
  },
});

module.exports = LoanApplication;