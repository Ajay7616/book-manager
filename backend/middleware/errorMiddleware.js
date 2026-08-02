const { encrypt } = require("../utils/encryption");

const errorHandler = (err, req, res, next) => {
    const statusCode =
        res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json(
        encrypt({
            success: false,
            message: err.message || "Server Error",
        })
    );
};


module.exports = errorHandler;