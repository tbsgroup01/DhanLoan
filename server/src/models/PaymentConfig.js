const { DataTypes } = require("sequelize");
const sequelize = require("../config/mysql");

const PaymentConfig = sequelize.define("PaymentConfig", {

  processing_fee: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 500
  },

  razorpay_key_id: {
    type: DataTypes.STRING,
  },

  razorpay_secret: {
    type: DataTypes.STRING,
  },

  qr_image: {
    type: DataTypes.STRING
  },

  account_name: {
    type: DataTypes.STRING
  },

  account_number: {
    type: DataTypes.STRING
  },

  ifsc: {
    type: DataTypes.STRING
  },

  bank_name: {
    type: DataTypes.STRING
  }

});

module.exports = PaymentConfig;