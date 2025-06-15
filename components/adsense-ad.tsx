"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface AdSenseAdProps {
  adSlot: string
  adFormat?: "auto" | "rectangle" | "vertical" | "horizontal"
  fullWidthResponsive?: boolean
  className?: string
  style?: React.CSSProperties
}

export default function AdSenseAd({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  className = "",
  style = {},
}: AdSenseAdProps) {
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const adsbygoogle = (window as any).adsbygoogle || []
      adsbygoogle.push({})
    } catch (error) {
      console.error("AdSense error:", error)
    }
  }, [])

  return (
    <div className={`adsense-container ${className}`} style={style}>
      <div className="text-xs text-gray-500 mb-1 text-center">Advertisement</div>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: "block",
          minHeight: "100px",
          ...style,
        }}
        data-ad-client="ca-pub-3107148187093215"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  )
}
