import { object, string } from 'zod';

export const ContactFormSchema = object({
  email: string().email(),
  inviteToken: string().optional(),
  captchaToken: string().optional(),
});
