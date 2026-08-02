const crypto = require("crypto");

const algorithm = "aes-256-gcm";

const getKey = () => {
    if (!process.env.ENCRYPTION_KEY) {
        throw new Error(
            "ENCRYPTION_KEY is missing"
        );
    }

    return Buffer.from(
        process.env.ENCRYPTION_KEY,
        "hex"
    );
};


const encrypt = (data) => {
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(
        algorithm,
        getKey(),
        iv
    );

    const encrypted = Buffer.concat([
        cipher.update(JSON.stringify(data)),
        cipher.final(),
    ]);

    return {
        iv: iv.toString("hex"),
        content: encrypted.toString("hex"),
        tag: cipher.getAuthTag().toString("hex"),
    };
};


const decrypt = (payload) => {
    const decipher = crypto.createDecipheriv(
        algorithm,
        getKey(),
        Buffer.from(payload.iv, "hex")
    );

    decipher.setAuthTag(
        Buffer.from(payload.tag, "hex")
    );

    const decrypted = Buffer.concat([
        decipher.update(
            Buffer.from(payload.content, "hex")
        ),
        decipher.final(),
    ]);

    return JSON.parse(
        decrypted.toString()
    );
};


module.exports = {
    encrypt,
    decrypt,
};