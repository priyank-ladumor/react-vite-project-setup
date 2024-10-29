import { useState, useEffect, useCallback } from "react";

const secretKey = "ca8047e16hthUGuf";

// Encrypt data function
async function encryptData(data) {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);

  const key = await window.crypto.subtle.importKey(
    "raw",
    encoder.encode(secretKey),
    { name: "AES-GCM" },
    false,
    ["encrypt"],
  );

  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encryptedBuffer = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    dataBuffer,
  );

  return {
    iv: Array.from(iv),
    data: Array.from(new Uint8Array(encryptedBuffer)),
  };
}

// Decrypt data function
async function decryptData(encrypted) {
  const encoder = new TextEncoder();
  const key = await window.crypto.subtle.importKey(
    "raw",
    encoder.encode(secretKey),
    { name: "AES-GCM" },
    false,
    ["decrypt"],
  );

  const iv = new Uint8Array(encrypted.iv);
  const encryptedData = new Uint8Array(encrypted.data);

  const decryptedBuffer = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    encryptedData,
  );

  const decoder = new TextDecoder();
  const decrypted = decoder.decode(decryptedBuffer);
  return decrypted;
}

function useControlledLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue);

  const loadStoredValue = useCallback(async () => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const encrypted = JSON.parse(item);
        const decrypted = await decryptData(encrypted);
        setStoredValue(JSON.parse(decrypted));
      } else {
        setStoredValue(initialValue);
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      setStoredValue(initialValue);
    }
  }, [key, initialValue]);

  useEffect(() => {
    loadStoredValue();
  }, [loadStoredValue]);

  const setValue = async (value) => {
    try {
      const newValue = typeof value === "function" ? value(storedValue) : value;
      setStoredValue(newValue);

      const encrypted = await encryptData(JSON.stringify(newValue));
      window.localStorage.setItem(key, JSON.stringify(encrypted));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  };

  return [storedValue, setValue];
}

export default useControlledLocalStorage;
