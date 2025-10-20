import sendEmail from "@/lib/mailer"; // ✅ default import

export async function POST(req: Request) {
  const { email, message } = await req.json();

  await sendEmail(email, "Thanks for contacting us!", message);

  return Response.json({ success: true });
}
