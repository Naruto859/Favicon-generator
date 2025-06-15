"use client"
import Breadcrumb from "@/components/breadcrumb"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Send, MessageSquareIcon as MessageSquareQuestion } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useState, type FormEvent } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const supportFaqs = [
  {
    question: "How long does it take to get a response?",
    answer:
      "We typically respond to inquiries within 24-48 business hours. Response times may vary depending on the volume of requests.",
  },
  {
    question: "Do you offer phone support?",
    answer:
      "Currently, we primarily offer support via email and our contact form to ensure all queries are tracked efficiently. For urgent matters, please indicate this in your message.",
  },
  {
    question: "Can I request a new feature for the Favicon Generator?",
    answer:
      "We love hearing feedback and suggestions from our users. Please use the contact form to submit your feature requests, and our team will review them.",
  },
  {
    question: "I found a bug, where can I report it?",
    answer:
      "We appreciate you helping us improve! Please provide as much detail as possible about the bug (e.g., browser, steps to reproduce) using the contact form, and select 'Bug Report' as the subject.",
  },
]

export default function ContactPageClient() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("Form submitted:", formData)
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    })
    setFormData({ name: "", email: "", subject: "", message: "" })
    setIsSubmitting(false)
  }

  return (
    <div className="space-y-12">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]} />
      <section className="text-center">
        <Mail className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We're here to help! Whether you have a question, feedback, or a collaboration idea, feel free to reach out.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Send Us a Message</CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g., Feature Request, Support"
                  required
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  rows={5}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" /> Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div className="flex items-start">
                <Mail className="w-5 h-5 mr-3 mt-1 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <a href="mailto:contact@cognifytech.in" className="hover:text-primary">
                    contact@cognifytech.in
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-5 h-5 mr-3 mt-1 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Phone (Placeholder)</h3>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-1 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Address (Placeholder)</h3>
                  <p>123 Tech Street, Innovation City, IN 46032, India</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <MessageSquareQuestion className="w-5 h-5 mr-2 text-primary" /> Support FAQs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {supportFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-sm text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-xs text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
