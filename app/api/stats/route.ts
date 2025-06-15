import { NextResponse } from "next/server"
import { getStatistics } from "@/lib/statistics"

export async function GET() {
  try {
    const statsData = await getStatistics()
    return NextResponse.json(statsData)
  } catch (error: any) {
    // Log detailed error information on the server
    console.error("Error in /api/stats GET route:", {
      message: error?.message,
      stack: error?.stack,
      errorObject: error, // Log the full error object for deeper inspection
    })
    // Send a more specific error response to the client
    return NextResponse.json(
      {
        error: "Failed to retrieve statistics from the server.",
        details: error?.message || "An unknown error occurred on the server.",
      },
      { status: 500 },
    )
  }
}
