"use client"

import AdSenseAd from "../adsense-ad"

export default function SidebarAd() {
  return (
    <div className="w-full max-w-[300px] mx-auto">
      <div className="text-xs text-gray-500 mb-2 text-center">Advertisement</div>
      <AdSenseAd
        adSlot="1234567890" // Replace with your actual ad slot ID
        adFormat="rectangle"
        className="min-h-[250px]"
        style={{ width: "300px", height: "250px" }}
      />
    </div>
  )
}
