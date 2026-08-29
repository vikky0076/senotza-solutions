import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://senotza.com";

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/projects",
    "/process",
    "/pricing",
    "/faq",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // In a real production scenario, we would fetch dynamic projects from MongoDB here.
  // For the sitemap generation, we'll include the known static ones built in Phase 2.
  const caseStudies = [
    "senotza-v1",
    "portfolio-design-system",
    "business-web-app",
    "ecommerce-platform",
    "saas-dashboard",
    "mobile-app-ui",
  ].map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...caseStudies];
}
