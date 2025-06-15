import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Sitemap - Favicon Generator by CognifyTech",
  description: "Complete sitemap of our favicon generator website. Find all pages and resources easily.",
  robots: {
    index: true,
    follow: true,
  },
}

const sitePages = [
  {
    category: "Main Pages",
    pages: [
      { name: "Home", href: "/", description: "Main landing page with favicon generator overview" },
      {
        name: "Favicon Generator Tool",
        href: "/tool",
        description: "Professional favicon generator with multiple formats",
      },
      { name: "About Us", href: "/about", description: "Learn about CognifyTech and our mission" },
      { name: "Contact Us", href: "/contact", description: "Get in touch with our team" },
    ],
  },
  {
    category: "Legal & Information",
    pages: [
      { name: "Privacy Policy", href: "/privacy-policy", description: "How we handle your data and privacy" },
      {
        name: "Terms of Service",
        href: "/terms-of-service",
        description: "Terms and conditions for using our service",
      },
      { name: "Disclaimer", href: "/disclaimer", description: "Important disclaimers and limitations" },
    ],
  },
  {
    category: "Tools & Features",
    pages: [
      { name: "ICO Generator", href: "/tool?format=ico", description: "Generate ICO format favicons" },
      { name: "PNG Generator", href: "/tool?format=png", description: "Generate PNG format favicons" },
      { name: "SVG Generator", href: "/tool?format=svg", description: "Generate SVG format favicons" },
    ],
  },
]

export default function SitemapPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Website Sitemap</h1>
          <p className="text-muted-foreground text-lg">
            Complete overview of all pages and resources on {siteConfig.name}
          </p>
        </div>

        <div className="grid gap-6">
          {sitePages.map((section) => (
            <Card key={section.category}>
              <CardHeader>
                <CardTitle className="text-xl">{section.category}</CardTitle>
                <CardDescription>
                  {section.category === "Main Pages" && "Core pages and primary functionality"}
                  {section.category === "Legal & Information" && "Legal documents and policies"}
                  {section.category === "Tools & Features" && "Specific tools and generator features"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {section.pages.map((page) => (
                    <div
                      key={page.href}
                      className="flex items-start justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <Link href={page.href} className="font-medium text-primary hover:underline">
                          {page.name}
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1">{page.description}</p>
                      </div>
                      <Link href={page.href} className="text-sm text-primary hover:underline ml-4">
                        Visit →
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-6 bg-muted/50 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">XML Sitemap</h2>
          <p className="text-muted-foreground mb-4">
            For search engines, our XML sitemap is automatically generated and available at:
          </p>
          <Link href="/sitemap.xml" className="text-primary hover:underline font-mono text-sm">
            {siteConfig.url}/sitemap.xml
          </Link>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}
