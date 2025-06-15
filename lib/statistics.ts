"use server"

import { cookies } from "next/headers"

// Simple in-memory storage for demo (in production, use a database)
const stats = {
  totalFavicons: 47,
  totalUsers: 23,
  todayFavicons: 3,
  lastReset: new Date().toDateString(),
  lastUpdate: Date.now(),
}

// Track favicon generation
export async function trackFaviconGeneration() {
  const today = new Date().toDateString()

  // Reset daily counter if it's a new day
  if (stats.lastReset !== today) {
    stats.todayFavicons = 0
    stats.lastReset = today
  }

  stats.totalFavicons += 1
  stats.todayFavicons += 1
  stats.lastUpdate = Date.now()

  // Track unique users using cookies
  const cookieStore = cookies()
  const hasVisited = cookieStore.get("favicon-user")

  if (!hasVisited) {
    stats.totalUsers += 1
    // Set cookie for 30 days
    cookieStore.set("favicon-user", "true", {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      httpOnly: true,
    })
  }

  // Broadcast update to all connected clients
  broadcastStatsUpdate()

  return stats
}

// Get current statistics
export async function getStatistics() {
  const today = new Date().toDateString()

  // Reset daily counter if it's a new day
  if (stats.lastReset !== today) {
    stats.todayFavicons = 0
    stats.lastReset = today
  }

  return {
    totalFavicons: stats.totalFavicons,
    totalUsers: stats.totalUsers,
    todayFavicons: stats.todayFavicons,
    isOnline: true,
    lastUpdate: stats.lastUpdate,
  }
}

// Simulate real-time updates (in production, use WebSockets or Server-Sent Events)
function broadcastStatsUpdate() {
  // This would typically broadcast to all connected clients
  // For now, we'll rely on polling with shorter intervals
  console.log("Stats updated:", stats)
}

// Add some realistic activity simulation
export async function simulateActivity() {
  // Simulate occasional favicon generations
  if (Math.random() < 0.1) {
    // 10% chance every check
    stats.totalFavicons += 1
    stats.todayFavicons += 1
    stats.lastUpdate = Date.now()
  }

  // Simulate new users occasionally
  if (Math.random() < 0.05) {
    // 5% chance every check
    stats.totalUsers += 1
    stats.lastUpdate = Date.now()
  }

  return stats
}
