const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, mail, password } = req.body;

    const userExists = await User.exists({ mail: mail.toLowerCase() });

    if (userExists) {
      return res.status(409).send("E-Mail is already in use.");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      mail: mail.toLowerCase(),
      password: encryptedPassword,
    });
    const token = jwt.sign(
      {
        userId: user._id,
        mail,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "24h",
      }
    );
    res.status(201).json({
      userDetails: {
        mail: user.mail,
        token: token,
        username: user.username,
        _id: user._id,
      },
    });
  } catch (error) {
    return res.status(500).send("Error occurred. Please try again");
  }
};

exports.login = async (req, res) => {
  try {
    const { mail, password } = req.body;
    const user = await User.findOne({ mail: mail.toLowerCase() });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          userId: user._id,
          mail,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "24h",
        }
      );
      return res.status(200).json({
        userDetails: {
          mail: user.mail,
          token: token,
          username: user.username,
          _id: user._id,
        },
      });
    }

    return res.status(400).send("Invalid credentials. Please try again");
  } catch (error) {
    return res.status(500).send("Error occurred. Please try again");
  }
};
