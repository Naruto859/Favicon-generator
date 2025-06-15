import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Source_Sans_3 } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"
import Script from "next/script"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const sourceSansPro = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans-pro",
  weight: ["400", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Favicon Generator by CognifyTech | Free & Easy Favicon Maker",
    template: "%s | Favicon Generator by CognifyTech",
  },
  description:
    "Free, fast, and easy favicon generation for your website. Create perfect favicons in seconds for CognifyTech.in. Supports PNG, JPG, SVG.",
  keywords: [
    "favicon generator",
    "favicon maker",
    "free favicon",
    "online favicon tool",
    "cognifytech",
    "create favicon",
  ],
  authors: [{ name: "CognifyTech", url: "https://CognifyTech.in" }],
  creator: "CognifyTech",
  publisher: "CognifyTech",
  manifest: "/manifest.json",
  verification: {
    google: "zO2NUlnwB7HbykPC9MYfKb8poFqJRuCfYpMU8bNmo9A",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-128x128.png", type: "image/png", sizes: "128x128" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Favicon Generator by CognifyTech | Free & Easy Favicon Maker",
    description: "Create perfect favicons in seconds for your website.",
    url: "https://CognifyTech.in",
    siteName: "Favicon Generator by CognifyTech",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Favicon Generator by CognifyTech",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Favicon Generator by CognifyTech | Free & Easy Favicon Maker",
    description: "Create perfect favicons in seconds for your website.",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "light dark",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-H5GX0RRR4Y" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H5GX0RRR4Y');
          `}
        </Script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              const script = document.createElement('script');
              script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3107148187093215';
              script.async = true;
              script.crossOrigin = 'anonymous';
              document.head.appendChild(script);
            })();
          `,
          }}
        />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable, sourceSansPro.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-dvh">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
