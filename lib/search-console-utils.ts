// Google Search Console integration utilities

export interface SearchConsoleVerification {
  type: "meta" | "html" | "dns" | "googleanalytics"
  value: string
}

export function generateSearchConsoleVerificationCode(verification: SearchConsoleVerification): string {
  switch (verification.type) {
    case "meta":
      return `<meta name="google-site-verification" content="${verification.value}" />`
    case "html":
      return `<!-- Place this HTML file named ${verification.value} in your website root directory -->\n<html>\n  <head>\n    <meta name="google-site-verification" content="${verification.value}" />\n  </head>\n  <body>google-site-verification: ${verification.value}</body>\n</html>`
    case "dns":
      return `Add this TXT record to your domain's DNS settings:\nName: @ or your domain\nType: TXT\nValue: google-site-verification=${verification.value}`
    case "googleanalytics":
      return `Link your Google Analytics account with Google Search Console using the same email address.`
    default:
      return ""
  }
}

export function generateStructuredData(
  websiteName: string,
  websiteUrl: string,
  logoUrl: string,
  description: string,
): string {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: websiteName,
    url: websiteUrl,
    description: description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${websiteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    logo: logoUrl,
  }

  return JSON.stringify(structuredData, null, 2)
}

export function generateSitemapEntry(url: string, lastMod: string, changeFreq: string, priority: string): string {
  return `<url>
  <loc>${url}</loc>
  <lastmod>${lastMod}</lastmod>
  <changefreq>${changeFreq}</changefreq>
  <priority>${priority}</priority>
</url>`
}

export function generateRobotsTxtEntry(sitemapUrl: string): string {
  return `# Allow all web crawlers
User-agent: *
Allow: /

# Sitemap location
Sitemap: ${sitemapUrl}`
}

export function generateCanonicalUrl(baseUrl: string, path: string): string {
  return `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`
}
