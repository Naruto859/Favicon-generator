"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }
    if (!agreed) {
      toast({
        title: "Agreement Required",
        description: "Please agree to the terms to subscribe.",
        variant: "destructive",
      })
      return
    }
    // TODO: Actual newsletter signup logic (e.g., API call)
    console.log("Newsletter signup:", email)
    setSubmitted(true)
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    })
    setEmail("")
    setAgreed(false)
    // setTimeout(() => setSubmitted(false), 5000); // Optional: Reset message after 5s
  }

  if (submitted) {
    return <p className="text-green-600 dark:text-green-400 text-sm">Thanks for subscribing! Check your inbox.</p>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        aria-label="Email for newsletter"
        className="bg-background"
      />
      <div className="flex items-start space-x-2">
        <Checkbox
          id="terms-newsletter"
          checked={agreed}
          onCheckedChange={(checked) => setAgreed(Boolean(checked))}
          aria-labelledby="terms-newsletter-label"
        />
        <Label
          htmlFor="terms-newsletter"
          id="terms-newsletter-label"
          className="text-xs text-muted-foreground leading-tight"
        >
          I agree to receive emails and understand I can unsubscribe at any time. (GDPR compliant)
        </Label>
      </div>
      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
        Subscribe
      </Button>
    </form>
  )
}
