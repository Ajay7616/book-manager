const algorithm = "AES-GCM";
const keyHex = process.env.NEXT_PUBLIC_ENCRYPTION_KEY!;
const tagLength = 16;

function hexToUint8Array(hex: string) {
    if (!hex) {
        return new Uint8Array();
    }

    const normalizedHex = hex.replace(/^0x/i, "").trim();

    if (normalizedHex.length % 2 !== 0) {
        throw new Error("Invalid hex string");
    }

    return new Uint8Array(
        normalizedHex.match(/.{1,2}/g)!.map((byte) =>
            parseInt(byte, 16)
        )
    );
}

function uint8ArrayToHex(bytes: Uint8Array) {
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function getKey() {
    return crypto.subtle.importKey(
        "raw",
        hexToUint8Array(keyHex),
        {
            name: algorithm,
        },
        false,
        [
            "encrypt",
            "decrypt"
        ]
    );
}

export async function encrypt(data: any) {
    const iv = crypto.getRandomValues(new Uint8Array(16));
    const key = await getKey();

    const encrypted = await crypto.subtle.encrypt(
        {
            name: algorithm,
            iv,
        },
        key,
        new TextEncoder().encode(JSON.stringify(data))
    );

    const encryptedBytes = new Uint8Array(encrypted);
    const content = encryptedBytes.slice(0, encryptedBytes.length - tagLength);
    const tag = encryptedBytes.slice(encryptedBytes.length - tagLength);

    return {
        iv: uint8ArrayToHex(iv),
        content: uint8ArrayToHex(content),
        tag: uint8ArrayToHex(tag),
    };
}

export async function decrypt(payload: any) {
    if (!payload || !payload.iv || !payload.content) {
        console.log("Invalid payload:", payload);
        throw new Error("Invalid encrypted payload");
    }

    const key = await getKey();
    const iv = typeof payload.iv === "string"
        ? hexToUint8Array(payload.iv)
        : new Uint8Array(payload.iv);
    const content = typeof payload.content === "string"
        ? hexToUint8Array(payload.content)
        : new Uint8Array(payload.content);
    const tag = payload.tag
        ? (typeof payload.tag === "string"
            ? hexToUint8Array(payload.tag)
            : new Uint8Array(payload.tag))
        : new Uint8Array();

    const encryptedData = tag.length > 0
        ? new Uint8Array([...content, ...tag])
        : content;

    const decrypted = await crypto.subtle.decrypt(
        {
            name: algorithm,
            iv,
        },
        key,
        encryptedData
    );

    return JSON.parse(new TextDecoder().decode(decrypted));
}