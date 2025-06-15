import { Button } from "@/components/ui/button"
import Breadcrumb from "@/components/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Info, Mail, Building } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn more about CognifyTech, our mission to provide simple and effective web tools, and the team behind the Favicon Generator.",
}

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />
      <section className="text-center">
        <Building className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">About CognifyTech</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We are a dedicated team passionate about creating simple, powerful, and accessible tools for web developers,
          designers, and website owners worldwide.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Target className="w-7 h-7 mr-3 text-primary" /> Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none text-muted-foreground space-y-3">
            <p>
              At CognifyTech, our mission is to empower individuals and businesses by providing high-quality,
              easy-to-use web development tools that simplify complex tasks and enhance productivity. We believe that
              great tools should be accessible to everyone, regardless of technical skill level.
            </p>
            <p>We strive to make our tools:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Accessible:</strong> Free or affordably priced, and available to a global audience.
              </li>
              <li>
                <strong>Efficient:</strong> Fast, reliable, and designed to save you valuable time and effort.
              </li>
              <li>
                <strong>User-Friendly:</strong> Intuitive interfaces that require minimal learning curve.
              </li>
              <li>
                <strong>Innovative:</strong> Continuously improving and adding features based on user feedback and
                technological advancements.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Info className="w-7 h-7 mr-3 text-primary" /> What are Favicons?
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none text-muted-foreground space-y-3">
            <p>
              A favicon (short for "favorite icon") is a small, iconic image that represents your website. Favicons are
              most often found in the address bar of your web browser, but they can also be used in lists of bookmarks,
              browser tabs, and by search engines in search results.
            </p>
            <p>
              <strong>Why they matter:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Brand Recognition:</strong> A unique favicon helps users quickly identify your website among
                many open tabs or bookmarks.
              </li>
              <li>
                <strong>User Experience:</strong> They provide a visual cue that enhances navigation and makes your site
                feel more complete and professional.
              </li>
              <li>
                <strong>Credibility & Trust:</strong> A well-designed favicon contributes to the overall polish and
                trustworthiness of your website.
              </li>
            </ul>
            <p>
              Our Favicon Generator makes it easy to create all the necessary favicon formats for modern web browsers
              and devices.
            </p>
          </CardContent>
        </Card>
      </div>

      <section className="text-center bg-muted/30 dark:bg-background/40 p-8 md:p-12 rounded-xl">
        <Mail className="w-12 h-12 text-accent mx-auto mb-4" />
        <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">Get in Touch</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Have questions, feedback, or just want to say hello? We’d love to hear from you!
        </p>
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/contact">Contact CognifyTech</Link>
        </Button>
        <p className="text-sm text-muted-foreground mt-4">
          Or email us directly at{" "}
          <a href="mailto:contact@cognifytech.in" className="text-primary hover:underline">
            contact@cognifytech.in
          </a>
        </p>
      </section>
    </div>
  )
}
