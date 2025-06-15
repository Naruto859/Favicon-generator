import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
  UploadCloud,
  Settings,
  Download,
  ArrowRight,
  Eye,
  Type,
  ImageIcon,
  Sparkles,
  Zap,
  Star,
  CheckCircle,
  Globe,
  Smartphone,
  Monitor,
} from "lucide-react"
import Link from "next/link"
import AdSensePlaceholder from "@/components/adsense-placeholder"
import RealTimeStats from "@/components/real-time-stats"

const howItWorksSteps = [
  {
    icon: UploadCloud,
    title: "1. Choose Your Method",
    description: "Upload an image file OR create text-based favicons. Both methods offer professional results!",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    icon: Settings,
    title: "2. Customize & Style",
    description: "Adjust colors, add effects, borders, shadows, and fine-tune every detail to match your brand.",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
  {
    icon: Download,
    title: "3. Download & Deploy",
    description: "Get all favicon sizes, HTML code, and web manifest files. Ready to use in seconds!",
    color: "bg-green-500/10 text-green-600 dark:text-green-400",
  },
]

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate favicons in seconds with our optimized processing engine.",
  },
  {
    icon: Star,
    title: "Professional Quality",
    description: "High-quality output with multiple formats and sizes for all devices.",
  },
  {
    icon: CheckCircle,
    title: "100% Free",
    description: "No hidden costs, no watermarks, no registration required.",
  },
  {
    icon: Globe,
    title: "Universal Compatibility",
    description: "Works with all browsers, devices, and content management systems.",
  },
]

const faqs = [
  {
    question: "What is a favicon and why is it important?",
    answer:
      "A favicon (short for 'favorite icon') is a small icon representing your website. It appears in browser tabs, bookmarks, history, and search results. It's crucial for brand recognition, user experience (helping users identify your site quickly), and adds a professional touch to your website.",
  },
  {
    question: "What image formats can I upload?",
    answer:
      "You can upload PNG, JPG/JPEG, and SVG files. For best results, we recommend using a square image with a clear design, ideally an SVG for scalability or a high-resolution PNG.",
  },
  {
    question: "What favicon sizes and formats are generated?",
    answer:
      "Our tool generates a comprehensive set of favicons: a standard `favicon.ico` (containing 16x16, 32x32, 48x48 sizes), PNG versions (16x16, 32x32, 48x48, 192x192, 512x512), an Apple Touch Icon (180x180), and helps you set up a `manifest.webmanifest` for PWA compatibility.",
  },
  {
    question: "Is this favicon generator tool completely free?",
    answer:
      "Yes, absolutely! Our favicon generator is 100% free to use with all features available. We support the tool through unobtrusive ads.",
  },
  {
    question: "How do I add the generated favicon to my website?",
    answer:
      "After generating your favicons, we provide you with the necessary HTML code snippet. You'll typically add this code to the `<head>` section of your HTML documents. For Next.js apps, you can place the files in the `public` folder and use the `metadata` API in `layout.tsx` or `page.tsx`.",
  },
]

export default function HomePage() {
  return (
    <div className="space-y-12 md:space-y-24 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="relative pt-6 pb-10 md:pt-16 md:pb-20">
        {/* Removed background divs for a seamless look */}
        <div className="text-center space-y-6 md:space-y-8">
          <div className="space-y-3 md:space-y-4">
            <Badge
              variant="secondary"
              className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium animate-pulse"
            >
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
              100% Free • No Registration Required
            </Badge>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              Create Perfect Favicons{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                in Seconds
              </span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-8 md:mb-12 max-w-md sm:max-w-xl md:max-w-3xl mx-auto leading-relaxed">
              Professional favicon generation made simple. Upload your logo, create text-based favicons, and get all the
              files you need with comprehensive HTML code and web manifest.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-md sm:max-w-xl md:max-w-5xl mx-auto mb-8 md:mb-12">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader className="relative p-4 md:p-6">
                <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 md:p-6 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ImageIcon className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <CardTitle className="text-xl md:text-2xl mb-1 md:mb-2">Image to Favicon</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Upload your logo or image and convert it to all favicon formats with professional optimization
                </CardDescription>
              </CardHeader>
              <CardContent className="relative p-4 md:p-6">
                <div className="border-2 border-dashed border-muted-foreground/30 rounded-xl p-4 md:p-8 mb-4 md:mb-6 bg-muted/10 group-hover:border-primary/50 transition-colors duration-300">
                  <UploadCloud className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground mx-auto mb-2 md:mb-3 group-hover:text-primary transition-colors duration-300" />
                  <p className="text-xs md:text-sm text-muted-foreground">PNG, JPG, SVG supported</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">Max 10MB • Square images work best</p>
                </div>
                <Button
                  asChild
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm md:text-base"
                  size="lg"
                >
                  <Link href="/tool">
                    Upload Image{" "}
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-accent/50 hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader className="relative p-4 md:p-6">
                <div className="mx-auto bg-accent/10 text-accent rounded-full p-4 md:p-6 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Type className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <CardTitle className="text-xl md:text-2xl mb-1 md:mb-2">Text to Favicon</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Create professional favicons from text with extensive customization and styling options
                </CardDescription>
              </CardHeader>
              <CardContent className="relative p-4 md:p-6">
                <div className="border-2 border-dashed border-muted-foreground/30 rounded-xl p-4 md:p-8 mb-4 md:mb-6 bg-muted/10 group-hover:border-accent/50 transition-colors duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-accent to-accent/80 text-accent-foreground rounded-xl flex items-center justify-center mx-auto mb-2 md:mb-3 font-bold text-xl md:text-2xl group-hover:rotate-12 transition-transform duration-300">
                      A
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground">Letters, initials, symbols</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">Unlimited customization</p>
                  </div>
                </div>
                <Button
                  asChild
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-sm md:text-base"
                  size="lg"
                >
                  <Link href="/tool?tab=text-to-favicon">
                    Create Text Favicon{" "}
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-center items-center">
            <p className="text-xs sm:text-sm text-muted-foreground flex items-center">
              <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2 text-green-500" />
              100% free • No registration required • Instant downloads
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 md:py-16">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Why Choose Our Favicon Generator?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-md sm:max-w-xl md:max-w-2xl mx-auto">
            Built for developers, designers, and website owners who demand quality and efficiency.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-background to-muted/20 p-4 md:p-6"
            >
              <CardHeader className="p-0 mb-3 md:mb-4">
                <div className="mx-auto bg-primary/10 text-primary rounded-full p-3 md:p-4 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-3 md:mb-4">
                  <feature.icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <CardTitle className="text-lg md:text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-10 md:py-16 bg-gradient-to-r from-muted/30 to-muted/10 rounded-2xl md:rounded-3xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            See Your Favicon in Action
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-md sm:max-w-xl md:max-w-2xl mx-auto">
            Real-time previews show exactly how your favicon will look across different platforms and devices.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-center max-w-md sm:max-w-xl md:max-w-6xl mx-auto">
          <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="p-4">
              <CardTitle className="flex items-center text-base md:text-lg">
                <Monitor className="w-4 h-4 md:w-5 md:h-5 mr-2 text-primary" /> Browser Tab
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="bg-muted/20 p-3 md:p-4 rounded-lg border shadow-inner">
                <div className="flex items-center space-x-1.5 md:space-x-2 bg-background p-2 md:p-3 rounded-t-md shadow-sm">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-red-400 rounded-full"></div>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="bg-background p-3 md:p-4 flex items-center border-t-0 border rounded-b-md">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-gradient-to-br from-primary to-accent rounded mr-2 md:mr-3"></div>
                  <span className="text-xs sm:text-sm font-medium">Your Awesome Website</span>
                  <span className="ml-auto text-xs text-muted-foreground hidden sm:inline">example.com</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="p-4">
              <CardTitle className="flex items-center text-base md:text-lg">
                <Smartphone className="w-4 h-4 md:w-5 md:h-5 mr-2 text-accent" /> Mobile App Icon
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="bg-muted/20 p-4 md:p-6 rounded-lg border max-w-[180px] sm:max-w-xs mx-auto">
                <div className="bg-background rounded-xl md:rounded-2xl p-3 md:p-4 shadow-lg">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary via-accent to-secondary rounded-xl md:rounded-2xl mx-auto mb-2 md:mb-3 shadow-md"></div>
                  <p className="text-xs sm:text-sm text-center font-medium">Your App</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="p-4">
              <CardTitle className="flex items-center text-base md:text-lg">
                <Eye className="w-4 h-4 md:w-5 md:h-5 mr-2 text-secondary" /> Style Examples
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                {[
                  { bg: "from-blue-500 to-blue-600", text: "B" },
                  { bg: "from-green-500 to-green-600", text: "G" },
                  { bg: "from-purple-500 to-purple-600", text: "P" },
                  { bg: "from-orange-500 to-orange-600", text: "O" },
                ].map((style, idx) => (
                  <div
                    key={idx}
                    className="bg-card p-2 md:p-3 rounded-lg shadow border flex flex-col items-center justify-center aspect-square hover:scale-105 transition-transform duration-200"
                  >
                    <div
                      className={`w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br ${style.bg} rounded-md md:rounded-lg flex items-center justify-center text-white font-bold mb-1`}
                    >
                      {style.text}
                    </div>
                    <p className="text-xs text-muted-foreground text-center">Style {idx + 1}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8 md:mt-12 text-center space-y-3 md:space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-6 text-sm md:text-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Link href="/tool">
                Try Image Tool <ImageIcon className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              asChild
              variant="outline"
              className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-6 text-sm md:text-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Link href="/tool?tab=text-to-favicon">
                Try Text Tool <Type className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-10 md:py-16">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Simple Steps to Perfect Favicons
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-md sm:max-w-xl md:max-w-2xl mx-auto">
            Our streamlined process gets you from idea to implementation in minutes, not hours.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 max-w-md sm:max-w-xl md:max-w-6xl mx-auto">
          {howItWorksSteps.map((step, index) => (
            <div key={index} className="relative">
              {index < howItWorksSteps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent z-0" />
              )}
              {index < howItWorksSteps.length - 1 && (
                <div className="md:hidden absolute left-1/2 -translate-x-1/2 top-full w-0.5 h-8 bg-gradient-to-b from-primary/50 to-transparent z-0" />
              )}
              <Card className="text-center border border-border bg-gradient-to-br from-background to-muted/10 hover:shadow-xl transition-all duration-300 hover:scale-105 relative z-10 p-4 md:p-6">
                <CardHeader className="p-0 mb-3 md:mb-4">
                  <div
                    className={`mx-auto rounded-full p-4 md:p-6 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-4 md:mb-6 ${step.color}`}
                  >
                    <step.icon className="w-8 h-8 md:w-10 md:h-10" />
                  </div>
                  <CardTitle className="font-heading text-lg md:text-xl mb-2 md:mb-3">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{step.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Ad Section */}
      <section className="text-center py-6 md:py-8">
        <AdSensePlaceholder type="below-tool" className="mx-auto" />
      </section>

      {/* FAQ Section */}
      <section className="max-w-md sm:max-w-xl md:max-w-4xl mx-auto py-10 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Everything you need to know about creating and implementing favicons.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-3 md:space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border rounded-lg md:rounded-xl px-0 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <AccordionTrigger className="font-semibold text-left hover:no-underline px-4 md:px-6 py-3 md:py-5 text-sm md:text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground px-4 md:px-6 pb-3 md:pb-5 text-xs md:text-sm leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Real-Time Statistics Section */}
      <section className="text-center py-10 md:py-16 bg-gradient-to-r from-muted/30 via-muted/20 to-muted/30 rounded-2xl md:rounded-3xl">
        <div className="mb-8 md:mb-12">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Live Usage Statistics
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-md sm:max-w-xl md:max-w-2xl mx-auto">
            Real-time data showing actual usage of our favicon generator tools. Join thousands of satisfied users!
          </p>
        </div>
        <RealTimeStats />
        <div className="mt-6 md:mt-8">
          <p className="text-xs sm:text-sm text-muted-foreground flex items-center justify-center">
            <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2 text-green-500" />
            Live data • Updates every 30 seconds • 100% transparent statistics
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12 md:py-20 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl md:rounded-3xl my-10 md:my-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative z-10 px-4">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-primary-foreground">
            Ready to Elevate Your Brand?
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-primary-foreground/90 mb-8 md:mb-12 max-w-md sm:max-w-xl md:max-w-2xl mx-auto leading-relaxed">
            Choose your preferred method and create professional favicons in seconds. Join thousands of developers and
            designers who trust our tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <Button
              size="xl"
              asChild
              className="w-full sm:w-auto bg-background hover:bg-background/90 text-primary font-bold px-8 md:px-12 py-4 md:py-8 text-base md:text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
            >
              <Link href="/tool">
                Upload Image <ImageIcon className="w-5 h-5 md:w-6 md:h-6 ml-2 md:ml-3" />
              </Link>
            </Button>
            <Button
              size="xl"
              asChild
              className="w-full sm:w-auto bg-background hover:bg-background/90 text-accent font-bold px-8 md:px-12 py-4 md:py-8 text-base md:text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
            >
              <Link href="/tool?tab=text-to-favicon">
                Create from Text <Type className="w-5 h-5 md:w-6 md:h-6 ml-2 md:ml-3" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Related Tools Section */}
      <section className="text-center py-10 md:py-16">
        <div className="mb-8 md:mb-12">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Explore Other Tools by CognifyTech
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-md sm:max-w-xl md:max-w-2xl mx-auto">
            More powerful tools coming soon to help you create amazing web experiences.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-md sm:max-w-xl md:max-w-5xl mx-auto">
          {[
            {
              title: "AI Logo Maker",
              desc: "Create stunning logos with AI assistance.",
              icon: Sparkles,
              color: "from-blue-500 to-blue-600",
            },
            {
              title: "Image Resizer Pro",
              desc: "Quickly resize images for any platform.",
              icon: ImageIcon,
              color: "from-green-500 to-green-600",
            },
            {
              title: "Color Palette Generator",
              desc: "Discover beautiful color schemes.",
              icon: Eye,
              color: "from-purple-500 to-purple-600",
            },
          ].map((tool, index) => (
            <Card
              key={index}
              className="hover:shadow-xl transition-all duration-300 hover:scale-105 border border-muted-foreground/20 bg-gradient-to-br from-background to-muted/10 p-4 md:p-6"
            >
              <CardHeader className="p-0 mb-3 md:mb-4">
                <div
                  className={`mx-auto bg-gradient-to-br ${tool.color} text-white rounded-full p-3 md:p-4 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-3 md:mb-4`}
                >
                  <tool.icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <CardTitle className="font-heading text-lg md:text-xl">{tool.title}</CardTitle>
                <CardDescription className="text-sm md:text-base">{tool.desc}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Button variant="outline" disabled className="w-full text-sm md:text-base">
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
