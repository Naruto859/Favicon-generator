"use client"

import AdSenseAd from "../adsense-ad"

interface ResponsiveAdProps {
  className?: string
}

export default function ResponsiveAd({ className = "" }: ResponsiveAdProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="text-xs text-gray-500 mb-2 text-center">Advertisement</div>
      <AdSenseAd
        adSlot="1122334455" // Replace with your actual ad slot ID
        adFormat="auto"
        fullWidthResponsive={true}
        className="min-h-[200px]"
      />
    </div>
  )
}
