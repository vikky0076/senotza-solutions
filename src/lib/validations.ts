import { z } from "zod";

export const inquirySchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone number is required"),
  company: z.string().optional().default(""),
  service: z.string().min(1, "Please select a service"),
  projectType: z.string().optional().default(""),
  budget: z.string().min(1, "Please select a budget range"),
  description: z.string().min(10, "Please describe your project (at least 10 characters)"),
  preferredContact: z.string().optional().default("email"),
  additionalRequirements: z.string().optional().default(""),
});

export const registerSchema = z
  .object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const projectSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(10, "Description is required"),
  technologies: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
  challenge: z.string().default(""),
  strategy: z.string().default(""),
  solution: z.string().default(""),
  result: z.string().default(""),
  projectUrl: z.string().optional().default(""),
  published: z.boolean().default(false),
});

export const serviceSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(10, "Description is required"),
  features: z.array(z.string()).default([]),
  image: z.string().optional().default(""),
  published: z.boolean().default(false),
});

export const faqSchema = z.object({
  question: z.string().min(5, "Question is required"),
  answer: z.string().min(10, "Answer is required"),
  category: z.string().default("general"),
  published: z.boolean().default(false),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
export type ServiceFormData = z.infer<typeof serviceSchema>;
export type FAQFormData = z.infer<typeof faqSchema>;
