const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const { encrypt } = require("../utils/encryption");

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({
      email,
    });
    if (existingUser) {
      return res.status(400).json(
        encrypt({
          message: "User already exists",
        }),
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json(
      encrypt({
        message: "Signup Successful",
        user: {
          name: user.name,
          email: user.email,
        },
      }),
    );
  } catch (error) {
    next(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json(
        encrypt({
          message: "Invalid credentials",
        }),
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json(
        encrypt({
          message: "Invalid credentials",
        }),
      );
    }
    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json(
      encrypt({
        message: "Login Successful",
        user: {
          name: user.name,
          email: user.email,
        },
      }),
    );
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(0),
    });
    res.json({message:"Logout Successfully"});
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json(
        encrypt({
          message: "User not found",
        }),
      );
    }
    res.json(
      encrypt({
        user,
      }),
    );
  } catch (error) {
    next(error);
  }
};

module.exports = { signUp, login, logout, getMe };
