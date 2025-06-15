"use server"

import nodemailer from "nodemailer"

export async function testEmailConfiguration() {
  try {
    // Fixed: createTransport instead of createTransporter
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 587,
      secure: false,
      auth: {
        user: "contact@cognifytech.in",
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    // Verify connection
    await transporter.verify()
    console.log("SMTP connection verified successfully")

    // Send test email
    const testEmail = {
      from: '"Favicon Generator" <contact@cognifytech.in>',
      to: "contact@cognifytech.in",
      subject: "Email Configuration Test",
      text: "This is a test email to verify the email configuration is working correctly.",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0070f3;">Email Configuration Test</h2>
          <p>This is a test email to verify that the email configuration is working correctly.</p>
          <p>If you receive this email, your Hostinger email setup is working properly!</p>
          <p style="color: #666; margin-top: 20px; font-size: 12px;">
            Sent from: Favicon Generator by CognifyTech
          </p>
        </div>
      `,
    }

    const info = await transporter.sendMail(testEmail)
    console.log("Test email sent:", info.messageId)
    return { success: true, message: "Test email sent successfully!", messageId: info.messageId }
  } catch (error) {
    console.error("Email test failed:", error)
    return {
      success: false,
      message: `Email test failed: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}
