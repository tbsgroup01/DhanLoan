const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: process.env.DB_DIALECT || "mysql",
    logging: false,
  },
);
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL Connected");
  } catch (error) {
    console.error("MySQL connection failed:", error);
  }
};
module.exports = sequelize;
module.exports.connectDB = connectDB;
