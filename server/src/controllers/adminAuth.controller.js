const bcrypt = require("bcryptjs");
const Admin = require("../models/admin.model");
const jwt = require("jsonwebtoken");
const transporter = require("../config/mail");

exports.registerAdmin = async (req, res) => {

  try {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // check existing admin
    const existingAdmin = await Admin.findOne({
      where: { email }
    });

    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      username,
      email,
      password: hashedPassword
    });

    return res.status(201).json({
      message: "Admin registered successfully",
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email
      }
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server error"
    });

  }

};

exports.loginAdmin = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // find admin
    const admin = await Admin.findOne({
      where: { email }
    });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // generate token
    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login successful",
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email
      }
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server error"
    });

  }
};


exports.forgotPassword = async (req, res) => {
  try {

    const { email } = req.body;

    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found"
      });
    }

    const resetToken = jwt.sign(
      { id: admin.id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const resetLink = `${process.env.ADMIN_URL}/auth/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "Password Reset",
      html: `
        <h3>Password Reset Request</h3>
        <p>Click the link below to reset your password</p>
        <a href="${resetLink}">Reset Password</a>
      `
    });

    res.json({
      message: "Password reset email sent"
    });

  } catch (error) {

    console.error("FORGOT PASSWORD ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }
};


exports.resetPassword = async (req, res) => {
  try {

    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        message: "Password is required"
      });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findByPk(decoded.id);

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found"
      });
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    admin.password = hashedPassword;

    await admin.save();

    res.json({
      message: "Password reset successful"
    });

  } catch (error) {

    console.error("RESET PASSWORD ERROR:", error);

    res.status(400).json({
      message: "Invalid or expired reset token"
    });

  }
};