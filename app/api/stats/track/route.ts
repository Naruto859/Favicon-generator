import { type NextRequest, NextResponse } from "next/server"
import { trackFaviconGeneration } from "@/lib/statistics"

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json()

    if (action === "generate") {
      const updatedStats = await trackFaviconGeneration()
      return NextResponse.json(updatedStats)
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Failed to track action:", error)
    return NextResponse.json({ error: "Failed to track action" }, { status: 500 })
  }
}
