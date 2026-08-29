export type InquiryStatus =
  | "new"
  | "contacted"
  | "in_discussion"
  | "approved"
  | "in_progress"
  | "completed"
  | "rejected";

export interface UserProfile {
  _id?: string;
  uid: string;
  name: string;
  email: string;
  phone?: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

export interface Inquiry {
  _id?: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  projectType: string;
  budget: string;
  description: string;
  preferredContact: string;
  additionalRequirements?: string;
  status: InquiryStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  _id?: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  technologies: string[];
  images: string[];
  challenge: string;
  strategy: string;
  solution: string;
  result: string;
  projectUrl?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  _id?: string;
  title: string;
  description: string;
  features: string[];
  image?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FAQ {
  _id?: string;
  question: string;
  answer: string;
  category: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface DashboardStats {
  totalInquiries: number;
  newInquiries: number;
  pendingInquiries: number;
  inProgressProjects: number;
  completedProjects: number;
  registeredUsers: number;
}
