"use client"

import EnhancedFaviconTool from "@/components/enhanced-favicon-tool"
import AdSensePlaceholder from "@/components/adsense-placeholder"
import Breadcrumb from "@/components/breadcrumb"

// Ensuring this is the default export
export default function ToolPageClient() {
  return (
    <div className="space-y-8">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Favicon Generator Tool" }]} />

      <section className="text-center">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">Favicon Generator</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Create professional favicons for your website with our enhanced tool. Upload your image, customize settings,
          and generate all the favicon formats you need for modern websites.
        </p>
      </section>

      <EnhancedFaviconTool />

      <section className="mt-12">
        <AdSensePlaceholder type="below-tool" className="mx-auto" />
      </section>
    </div>
  )
}
