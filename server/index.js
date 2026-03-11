require("dotenv").config();

const app = require("./src/app");
const sequelize = require("./src/config/mysql");

const PORT = process.env.PORT;
const HOST = "192.168.29.185";

const startServer = async () => {
  try {

    await sequelize.authenticate();
    console.log("✅ MySQL Connected Successfully");

    await sequelize.sync();
    console.log("✅ Tables Synced");

    console.log("ADMIN_URL:", process.env.ADMIN_URL);

    app.listen(PORT, HOST, () => {
      console.log(`🚀 Server running on http://${HOST}:${PORT}`);
    });

  } catch (error) {
    console.error("❌ Server failed to start:", error);
  }
};

startServer();