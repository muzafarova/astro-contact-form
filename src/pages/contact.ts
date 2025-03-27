import type { APIRoute } from 'astro';
import { z } from 'zod';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
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

  // TODO process the data

  // Redirect to the final page
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/thank-you',
    },
  });
};
