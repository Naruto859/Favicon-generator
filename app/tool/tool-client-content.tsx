"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageIcon, Type } from "lucide-react"
import ProfessionalFaviconGenerator from "@/components/professional-favicon-generator"
import TextToFaviconGenerator from "@/components/text-to-favicon-generator"
import AdSensePlaceholder from "@/components/adsense-placeholder"

export default function ToolPageClient() {
  const [activeTab, setActiveTab] = useState("image-upload")

  useEffect(() => {
    // Check for hash in URL or URL parameters to determine which tab to show
    const hash = window.location.hash
    const urlParams = new URLSearchParams(window.location.search)
    const tabParam = urlParams.get("tab")

    if (hash === "#text-to-favicon" || tabParam === "text-to-favicon") {
      setActiveTab("text-to-favicon")
    }

    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash
      if (newHash === "#text-to-favicon") {
        setActiveTab("text-to-favicon")
      } else if (!newHash) {
        // Check URL params again if no hash
        const params = new URLSearchParams(window.location.search)
        const tab = params.get("tab")
        if (tab === "text-to-favicon") {
          setActiveTab("text-to-favicon")
        } else {
          setActiveTab("image-upload")
        }
      }
    }

    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    // Update URL hash without page reload
    if (value === "text-to-favicon") {
      window.history.pushState(null, "", "/tool#text-to-favicon")
    } else {
      window.history.pushState(null, "", "/tool")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center mb-8">
        <h1 className="font-heading text-4xl font-bold mb-4">Professional Favicon Generator</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Create perfect favicons for your website using our professional tools. Choose between image upload or
          text-based generation.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="image-upload" className="flex items-center">
            <ImageIcon className="w-4 h-4 mr-2" />
            Image Upload
          </TabsTrigger>
          <TabsTrigger value="text-to-favicon" className="flex items-center">
            <Type className="w-4 h-4 mr-2" />
            Text to Favicon
          </TabsTrigger>
        </TabsList>

        <TabsContent value="image-upload" className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ImageIcon className="w-6 h-6 mr-2 text-primary" />
                Image to Favicon Generator
              </CardTitle>
              <CardDescription>
                Upload your logo or image and convert it to all required favicon formats with professional optimization.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfessionalFaviconGenerator />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="text-to-favicon" className="mt-8">
          <TextToFaviconGenerator />
        </TabsContent>
      </Tabs>

      <div className="mt-12">
        <AdSensePlaceholder type="below-tool" className="mx-auto" />
      </div>
    </div>
  )
}
