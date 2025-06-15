"use server"

import { z } from "zod"
import nodemailer from "nodemailer"

// Email validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export async function sendContactEmail(formData: FormData) {
  try {
    // Extract and validate form data
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    // Validate the data
    const validatedData = contactFormSchema.parse(rawData)

    // Create a transporter for Hostinger email
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 587,
      secure: false, // Use STARTTLS
      auth: {
        user: "contact@cognifytech.in",
        pass: process.env.EMAIL_PASSWORD, // Your email password
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    // Email content
    const mailOptions = {
      from: '"Favicon Generator Contact" <contact@cognifytech.in>',
      to: "contact@cognifytech.in",
      replyTo: validatedData.email,
      subject: `[Contact Form] ${validatedData.subject}`,
      text: `
Name: ${validatedData.name}
Email: ${validatedData.email}

Message:
${validatedData.message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #0070f3;">New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${validatedData.name}</p>
  <p><strong>Email:</strong> ${validatedData.email}</p>
  <p><strong>Subject:</strong> ${validatedData.subject}</p>
  <h3>Message:</h3>
  <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
    ${validatedData.message.replace(/\n/g, "<br>")}
  </div>
  <p style="color: #666; margin-top: 20px; font-size: 12px;">
    This email was sent from the contact form on the Favicon Generator website.
  </p>
</div>
      `,
    }

    // Send the email
    await transporter.sendMail(mailOptions)

    return { success: true, message: "Your message has been sent successfully!" }
  } catch (error) {
    console.error("Contact form error:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation error. Please check your inputs.",
        errors: error.errors.map((e) => ({ path: e.path.join("."), message: e.message })),
      }
    }

    return {
      success: false,
      message: "Failed to send your message. Please try again later.",
    }
  }
}
