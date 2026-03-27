import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactInput = z.infer<typeof contactSchema>;

// Simulated mutation hook since this is a static SPA without a real backend
export function useSubmitContact() {
  return useMutation({
    mutationFn: async (data: ContactInput) => {
      // Simulate network latency
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simulate successful submission
      console.log("Contact form submitted:", data);
      return { success: true, message: "Message sent successfully!" };
    },
  });
}
