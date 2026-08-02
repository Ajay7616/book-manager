const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const hpp = require("hpp");

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use(
    cors({
        origin: "https://personal-book-manager-ajay.vercel.app",
        credentials: true,
    })
);

app.use(helmet());
app.use(hpp());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "API is running"
    });
});

app.use(errorHandler);

module.exports = app;