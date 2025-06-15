"use client"

import AdSenseAd from "../adsense-ad"

export default function BannerAd() {
  return (
    <div className="w-full max-w-[728px] mx-auto">
      <div className="text-xs text-gray-500 mb-2 text-center">Advertisement</div>
      <AdSenseAd
        adSlot="0987654321" // Replace with your actual ad slot ID
        adFormat="horizontal"
        className="min-h-[90px]"
        style={{ width: "100%", height: "90px" }}
      />
    </div>
  )
}
