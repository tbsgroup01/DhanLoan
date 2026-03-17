const { DataTypes } = require("sequelize");
const sequelize = require("../config/mysql");

const LoanRecovery = sequelize.define("LoanRecovery", {
  loan_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: DataTypes.STRING,
  mobile: DataTypes.STRING,
  pending_amount: DataTypes.FLOAT,
  total_loan_amount: DataTypes.FLOAT,
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending", // pending, processed, completed
  },
});

module.exports = LoanRecovery;