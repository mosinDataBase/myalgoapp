const TEXT_ENCODER = new TextEncoder();
const TEXT_DECODER = new TextDecoder();
const secret = "myalgo@123"; // You can use user-defined value too

// Derive key from password
async function getKey() {
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    TEXT_ENCODER.encode(secret),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: TEXT_ENCODER.encode("salt"),
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

// Encrypt text
export async function encryptText(plainText) {
  const key = await getKey();
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    TEXT_ENCODER.encode(plainText)
  );

  return {
    iv: Array.from(iv),
    data: Array.from(new Uint8Array(encrypted)),
  };
}

// Decrypt text
export async function decryptText({ iv, data }) {
  const key = await getKey();
  const decrypted = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv: new Uint8Array(iv) },
    key,
    new Uint8Array(data)
  );

  return TEXT_DECODER.decode(decrypted);
}
