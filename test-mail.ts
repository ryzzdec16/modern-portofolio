import sendEmail from "./lib/mailer";

(async () => {
  try {
    await sendEmail(
      "ryzzdec18@gmail.com",
      "Tes Gmail SMTP",
      "Halo bro, ini test email dari Node.js 💌"
    );
  } catch (err) {
    console.error("❌ Error kirim email:", err);
  }
})();
