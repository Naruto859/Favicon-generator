import { ImageIcon } from "lucide-react" // Using ImageIcon as a generic icon for favicon
import Link from "next/link"

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2" aria-label="Favicon Generator by CognifyTech Home">
      <div className="bg-primary p-1.5 rounded-md">
        <ImageIcon className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="font-heading text-xl font-bold">
        Favicon<span className="text-primary">Generator</span>
      </span>
    </Link>
  )
}
