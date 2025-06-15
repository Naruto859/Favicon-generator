import Breadcrumb from "@/components/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the Terms of Service for CognifyTech.in and our Favicon Generator tool. Understand your rights and obligations when using our services.",
}

export default function TermsOfServicePage() {
  const lastUpdated = "May 29, 2025"

  return (
    <div className="space-y-8">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]} />
      <section className="text-center">
        <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground">Last Updated: {lastUpdated}</p>
      </section>

      <Card className="prose dark:prose-invert max-w-4xl mx-auto p-6 md:p-8 prose-headings:font-heading prose-headings:text-primary">
        <CardHeader className="px-0 pt-0 -mx-6 md:-mx-8">
          <CardTitle className="flex items-center text-3xl not-prose">
            <FileText className="w-8 h-8 mr-3" /> Terms of Service for CognifyTech.in
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0 -mx-6 md:-mx-8">
          <h2>1. Introduction and Acceptance of Terms</h2>
          <p>
            Welcome to CognifyTech.in ("us", "we", or "our"). These Terms of Service ("Terms") govern your use of our
            website CognifyTech.in and the Favicon Generator tool (collectively, the "Service"). Please read these Terms
            carefully before using our Service.
          </p>
          <p>
            By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of
            the terms, then you may not access the Service.
          </p>

          <h2>2. Description of Services</h2>
          <p>
            CognifyTech.in provides a free online Favicon Generator tool that allows users to upload images and generate
            favicons in various formats. The Service also includes informational content, such as blog articles, related
            to favicons and web development.
          </p>
          <p>
            All image processing for the Favicon Generator tool is performed client-side within your browser. We do not
            store your uploaded images on our servers beyond the session required for processing.
          </p>

          <h2>3. User Obligations and Prohibited Uses</h2>
          <p>
            You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to
            use the Service:
          </p>
          <ul>
            <li>In any way that violates any applicable national or international law or regulation.</li>
            <li>
              To upload or transmit any material that is infringing, defamatory, obscene, or otherwise objectionable.
            </li>
            <li>
              To engage in any activity that interferes with or disrupts the Service (or the servers and networks which
              are connected to the Service).
            </li>
            <li>
              To attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Service,
              the server on which the Service is stored, or any server, computer, or database connected to the Service.
            </li>
            <li>To upload any images for which you do not have the necessary rights or permissions.</li>
          </ul>

          <h2>4. Intellectual Property Rights</h2>
          <p>
            <strong>User-Uploaded Content:</strong> You retain all ownership rights to the images you upload to the
            Favicon Generator tool ("User Content"). By uploading User Content, you grant us a limited, worldwide,
            non-exclusive, royalty-free license to use, reproduce, modify (for the purpose of favicon generation), and
            display such User Content solely for the purpose of providing the Service to you (i.e., generating favicons
            on your behalf client-side).
          </p>
          <p>
            <strong>Our Content:</strong> The Service and its original content (excluding User Content), features, and
            functionality are and will remain the exclusive property of CognifyTech.in and its licensors. The Service is
            protected by copyright, trademark, and other laws of both India and foreign countries. Our trademarks and
            trade dress may not be used in connection with any product or service without the prior written consent of
            CognifyTech.in.
          </p>

          <h2>5. Disclaimer of Warranties and Limitation of Liability</h2>
          <p>
            <strong>Disclaimer about Generated Favicons:</strong> The Favicon Generator tool is provided on an "AS IS"
            and "AS AVAILABLE" basis. While we strive to ensure the accuracy and quality of the generated favicons, we
            make no warranties, expressed or implied, regarding the suitability, reliability, availability, timeliness,
            security, lack of errors, or accuracy of the generated favicons or the Service itself.
          </p>
          <p>
            You acknowledge that the quality of generated favicons may depend on the quality of the image you upload and
            the settings you choose. We are not responsible for any issues arising from the use of favicons generated by
            our tool on your website.
          </p>
          <p>
            <strong>Limitation of Liability:</strong> To the fullest extent permitted by applicable law, in no event
            shall CognifyTech.in, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable
            for any indirect, incidental, special, consequential, or punitive damages, including without limitation,
            loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use
            of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service;
            (iii) any content obtained from the Service; and (iv) unauthorized access, use, or alteration of your
            transmissions or content, whether based on warranty, contract, tort (including negligence), or any other
            legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy
            set forth herein is found to have failed of its essential purpose.
          </p>

          <h2>6. Termination</h2>
          <p>
            We may terminate or suspend your access to our Service immediately, without prior notice or liability, for
            any reason whatsoever, including without limitation if you breach the Terms.
          </p>
          <p>
            All provisions of the Terms which by their nature should survive termination shall survive termination,
            including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of
            liability.
          </p>

          <h2>7. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of India, without regard to its
            conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be
            considered a waiver of those rights.
          </p>

          <h2>8. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
            material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What
            constitutes a material change will be determined at our sole discretion. By continuing to access or use our
            Service after those revisions become effective, you agree to be bound by the revised terms.
          </p>

          <h2>9. Contact Information</h2>
          <p>If you have any questions about these Terms, please contact us:</p>
          <ul>
            <li>
              By email: <a href="mailto:contact@cognifytech.in">contact@cognifytech.in</a>
            </li>
            <li>
              By visiting this page on our website: <a href="/contact">CognifyTech.in/contact</a>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
