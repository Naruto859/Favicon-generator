export interface SiteMetadata {
  title: string
  description: string
  keywords: string[]
  author: string
  siteUrl: string
  image: string
}

export interface NavigationItem {
  title: string
  href: string
  description?: string
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface ContactInfo {
  email: string
  phone?: string
  address?: string
}
