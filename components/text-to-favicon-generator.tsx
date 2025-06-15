"use client"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Type,
  Download,
  Settings,
  Eye,
  Copy,
  Check,
  Zap,
  RotateCcw,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Sun,
  Contrast,
  Droplets,
  Palette,
  Sparkles,
  TextCursorInput,
  Code,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TextFaviconOptions {
  text: string
  fontSize: number
  fontFamily: string
  fontWeight: string
  textColor: string
  backgroundColor: string
  textAlign: "left" | "center" | "right"
  borderRadius: number // Main favicon border radius
  padding: number // Main text padding
  shadowEnabled: boolean
  shadowColor: string
  shadowBlur: number
  shadowOffsetX: number
  shadowOffsetY: number
  gradientEnabled: boolean
  gradientStart: string
  gradientEnd: string
  gradientDirection: string
  borderEnabled: boolean // Main favicon border
  borderColor: string
  borderWidth: number
  brightness: number
  contrast: number
  saturation: number
  glowEnabled: boolean
  glowColor: string
  glowIntensity: number
  letterSpacing: number
  textCase: "none" | "uppercase" | "lowercase" | "capitalize"
  textOutlineEnabled: boolean
  textOutlineColor: string
  textOutlineWidth: number
  textRotation: number

  // Shape Layer Options
  shapeLayerEnabled: boolean
  shapeType: "none" | "circle" | "square" | "roundedSquare" | "triangle"
  shapeColor: string
  shapeSizePercent: number // Percentage of canvas width
  shapeRotation: number
  shapeBorderEnabled: boolean
  shapeBorderColor: string
  shapeBorderWidth: number
  shapeXOffsetPercent: number // Percentage of canvas width, from center
  shapeYOffsetPercent: number // Percentage of canvas height, from center
  shapeBorderRadius?: number // Only for roundedSquare
}

const FONT_FAMILIES = [
  { value: "Arial", label: "Arial" },
  { value: "Helvetica", label: "Helvetica" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Georgia", label: "Georgia" },
  { value: "Verdana", label: "Verdana" },
  { value: "Courier New", label: "Courier New" },
  { value: "Impact", label: "Impact" },
  { value: "Comic Sans MS", label: "Comic Sans MS" },
  { value: "Trebuchet MS", label: "Trebuchet MS" },
  { value: "Lucida Console", label: "Lucida Console" },
  { value: "Roboto", label: "Roboto" },
  { value: "Open Sans", label: "Open Sans" },
  { value: "Lato", label: "Lato" },
  { value: "Montserrat", label: "Montserrat" },
  { value: "Poppins", label: "Poppins" },
  { value: "Nunito", label: "Nunito" },
  { value: "Raleway", label: "Raleway" },
  { value: "Playfair Display", label: "Playfair Display" },
  { value: "Merriweather", label: "Merriweather" },
  { value: "Oswald", label: "Oswald" },
  { value: "Pacifico (Cursive)", label: "Pacifico (Cursive)" },
  { value: "Lobster", label: "Lobster (Cursive)" },
  { value: "Bebas Neue", label: "Bebas Neue (Display)" },
  { value: "Anton", label: "Anton (Display)" },
  { value: "Source Code Pro", label: "Source Code Pro (Monospace)" },
]

const FONT_WEIGHTS = [
  { value: "100", label: "Thin" },
  { value: "200", label: "Extra Light" },
  { value: "300", label: "Light" },
  { value: "400", label: "Normal" },
  { value: "500", label: "Medium" },
  { value: "600", label: "Semi Bold" },
  { value: "700", label: "Bold" },
  { value: "800", label: "Extra Bold" },
  { value: "900", label: "Black" },
]

const GRADIENT_DIRECTIONS = [
  { value: "to right", label: "Left to Right (→)" },
  { value: "to left", label: "Right to Left (←)" },
  { value: "to bottom", label: "Top to Bottom (↓)" },
  { value: "to top", label: "Bottom to Top (↑)" },
  { value: "to bottom right", label: "Diagonal (↘)" },
  { value: "to bottom left", label: "Diagonal (↙)" },
  { value: "to top right", label: "Diagonal (↗)" },
  { value: "to top left", label: "Diagonal (↖)" },
  { value: "45deg", label: "Angular (45°)" },
  { value: "135deg", label: "Angular (135°)" },
  { value: "radial", label: "Radial" },
]

const TEXT_CASE_OPTIONS = [
  { value: "none", label: "Normal" },
  { value: "uppercase", label: "UPPERCASE" },
  { value: "lowercase", label: "lowercase" },
  { value: "capitalize", label: "Capitalize" },
]

const PRESET_STYLES = [
  // Existing Presets
  {
    name: "Modern Blue",
    options: {
      backgroundColor: "#3B82F6",
      textColor: "#FFFFFF",
      fontFamily: "Arial",
      fontWeight: "700",
      gradientEnabled: true,
      gradientStart: "#3B82F6",
      gradientEnd: "#1D4ED8",
    },
  },
  {
    name: "Elegant Dark",
    options: {
      backgroundColor: "#1F2937",
      textColor: "#F9FAFB",
      fontFamily: "Georgia",
      fontWeight: "400",
      shadowEnabled: true,
      shadowColor: "#000000",
    },
  },
  {
    name: "Vibrant Orange",
    options: {
      backgroundColor: "#F97316",
      textColor: "#FFFFFF",
      fontFamily: "Impact",
      fontWeight: "700",
      gradientEnabled: true,
      gradientStart: "#F97316",
      gradientEnd: "#EA580C",
    },
  },
  {
    name: "Clean White",
    options: {
      backgroundColor: "#FFFFFF",
      textColor: "#1F2937",
      fontFamily: "Helvetica",
      fontWeight: "600",
      shadowEnabled: true,
      shadowColor: "#00000020",
    },
  },
  {
    name: "Tech Green",
    options: {
      backgroundColor: "#10B981",
      textColor: "#FFFFFF",
      fontFamily: "Courier New",
      fontWeight: "700",
      gradientEnabled: true,
      gradientStart: "#10B981",
      gradientEnd: "#059669",
    },
  },
  {
    name: "Purple Gradient",
    options: {
      backgroundColor: "#8B5CF6",
      textColor: "#FFFFFF",
      fontFamily: "Trebuchet MS",
      fontWeight: "600",
      gradientEnabled: true,
      gradientStart: "#8B5CF6",
      gradientEnd: "#7C3AED",
    },
  },
  // New Presets
  {
    name: "Minimalist Gray",
    options: {
      backgroundColor: "#E5E7EB",
      textColor: "#4B5563",
      fontFamily: "Open Sans",
      fontWeight: "300",
      letterSpacing: 1,
    },
  },
  {
    name: "Bold Red Impact",
    options: {
      backgroundColor: "#DC2626",
      textColor: "#FFFFFF",
      fontFamily: "Impact",
      fontWeight: "900",
      textCase: "uppercase",
      letterSpacing: -1,
    },
  },
  {
    name: "Retro Cream",
    options: {
      backgroundColor: "#FEF3C7",
      textColor: "#78350F",
      fontFamily: "Lobster",
      fontWeight: "400",
      textRotation: -5,
      shadowEnabled: true,
      shadowColor: "#00000030",
      shadowOffsetX: 1,
      shadowOffsetY: 1,
      shadowBlur: 2,
    },
  },
  {
    name: "Futuristic Cyan",
    options: {
      backgroundColor: "#083344",
      textColor: "#06B6D4",
      fontFamily: "Source Code Pro",
      fontWeight: "600",
      glowEnabled: true,
      glowColor: "#06B6D4",
      glowIntensity: 10,
      letterSpacing: 0.5,
    },
  },
  {
    name: "Playful Pink",
    options: {
      backgroundColor: "#FBCFE8",
      textColor: "#9D174D",
      fontFamily: "Comic Sans MS",
      fontWeight: "700",
      borderRadius: 32,
      textRotation: 5,
    },
  },
  {
    name: "Elegant Gold",
    options: {
      backgroundColor: "#FDE68A",
      textColor: "#713F12",
      fontFamily: "Playfair Display",
      fontWeight: "700",
      shadowEnabled: true,
      shadowColor: "#0000001A",
      shadowBlur: 5,
    },
  },
  {
    name: "Nature Green",
    options: {
      backgroundColor: "#D1FAE5",
      textColor: "#065F46",
      fontFamily: "Raleway",
      fontWeight: "500",
      borderRadius: 16,
    },
  },
  {
    name: "Metallic Silver",
    options: {
      gradientEnabled: true,
      gradientStart: "#D1D5DB",
      gradientEnd: "#9CA3AF",
      textColor: "#1F2937",
      fontFamily: "Oswald",
      fontWeight: "600",
      textOutlineEnabled: true,
      textOutlineColor: "#4B5563",
      textOutlineWidth: 0.5,
    },
  },
  {
    name: "Deep Indigo",
    options: {
      backgroundColor: "#3730A3",
      textColor: "#E0E7FF",
      fontFamily: "Montserrat",
      fontWeight: "500",
      shadowEnabled: true,
      shadowColor: "#00000050",
      shadowBlur: 8,
    },
  },
  {
    name: "Sunny Yellow",
    options: {
      backgroundColor: "#FACC15",
      textColor: "#713F12",
      fontFamily: "Poppins",
      fontWeight: "800",
      borderRadius: 12,
      textCase: "uppercase",
    },
  },
  {
    name: "Charcoal Outline",
    options: {
      backgroundColor: "#FFFFFF",
      textColor: "#374151",
      fontFamily: "Lato",
      fontWeight: "700",
      textOutlineEnabled: true,
      textOutlineColor: "#374151",
      textOutlineWidth: 1,
      letterSpacing: 0.5,
    },
  },
  {
    name: "Ocean Blue",
    options: {
      gradientEnabled: true,
      gradientStart: "#38BDF8",
      gradientEnd: "#0EA5E9",
      textColor: "#FFFFFF",
      fontFamily: "Nunito",
      fontWeight: "700",
      shadowEnabled: true,
      shadowColor: "#0C4A6E",
      shadowBlur: 3,
      shadowOffsetY: 1,
    },
  },
  {
    name: "Ruby Red",
    options: {
      backgroundColor: "#E11D48",
      textColor: "#FFF1F2",
      fontFamily: "Bebas Neue",
      fontWeight: "400",
      textCase: "uppercase",
      letterSpacing: 1,
      shadowEnabled: true,
      shadowColor: "#00000040",
      shadowOffsetX: 1,
      shadowOffsetY: 1,
    },
  },
  {
    name: "Forest Whisper",
    options: {
      backgroundColor: "#166534",
      textColor: "#ECFDF5",
      fontFamily: "Merriweather",
      fontWeight: "300",
      borderRadius: 4,
      textRotation: 0,
    },
  },
  {
    name: "Monochrome Minimal",
    options: {
      backgroundColor: "#000000",
      textColor: "#FFFFFF",
      fontFamily: "Helvetica",
      fontWeight: "400",
      letterSpacing: 2,
      textCase: "uppercase",
    },
  },
]

export default function TextToFaviconGenerator() {
  const { toast } = useToast()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [htmlCopied, setHtmlCopied] = useState(false)

  const [options, setOptions] = useState<TextFaviconOptions>({
    text: "A",
    fontSize: 32,
    fontFamily: "Arial",
    fontWeight: "700",
    textColor: "#FFFFFF",
    backgroundColor: "#3B82F6",
    textAlign: "center",
    borderRadius: 8,
    padding: 8,
    shadowEnabled: false,
    shadowColor: "#000000",
    shadowBlur: 4,
    shadowOffsetX: 2,
    shadowOffsetY: 2,
    gradientEnabled: false,
    gradientStart: "#3B82F6",
    gradientEnd: "#1D4ED8",
    gradientDirection: "to bottom right",
    borderEnabled: false,
    borderColor: "#000000",
    borderWidth: 1,
    brightness: 100,
    contrast: 100,
    saturation: 100,
    glowEnabled: false,
    glowColor: "#FFFFFF",
    glowIntensity: 10,
    letterSpacing: 0,
    textCase: "none",
    textOutlineEnabled: false,
    textOutlineColor: "#000000",
    textOutlineWidth: 1,
    textRotation: 0,

    // New Shape Layer Defaults
    shapeLayerEnabled: false,
    shapeType: "circle",
    shapeColor: "#FF0000", // Default to a contrasting color
    shapeSizePercent: 50,
    shapeRotation: 0,
    shapeBorderEnabled: false,
    shapeBorderColor: "#000000",
    shapeBorderWidth: 1,
    shapeXOffsetPercent: 0,
    shapeYOffsetPercent: 0,
    shapeBorderRadius: 4, // Default for roundedSquare
  })

  const applyTextCase = (text: string, textCase: TextFaviconOptions["textCase"]): string => {
    switch (textCase) {
      case "uppercase":
        return text.toUpperCase()
      case "lowercase":
        return text.toLowerCase()
      case "capitalize":
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
      default:
        return text
    }
  }

  const generatePreview = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const size = 64 // Preview size
    canvas.width = size
    canvas.height = size

    ctx.clearRect(0, 0, size, size)
    ctx.save() // Save initial context state

    // Apply global image adjustments
    ctx.filter = `brightness(${options.brightness}%) contrast(${options.contrast}%) saturate(${options.saturation}%)`

    // --- START MAIN BACKGROUND AND BORDER ---
    if (options.gradientEnabled) {
      if (options.gradientDirection === "radial") {
        const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
        gradient.addColorStop(0, options.gradientStart)
        gradient.addColorStop(1, options.gradientEnd)
        ctx.fillStyle = gradient
      } else {
        let x0 = 0,
          y0 = 0,
          x1 = 0,
          y1 = 0
        const angleRad = options.gradientDirection.includes("deg")
          ? (Number.parseInt(options.gradientDirection) * Math.PI) / 180
          : 0

        switch (options.gradientDirection) {
          case "to right":
            x1 = size
            break
          case "to left":
            x0 = size
            x1 = 0
            break
          case "to bottom":
            y1 = size
            break
          case "to top":
            y0 = size
            y1 = 0
            break
          case "to bottom right":
            x1 = size
            y1 = size
            break // Standard: top-left to bottom-right
          case "to bottom left":
            x0 = size
            y1 = size
            x1 = 0
            y0 = 0
            break // Standard: top-right to bottom-left
          case "to top right":
            x1 = size
            y0 = size
            x0 = 0
            y1 = 0
            break // Standard: bottom-left to top-right
          case "to top left":
            x0 = size
            y0 = size
            x1 = 0
            y1 = 0
            break // Standard: bottom-right to top-left
          default:
            if (options.gradientDirection.includes("deg")) {
              // Center of gradient line at center of box
              const halfSize = size / 2
              x0 = halfSize - halfSize * Math.cos(angleRad)
              y0 = halfSize - halfSize * Math.sin(angleRad)
              x1 = halfSize + halfSize * Math.cos(angleRad)
              y1 = halfSize + halfSize * Math.sin(angleRad)
            } else {
              // Default to 'to bottom'
              y1 = size
            }
            break
        }
        const gradient = ctx.createLinearGradient(x0, y0, x1, y1)
        gradient.addColorStop(0, options.gradientStart)
        gradient.addColorStop(1, options.gradientEnd)
        ctx.fillStyle = gradient
      }
    } else {
      ctx.fillStyle = options.backgroundColor
    }

    if (options.borderRadius > 0) {
      ctx.beginPath()
      ctx.roundRect(0, 0, size, size, options.borderRadius)
      ctx.fill()
      if (options.borderEnabled && options.borderWidth > 0) {
        // Draw border after fill, before clip for main area
        ctx.strokeStyle = options.borderColor
        ctx.lineWidth = options.borderWidth
        ctx.stroke() // Stroke the same rounded rect path
      }
      ctx.clip() // Clip subsequent drawings (shape, text) to this rounded main area
    } else {
      ctx.fillRect(0, 0, size, size)
      if (options.borderEnabled && options.borderWidth > 0) {
        ctx.strokeStyle = options.borderColor
        ctx.lineWidth = options.borderWidth
        ctx.strokeRect(
          options.borderWidth / 2,
          options.borderWidth / 2,
          size - options.borderWidth,
          size - options.borderWidth,
        )
      }
    }
    // --- END MAIN BACKGROUND AND BORDER ---

    // --- START SHAPE LAYER DRAWING (drawn on top of main background, within main clip if active) ---
    if (options.shapeLayerEnabled && options.shapeType !== "none") {
      ctx.save() // Save context for shape transformations

      const shapeActualSize = (size * options.shapeSizePercent) / 100
      const shapeCenterX = size / 2 + (size * options.shapeXOffsetPercent) / 100
      const shapeCenterY = size / 2 + (size * options.shapeYOffsetPercent) / 100

      ctx.translate(shapeCenterX, shapeCenterY)
      ctx.rotate((options.shapeRotation * Math.PI) / 180)

      ctx.beginPath()
      switch (options.shapeType) {
        case "circle":
          ctx.arc(0, 0, shapeActualSize / 2, 0, 2 * Math.PI)
          break
        case "square":
          ctx.rect(-shapeActualSize / 2, -shapeActualSize / 2, shapeActualSize, shapeActualSize)
          break
        case "roundedSquare":
          const r = Math.min((options.shapeBorderRadius || 4) * (shapeActualSize / size), shapeActualSize / 2) // Scale radius
          ctx.roundRect(-shapeActualSize / 2, -shapeActualSize / 2, shapeActualSize, shapeActualSize, r)
          break
        case "triangle":
          const h = (Math.sqrt(3) / 2) * shapeActualSize
          ctx.moveTo(0, -h / 1.5) // Adjusted for better centering perception
          ctx.lineTo(-shapeActualSize / 2, h / 3)
          ctx.lineTo(shapeActualSize / 2, h / 3)
          ctx.closePath()
          break
      }

      ctx.fillStyle = options.shapeColor
      ctx.fill()

      if (options.shapeBorderEnabled && options.shapeBorderWidth > 0) {
        ctx.strokeStyle = options.shapeBorderColor
        // Scale shape border width based on shape size relative to canvas size, or keep it absolute?
        // Let's keep it absolute for now, like main border.
        ctx.lineWidth = options.shapeBorderWidth
        ctx.stroke()
      }
      ctx.restore() // Restore context from shape transformations
    }
    // --- END SHAPE LAYER DRAWING ---

    // --- START TEXT DRAWING ---
    ctx.save() // Save for text specific transforms

    const processedText = applyTextCase(options.text, options.textCase)
    ctx.font = `${options.fontWeight} ${options.fontSize}px ${options.fontFamily}`
    ctx.fillStyle = options.textColor
    ctx.textBaseline = "middle"
    if (typeof ctx.letterSpacing !== "undefined") {
      ;(ctx as any).letterSpacing = `${options.letterSpacing}px`
    }

    const textMetrics = ctx.measureText(processedText)
    let x: number
    switch (options.textAlign) {
      case "left":
        x = options.padding
        ctx.textAlign = "left"
        break
      case "right":
        x = size - options.padding
        ctx.textAlign = "right"
        break
      default:
        x = size / 2
        ctx.textAlign = "center"
        break
    }
    const y = size / 2

    ctx.translate(x, y) // Translate to text anchor point
    if (options.textRotation !== 0) {
      ctx.rotate((options.textRotation * Math.PI) / 180)
    }
    // After rotation, draw relative to (0,0) which is now the rotated anchor
    const drawX = 0
    const drawY = 0

    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
    ctx.shadowBlur = 0

    if (options.shadowEnabled) {
      ctx.shadowColor = options.shadowColor
      ctx.shadowBlur = options.shadowBlur
      ctx.shadowOffsetX = options.shadowOffsetX
      ctx.shadowOffsetY = options.shadowOffsetY
    } else if (options.glowEnabled) {
      ctx.shadowColor = options.glowColor
      ctx.shadowBlur = options.glowIntensity
    }

    if (options.textOutlineEnabled && options.textOutlineWidth > 0) {
      ctx.strokeStyle = options.textOutlineColor
      ctx.lineWidth = options.textOutlineWidth
      ctx.strokeText(processedText, drawX, drawY)
    }
    ctx.fillText(processedText, drawX, drawY)

    ctx.restore() // Restore from text transformations
    // --- END TEXT DRAWING ---

    ctx.restore() // Restore initial context state (clears filter, clip)
    setPreviewUrl(canvas.toDataURL())
  }

  useEffect(() => {
    generatePreview()
  }, [options])

  const applyPresetStyle = (preset: (typeof PRESET_STYLES)[0]) => {
    setOptions((prev) => ({
      ...prev, // Keep existing settings
      ...{
        // Default missing ones for presets
        text: prev.text, // Keep current text
        fontSize: 32,
        fontFamily: "Arial",
        fontWeight: "700",
        textColor: "#FFFFFF",
        backgroundColor: "#3B82F6",
        textAlign: "center",
        borderRadius: 8,
        padding: 8,
        shadowEnabled: false,
        shadowColor: "#000000",
        shadowBlur: 4,
        shadowOffsetX: 2,
        shadowOffsetY: 2,
        gradientEnabled: false,
        gradientStart: "#3B82F6",
        gradientEnd: "#1D4ED8",
        gradientDirection: "to bottom right",
        borderEnabled: false,
        borderColor: "#000000",
        borderWidth: 1,
        brightness: 100,
        contrast: 100,
        saturation: 100,
        glowEnabled: false,
        glowColor: "#FFFFFF",
        glowIntensity: 10,
        letterSpacing: 0,
        textCase: "none",
        textOutlineEnabled: false,
        textOutlineColor: "#000000",
        textOutlineWidth: 1,
        textRotation: 0,
        // Default Shape Layer options for presets unless overridden
        shapeLayerEnabled: preset.options.shapeLayerEnabled !== undefined ? preset.options.shapeLayerEnabled : false,
        shapeType: preset.options.shapeType || "circle",
        shapeColor: preset.options.shapeColor || "#FF0000",
        shapeSizePercent: preset.options.shapeSizePercent || 50,
        shapeRotation: preset.options.shapeRotation || 0,
        shapeBorderEnabled: preset.options.shapeBorderEnabled !== undefined ? preset.options.shapeBorderEnabled : false,
        shapeBorderColor: preset.options.shapeBorderColor || "#000000",
        shapeBorderWidth: preset.options.shapeBorderWidth || 1,
        shapeXOffsetPercent: preset.options.shapeXOffsetPercent || 0,
        shapeYOffsetPercent: preset.options.shapeYOffsetPercent || 0,
        shapeBorderRadius: preset.options.shapeBorderRadius || 4,
      },
      ...preset.options, // Apply preset options, overriding defaults
    }))
    toast({
      title: "Style applied!",
      description: `Applied ${preset.name} preset style.`,
    })
  }

  const resetToDefaults = () => {
    setOptions({
      text: "A",
      fontSize: 32,
      fontFamily: "Arial",
      fontWeight: "700",
      textColor: "#FFFFFF",
      backgroundColor: "#3B82F6",
      textAlign: "center",
      borderRadius: 8,
      padding: 8,
      shadowEnabled: false,
      shadowColor: "#000000",
      shadowBlur: 4,
      shadowOffsetX: 2,
      shadowOffsetY: 2,
      gradientEnabled: false,
      gradientStart: "#3B82F6",
      gradientEnd: "#1D4ED8",
      gradientDirection: "to bottom right",
      borderEnabled: false,
      borderColor: "#000000",
      borderWidth: 1,
      brightness: 100,
      contrast: 100,
      saturation: 100,
      glowEnabled: false,
      glowColor: "#FFFFFF",
      glowIntensity: 10,
      letterSpacing: 0,
      textCase: "none",
      textOutlineEnabled: false,
      textOutlineColor: "#000000",
      textOutlineWidth: 1,
      textRotation: 0,

      // Reset Shape Layer Defaults
      shapeLayerEnabled: false,
      shapeType: "circle",
      shapeColor: "#FF0000",
      shapeSizePercent: 50,
      shapeRotation: 0,
      shapeBorderEnabled: false,
      shapeBorderColor: "#000000",
      shapeBorderWidth: 1,
      shapeXOffsetPercent: 0,
      shapeYOffsetPercent: 0,
      shapeBorderRadius: 4,
    })
    toast({
      title: "Reset complete!",
      description: "All settings have been reset to defaults.",
    })
  }

  const downloadFavicon = (outputSize = 64) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = outputSize
    canvas.height = outputSize
    ctx.clearRect(0, 0, outputSize, outputSize)
    ctx.save() // Save initial context

    const scaleFactor = outputSize / 64 // Base size for options is 64px

    // Apply global image adjustments
    ctx.filter = `brightness(${options.brightness}%) contrast(${options.contrast}%) saturate(${options.saturation}%)`

    // --- START MAIN BACKGROUND AND BORDER ---
    const scaledBorderRadius = options.borderRadius * scaleFactor
    const scaledMainBorderWidth = options.borderWidth * scaleFactor

    if (options.gradientEnabled) {
      if (options.gradientDirection === "radial") {
        const gradient = ctx.createRadialGradient(
          outputSize / 2,
          outputSize / 2,
          0,
          outputSize / 2,
          outputSize / 2,
          outputSize / 2,
        )
        gradient.addColorStop(0, options.gradientStart)
        gradient.addColorStop(1, options.gradientEnd)
        ctx.fillStyle = gradient
      } else {
        let x0 = 0,
          y0 = 0,
          x1 = 0,
          y1 = 0
        const angleRad = (Number.parseInt(options.gradientDirection) * Math.PI) / 180 // For 'deg'
        switch (options.gradientDirection) {
          case "to right":
            x1 = outputSize
            break
          case "to left":
            x0 = outputSize
            x1 = 0
            break
          case "to bottom":
            y1 = outputSize
            break
          case "to top":
            y0 = outputSize
            y1 = 0
            break
          case "to bottom right":
            x1 = outputSize
            y1 = outputSize
            break
          case "to bottom left":
            x0 = outputSize
            y1 = outputSize
            x1 = 0
            y0 = 0
            break
          case "to top right":
            x1 = outputSize
            y0 = outputSize
            x0 = 0
            y1 = 0
            break
          case "to top left":
            x0 = outputSize
            y0 = outputSize
            x1 = 0
            y1 = 0
            break
          default: // Assumes 'deg' if not standard
            if (options.gradientDirection.includes("deg")) {
              x0 = (outputSize / 2) * (1 - Math.cos(angleRad))
              y0 = (outputSize / 2) * (1 - Math.sin(angleRad))
              x1 = (outputSize / 2) * (1 + Math.cos(angleRad))
              y1 = (outputSize / 2) * (1 + Math.sin(angleRad))
            } else {
              // Default to 'to bottom' if unrecognized
              y1 = outputSize
            }
            break
        }
        // Ensure 'to left' and 'to top' have correct start/end points
        if (options.gradientDirection === "to left") {
          x0 = outputSize
          x1 = 0
        }
        if (options.gradientDirection === "to top") {
          y0 = outputSize
          y1 = 0
        }
        if (options.gradientDirection === "to bottom left") {
          x0 = 0
          x1 = outputSize
          y0 = outputSize
          y1 = 0
        } // This might need adjustment based on desired diagonal
        if (options.gradientDirection === "to top right") {
          x0 = outputSize
          x1 = 0
          y0 = 0
          y1 = outputSize
        } // This might need adjustment

        const gradient = ctx.createLinearGradient(x0, y0, x1, y1)
        gradient.addColorStop(0, options.gradientStart)
        gradient.addColorStop(1, options.gradientEnd)
        ctx.fillStyle = gradient
      }
    } else {
      ctx.fillStyle = options.backgroundColor
    }

    if (scaledBorderRadius > 0) {
      ctx.beginPath()
      ctx.roundRect(0, 0, outputSize, outputSize, scaledBorderRadius)
      ctx.fill()
      if (options.borderEnabled && scaledMainBorderWidth > 0) {
        ctx.strokeStyle = options.borderColor
        ctx.lineWidth = scaledMainBorderWidth
        ctx.stroke()
      }
      ctx.clip()
    } else {
      ctx.fillRect(0, 0, outputSize, outputSize)
      if (options.borderEnabled && scaledMainBorderWidth > 0) {
        ctx.strokeStyle = options.borderColor
        ctx.lineWidth = scaledMainBorderWidth
        ctx.strokeRect(
          scaledMainBorderWidth / 2,
          scaledMainBorderWidth / 2,
          outputSize - scaledMainBorderWidth,
          outputSize - scaledMainBorderWidth,
        )
      }
    }
    // --- END MAIN BACKGROUND AND BORDER ---

    // --- START SHAPE LAYER DRAWING ---
    if (options.shapeLayerEnabled && options.shapeType !== "none") {
      ctx.save()

      const shapeActualSize = (outputSize * options.shapeSizePercent) / 100
      const shapeCenterX = outputSize / 2 + (outputSize * options.shapeXOffsetPercent) / 100
      const shapeCenterY = outputSize / 2 + (outputSize * options.shapeYOffsetPercent) / 100
      const scaledShapeBorderWidth = options.shapeBorderWidth * scaleFactor // Scale shape border too

      ctx.translate(shapeCenterX, shapeCenterY)
      ctx.rotate((options.shapeRotation * Math.PI) / 180)

      ctx.beginPath()
      switch (options.shapeType) {
        case "circle":
          ctx.arc(0, 0, shapeActualSize / 2, 0, 2 * Math.PI)
          break
        case "square":
          ctx.rect(-shapeActualSize / 2, -shapeActualSize / 2, shapeActualSize, shapeActualSize)
          break
        case "roundedSquare":
          const r = Math.min((options.shapeBorderRadius || 4) * scaleFactor, shapeActualSize / 2)
          ctx.roundRect(-shapeActualSize / 2, -shapeActualSize / 2, shapeActualSize, shapeActualSize, r)
          break
        case "triangle":
          const h = (Math.sqrt(3) / 2) * shapeActualSize
          ctx.moveTo(0, -h / 1.5)
          ctx.lineTo(-shapeActualSize / 2, h / 3)
          ctx.lineTo(shapeActualSize / 2, h / 3)
          ctx.closePath()
          break
      }

      ctx.fillStyle = options.shapeColor
      ctx.fill()

      if (options.shapeBorderEnabled && scaledShapeBorderWidth > 0) {
        ctx.strokeStyle = options.shapeBorderColor
        ctx.lineWidth = scaledShapeBorderWidth
        ctx.stroke()
      }
      ctx.restore()
    }
    // --- END SHAPE LAYER DRAWING ---

    // --- START TEXT DRAWING ---
    ctx.save()
    const scaledFontSize = options.fontSize * scaleFactor
    const scaledPadding = options.padding * scaleFactor
    const scaledLetterSpacing = options.letterSpacing * scaleFactor
    const scaledTextOutlineWidth = options.textOutlineWidth * scaleFactor
    const scaledShadowBlur = options.shadowBlur * scaleFactor
    const scaledShadowOffsetX = options.shadowOffsetX * scaleFactor
    const scaledShadowOffsetY = options.shadowOffsetY * scaleFactor
    const scaledGlowIntensity = options.glowIntensity * scaleFactor

    const processedText = applyTextCase(options.text, options.textCase)
    ctx.font = `${options.fontWeight} ${scaledFontSize}px ${options.fontFamily}`
    ctx.fillStyle = options.textColor
    ctx.textBaseline = "middle"
    if (typeof ctx.letterSpacing !== "undefined") {
      ;(ctx as any).letterSpacing = `${scaledLetterSpacing}px`
    }

    const textMetrics = ctx.measureText(processedText) // Measure with scaled font
    let x: number
    switch (options.textAlign) {
      case "left":
        x = scaledPadding
        ctx.textAlign = "left"
        break
      case "right":
        x = outputSize - scaledPadding
        ctx.textAlign = "right"
        break
      default:
        x = outputSize / 2
        ctx.textAlign = "center"
        break
    }
    const y = outputSize / 2

    ctx.translate(x, y)
    if (options.textRotation !== 0) {
      ctx.rotate((options.textRotation * Math.PI) / 180)
    }
    const drawX = 0
    const drawY = 0

    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
    ctx.shadowBlur = 0

    if (options.shadowEnabled) {
      ctx.shadowColor = options.shadowColor
      ctx.shadowBlur = scaledShadowBlur
      ctx.shadowOffsetX = scaledShadowOffsetX
      ctx.shadowOffsetY = scaledShadowOffsetY
    } else if (options.glowEnabled) {
      ctx.shadowColor = options.glowColor
      ctx.shadowBlur = scaledGlowIntensity
    }

    if (options.textOutlineEnabled && scaledTextOutlineWidth > 0) {
      ctx.strokeStyle = options.textOutlineColor
      ctx.lineWidth = scaledTextOutlineWidth
      ctx.strokeText(processedText, drawX, drawY)
    }
    ctx.fillText(processedText, drawX, drawY)

    ctx.restore() // Restore from text transforms
    // --- END TEXT DRAWING ---

    ctx.restore() // Restore initial context (clears filter, clip)

    canvas.toBlob((blob) => {
      // ... (rest of download logic)
      if (blob) {
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `text-favicon-${outputSize}x${outputSize}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }
    })
  }

  const generateMultipleSizes = async () => {
    setIsGenerating(true)
    const sizes = [16, 32, 48, 64, 128, 180, 192, 512]
    try {
      for (const size of sizes) {
        downloadFavicon(size)
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
      try {
        await fetch("/api/stats/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "generate_text_favicon" }),
        })
      } catch (error) {
        console.error("Failed to track generation:", error)
      }
      toast({
        title: "Favicons generated!",
        description: `Generated ${sizes.length} favicon sizes from your text.`,
      })
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Failed to generate favicons. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const copyCSS = () => {
    const css = `
/* Text Favicon CSS (Approximation) */
.text-favicon {
width: 64px; /* Base size */
height: 64px;
background: ${
      options.gradientEnabled
        ? options.gradientDirection === "radial"
          ? `radial-gradient(circle, ${options.gradientStart}, ${options.gradientEnd})`
          : `linear-gradient(${options.gradientDirection.includes("deg") ? options.gradientDirection : "to " + options.gradientDirection.split(" ").pop()}, ${options.gradientStart}, ${options.gradientEnd})`
        : options.backgroundColor
    };
color: ${options.textColor};
font-family: "${options.fontFamily}", sans-serif;
font-weight: ${options.fontWeight};
font-size: ${options.fontSize}px; /* Base font size */
text-align: ${options.textAlign};
display: flex;
align-items: center;
justify-content: ${options.textAlign === "left" ? "flex-start" : options.textAlign === "right" ? "flex-end" : "center"};
padding: ${options.padding}px;
border-radius: ${options.borderRadius}px;
${options.borderEnabled ? `border: ${options.borderWidth}px solid ${options.borderColor};` : ""}
${options.shadowEnabled ? `box-shadow: ${options.shadowOffsetX}px ${options.shadowOffsetY}px ${options.shadowBlur}px ${options.shadowColor};` : ""}
${options.glowEnabled ? `text-shadow: 0 0 ${options.glowIntensity}px ${options.glowColor};` : ""} /* Glow is approximated with text-shadow */
filter: brightness(${options.brightness}%) contrast(${options.contrast}%) saturate(${options.saturation}%);
letter-spacing: ${options.letterSpacing}px;
text-transform: ${options.textCase === "capitalize" ? "capitalize" : options.textCase === "none" ? "none" : options.textCase};
${options.textRotation !== 0 ? `transform: rotate(${options.textRotation}deg);` : ""}
/* Text outline is hard to replicate perfectly in CSS for all browsers, especially with fill */
${options.textOutlineEnabled ? `-webkit-text-stroke: ${options.textOutlineWidth}px ${options.textOutlineColor}; text-stroke: ${options.textOutlineWidth}px ${options.textOutlineColor};` : ""}
box-sizing: border-box;
}
  `.trim()

    navigator.clipboard.writeText(css).then(() => {
      setCopied(true)
      toast({ title: "CSS copied to clipboard!" })
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const copyHTML = () => {
    const html = generateFaviconHTML(options)
    navigator.clipboard.writeText(html).then(() => {
      setHtmlCopied(true)
      toast({ title: "HTML copied to clipboard!" })
      setTimeout(() => setHtmlCopied(false), 2000)
    })
  }

  const generateFaviconHTML = (currentOptions: TextFaviconOptions) => {
    const themeColor = currentOptions.gradientEnabled ? currentOptions.gradientStart : currentOptions.backgroundColor // Use start of gradient or solid color
    const appName = "Your App" // You can make this configurable later if needed

    return `
      <!-- Favicons Generated by Text to Favicon Tool -->
      <!-- Recommended: Download desired sizes and rename them as specified below. -->

      <!-- Standard Favicons (PNG) -->
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
      <link rel="icon" type="image/png" sizes="64x64" href="/favicon-64x64.png">

      <!-- Apple Touch Icon (iOS) -->
      <!-- Recommended: Use the 180x180px download and name it apple-touch-icon.png -->
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

      <!-- Android/Chrome -->
      <!-- Recommended: Use 192x192px and 512x512px downloads -->
      <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">
      <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png">

      <!-- Web App Manifest (Optional: Create a site.webmanifest file for PWA features) -->
      <!-- <link rel="manifest" href="/site.webmanifest"> -->

      <!-- Theme Color (Sets the color of the browser toolbar on mobile) -->
      <meta name="theme-color" content="${themeColor}">

      <!-- Example site.webmanifest content (save as public/site.webmanifest):
      {
        "name": "${appName}",
        "short_name": "${appName.substring(0, 12)}",
        "icons": [
          { "src": "/android-chrome-192x192.png", "sizes": "192x192", "type": "image/png", "purpose": "any maskable" },
          { "src": "/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
        ],
        "theme_color": "${themeColor}",
        "background_color": "${currentOptions.backgroundColor}",
        "display": "standalone",
        "start_url": "/"
      }
      -->
        `.trim()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Type className="w-6 h-6 mr-2 text-primary" />
            Text to Favicon Generator
          </CardTitle>
          <CardDescription>
            Create professional favicons from text with extensive customization options.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Controls Column 1 (Basic & Text Effects) */}
            <div className="lg:col-span-1 space-y-6">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="basic">
                    <TextCursorInput className="w-4 h-4 mr-1" /> Basic
                  </TabsTrigger>
                  <TabsTrigger value="textEffects">
                    <Sparkles className="w-4 h-4 mr-1" /> Text FX
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4 pt-4">
                  <div>
                    <Label>Text Content</Label>
                    <Input
                      value={options.text}
                      onChange={(e) => setOptions((prev) => ({ ...prev, text: e.target.value.slice(0, 3) }))}
                      placeholder="Max 3 chars"
                      maxLength={3}
                      className="mt-1 text-center text-lg font-bold"
                    />
                  </div>
                  <div>
                    <Label>Font Size: {options.fontSize}px</Label>
                    <Slider
                      value={[options.fontSize]}
                      onValueChange={([v]) => setOptions((o) => ({ ...o, fontSize: v }))}
                      max={60}
                      min={10}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Font Family</Label>
                    <Select
                      value={options.fontFamily}
                      onValueChange={(v) => setOptions((o) => ({ ...o, fontFamily: v }))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {FONT_FAMILIES.map((f) => (
                          <SelectItem key={f.value} value={f.value}>
                            {f.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Font Weight</Label>
                    <Select
                      value={options.fontWeight}
                      onValueChange={(v) => setOptions((o) => ({ ...o, fontWeight: v }))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {FONT_WEIGHTS.map((w) => (
                          <SelectItem key={w.value} value={w.value}>
                            {w.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Text Alignment</Label>
                    <div className="flex gap-2 mt-1">
                      {[
                        { v: "left" as const, i: AlignLeft, l: "L" },
                        { v: "center" as const, i: AlignCenter, l: "C" },
                        { v: "right" as const, i: AlignRight, l: "R" },
                      ].map((a) => (
                        <Button
                          key={a.v}
                          variant={options.textAlign === a.v ? "default" : "outline"}
                          size="icon"
                          onClick={() => setOptions((o) => ({ ...o, textAlign: a.v }))}
                          title={a.l === "L" ? "Left" : a.l === "C" ? "Center" : "Right"}
                        >
                          <a.i className="w-4 h-4" />
                        </Button>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="textEffects" className="space-y-4 pt-4">
                  <div>
                    <Label>Letter Spacing: {options.letterSpacing}px</Label>
                    <Slider
                      value={[options.letterSpacing]}
                      onValueChange={([v]) => setOptions((o) => ({ ...o, letterSpacing: v }))}
                      max={10}
                      min={-5}
                      step={0.5}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Text Case</Label>
                    <Select
                      value={options.textCase}
                      onValueChange={(v) => setOptions((o) => ({ ...o, textCase: v as any }))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TEXT_CASE_OPTIONS.map((tc) => (
                          <SelectItem key={tc.value} value={tc.value}>
                            {tc.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Text Rotation: {options.textRotation}°</Label>
                    <Slider
                      value={[options.textRotation]}
                      onValueChange={([v]) => setOptions((o) => ({ ...o, textRotation: v }))}
                      max={45}
                      min={-45}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <Label>Text Outline</Label>
                    <Checkbox
                      checked={options.textOutlineEnabled}
                      onCheckedChange={(c) => setOptions((o) => ({ ...o, textOutlineEnabled: Boolean(c) }))}
                    />
                  </div>
                  {options.textOutlineEnabled && (
                    <div className="space-y-3 p-3 border rounded-lg bg-muted/10">
                      <Label>Outline Color</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="color"
                          value={options.textOutlineColor}
                          onChange={(e) => setOptions((o) => ({ ...o, textOutlineColor: e.target.value }))}
                          className="w-10 h-8 p-1"
                        />
                        <Input
                          type="text"
                          value={options.textOutlineColor}
                          onChange={(e) => setOptions((o) => ({ ...o, textOutlineColor: e.target.value }))}
                          className="flex-1 h-8"
                        />
                      </div>
                      <Label>Outline Width: {options.textOutlineWidth}px</Label>
                      <Slider
                        value={[options.textOutlineWidth]}
                        onValueChange={([v]) => setOptions((o) => ({ ...o, textOutlineWidth: v }))}
                        max={5}
                        min={0.5}
                        step={0.5}
                      />
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            {/* Controls Column 2 (Style & Effects) */}
            <div className="lg:col-span-1 space-y-6">
              <Tabs defaultValue="style" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="style">
                    <Palette className="w-4 h-4 mr-1" /> Style
                  </TabsTrigger>
                  <TabsTrigger value="effects">
                    <Sparkles className="w-4 h-4 mr-1" /> FX
                  </TabsTrigger>
                  <TabsTrigger value="adjust">
                    <Settings className="w-4 h-4 mr-1" /> Adjust
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="style" className="space-y-4 pt-4">
                  <Label>Text Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="color"
                      value={options.textColor}
                      onChange={(e) => setOptions((o) => ({ ...o, textColor: e.target.value }))}
                      className="w-10 h-8 p-1"
                    />
                    <Input
                      type="text"
                      value={options.textColor}
                      onChange={(e) => setOptions((o) => ({ ...o, textColor: e.target.value }))}
                      className="flex-1 h-8"
                    />
                  </div>
                  <Label>Background Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="color"
                      value={options.backgroundColor}
                      onChange={(e) => setOptions((o) => ({ ...o, backgroundColor: e.target.value }))}
                      className="w-10 h-8 p-1"
                    />
                    <Input
                      type="text"
                      value={options.backgroundColor}
                      onChange={(e) => setOptions((o) => ({ ...o, backgroundColor: e.target.value }))}
                      className="flex-1 h-8"
                    />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <Label>Gradient Background</Label>
                    <Checkbox
                      checked={options.gradientEnabled}
                      onCheckedChange={(c) => setOptions((o) => ({ ...o, gradientEnabled: Boolean(c) }))}
                    />
                  </div>
                  {options.gradientEnabled && (
                    <div className="space-y-3 p-3 border rounded-lg bg-muted/10">
                      <Label>Gradient Start</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="color"
                          value={options.gradientStart}
                          onChange={(e) => setOptions((o) => ({ ...o, gradientStart: e.target.value }))}
                          className="w-10 h-8 p-1"
                        />
                        <Input
                          type="text"
                          value={options.gradientStart}
                          onChange={(e) => setOptions((o) => ({ ...o, gradientStart: e.target.value }))}
                          className="flex-1 h-8"
                        />
                      </div>
                      <Label>Gradient End</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="color"
                          value={options.gradientEnd}
                          onChange={(e) => setOptions((o) => ({ ...o, gradientEnd: e.target.value }))}
                          className="w-10 h-8 p-1"
                        />
                        <Input
                          type="text"
                          value={options.gradientEnd}
                          onChange={(e) => setOptions((o) => ({ ...o, gradientEnd: e.target.value }))}
                          className="flex-1 h-8"
                        />
                      </div>
                      <Label>Gradient Direction</Label>
                      <Select
                        value={options.gradientDirection}
                        onValueChange={(v) => setOptions((o) => ({ ...o, gradientDirection: v }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {GRADIENT_DIRECTIONS.map((d) => (
                            <SelectItem key={d.value} value={d.value}>
                              {d.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <Label>Border Radius: {options.borderRadius}px</Label>
                  <Slider
                    value={[options.borderRadius]}
                    onValueChange={([v]) => setOptions((o) => ({ ...o, borderRadius: v }))}
                    max={32}
                    min={0}
                    step={1}
                  />
                  <Label>Padding: {options.padding}px</Label>
                  <Slider
                    value={[options.padding]}
                    onValueChange={([v]) => setOptions((o) => ({ ...o, padding: v }))}
                    max={24}
                    min={0}
                    step={1}
                  />

                  {/* Shape Layer Section */}
                  <div className="pt-4 mt-4 border-t">
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="shapeLayerEnabled" className="text-base font-semibold">
                        Shape Layer
                      </Label>
                      <Checkbox
                        id="shapeLayerEnabled"
                        checked={options.shapeLayerEnabled}
                        onCheckedChange={(checked) =>
                          setOptions((prev) => ({ ...prev, shapeLayerEnabled: Boolean(checked) }))
                        }
                      />
                    </div>

                    {options.shapeLayerEnabled && (
                      <div className="space-y-3 p-3 border rounded-lg bg-muted/10">
                        <div>
                          <Label>Shape Type</Label>
                          <Select
                            value={options.shapeType}
                            onValueChange={(value) => setOptions((prev) => ({ ...prev, shapeType: value as any }))}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="circle">Circle</SelectItem>
                              <SelectItem value="square">Square</SelectItem>
                              <SelectItem value="roundedSquare">Rounded Square</SelectItem>
                              <SelectItem value="triangle">Triangle</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {options.shapeType === "roundedSquare" && (
                          <div>
                            <Label>Shape Corner Radius: {options.shapeBorderRadius}px</Label>
                            <Slider
                              value={[options.shapeBorderRadius || 4]}
                              onValueChange={([value]) => setOptions((prev) => ({ ...prev, shapeBorderRadius: value }))}
                              max={32}
                              min={0}
                              step={1}
                              className="mt-2"
                            />
                          </div>
                        )}

                        <div>
                          <Label>Shape Color</Label>
                          <div className="flex items-center space-x-2 mt-1">
                            <Input
                              type="color"
                              value={options.shapeColor}
                              onChange={(e) => setOptions((prev) => ({ ...prev, shapeColor: e.target.value }))}
                              className="w-10 h-8 p-1"
                            />
                            <Input
                              type="text"
                              value={options.shapeColor}
                              onChange={(e) => setOptions((prev) => ({ ...prev, shapeColor: e.target.value }))}
                              className="flex-1 h-8"
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Size: {options.shapeSizePercent}% of canvas</Label>
                          <Slider
                            value={[options.shapeSizePercent]}
                            onValueChange={([value]) => setOptions((prev) => ({ ...prev, shapeSizePercent: value }))}
                            max={100}
                            min={10}
                            step={5}
                            className="mt-2"
                          />
                        </div>

                        <div>
                          <Label>Rotation: {options.shapeRotation}°</Label>
                          <Slider
                            value={[options.shapeRotation]}
                            onValueChange={([value]) => setOptions((prev) => ({ ...prev, shapeRotation: value }))}
                            max={180}
                            min={-180}
                            step={5}
                            className="mt-2"
                          />
                        </div>

                        <div>
                          <Label>X Offset: {options.shapeXOffsetPercent}%</Label>
                          <Slider
                            value={[options.shapeXOffsetPercent]}
                            onValueChange={([value]) => setOptions((prev) => ({ ...prev, shapeXOffsetPercent: value }))}
                            max={50}
                            min={-50}
                            step={1}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label>Y Offset: {options.shapeYOffsetPercent}%</Label>
                          <Slider
                            value={[options.shapeYOffsetPercent]}
                            onValueChange={([value]) => setOptions((prev) => ({ ...prev, shapeYOffsetPercent: value }))}
                            max={50}
                            min={-50}
                            step={1}
                            className="mt-2"
                          />
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <Label>Shape Border</Label>
                          <Checkbox
                            checked={options.shapeBorderEnabled}
                            onCheckedChange={(checked) =>
                              setOptions((prev) => ({ ...prev, shapeBorderEnabled: Boolean(checked) }))
                            }
                          />
                        </div>
                        {options.shapeBorderEnabled && (
                          <div className="space-y-3 p-2 border rounded-md bg-muted/20">
                            <Label>Shape Border Color</Label>
                            <div className="flex items-center space-x-2">
                              <Input
                                type="color"
                                value={options.shapeBorderColor}
                                onChange={(e) => setOptions((prev) => ({ ...prev, shapeBorderColor: e.target.value }))}
                                className="w-10 h-8 p-1"
                              />
                              <Input
                                type="text"
                                value={options.shapeBorderColor}
                                onChange={(e) => setOptions((prev) => ({ ...prev, shapeBorderColor: e.target.value }))}
                                className="flex-1 h-8"
                              />
                            </div>
                            <Label>Shape Border Width: {options.shapeBorderWidth}px</Label>
                            <Slider
                              value={[options.shapeBorderWidth]}
                              onValueChange={([value]) => setOptions((prev) => ({ ...prev, shapeBorderWidth: value }))}
                              max={10}
                              min={0.5}
                              step={0.5}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="effects" className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <Label>Shadow</Label>
                    <Checkbox
                      checked={options.shadowEnabled}
                      onCheckedChange={(c) => setOptions((o) => ({ ...o, shadowEnabled: Boolean(c) }))}
                    />
                  </div>
                  {options.shadowEnabled && (
                    <div className="space-y-3 p-3 border rounded-lg bg-muted/10">
                      <Label>Shadow Color</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="color"
                          value={options.shadowColor}
                          onChange={(e) => setOptions((o) => ({ ...o, shadowColor: e.target.value }))}
                          className="w-10 h-8 p-1"
                        />
                        <Input
                          type="text"
                          value={options.shadowColor}
                          onChange={(e) => setOptions((o) => ({ ...o, shadowColor: e.target.value }))}
                          className="flex-1 h-8"
                        />
                      </div>
                      <Label>Blur: {options.shadowBlur}px</Label>
                      <Slider
                        value={[options.shadowBlur]}
                        onValueChange={([v]) => setOptions((o) => ({ ...o, shadowBlur: v }))}
                        max={20}
                        min={0}
                        step={1}
                      />
                      <Label>Offset X: {options.shadowOffsetX}px</Label>
                      <Slider
                        value={[options.shadowOffsetX]}
                        onValueChange={([v]) => setOptions((o) => ({ ...o, shadowOffsetX: v }))}
                        max={10}
                        min={-10}
                        step={1}
                      />
                      <Label>Offset Y: {options.shadowOffsetY}px</Label>
                      <Slider
                        value={[options.shadowOffsetY]}
                        onValueChange={([v]) => setOptions((o) => ({ ...o, shadowOffsetY: v }))}
                        max={10}
                        min={-10}
                        step={1}
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2">
                    <Label>Glow</Label>
                    <Checkbox
                      checked={options.glowEnabled}
                      onCheckedChange={(c) => setOptions((o) => ({ ...o, glowEnabled: Boolean(c) }))}
                    />
                  </div>
                  {options.glowEnabled && (
                    <div className="space-y-3 p-3 border rounded-lg bg-muted/10">
                      <Label>Glow Color</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="color"
                          value={options.glowColor}
                          onChange={(e) => setOptions((o) => ({ ...o, glowColor: e.target.value }))}
                          className="w-10 h-8 p-1"
                        />
                        <Input
                          type="text"
                          value={options.glowColor}
                          onChange={(e) => setOptions((o) => ({ ...o, glowColor: e.target.value }))}
                          className="flex-1 h-8"
                        />
                      </div>
                      <Label>Intensity: {options.glowIntensity}</Label>
                      <Slider
                        value={[options.glowIntensity]}
                        onValueChange={([v]) => setOptions((o) => ({ ...o, glowIntensity: v }))}
                        max={50}
                        min={1}
                        step={1}
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2">
                    <Label>Border</Label>
                    <Checkbox
                      checked={options.borderEnabled}
                      onCheckedChange={(c) => setOptions((o) => ({ ...o, borderEnabled: Boolean(c) }))}
                    />
                  </div>
                  {options.borderEnabled && (
                    <div className="space-y-3 p-3 border rounded-lg bg-muted/10">
                      <Label>Border Color</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="color"
                          value={options.borderColor}
                          onChange={(e) => setOptions((o) => ({ ...o, borderColor: e.target.value }))}
                          className="w-10 h-8 p-1"
                        />
                        <Input
                          type="text"
                          value={options.borderColor}
                          onChange={(e) => setOptions((o) => ({ ...o, borderColor: e.target.value }))}
                          className="flex-1 h-8"
                        />
                      </div>
                      <Label>Width: {options.borderWidth}px</Label>
                      <Slider
                        value={[options.borderWidth]}
                        onValueChange={([v]) => setOptions((o) => ({ ...o, borderWidth: v }))}
                        max={8}
                        min={0.5}
                        step={0.5}
                      />
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="adjust" className="space-y-4 pt-4">
                  <Label className="flex items-center">
                    <Sun className="w-4 h-4 mr-2" /> Brightness: {options.brightness}%
                  </Label>
                  <Slider
                    value={[options.brightness]}
                    onValueChange={([v]) => setOptions((o) => ({ ...o, brightness: v }))}
                    max={200}
                    min={0}
                    step={5}
                  />
                  <Label className="flex items-center">
                    <Contrast className="w-4 h-4 mr-2" /> Contrast: {options.contrast}%
                  </Label>
                  <Slider
                    value={[options.contrast]}
                    onValueChange={([v]) => setOptions((o) => ({ ...o, contrast: v }))}
                    max={200}
                    min={0}
                    step={5}
                  />
                  <Label className="flex items-center">
                    <Droplets className="w-4 h-4 mr-2" /> Saturation: {options.saturation}%
                  </Label>
                  <Slider
                    value={[options.saturation]}
                    onValueChange={([v]) => setOptions((o) => ({ ...o, saturation: v }))}
                    max={200}
                    min={0}
                    step={5}
                  />
                </TabsContent>
              </Tabs>
            </div>

            {/* Preview and Actions Column */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="w-5 h-5 mr-2" /> Live Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="bg-muted/20 p-4 sm:p-8 rounded-lg border mb-4 aspect-square flex items-center justify-center">
                    <canvas
                      ref={canvasRef}
                      width={64}
                      height={64}
                      className="border rounded-lg shadow-sm w-full h-full max-w-[128px] max-h-[128px] sm:max-w-[160px] sm:max-h-[160px]"
                      style={{ imageRendering: "pixelated" }}
                    />
                  </div>
                  <p className="text-sm font-medium">Preview: {applyTextCase(options.text, options.textCase)}</p>
                  <p className="text-xs text-muted-foreground">
                    {options.fontFamily} • {options.fontWeight} • {options.fontSize}px
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="w-5 h-5 mr-2" /> Preset Styles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-h-48 overflow-y-auto grid grid-cols-2 gap-2 pr-2">
                    {PRESET_STYLES.map((p) => (
                      <Button
                        key={p.name}
                        variant="outline"
                        size="sm"
                        onClick={() => applyPresetStyle(p)}
                        className="text-xs justify-start text-left h-auto py-1.5"
                      >
                        {p.name}
                      </Button>
                    ))}
                  </div>
                  <Button variant="outline" onClick={resetToDefaults} className="w-full mt-4">
                    <RotateCcw className="w-4 h-4 mr-2" /> Reset All Options
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Download className="w-5 h-5 mr-2" /> Download
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button onClick={() => downloadFavicon(64)} variant="outline" className="w-full">
                    Download 64x64 PNG
                  </Button>
                  <Button onClick={generateMultipleSizes} disabled={isGenerating} className="w-full">
                    {isGenerating ? (
                      <>
                        <Settings className="w-4 h-4 mr-2 animate-spin" /> Generating...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" /> Generate All Sizes
                      </>
                    )}
                  </Button>
                  <Button onClick={copyCSS} variant="outline" className="w-full">
                    {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />} Copy CSS (Approx.)
                  </Button>
                  <Button onClick={copyHTML} variant="outline" className="w-full">
                    {htmlCopied ? <Check className="w-4 h-4 mr-2" /> : <Code className="w-4 h-4 mr-2" />} Copy HTML
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Generates: 16, 32, 48, 64, 128, 180, 192, 512px PNGs
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
