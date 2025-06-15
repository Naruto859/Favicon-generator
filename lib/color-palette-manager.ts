// Color palette management system
export interface ColorPalette {
  id: string
  name: string
  colors: string[]
  category: "brand" | "web-safe" | "trending" | "custom"
  description?: string
  createdAt: Date
}

export const PREDEFINED_PALETTES: ColorPalette[] = [
  {
    id: "modern-blue",
    name: "Modern Blue",
    colors: ["#3B82F6", "#1E40AF", "#DBEAFE", "#FFFFFF"],
    category: "trending",
    description: "Clean and professional blue palette",
    createdAt: new Date(),
  },
  {
    id: "vibrant-gradient",
    name: "Vibrant Gradient",
    colors: ["#8B5CF6", "#EC4899", "#F59E0B", "#FFFFFF"],
    category: "trending",
    description: "Eye-catching gradient colors",
    createdAt: new Date(),
  },
  {
    id: "nature-green",
    name: "Nature Green",
    colors: ["#10B981", "#059669", "#D1FAE5", "#FFFFFF"],
    category: "brand",
    description: "Fresh and natural green tones",
    createdAt: new Date(),
  },
  {
    id: "corporate-gray",
    name: "Corporate Gray",
    colors: ["#374151", "#1F2937", "#F3F4F6", "#FFFFFF"],
    category: "brand",
    description: "Professional corporate colors",
    createdAt: new Date(),
  },
]

export class ColorPaletteManager {
  private static STORAGE_KEY = "cognifytech-color-palettes"

  static getCustomPalettes(): ColorPalette[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  static saveCustomPalette(palette: Omit<ColorPalette, "id" | "createdAt">): ColorPalette {
    const newPalette: ColorPalette = {
      ...palette,
      id: `custom-${Date.now()}`,
      category: "custom",
      createdAt: new Date(),
    }

    const existing = this.getCustomPalettes()
    const updated = [...existing, newPalette]

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated))
    return newPalette
  }

  static deleteCustomPalette(id: string): void {
    const existing = this.getCustomPalettes()
    const filtered = existing.filter((p) => p.id !== id)
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered))
  }

  static getAllPalettes(): ColorPalette[] {
    return [...PREDEFINED_PALETTES, ...this.getCustomPalettes()]
  }

  static getPalettesByCategory(category: ColorPalette["category"]): ColorPalette[] {
    return this.getAllPalettes().filter((p) => p.category === category)
  }

  static extractColorsFromImage(canvas: HTMLCanvasElement, maxColors = 5): string[] {
    const ctx = canvas.getContext("2d")!
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

    const colorMap = new Map<string, number>()

    // Sample every 10th pixel for performance
    for (let i = 0; i < data.length; i += 40) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      const a = data[i + 3]

      // Skip transparent pixels
      if (a < 128) continue

      const hex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
      colorMap.set(hex, (colorMap.get(hex) || 0) + 1)
    }

    // Sort by frequency and return top colors
    return Array.from(colorMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, maxColors)
      .map(([color]) => color)
  }
}
