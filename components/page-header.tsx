import type React from "react"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  children?: React.ReactNode
}

export default function PageHeader({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
  children,
}: PageHeaderProps) {
  return (
    <header className={cn("mb-8 md:mb-12", className)}>
      <h1
        className={cn(
          "text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl lg:text-5xl",
          titleClassName,
        )}
      >
        {title}
      </h1>
      {description && (
        <p className={cn("mt-3 text-lg text-gray-600 dark:text-gray-300 sm:mt-4 sm:text-xl", descriptionClassName)}>
          {description}
        </p>
      )}
      {children}
    </header>
  )
}
