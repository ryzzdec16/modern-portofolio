import sendEmail from "./lib/mailer";

(async () => {
  try {
    await sendEmail("ryzzdec18@gmail.com", "Tes SMTP", "Halo bro");
  } catch (err) {
    console.error("❌ Error kirim email:", err);
  }
})();
