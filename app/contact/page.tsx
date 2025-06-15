import type { Metadata } from "next"
import ContactClientPage from "./contact-client" // Import the newly created client component

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with CognifyTech. Send us a message, find our contact details, or check our support FAQs.",
}

export default function ContactPage() {
  return <ContactClientPage />
}
