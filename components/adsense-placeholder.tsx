type AdSensePlaceholderProps = {
  type: "sidebar" | "below-tool" | "in-blog" | "footer-banner" | "footer-sidebar"
  className?: string
}

export default function AdSensePlaceholder({ type, className }: AdSensePlaceholderProps) {
  let width = "300px"
  let height = "250px"
  let text = "Ad Unit (300x250)"
  let responsiveClass = ""

  switch (type) {
    case "sidebar":
      width = "100%"
      height = "600px"
      text = "Ad Unit (Sidebar)"
      responsiveClass = "min-w-[250px] max-w-[300px] mx-auto" // Typical sidebar ad constraints
      break
    case "below-tool":
      width = "100%"
      height = "90px"
      text = "Ad Unit (Below Tool)"
      responsiveClass = "max-w-[728px] mx-auto" // Leaderboard size
      break
    case "in-blog":
      width = "100%"
      height = "200px"
      text = "Ad Unit (In Blog)"
      responsiveClass = "max-w-[600px] mx-auto" // Responsive in-article
      break
    case "footer-banner":
      width = "100%"
      height = "90px"
      text = "Ad Unit (Footer Banner)"
      responsiveClass = "max-w-[728px] mx-auto"
      break
    case "footer-sidebar":
      width = "100%"
      height = "250px"
      text = "Ad Unit (Footer Sidebar)"
      responsiveClass = "min-w-[250px] max-w-[300px]"
      break
  }

  return (
    <div
      className={`bg-gray-200 dark:bg-gray-700 border border-dashed border-gray-400 dark:border-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm ${className} ${responsiveClass}`}
      style={{ minHeight: height, width }} // Use minHeight for responsiveness
      aria-label={`Advertisement placeholder: ${text}`}
    >
      {text}
    </div>
  )
}
