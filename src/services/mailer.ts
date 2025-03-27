import nodemailer from 'nodemailer';
const { SENDER_NAME, SENDER_USERNAME, SENDER_PASSWORD } = import.meta.env;

export async function sendConfirmationByEmail({
  firstName,
  lastName,
  email,
  message,
}: {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}) {
  if (!(SENDER_NAME || SENDER_USERNAME || SENDER_PASSWORD)) {
    return;
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: SENDER_USERNAME,
      pass: SENDER_PASSWORD,
    },
  });

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
