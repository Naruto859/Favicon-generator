import JSZip from "jszip"

// Core favicon generation utilities
export interface FaviconSize {
  size: number
  label: string
  type: "standard" | "apple" | "android" | "microsoft"
  recommended: boolean
}

export const FAVICON_SIZES: FaviconSize[] = [
  { size: 16, label: "16x16", type: "standard", recommended: true },
  { size: 32, label: "32x32", type: "standard", recommended: true },
  { size: 48, label: "48x48", type: "standard", recommended: true },
  { size: 64, label: "64x64", type: "standard", recommended: false },
  { size: 180, label: "Apple Touch Icon", type: "apple", recommended: true },
  { size: 192, label: "Android Chrome", type: "android", recommended: true },
  { size: 512, label: "Android Chrome Large", type: "android", recommended: true },
  { size: 144, label: "Microsoft Tile", type: "microsoft", recommended: false },
  { size: 270, label: "Microsoft Tile Wide", type: "microsoft", recommended: false },
]

export interface ProcessingOptions {
  backgroundColor?: string
  borderColor?: string
  hasBorder?: boolean
  borderWidth?: number
  // Removed filter string, replaced with specific adjustments
  brightness?: number // e.g., 100 for 100%
  contrast?: number   // e.g., 100 for 100%
  saturation?: number // e.g., 100 for 100%
  quality?: number    // e.g., 0.9 for 90%
  format?: "png" | "ico" | "svg" | "webp"
}

export interface FaviconResult {
  name: string
  url: string
  size: string
  type: "ico" | "png" | "svg" | "webp"
  bytes: number
}

// Canvas-based image processing
export function createCanvas(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  return canvas
}

// Helper to build the filter string from options
function buildFilterString(options: ProcessingOptions): string {
  const filters: string[] = []
  // Map slider values (e.g., 0-200) to CSS filter values (e.g., 0-2)
  if (options.brightness !== undefined && options.brightness !== 100) {
    filters.push(`brightness(${options.brightness / 100})`)
  }
  if (options.contrast !== undefined && options.contrast !== 100) {
    filters.push(`contrast(${options.contrast / 100})`)
  }
  if (options.saturation !== undefined && options.saturation !== 100) {
    filters.push(`saturate(${options.saturation / 100})`)
  }
  return filters.length > 0 ? filters.join(" ") : "none"
}

export function resizeImage(
  sourceCanvas: HTMLCanvasElement,
  targetSize: number,
  options: ProcessingOptions = {},
): HTMLCanvasElement {
  const canvas = createCanvas(targetSize, targetSize)
  const ctx = canvas.getContext("2d")!

  // Set background if specified
  if (options.backgroundColor && options.backgroundColor !== "transparent") {
    ctx.fillStyle = options.backgroundColor
    ctx.fillRect(0, 0, targetSize, targetSize)
  }

  // Apply filters *before* drawing the image to the target canvas
  const filterString = buildFilterString(options)
  if (filterString !== "none") {
    ctx.filter = filterString
  }

  // Apply smooth scaling
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = "high"

  // Draw the potentially filtered and resized image
  ctx.drawImage(sourceCanvas, 0, 0, targetSize, targetSize)

  // Reset filter after drawing
  ctx.filter = "none"

  // Apply border if specified (after drawing image)
  if (options.hasBorder && options.borderColor) {
    const borderWidth = options.borderWidth || 1
    ctx.strokeStyle = options.borderColor
    ctx.lineWidth = borderWidth
    ctx.strokeRect(borderWidth / 2, borderWidth / 2, targetSize - borderWidth, targetSize - borderWidth)
  }

  return canvas
}

// Removed getFilterCSS function as it's replaced by buildFilterString

export async function loadImageFromFile(file: File): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = () => {
      const canvas = createCanvas(img.width, img.height)
      const ctx = canvas.getContext("2d")!
      ctx.drawImage(img, 0, 0)
      resolve(canvas)
    }

    img.onerror = () => reject(new Error("Failed to load image"))
    img.src = URL.createObjectURL(file)
  })
}

export function canvasToBlob(canvas: HTMLCanvasElement, format: string, quality = 0.9): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new Error("Failed to create blob"))
      },
      `image/${format}`,
      quality,
    )
  })
}

export async function generateFavicons(
  sourceCanvas: HTMLCanvasElement,
  selectedSizes: number[],
  options: ProcessingOptions = {},
): Promise<FaviconResult[]> {
  const results: FaviconResult[] = []

  for (const size of selectedSizes) {
    // Ensure resizeImage uses the updated options with numeric adjustments
    const resizedCanvas = resizeImage(sourceCanvas, size, options)
    const format = options.format || "png"

    try {
      const blob = await canvasToBlob(resizedCanvas, format, options.quality)
      const url = URL.createObjectURL(blob)
      const sizeInfo = FAVICON_SIZES.find((s) => s.size === size)

      results.push({
        name: `favicon-${size}x${size}.${format}`,
        url,
        size: `${size}x${size}`,
        type: format as any,
        bytes: blob.size,
      })
    } catch (error) {
      console.error(`Failed to generate ${size}x${size} favicon:`, error)
    }
  }

  return results
}

export function generateManifest(appName: string, themeColor: string, backgroundColor: string) {
  return {
    name: appName,
    short_name: appName,
    description: `${appName} - Progressive Web App`,
    start_url: "/",
    display: "standalone",
    background_color: backgroundColor,
    theme_color: themeColor,
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}

export function generateHTMLCode(appName = "Your Website"): string {
  return `<!-- Standard favicon -->
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />

<!-- Apple Touch Icon -->
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />

<!-- Android/Chrome -->
<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
<link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />

<!-- Microsoft Tiles -->
<meta name="msapplication-TileImage" content="/mstile-144x144.png" />
<meta name="msapplication-TileColor" content="#ffffff" />

<!-- Web App Manifest -->
<link rel="manifest" href="/manifest.json" />

<!-- Theme colors -->
<meta name="theme-color" content="#ffffff" />
<meta name="msapplication-navbutton-color" content="#ffffff" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />`
}

export async function createZipFile(
  results: FaviconResult[],
  manifestContent?: string,
  htmlCode?: string,
): Promise<Blob> {
  const zip = new JSZip()

  // Add generated favicon files
  for (const result of results) {
    try {
      const response = await fetch(result.url)
      const blob = await response.blob()
      zip.file(result.name, blob)
    } catch (error) {
      console.error(`Failed to fetch and add ${result.name} to zip:`, error)
    }
  }

  // Add manifest.json
  if (manifestContent) {
    zip.file("manifest.json", manifestContent)
  }

  // Add html code snippet
  if (htmlCode) {
    zip.file("favicon_instructions.html", htmlCode)
  }

  // Generate the zip file
  const zipBlob = await zip.generateAsync({ type: "blob" })
  return zipBlob
}

