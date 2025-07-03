import { z } from 'zod';

export const resetPasswordSchema = z.object({
   email: z.string().email('Valid email required'),
   otp: z.string().min(4, 'OTP is required'),
   password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .regex(/[A-Z]/, 'Must include an uppercase letter')
      .regex(/[0-9]/, 'Must include a number')
      .regex(/[^a-zA-Z0-9]/, 'Must include a special character'),
});
