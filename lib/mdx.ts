export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  readTime: string
  tags: string[]
  content?: string
}

// Mock blog posts data since we removed the blog section
const mockPosts: BlogPost[] = [
  {
    slug: "favicon-seo-google-search-console",
    title: "How to Optimize Favicons for SEO and Google Search Console",
    description:
      "Learn how to create SEO-friendly favicons that improve your website's search engine visibility and Google Search Console performance.",
    date: "2024-01-15",
    author: "CognifyTech Team",
    readTime: "8 min read",
    tags: ["SEO", "Favicon", "Google Search Console", "Web Development"],
  },
]

export async function getAllPosts(): Promise<BlogPost[]> {
  // Return empty array since blog is removed, but keep function for compatibility
  return []
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = mockPosts.find((post) => post.slug === slug)
  return post || null
}

export async function getPostSlugs(): Promise<string[]> {
  return mockPosts.map((post) => post.slug)
}
