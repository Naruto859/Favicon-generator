// Enhanced favicon generation utilities with comprehensive format support
export interface FaviconSize {
  size: number
  label: string
  type: "standard" | "apple" | "android" | "microsoft" | "pwa"
  recommended: boolean
  description: string
}

export const COMPREHENSIVE_FAVICON_SIZES: FaviconSize[] = [
  { size: 16, label: "16x16", type: "standard", recommended: true, description: "Browser tab icon" },
  { size: 32, label: "32x32", type: "standard", recommended: true, description: "Browser bookmark icon" },
  { size: 48, label: "48x48", type: "standard", recommended: false, description: "Windows site icon" },
  { size: 64, label: "64x64", type: "standard", recommended: false, description: "High DPI browser icon" },
  { size: 96, label: "96x96", type: "standard", recommended: false, description: "Desktop shortcut icon" },
  { size: 128, label: "128x128", type: "standard", recommended: false, description: "Chrome Web Store icon" },
  { size: 180, label: "Apple Touch Icon", type: "apple", recommended: true, description: "iOS home screen icon" },
  { size: 192, label: "Android Chrome", type: "android", recommended: true, description: "Android home screen icon" },
  {
    size: 512,
    label: "Android Chrome Large",
    type: "android",
    recommended: true,
    description: "Android splash screen",
  },
  { size: 144, label: "Microsoft Tile", type: "microsoft", recommended: false, description: "Windows tile icon" },
  { size: 270, label: "Microsoft Tile Wide", type: "microsoft", recommended: false, description: "Windows wide tile" },
  {
    size: 558,
    label: "Microsoft Tile Large",
    type: "microsoft",
    recommended: false,
    description: "Windows large tile",
  },
]

// CropShapeParams now only expects 'rectangle' but keeps the structure for clarity
export type CropShapeParams = {
  shape: "rectangle"
  x: number
  y: number
  width: number
  height: number
  cornerRadius: number
}
// Circle shape is implicitly handled by rectangle with high cornerRadius

export interface AdvancedProcessingOptions {
  backgroundColor?: string
  borderColor?: string
  hasBorder?: boolean
  borderWidth?: number
  borderRadius?: number // For final output container/frame
  filter?: string
  brightness?: number
  contrast?: number
  saturation?: number
  quality?: number
  format?: "png" | "ico" | "svg" | "webp" | "jpeg"
  compression?: number
  cropShapeParams?: CropShapeParams // Defines the actual crop selection
  effects?: {
    shadow?: boolean
    shadowColor?: string
    shadowBlur?: number
    shadowOffset?: { x: number; y: number }
    glow?: boolean
    glowColor?: string
    glowIntensity?: number
  }
}

export interface FaviconResult {
  name: string
  url: string
  size: string
  type: "ico" | "png" | "svg" | "webp" | "jpeg"
  bytes: number
  optimized: boolean
  description: string
}

export interface GenerationProgress {
  current: number
  total: number
  stage: string
  percentage: number
}

export function createHighQualityCanvas(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas")
  // Use integer dimensions and avoid devicePixelRatio for intermediate canvases
  canvas.width = Math.max(1, Math.round(width))
  canvas.height = Math.max(1, Math.round(height))
  const ctx = canvas.getContext("2d")!
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = "high" // Keep high quality rendering
  return canvas
}

export function applyAdvancedEffects(canvas: HTMLCanvasElement, options: AdvancedProcessingOptions): HTMLCanvasElement {
  // Create a new canvas to avoid modifying the original
  const newCanvas = createHighQualityCanvas(canvas.width, canvas.height);
  const newCtx = newCanvas.getContext("2d")!;
  // Copy the original canvas content to the new one
  newCtx.drawImage(canvas, 0, 0);

  if (newCanvas.width === 0 || newCanvas.height === 0) return newCanvas;
  const imageData = newCtx.getImageData(0, 0, newCanvas.width, newCanvas.height);
  const data = imageData.data;

  if (options.brightness !== undefined || options.contrast !== undefined || options.saturation !== undefined) {
    for (let i = 0; i < data.length; i += 4) {
      let r = data[i],
        g = data[i + 1],
        b = data[i + 2];

      // Apply brightness
      if (options.brightness !== undefined) {
        const br = (options.brightness - 100) * 2.55;
        r = Math.max(0, Math.min(255, r + br));
        g = Math.max(0, Math.min(255, g + br));
        b = Math.max(0, Math.min(255, b + br));
      }

      // Apply contrast
      if (options.contrast !== undefined) {
        const co = (options.contrast / 100) ** 2;
        r = Math.max(0, Math.min(255, (r - 128) * co + 128));
        g = Math.max(0, Math.min(255, (g - 128) * co + 128));
        b = Math.max(0, Math.min(255, (b - 128) * co + 128));
      }

      // Apply saturation
      if (options.saturation !== undefined) {
        const sat = options.saturation / 100;
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        r = Math.max(0, Math.min(255, gray + sat * (r - gray)));
        g = Math.max(0, Math.min(255, gray + sat * (g - gray)));
        b = Math.max(0, Math.min(255, gray + sat * (b - gray)));
      }

      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
    }
    // Put the modified data back onto the new canvas
    newCtx.putImageData(imageData, 0, 0);
  }

  // Return the new canvas with effects applied
  return newCanvas;
}

export function cropAndShapeImage(sourceCanvas: HTMLCanvasElement, cropParams: CropShapeParams): HTMLCanvasElement {
  const { x, y, width, height, cornerRadius } = cropParams

  // Ensure crop parameters are within bounds and valid
  const safeX = Math.max(0, Math.min(Math.round(x), sourceCanvas.width - 1))
  const safeY = Math.max(0, Math.min(Math.round(y), sourceCanvas.height - 1))
  const safeWidth = Math.max(1, Math.min(Math.round(width), sourceCanvas.width - safeX))
  const safeHeight = Math.max(1, Math.min(Math.round(height), sourceCanvas.height - safeY))

  console.log("Crop params:", { x, y, width, height, cornerRadius })
  console.log("Safe params:", { safeX, safeY, safeWidth, safeHeight })
  console.log("Source canvas:", { width: sourceCanvas.width, height: sourceCanvas.height })

  // Create output canvas with exact crop dimensions
  const croppedCanvas = createHighQualityCanvas(safeWidth, safeHeight)
  const ctx = croppedCanvas.getContext("2d")!

  // Apply corner radius clipping if specified
  if (cornerRadius > 0) {
    const safeRadius = Math.min(cornerRadius, safeWidth / 2, safeHeight / 2)
    ctx.beginPath()
    ctx.roundRect(0, 0, safeWidth, safeHeight, safeRadius)
    ctx.clip()
  }

  // Draw the exact cropped portion from source to destination
  // Source: (safeX, safeY, safeWidth, safeHeight) from sourceCanvas
  // Destination: (0, 0, safeWidth, safeHeight) on croppedCanvas
  ctx.drawImage(
    sourceCanvas,
    safeX,
    safeY,
    safeWidth,
    safeHeight, // Source rectangle
    0,
    0,
    safeWidth,
    safeHeight, // Destination rectangle
  )

  console.log("Cropped canvas:", { width: croppedCanvas.width, height: croppedCanvas.height })
  return croppedCanvas
}

export function resizeImageAdvanced(
  sourceCanvas: HTMLCanvasElement,
  targetSize: number,
  options: AdvancedProcessingOptions = {},
): HTMLCanvasElement {
  const canvas = createHighQualityCanvas(targetSize, targetSize)
  const ctx = canvas.getContext("2d")!

  // Apply background color first if specified
  if (options.backgroundColor && options.backgroundColor !== "transparent") {
    ctx.fillStyle = options.backgroundColor
    ctx.fillRect(0, 0, targetSize, targetSize)
  }

  let imageToDraw: HTMLCanvasElement = sourceCanvas

  // Apply cropping first if specified
  if (options.cropShapeParams) {
    imageToDraw = cropAndShapeImage(sourceCanvas, options.cropShapeParams)
  }

  if (imageToDraw.width === 0 || imageToDraw.height === 0) {
    return applyAdvancedEffects(canvas, options)
  }

  // Calculate scaling to fit the cropped image into target size while maintaining aspect ratio
  const scale = Math.min(targetSize / imageToDraw.width, targetSize / imageToDraw.height)
  const scaledWidth = imageToDraw.width * scale
  const scaledHeight = imageToDraw.height * scale

  // Center the scaled image
  const xOffset = (targetSize - scaledWidth) / 2
  const yOffset = (targetSize - scaledHeight) / 2

  console.log("Resize params:", {
    targetSize,
    imageToDrawSize: { width: imageToDraw.width, height: imageToDraw.height },
    scale,
    scaledSize: { width: scaledWidth, height: scaledHeight },
    offset: { x: xOffset, y: yOffset },
  })

  // Draw the cropped and scaled image
  ctx.drawImage(imageToDraw, xOffset, yOffset, scaledWidth, scaledHeight)

  // Apply final frame border radius if specified
  let finalOutputRadius = options.borderRadius || 0

  // Check if crop was circular (corner radius >= half of min dimension)
  if (options.cropShapeParams && options.cropShapeParams.shape === "rectangle") {
    const { width: cropW, height: cropH, cornerRadius: cropCR } = options.cropShapeParams
    const cropIsEffectivelyCircular = cropCR >= Math.min(cropW, cropH) / 2 - 0.01
    if (cropIsEffectivelyCircular) {
      finalOutputRadius = targetSize / 2
    }
  }

  // Apply final frame radius
  if (finalOutputRadius > 0) {
    const tempCanvas = createHighQualityCanvas(targetSize, targetSize)
    const tempCtx = tempCanvas.getContext("2d")!
    tempCtx.drawImage(canvas, 0, 0)
    ctx.clearRect(0, 0, targetSize, targetSize)

    // Apply background again if needed
    if (options.backgroundColor && options.backgroundColor !== "transparent") {
      ctx.fillStyle = options.backgroundColor
      ctx.fillRect(0, 0, targetSize, targetSize)
    }

    ctx.beginPath()
    ctx.roundRect(0, 0, targetSize, targetSize, finalOutputRadius)
    ctx.clip()
    ctx.drawImage(tempCanvas, 0, 0)
  }

  // Apply border if specified
  if (options.hasBorder && options.borderColor && (options.borderWidth || 0) > 0) {
    const bw = options.borderWidth || 1
    ctx.strokeStyle = options.borderColor
    ctx.lineWidth = bw
    ctx.beginPath()
    const borderDrawRadius = Math.max(0, finalOutputRadius - bw / 2)
    ctx.roundRect(bw / 2, bw / 2, targetSize - bw, targetSize - bw, borderDrawRadius)
    ctx.stroke()
  }

  return applyAdvancedEffects(canvas, options)
}

export async function generateComprehensiveFavicons(
  sourceCanvas: HTMLCanvasElement,
  selectedSizes: number[],
  options: AdvancedProcessingOptions = {},
  onProgress?: (progress: GenerationProgress) => void,
): Promise<FaviconResult[]> {
  const results: FaviconResult[] = []
  const total = selectedSizes.length
  for (let i = 0; i < total; i++) {
    const size = selectedSizes[i]
    const sizeInfo = COMPREHENSIVE_FAVICON_SIZES.find((s) => s.size === size)
    onProgress?.({
      current: i + 1,
      total,
      stage: `Generating ${size}x${size}`,
      percentage: Math.round(((i + 1) / total) * 100),
    })
    try {
      const resizedCanvas = resizeImageAdvanced(sourceCanvas, size, options)
      const format = options.format || "png"
      const quality = options.quality || 0.9
      const blob = await canvasToBlob(resizedCanvas, format, quality)
      const url = URL.createObjectURL(blob)
      results.push({
        name: `favicon-${size}x${size}.${format}`,
        url,
        size: `${size}x${size}`,
        type: format as any,
        bytes: blob.size,
        optimized: true,
        description: sizeInfo?.description || `${size}x${size} favicon`,
      })
    } catch (error) {
      console.error(`Failed to generate ${size}x${size} favicon:`, error)
    }
  }
  return results
}

export function canvasToBlob(canvas: HTMLCanvasElement, format: string, quality = 0.9): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new Error("Blob creation failed"))
      },
      `image/${format}`,
      quality,
    )
  })
}

export async function loadImageFromFile(file: File): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const canvas = createHighQualityCanvas(img.width, img.height)
      const ctx = canvas.getContext("2d")!
      ctx.drawImage(img, 0, 0)
      resolve(canvas)
    }
    img.onerror = () => reject(new Error("Image load failed"))
    img.src = URL.createObjectURL(file)
  })
}

export function generateComprehensiveHTMLCode(appName = "Your Website", themeColor = "#ffffff"): string {
  return `<!-- Favicon Package Generated by CognifyTech Favicon Generator -->
<!-- Standard favicon -->
<link rel="icon" href="/favicon.ico" sizes="32x32" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="shortcut icon" href="/favicon.ico" />

<!-- Apple Touch Icons -->
<link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />

<!-- Android/Chrome -->
<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
<link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />

<!-- Microsoft Tiles -->
<meta name="msapplication-TileImage" content="/mstile-144x144.png" />
<meta name="msapplication-TileColor" content="${themeColor}" />

<!-- Web App Manifest -->
<link rel="manifest" href="/site.webmanifest" />

<!-- Theme colors -->
<meta name="theme-color" content="${themeColor}" />
<meta name="msapplication-navbutton-color" content="${themeColor}" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-title" content="${appName}" />

<!-- Open Graph / Facebook -->
<meta property="og:image" content="/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/png" />

<!-- Twitter -->
<meta name="twitter:image" content="/twitter-image.png" />
<meta name="twitter:card" content="summary_large_image" />`
}

export function generateAdvancedManifest(
  appName: string,
  themeColor: string,
  backgroundColor: string,
  description?: string,
) {
  return {
    name: appName,
    short_name: appName.length > 12 ? appName.substring(0, 12) : appName,
    description: description || `${appName} - PWA`,
    start_url: "/",
    display: "standalone",
    background_color: backgroundColor,
    theme_color: themeColor,
    icons: [
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png", purpose: "maskable any" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable any" },
    ],
  }
}

export function generateBrowserSpecificCode(): Record<string, string> {
  return {
    chrome: `<!-- Chrome --> <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" /> <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" /> <meta name="theme-color" content="#ffffff" />`,
    safari: `<!-- Safari --> <link rel="apple-touch-icon" href="/apple-touch-icon.png" /> <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" /> <meta name="apple-mobile-web-app-capable" content="yes" /> <meta name="apple-mobile-web-app-status-bar-style" content="default" />`,
    firefox: `<!-- Firefox --> <link rel="icon" href="/favicon.svg" type="image/svg+xml" /> <meta name="theme-color" content="#ffffff" />`,
    edge: `<!-- Edge --> <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" /> <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" /> <meta name="theme-color" content="#ffffff" />`,
  }
}

export function generateSEOMetaTags(
  appName: string,
  description: string,
  keywords: string[],
  author: string,
  siteUrl: string,
) {
  return `<!-- SEO --> <meta name="description" content="${description}" /> <meta name="keywords" content="${keywords.join(", ")}" /> <meta name="author" content="${author}" /> <link rel="canonical" href="${siteUrl}" /> <!-- OG --> <meta property="og:title" content="${appName}" /> <meta property="og:description" content="${description}" /> <meta property="og:image" content="${siteUrl}/og-image.png" /> <!-- Twitter --> <meta property="twitter:title" content="${appName}" /> <meta property="twitter:description" content="${description}" /> <meta property="twitter:image" content="${siteUrl}/twitter-image.png" /> <meta name="twitter:card" content="summary_large_image" />`
}
