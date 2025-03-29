import type { APIRoute } from 'astro';
import { safeParse } from '../services/validator';
import { sendConfirmationByEmail } from '../services/mailer';

export const prerender = false;

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
  const result = safeParse(data);
  if (!result.success) {
    return new Response(
      JSON.stringify({
        message: 'Missing required fields',
        details: result.error?.issues,
      }),
      { status: 400 }
    );
  }

  // Send confirmation email (fire and forget)
  sendConfirmationByEmail(result.data);

  return new Response(null, {
    status: 204,
  });
};
