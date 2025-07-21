import { z } from "zod";

export const feedbackSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(5, "Feedback must be at least 5 characters"),
});
