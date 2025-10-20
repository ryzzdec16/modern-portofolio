import sendEmail from "@/lib/mailer";

export async function POST(req: Request) {
  const { email, message } = await req.json();

  await sendEmail(email, "Your request update", message);

  return Response.json({ success: true });
}
