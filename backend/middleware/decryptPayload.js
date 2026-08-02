const { decrypt } = require("../utils/encryption");

const decryptPayload = (req, res, next) => {
    try {
        if (
            req.body &&
            req.body.iv &&
            req.body.content &&
            req.body.tag
        ) {
            req.body = decrypt(req.body);        }
        next();
    } catch (error) {
        return res.status(400).json({
            message: "Invalid encrypted payload",
        });
    }
};

module.exports = decryptPayload;