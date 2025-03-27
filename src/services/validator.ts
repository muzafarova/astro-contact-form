import { z } from 'zod';

const Schema = z.object({
  firstName: z.string().trim().min(1, { message: "First name can't be empty" }),
  lastName: z.string().trim().min(1, { message: "Last name can't be empty" }),
  email: z.string().email({ message: 'Invalid email address' }),
  message: z.string().trim().min(1, { message: "Message can't be empty" }),
});

export function safeParse(data: unknown) {
  return Schema.safeParse(data);
}
