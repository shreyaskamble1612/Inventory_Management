const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../Models/User");
const sendEmail = require("../utils/sendEmail");

const router = express.Router();

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }
  //generate a token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });

  //store token in database

  user.resetToken = token;
  user.resetTokenExpire = Date.now() + 3600000;
  await user.save();

  //send resete email

  const resetLink = `${process.env.CLIENT_URL}/resete-password/${token}`;
  const message = `<p>Click <a href="${resetLink}">here</a> to reset you password. The link is valid for 10 minutes</p>`;

  await sendEmail(user.email, "Password Reser", message);

  res.json({ message: "Password reset link send to email" });
});

//reset password verify token and update pasword
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id, resetToken: token });

    if (!user || user.resetTokenExpire < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    //hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    //update user password

    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpire = null;
    await user.save();
    res.json({ message: "Passwrd reset successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
});

module.exports = router;
