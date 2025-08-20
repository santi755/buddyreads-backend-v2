import { z } from 'zod';

export const RegisterUserSchema = z.object({
  id: z.string().uuid('Invalid UUID format'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain uppercase, lowercase and number'
    ),
});

export type RegisterUserDTO = z.infer<typeof RegisterUserSchema>;
