const express = require("express");
const router = express.Router();
const { signUp, login, logout, getMe } = require("../controllers/authController");
const protect = require('../middleware/authMiddleware')
const decryptPayload = require("../middleware/decryptPayload");

router.post("/signup", decryptPayload,  signUp);
router.post("/login", decryptPayload, login);
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);

module.exports = router;