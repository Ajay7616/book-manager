const express = require("express");
const router = express.Router();
const { getBooks, createBook, updateBook, deleteBook } = require("../controllers/bookController");
const protect = require('../middleware/authMiddleware');
const decryptPayload = require("../middleware/decryptPayload");

router.get("/", protect, getBooks);
router.post("/", protect, decryptPayload, createBook);
router.put("/:id", protect, decryptPayload, updateBook);
router.delete("/:id", protect, deleteBook);

module.exports = router;