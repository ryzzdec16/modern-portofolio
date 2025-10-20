import * as path from "path";
import * as fs from "fs";
import * as dotenv from "dotenv";
import * as nodemailer from "nodemailer";

// 🔍 Cari file env dari project root (bukan dari dist)
const envLocal = path.resolve(process.cwd(), ".env.local");
const envDefault = path.resolve(process.cwd(), ".env");

const envPath = fs.existsSync(envLocal) ? envLocal : envDefault;
dotenv.config({ path: envPath });

console.log("✅ ENV loaded from:", envPath);
console.log("SMTP Host:", process.env.SMTP_HOST);


const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // TLS diaktifkan otomatis di port 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
    });

    console.log("✅ Email sent:", info.response);
  } catch (err) {
    console.error("❌ Gagal kirim email:", err);
  }
};

export default sendEmail;
