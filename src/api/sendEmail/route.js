import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { nome, email, mensagem } = await req.json();

    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "ge-be@live.com",
      subject: `Nova mensagem de ${nome}`,
      html: `
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong> ${mensagem}</p>
      `,
    });

    return Response.json({ success: true, response });
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
}
