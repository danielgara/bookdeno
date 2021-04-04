import { encodeToString, createHash } from "../deps.ts";

export const hashWithSalt = (text: string, salt: string) => {
  const hash = createHash("sha512")
    .update(`${text}${salt}`)
    .toString();

  return hash;
};

export const generateSalt = () => {
  const arr = new Uint8Array(64);
  crypto.getRandomValues(arr);

  return encodeToString(arr);
};