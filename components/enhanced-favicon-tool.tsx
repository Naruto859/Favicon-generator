"use client"

import type React from "react"

import { useState, useCallback, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  UploadCloud,
  Settings,
  Download,
  Eye,
  Copy,
  Check,
  Smartphone,
  Monitor,
  Bookmark,
  Search,
  Zap,
  FileImage,
  Package,
  Image as ImageIcon, // Renamed to avoid conflict
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  FAVICON_SIZES,
  generateFavicons,
  generateHTMLCode,
  generateManifest,
  loadImageFromFile,
  resizeImage,
  createZipFile,
  type ProcessingOptions,
  type FaviconResult,
} from "@/lib/favicon-utils"

export default function EnhancedFaviconTool() {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Core state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [sourceCanvas, setSourceCanvas] = useState<HTMLCanvasElement | null>(null)
  const [originalPreviewUrl, setOriginalPreviewUrl] = useState<string | null>(null)
  const [processedPreviewUrl, setProcessedPreviewUrl] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)

  // Generated results
  const [faviconResults, setFaviconResults] = useState<FaviconResult[]>([])
  const [manifestContent, setManifestContent] = useState<string>("")
  const [htmlCode, setHtmlCode] = useState<string>("")

  // Configuration state
  const [selectedSizes, setSelectedSizes] = useState<number[]>([16, 32, 48, 180, 192, 512])
  // Updated ProcessingOptions state to match the new interface
  const [processingOptions, setProcessingOptions] = useState<ProcessingOptions>({
    backgroundColor: "#FFFFFF",
    borderColor: "#000000",
    hasBorder: false,
    borderWidth: 1,
    brightness: 100, // Default 100%
    contrast: 100,   // Default 100%
    saturation: 100, // Default 100%
    quality: 0.9,    // Default 90%
    format: "png",
  })

  // App configuration
  const [appName, setAppName] = useState("My Website")
  const [themeColor, setThemeColor] = useState("#3B82F6")

  // UI state
  const [activeTab, setActiveTab] = useState("upload")
  const [previewMode, setPreviewMode] = useState<"browser" | "mobile" | "bookmark" | "search">("browser")
  const [isDragging, setIsDragging] = useState(false)
  const [copied, setCopied] = useState(false)

  // Effect to update processed preview when options or source change
  useEffect(() => {
    if (sourceCanvas) {
      // Generate a preview (e.g., 64x64) with current options
      const previewCanvas = resizeImage(sourceCanvas, 64, processingOptions)
      setProcessedPreviewUrl(previewCanvas.toDataURL())
    } else {
      setProcessedPreviewUrl(null)
    }
  }, [sourceCanvas, processingOptions])

  const handleFileUpload = useCallback(
    async (file: File) => {
      if (!file) return

      // Validate file
      if (file.size > 10 * 1024 * 1024) {
        toast({ title: "File too large", description: "Please upload an image smaller than 10MB.", variant: "destructive" })
        return
      }
      if (!file.type.startsWith("image/")) {
        toast({ title: "Invalid file type", description: "Please upload an image file.", variant: "destructive" })
        return
      }

      setUploadedFile(file)
      setIsProcessing(true)
      setProcessingProgress(20)

      try {
        const canvas = await loadImageFromFile(file)
        setSourceCanvas(canvas)
        setOriginalPreviewUrl(canvas.toDataURL())
        setProcessingProgress(100)
        setActiveTab("customize")
        toast({ title: "Image uploaded successfully!", description: "You can now customize your favicon settings." })
      } catch (error) {
        toast({ title: "Upload failed", description: "Failed to process the uploaded image.", variant: "destructive" })
      } finally {
        setIsProcessing(false)
        setProcessingProgress(0)
      }
    },
    [toast],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        handleFileUpload(files[0])
      }
    },
    [handleFileUpload],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleSizeToggle = (size: number, checked: boolean) => {
    if (checked) {
      setSelectedSizes((prev) => [...prev, size].sort((a, b) => a - b))
    } else {
      setSelectedSizes((prev) => prev.filter((s) => s !== size))
    }
  }

  const handleGenerate = async () => {
    if (!sourceCanvas) {
      toast({ title: "No image uploaded", description: "Please upload an image first.", variant: "destructive" })
      return
    }
    if (selectedSizes.length === 0) {
      toast({ title: "No sizes selected", description: "Please select at least one favicon size.", variant: "destructive" })
      return
    }

    setIsProcessing(true)
    setProcessingProgress(0)

    try {
      setProcessingProgress(30)
      const results = await generateFavicons(sourceCanvas, selectedSizes, processingOptions)
      setFaviconResults(results)

      setProcessingProgress(60)
      const html = generateHTMLCode(appName)
      setHtmlCode(html)

      setProcessingProgress(80)
      const manifest = generateManifest(appName, themeColor, processingOptions.backgroundColor || "#FFFFFF")
      setManifestContent(JSON.stringify(manifest, null, 2))

      setProcessingProgress(100)
      setActiveTab("download")
      toast({ title: "Favicons generated successfully!", description: `Generated ${results.length} favicon files.` })
    } catch (error) {
      toast({ title: "Generation failed", description: "Failed to generate favicons. Please try again.", variant: "destructive" })
    } finally {
      setIsProcessing(false)
      setProcessingProgress(0)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast({ title: "Copied to clipboard!" })
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast({ title: "Copy failed", description: "Failed to copy to clipboard.", variant: "destructive" })
    }
  }

  const downloadFile = (url: string, filename: string) => {
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    if (url.startsWith("blob:")) {
      URL.revokeObjectURL(url)
    }
  }

  const handleDownloadZip = async () => {
    if (faviconResults.length === 0) {
      toast({ title: "No files generated", description: "Generate favicons first.", variant: "destructive" })
      return
    }
    setIsProcessing(true)
    try {
      const zipBlob = await createZipFile(faviconResults, manifestContent, htmlCode)
      downloadFile(URL.createObjectURL(zipBlob), "favicons.zip")
      toast({ title: "ZIP file downloaded successfully!" })
    } catch (error) {
      console.error("ZIP creation failed:", error)
      toast({ title: "ZIP Download Failed", description: "Could not create the ZIP file.", variant: "destructive" })
    } finally {
      setIsProcessing(false)
    }
  }

  // Reset adjustments to default values
  const resetAdjustments = () => {
    setProcessingOptions((prev) => ({
      ...prev,
      brightness: 100,
      contrast: 100,
      saturation: 100,
    }))
  }

  const displayPreviewUrl = processedPreviewUrl || originalPreviewUrl

  const PreviewPanel = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Eye className="w-5 h-5 mr-2" />
          Live Output Preview
        </CardTitle>
        <div className="flex gap-2 flex-wrap">
          {[
            { mode: "browser" as const, icon: Monitor, label: "Browser" },
            { mode: "mobile" as const, icon: Smartphone, label: "Mobile" },
            { mode: "bookmark" as const, icon: Bookmark, label: "Bookmark" },
            { mode: "search" as const, icon: Search, label: "Search" },
          ].map(({ mode, icon: Icon, label }) => (
            <Button
              key={mode}
              variant={previewMode === mode ? "default" : "outline"}
              size="sm"
              onClick={() => setPreviewMode(mode)}
            >
              <Icon className="w-4 h-4 mr-1" />
              {label}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {displayPreviewUrl ? (
          <div className="space-y-4">
            {previewMode === "browser" && (
              <div className="bg-muted/20 p-3 rounded-lg border">
                <div className="flex items-center space-x-1.5 bg-background p-2 rounded-t-md shadow-sm">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="bg-background p-3 flex items-center border-t-0 border rounded-b-md">
                  <img src={displayPreviewUrl} alt="Favicon Preview" className="w-4 h-4 mr-2" />
                  <span className="text-sm truncate font-medium">{appName}</span>
                  <span className="ml-auto text-xs text-muted-foreground">example.com</span>
                </div>
              </div>
            )}
            {previewMode === "mobile" && (
              <div className="bg-muted/20 p-4 rounded-lg border max-w-xs mx-auto">
                <div className="bg-background rounded-lg p-3 shadow-sm">
                  <img src={displayPreviewUrl} alt="Mobile Icon" className="w-12 h-12 rounded-lg mx-auto mb-2" />
                  <p className="text-xs text-center font-medium truncate">{appName}</p>
                </div>
              </div>
            )}
            {previewMode === "bookmark" && (
              <div className="bg-muted/20 p-3 rounded-lg border">
                <div className="flex items-center space-x-3 bg-background p-2 rounded">
                  <img src={displayPreviewUrl} alt="Bookmark Icon" className="w-4 h-4" />
                  <span className="text-sm font-medium">{appName}</span>
                </div>
              </div>
            )}
            {previewMode === "search" && (
              <div className="bg-muted/20 p-3 rounded-lg border">
                <div className="bg-background p-3 rounded">
                  <div className="flex items-start space-x-3">
                    <img src={displayPreviewUrl} alt="Search Result Icon" className="w-4 h-4 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-blue-600">{appName}</h3>
                      <p className="text-xs text-green-600">https://example.com</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Your website description would appear here in search results.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">Upload an image to see preview</div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="customize" disabled={!sourceCanvas}>Customize</TabsTrigger>
          <TabsTrigger value="generate" disabled={!sourceCanvas}>Generate</TabsTrigger>
          <TabsTrigger value="download" disabled={faviconResults.length === 0}>Download</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UploadCloud className="w-6 h-6 mr-2 text-primary" /> Upload Your Image
              </CardTitle>
              <CardDescription>
                Upload a high-quality square image. Supports PNG, JPG, SVG, and WebP formats up to 10MB.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragging ? "border-primary bg-primary/10" : "border-muted-foreground/25 hover:border-primary/50"
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <UploadCloud className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">
                  {isDragging ? "Drop your image here" : "Drag & drop your image"}
                </p>
                <p className="text-muted-foreground mb-4">or</p>
                <Button onClick={() => fileInputRef.current?.click()}>Select File</Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                />
              </div>
              {isProcessing && (
                <div className="mt-4">
                  <Progress value={processingProgress} className="w-full" />
                  <p className="text-sm text-muted-foreground mt-2 text-center">
                    Processing image... {processingProgress}%
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customize" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              {/* Basic Processing Options Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2" /> Basic Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Background Color</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Input type="color" value={processingOptions.backgroundColor} onChange={(e) => setProcessingOptions((prev) => ({ ...prev, backgroundColor: e.target.value }))} className="w-12 h-10 p-1" />
                      <Input type="text" value={processingOptions.backgroundColor} onChange={(e) => setProcessingOptions((prev) => ({ ...prev, backgroundColor: e.target.value }))} placeholder="#FFFFFF" className="flex-1" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Add Border</Label>
                    <Checkbox checked={processingOptions.hasBorder} onCheckedChange={(checked) => setProcessingOptions((prev) => ({ ...prev, hasBorder: Boolean(checked) }))} />
                  </div>
                  {processingOptions.hasBorder && (
                    <div className="space-y-3 pl-4 border-l-2">
                      <div>
                        <Label>Border Color</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Input type="color" value={processingOptions.borderColor} onChange={(e) => setProcessingOptions((prev) => ({ ...prev, borderColor: e.target.value }))} className="w-12 h-10 p-1" />
                          <Input type="text" value={processingOptions.borderColor} onChange={(e) => setProcessingOptions((prev) => ({ ...prev, borderColor: e.target.value }))} className="flex-1" />
                        </div>
                      </div>
                      <div>
                        <Label>Border Width: {processingOptions.borderWidth}px</Label>
                        <Slider value={[processingOptions.borderWidth || 1]} onValueChange={([value]) => setProcessingOptions((prev) => ({ ...prev, borderWidth: value }))} max={10} min={1} step={1} className="mt-2" />
                      </div>
                    </div>
                  )}
                  <div>
                    <Label>Output Format</Label>
                    <Select value={processingOptions.format} onValueChange={(value: any) => setProcessingOptions((prev) => ({ ...prev, format: value }))}>
                      <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="png">PNG (Recommended)</SelectItem>
                        <SelectItem value="webp">WebP (Smaller size)</SelectItem>
                        <SelectItem value="ico">ICO (Legacy)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Quality (JPEG/WebP): {Math.round((processingOptions.quality || 0.9) * 100)}%</Label>
                    <Slider value={[(processingOptions.quality || 0.9) * 100]} onValueChange={([value]) => setProcessingOptions((prev) => ({ ...prev, quality: value / 100 }))} max={100} min={10} step={5} className="mt-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Image Adjustments Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <ImageIcon className="w-5 h-5 mr-2" /> Image Adjustments
                    </div>
                    <Button variant="outline" size="sm" onClick={resetAdjustments}>Reset Adjustments</Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Brightness: {processingOptions.brightness}%</Label>
                    <Slider
                      value={[processingOptions.brightness || 100]}
                      onValueChange={([value]) => setProcessingOptions((prev) => ({ ...prev, brightness: value }))}
                      max={200} // 0% to 200%
                      min={0}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Contrast: {processingOptions.contrast}%</Label>
                    <Slider
                      value={[processingOptions.contrast || 100]}
                      onValueChange={([value]) => setProcessingOptions((prev) => ({ ...prev, contrast: value }))}
                      max={200} // 0% to 200%
                      min={0}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Saturation: {processingOptions.saturation}%</Label>
                    <Slider
                      value={[processingOptions.saturation || 100]}
                      onValueChange={([value]) => setProcessingOptions((prev) => ({ ...prev, saturation: value }))}
                      max={200} // 0% to 200%
                      min={0}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* App Configuration Card */}
              <Card>
                <CardHeader>
                  <CardTitle>App Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>App Name</Label>
                    <Input value={appName} onChange={(e) => setAppName(e.target.value)} placeholder="My Website" className="mt-1" />
                  </div>
                  <div>
                    <Label>Theme Color</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Input type="color" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} className="w-12 h-10 p-1" />
                      <Input type="text" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} className="flex-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <PreviewPanel />
          </div>
        </TabsContent>

        <TabsContent value="generate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2" /> Select Favicon Sizes
              </CardTitle>
              <CardDescription>
                Choose which favicon sizes to generate. Recommended sizes are pre-selected.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {FAVICON_SIZES.map((sizeInfo) => (
                  <div key={sizeInfo.size} className="flex items-center space-x-2">
                    <Checkbox id={`size-${sizeInfo.size}`} checked={selectedSizes.includes(sizeInfo.size)} onCheckedChange={(checked) => handleSizeToggle(sizeInfo.size, Boolean(checked))} />
                    <Label htmlFor={`size-${sizeInfo.size}`} className="flex items-center space-x-2">
                      <span>{sizeInfo.label}</span>
                      {sizeInfo.recommended && <Badge variant="secondary" className="text-xs">Recommended</Badge>}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t">
                <Button onClick={handleGenerate} disabled={isProcessing || selectedSizes.length === 0} className="w-full" size="lg">
                  {isProcessing ? (
                    <><Settings className="w-5 h-5 mr-2 animate-spin" /> Generating... {processingProgress}%</>
                  ) : (
                    <><Zap className="w-5 h-5 mr-2" /> Generate {selectedSizes.length} Favicon{selectedSizes.length !== 1 ? "s" : ""}</>
                  )}
                </Button>
                {isProcessing && <Progress value={processingProgress} className="w-full mt-3" />}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="download" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="w-5 h-5 mr-2" /> Generated Files
                </CardTitle>
                <CardDescription>
                  {faviconResults.length} files generated • Total size:{" "}
                  {(faviconResults.reduce((sum, result) => sum + result.bytes, 0) / 1024).toFixed(1)} KB
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {faviconResults.map((result, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileImage className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">{result.name}</p>
                          <p className="text-xs text-muted-foreground">{result.size} • {(result.bytes / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => downloadFile(result.url, result.name)}>
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" size="lg" onClick={handleDownloadZip} disabled={isProcessing || faviconResults.length === 0}>
                  <Package className="w-5 h-5 mr-2" />
                  {isProcessing ? "Zipping..." : "Download All as ZIP"}
                </Button>
              </CardContent>
            </Card>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    HTML Code
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(htmlCode)}>
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto">
                    <code>{htmlCode}</code>
                  </pre>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Web App Manifest
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(manifestContent)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto max-h-48">
                    <code>{manifestContent}</code>
                  </pre>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

