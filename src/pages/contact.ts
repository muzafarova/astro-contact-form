import type { APIRoute } from 'astro';
import { z } from 'zod';
import nodemailer from 'nodemailer';

export const prerender = false;

const { SENDER_NAME, SENDER_USERNAME, SENDER_PASSWORD } = import.meta.env;

export const GET: APIRoute = async () => {
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/',
    },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());

  // Validate the data
  const Schema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    message: z.string(),
  });
  const result = Schema.safeParse(data);

  if (!result.success) {
    return new Response(
      JSON.stringify({
        message: 'Missing required fields',
        details: result.error?.issues,
      }),
      { status: 400 }
    );
  }

  if (SENDER_NAME && SENDER_USERNAME && SENDER_PASSWORD) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: SENDER_USERNAME,
        pass: SENDER_PASSWORD,
      },
    });

    const { firstName, lastName, email, message } = result.data;

    // Send confirmation email
    const info = await transporter.sendMail({
      from: `"${SENDER_NAME} 👻" <${SENDER_USERNAME}>`,
      to: email,
      subject: `We received your contact details, ${firstName} ✔`,
      text: `Name: ${firstName} ${lastName}\r\n\r\nEmail: ${email}\r\n\r\nMessage: ${message}`,
      html: `<p>Name:<br> ${firstName} ${lastName}</p><p>Email:<br> ${email}</p><p>Message:<br> ${message}</p>`,
    });

    console.log('Message sent: %s', info.messageId);
  }

  // Redirect to the final page
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/thank-you',
    },
  });
};
