const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, email, password: plainTextPassword } = req.body;

  const password = await bcrypt.hash(plainTextPassword, 10);
  try {
    const response = await User.create({
      username,
      email,
      password,
    });
    console.log("user created successfully ", response);
    res.json({ status: "ok" });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({
        status: "error",
        error: "Username/email already in use.",
      });
    }
    throw error;
  }

};

const login = async (req, res) => {
  const { username, password: plainTextPassword } = req.body;

  try {
    const user = await User.findOne({ username }).lean();

    if (!user) {
      return res.json({ status: "error", error: "username not found." });
    }

    if (await bcrypt.compare(plainTextPassword, user.password)) {
      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET
      );
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ status: "error", error: "Invalid Password." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const changePassword = async (req, res) => {
  const { token, newPassword } = req.body;
  
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    const _id = user.id;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne(
      { _id },
      {
        $set: { password: hashedPassword },
      }
    );
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", error: "Invalid signature." });
    console.log(error);
  }
};

module.exports = {
  register,
  login,
  changePassword,
};
