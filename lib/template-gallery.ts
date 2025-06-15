// Template gallery for different industries and styles
export interface FaviconTemplate {
  id: string
  name: string
  category: string
  description: string
  previewUrl: string
  tags: string[]
  colors: string[]
  style: "minimalist" | "modern" | "classic" | "playful" | "professional"
  industry: string[]
}

export const FAVICON_TEMPLATES: FaviconTemplate[] = [
  {
    id: "tech-minimal",
    name: "Tech Minimal",
    category: "Technology",
    description: "Clean, minimal design perfect for tech startups and SaaS companies",
    previewUrl: "/templates/tech-minimal.svg",
    tags: ["minimal", "tech", "startup", "clean"],
    colors: ["#3B82F6", "#1E40AF", "#FFFFFF"],
    style: "minimalist",
    industry: ["Technology", "Software", "Startup"],
  },
  {
    id: "creative-gradient",
    name: "Creative Gradient",
    category: "Creative",
    description: "Vibrant gradient design for creative agencies and portfolios",
    previewUrl: "/templates/creative-gradient.svg",
    tags: ["gradient", "creative", "colorful", "modern"],
    colors: ["#8B5CF6", "#EC4899", "#F59E0B"],
    style: "modern",
    industry: ["Design", "Creative", "Marketing"],
  },
  {
    id: "business-professional",
    name: "Business Professional",
    category: "Business",
    description: "Professional design suitable for corporate and business websites",
    previewUrl: "/templates/business-professional.svg",
    tags: ["professional", "corporate", "business", "formal"],
    colors: ["#1F2937", "#374151", "#FFFFFF"],
    style: "professional",
    industry: ["Business", "Corporate", "Finance"],
  },
  {
    id: "ecommerce-modern",
    name: "E-commerce Modern",
    category: "E-commerce",
    description: "Modern shopping-focused design for online stores",
    previewUrl: "/templates/ecommerce-modern.svg",
    tags: ["ecommerce", "shopping", "modern", "retail"],
    colors: ["#10B981", "#059669", "#FFFFFF"],
    style: "modern",
    industry: ["E-commerce", "Retail", "Shopping"],
  },
  {
    id: "healthcare-trust",
    name: "Healthcare Trust",
    category: "Healthcare",
    description: "Trustworthy design for healthcare and medical websites",
    previewUrl: "/templates/healthcare-trust.svg",
    tags: ["healthcare", "medical", "trust", "professional"],
    colors: ["#3B82F6", "#1E40AF", "#FFFFFF"],
    style: "professional",
    industry: ["Healthcare", "Medical", "Wellness"],
  },
  {
    id: "education-friendly",
    name: "Education Friendly",
    category: "Education",
    description: "Friendly and approachable design for educational institutions",
    previewUrl: "/templates/education-friendly.svg",
    tags: ["education", "friendly", "learning", "academic"],
    colors: ["#F59E0B", "#D97706", "#FFFFFF"],
    style: "playful",
    industry: ["Education", "Learning", "Academic"],
  },
]

export function getTemplatesByCategory(category: string): FaviconTemplate[] {
  return FAVICON_TEMPLATES.filter((template) => template.category === category)
}

export function getTemplatesByIndustry(industry: string): FaviconTemplate[] {
  return FAVICON_TEMPLATES.filter((template) => template.industry.includes(industry))
}

export function searchTemplates(query: string): FaviconTemplate[] {
  const lowercaseQuery = query.toLowerCase()
  return FAVICON_TEMPLATES.filter(
    (template) =>
      template.name.toLowerCase().includes(lowercaseQuery) ||
      template.description.toLowerCase().includes(lowercaseQuery) ||
      template.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
      template.industry.some((ind) => ind.toLowerCase().includes(lowercaseQuery)),
  )
}

export async function generateTemplatePreview(template: FaviconTemplate): Promise<string> {
  // This would generate an SVG or canvas-based preview
  // For now, return a placeholder
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" fill="${template.colors[0]}" rx="8"/>
      <text x="32" y="40" text-anchor="middle" fill="${template.colors[2] || "#FFFFFF"}" font-family="Arial" font-size="24" font-weight="bold">
        ${template.name.charAt(0)}
      </text>
    </svg>
  `)}`
}
