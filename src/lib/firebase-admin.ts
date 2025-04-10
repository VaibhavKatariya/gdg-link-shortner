import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKeyBase64 = process.env.FIREBASE_PRIVATE_KEY;

if (!projectId || !clientEmail || !privateKeyBase64) {
  throw new Error("Missing Firebase credentials in environment variables");
}

const privateKey = Buffer.from(privateKeyBase64, "base64").toString().replace(/\\n/g, "\n");

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

export const adminDb = getFirestore();
