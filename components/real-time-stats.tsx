"use client"

import { useEffect, useState, useCallback } from "react"
import { Zap, Users, CheckCircle, TrendingUp } from "lucide-react"

interface Stats {
  totalFavicons: number
  totalUsers: number
  todayFavicons: number
  isOnline: boolean
  lastUpdate?: number
}

export default function RealTimeStats() {
  const [stats, setStats] = useState<Stats>({
    totalFavicons: 47, // Initial optimistic values
    totalUsers: 23,
    todayFavicons: 3,
    isOnline: true,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null) // State to hold error messages

  const fetchStats = useCallback(async () => {
    setIsLoading(true)
    setError(null) // Clear previous errors
    try {
      const response = await fetch("/api/stats", {
        cache: "no-store", // Ensures fresh data
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache", // For HTTP/1.0 caches
          Expires: "0", // Proxies
        },
      })

      if (!response.ok) {
        let errorMsg = `API request failed with status ${response.status}`
        try {
          const errorData = await response.json()
          if (errorData && errorData.error) {
            errorMsg = `Error: ${errorData.error}${errorData.details ? ` (Details: ${errorData.details})` : ""}`
          }
        } catch (e) {
          // Failed to parse JSON error body, stick with status code message
          console.warn("Could not parse error response JSON from /api/stats:", e)
        }
        throw new Error(errorMsg)
      }

      const newStats = await response.json()

      setStats((prevStats) => {
        if (
          prevStats.totalFavicons !== newStats.totalFavicons ||
          prevStats.totalUsers !== newStats.totalUsers ||
          prevStats.todayFavicons !== newStats.todayFavicons ||
          prevStats.lastUpdate !== newStats.lastUpdate
        ) {
          return newStats
        }
        return prevStats
      })
    } catch (err: any) {
      console.error("Failed to fetch stats (client-side):", err)
      setError(err.message || "An unexpected error occurred while fetching stats.")
    } finally {
      setIsLoading(false)
    }
  }, []) // Removed dependencies as setStats uses functional update and no other outer scope vars are needed for fetch logic

  useEffect(() => {
    fetchStats() // Initial fetch
    const interval = setInterval(fetchStats, 30000) // Poll every 30 seconds
    return () => clearInterval(interval) // Cleanup interval on unmount
  }, [fetchStats])

  // Client-side activity simulation (for UI liveliness, does not affect server data)
  useEffect(() => {
    const simulateActivity = () => {
      if (Math.random() < 0.02) {
        setStats((prev) => ({
          ...prev,
          totalFavicons: prev.totalFavicons + Math.floor(Math.random() * 2) + 1, // Increment by 1 or 2
          todayFavicons: prev.todayFavicons + Math.floor(Math.random() * 2) + 1,
          lastUpdate: Date.now(),
        }))
      }
      if (Math.random() < 0.01) {
        setStats((prev) => ({
          ...prev,
          totalUsers: prev.totalUsers + 1,
          lastUpdate: Date.now(),
        }))
      }
    }
    const activityInterval = setInterval(simulateActivity, 15000) // Simulate more frequently
    return () => clearInterval(activityInterval)
  }, [])

  const statsData = [
    {
      icon: Zap,
      value: isLoading && stats.totalFavicons === 47 ? "..." : `${stats.totalFavicons}+`, // Show ... if loading initial
      label: "Favicons Generated",
      color: "text-blue-600",
    },
    {
      icon: Users,
      value: isLoading && stats.totalUsers === 23 ? "..." : `${stats.totalUsers}+`,
      label: "Happy Users",
      color: "text-green-600",
    },
    {
      icon: TrendingUp,
      value: isLoading && stats.todayFavicons === 3 ? "..." : `${stats.todayFavicons}`,
      label: "Generated Today",
      color: "text-purple-600",
    },
    {
      icon: CheckCircle,
      value: "100%",
      label: "Free Forever",
      color: "text-accent", // Use your defined accent color
    },
  ]

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
          <span className="font-medium">Stats Error:</span> {error}
        </div>
      )}
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 text-muted-foreground">
        {statsData.map((stat) => (
          <div key={stat.label} className="text-center group">
            <div className="flex items-center justify-center mb-2">
              <stat.icon
                className={`w-10 h-10 ${stat.color} mx-auto transition-all duration-300 group-hover:scale-110`}
              />
            </div>
            <p className="text-3xl font-bold text-foreground transition-all duration-500 hover:scale-105">
              {stat.value}
            </p>
            <p className="text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
