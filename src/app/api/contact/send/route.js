import { Resend } from "resend";
import EmailTemplate from "@/components/EmailTemplate";
const resend = new Resend(process.env.APP_RESEND_API_KEY);

const rateLimitMap = new Map();

function rateLimit(ip) {
  const now = Date.now();
  const windowMs = 60000; // 1 minute
  const maxRequests = 3;
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);

    const requests = rateLimitMap
      .get(ip)
      .filter((time) => now - time < windowMs);

    if (requests.length >= maxRequests) {
      return false;
    }
    rateLimitMap.set(ip, [...requests, now]);
    return true;
  }
}

export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    // Check rate limit
    if (!rateLimit(ip)) {
      return Response.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, message } = body;
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["lowlifeix@gmail.com"],
      subject: `New Contact from ${name}`,
      react: EmailTemplate({ firstName: name, email: email, message: message }),
    });
    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response("Failed to send email", { status: 500 });
  }
}
