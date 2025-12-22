import { NextResponse } from "next/server";

type Payload = {
  name?: string;
  email?: string;
  message?: string;
  website?: string; // honeypot
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    // honeypot: se bot preencher, finge ok e não envia
    if (body.website && body.website.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    const cleanName = (body.name ?? "").trim();
    const cleanEmail = (body.email ?? "").trim();
    const cleanMessage = (body.message ?? "").trim();

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return NextResponse.json(
        { ok: false, error: "Campos obrigatórios ausentes." },
        { status: 400 }
      );
    }

    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      return NextResponse.json(
        { ok: false, error: "Env vars do EmailJS não configuradas." },
        { status: 500 }
      );
    }

    const time = new Date().toLocaleString("pt-BR");

    const privateKey = process.env.EMAILJS_PRIVATE_KEY;

const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    accessToken: privateKey, // ✅ Private Key (server-side)
    template_params: {
      from_name: cleanName,
      reply_to: cleanEmail,
      message: cleanMessage,
      time,
    },
  }),
});



    if (!res.ok) {
      const details = await res.text().catch(() => "");
      console.error("EmailJS API error:", res.status, details);
      return NextResponse.json(
        { ok: false, error: "EmailJS falhou.", details },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("API /contact error:", err);
    return NextResponse.json(
      { ok: false, error: "Erro inesperado." },
      { status: 500 }
    );
  }
}
