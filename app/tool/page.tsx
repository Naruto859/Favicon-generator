import type { Metadata } from "next"
import ToolPageClient from "./tool-client-content"

export const metadata: Metadata = {
  title: "Professional Favicon Generator | Create Perfect Website Icons",
  description:
    "Create perfect favicons for your website with our free professional favicon generator. Generate all required sizes and formats with SEO-optimized code and Google Search Console integration.",
  keywords: [
    "favicon generator",
    "website icon maker",
    "favicon creator",
    "ico generator",
    "google search console favicon",
    "SEO favicon",
  ],
  openGraph: {
    title: "Professional Favicon Generator | Create Perfect Website Icons",
    description:
      "Create perfect favicons for your website with our free professional favicon generator. Generate all required sizes and formats with SEO-optimized code.",
    url: "https://cognifytech.in/tool",
    type: "website",
    images: [
      {
        url: "/og-image-tool.png",
        width: 1200,
        height: 630,
        alt: "Professional Favicon Generator by CognifyTech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Favicon Generator | Create Perfect Website Icons",
    description:
      "Create perfect favicons for your website with our free professional favicon generator. Generate all required sizes and formats with SEO-optimized code.",
    images: ["/twitter-image-tool.png"],
  },
}

export default function ToolPage() {
  return <ToolPageClient />
}
