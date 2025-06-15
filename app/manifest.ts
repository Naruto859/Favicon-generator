import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Favicon Generator by CognifyTech",
    short_name: "FaviconGen",
    description:
      "Free, fast, and easy favicon generation for your website. Create perfect favicons in seconds for CognifyTech.in.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff", // White
    theme_color: "#3B82F6", // Primary color (blue-500)
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "/favicon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/favicon-128x128.png",
        sizes: "128x128",
        type: "image/png",
      },
    ],
  }
}
