const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

// Routes
const adminAuthRoutes = require("./routes/adminAuth.routes");
const loanRoutes = require("./routes/loanRoutes");
const adminRoutes = require("./routes/adminRoutes");
const settingRoutes = require("./routes/settingRoutes");
const paymentConfigRoutes = require("./routes/paymentConfigRoutes");
const tagRoutes = require("./routes/tagRoutes");


const app = express();

/* ========= BODY PARSER ========= */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ========= COOKIES ========= */

app.use(cookieParser());

/* ========= CORS ========= */

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

/* ========= STATIC FILES ========= */

/* Loan uploads */

app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

/* Payment QR uploads */

app.use(
  "/payment-config",
  express.static(path.join(__dirname, "../public/payment-config"))
);

/* ========= API ROUTES ========= */

app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/loan", loanRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/payment-config", paymentConfigRoutes);
app.use("/api", tagRoutes);

/* ========= HEALTH CHECK ========= */

app.get("/api", (req, res) => {
  res.send({
    status: "ok",
    message: "API is healthy"
  });
});

module.exports = app;