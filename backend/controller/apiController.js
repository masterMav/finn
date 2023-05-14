const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const register = async (req, res) => {
  const { username, email, password: plainTextPassword } = req.body;

  const password = await bcrypt.hash(plainTextPassword, 10);
  try {
    const response = await User.create({
      username,
      email,
      password,
    });
    res.json({ status: "ok" });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({
        status: "error",
        error: "Username/email already in use.",
      });
    }

    res.json({
      status: "error",
      error: "Internal Server Error",
    });
  }
};

const login = async (req, res) => {
  const { username: userEntry, password: plainTextPassword } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ username: userEntry }, { email: userEntry }],
    }).lean();

    if (!user) {
      return res.json({ status: "error", error: "Username/Email not found." });
    }

    if (await bcrypt.compare(plainTextPassword, user.password)) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
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

const sendEmail = async (req, res) => {
  const { email, OTP } = req.body;

  try {
    const user = await User.findOne({ email: email }).lean();

    // Is email already registered?
    if (user) {
      return res.json({ status: "error", error: "Email already in use." });
    }

    // Send email
    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: process.env.SRC_EMAIL,
        pass: process.env.SRC_PASS,
      },
    });

    const options = {
      from: process.env.SRC_EMAIL,
      to: email,
      subject: "[OTP] Email verify for finn's adventure.",
      html: `<p>Dear User,</p>
      <p>Your one-time verification code is <b>${OTP}</b>.</p>
      <p>Please enter this code on the verification page to complete the process.</p>
      <p>Please do not share this code with anyone for security purposes.</p>
      <p>Thank you for using our services.</p>
      <p>Best regards,</p>
      <p>Manavkumar Patel</p>`,
    };

    transporter.sendMail(options, (err, info) => {
      if (err) {
        console.log(err);
        res.json({ status: "error", error: "Invalid email." });
      } else {
        res.json({ status: "ok", data: "Email sent successfully." });
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "Internal server error." });
  }
};

const updateGamedata = async (req, res) => {
  const { token, gamedata } = req.body;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    const _id = user.id;
    await User.updateOne(
      { _id },
      {
        $set: { gamedata },
      }
    );
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", error: "Invalid signature." });
    console.log(error);
  }
};

const getGamedata = async (req, res) => {
  const { token } = req.body;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    // Verify admin
    if (user.id === process.env.ADMIN_ID) {
      // Verified now fetch data from DB.

      User.find({ gamedata: { $exists: true, $ne: [] } }, "username gamedata")
        .then((users) => {
          // _id, username & gamedata successfully fetched from DB.

          res.json({ status: "ok", users });
        })
        .catch((err) => {
          // fetching errors.

          console.error(err);
        });
    } else throw new Error();
  } catch (error) {
    // Invalid token
    
    res.json({ status: "error", error: "Invalid signature." });
    console.log(error);
  }
};

module.exports = {
  register,
  login,
  changePassword,
  sendEmail,
  updateGamedata,
  getGamedata,
};
