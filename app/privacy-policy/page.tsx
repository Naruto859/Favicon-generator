import Breadcrumb from "@/components/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, FileText } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the Privacy Policy for CognifyTech.in and our Favicon Generator tool. Understand how we collect, use, and protect your data.",
  robots: { index: false, follow: true }, // Often good to noindex privacy pages if they are standard
}

export default function PrivacyPolicyPage() {
  const lastUpdated = "May 29, 2025"

  return (
    <div className="space-y-8">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
      <section className="text-center">
        <ShieldCheck className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground">Last Updated: {lastUpdated}</p>
      </section>

      <Card className="prose dark:prose-invert max-w-4xl mx-auto p-6 md:p-8 prose-headings:font-heading prose-headings:text-primary">
        <CardHeader className="px-0 pt-0 -mx-6 md:-mx-8">
          <CardTitle className="flex items-center text-3xl not-prose">
            <FileText className="w-8 h-8 mr-3" /> Privacy Policy for CognifyTech.in
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0 -mx-6 md:-mx-8">
          <h2>1. Introduction</h2>
          <p>
            Welcome to CognifyTech.in ("us", "we", or "our"). We operate the website CognifyTech.in and the Favicon
            Generator tool (collectively, the "Service"). This Privacy Policy informs you of our policies regarding the
            collection, use, and disclosure of personal data when you use our Service and the choices you have
            associated with that data.
          </p>
          <p>
            By using the Service, you agree to the collection and use of information in accordance with this policy.
          </p>

          <h2>2. Information Collection and Use</h2>
          <p>
            We collect several different types of information for various purposes to provide and improve our Service to
            you.
          </p>
          <h3>Types of Data Collected:</h3>
          <ul>
            <li>
              <strong>Uploaded Images:</strong> When you use our Favicon Generator tool, you may upload images. These
              images are processed client-side within your browser. We do not store your uploaded images on our servers
              after processing. The processing is done in real-time, and the images are discarded from memory once you
              close the browser tab or navigate away, unless explicitly saved by you through download.
            </li>
            <li>
              <strong>Usage Data:</strong> We may collect information on how the Service is accessed and used ("Usage
              Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g.,
              IP address), browser type, browser version, the pages of our Service that you visit, the time and date of
              your visit, the time spent on those pages, unique device identifiers, and other diagnostic data. This is
              collected through standard server logs and analytics tools like Google Analytics (see Third-Party Service
              Providers).
            </li>
            <li>
              <strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to
              track the activity on our Service and hold certain information. Cookies are files with a small amount of
              data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies
              or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to
              use some portions of our Service. Examples of Cookies we use: Session Cookies, Preference Cookies,
              Security Cookies.
            </li>
          </ul>

          <h2>3. How User Uploads Are Handled</h2>
          <p>
            <strong>Client-Side Processing:</strong> The core functionality of our Favicon Generator tool, including
            image manipulation (resizing, format conversion, color adjustments, etc.), happens directly in your web
            browser (client-side) using JavaScript. Your original uploaded images are NOT transferred to or stored on
            our servers for this processing. This approach enhances your privacy and the speed of the tool.
          </p>

          <h2>4. Use of Data</h2>
          <p>CognifyTech.in uses the collected data for various purposes:</p>
          <ul>
            <li>To provide and maintain our Service</li>
            <li>To improve the Service and develop new features</li>
            <li>To monitor the usage of our Service</li>
            <li>To detect, prevent, and address technical issues</li>
            <li>To provide advertisements through third-party services like Google AdSense</li>
          </ul>

          <h2>5. Cookie Policy</h2>
          <p>
            Our website uses cookies to enhance user experience, analyze site traffic, and for advertising purposes. By
            using our website, you consent to our use of cookies in accordance with this Privacy Policy and our Cookie
            Policy (if provided separately). You can manage your cookie preferences through your browser settings.
          </p>

          <h2>6. Third-Party Service Providers</h2>
          <p>
            We may employ third-party companies and individuals to facilitate our Service ("Service Providers"), to
            provide the Service on our behalf, to perform Service-related services, or to assist us in analyzing how our
            Service is used. These third parties have access to your Personal Data only to perform these tasks on our
            behalf and are obligated not to disclose or use it for any other purpose.
          </p>
          <ul>
            <li>
              <strong>Google AdSense:</strong> We use Google AdSense to display advertisements on our website. Google,
              as a third-party vendor, uses cookies to serve ads on our Service. Google's use of the DART cookie enables
              it to serve ads to our users based on their visit to our Service and other sites on the Internet. Users
              may opt out of the use of the DART cookie by visiting the Google Ad and Content Network privacy policy.
            </li>
            <li>
              <strong>Google Analytics:</strong> We use Google Analytics to monitor and analyze web traffic. Google
              Analytics gathers information about website use by means of cookies. The information gathered relating to
              our website is used to create reports about the use of our website. Google's privacy policy is available
              at:{" "}
              <a href="https://www.google.com/policies/privacy/" target="_blank" rel="noopener noreferrer">
                https://www.google.com/policies/privacy/
              </a>
              .
            </li>
          </ul>

          <h2>7. User Rights (e.g., GDPR, CCPA)</h2>
          <p>
            Depending on your jurisdiction, you may have certain rights regarding your personal data, such as the right
            to access, correct, delete, or restrict the processing of your data. If you wish to exercise any of these
            rights, please contact us at <a href="mailto:contact@cognifytech.in">contact@cognifytech.in</a>.
          </p>
          <p>
            Since we primarily process images client-side and do not store them, requests related to uploaded images
            would generally pertain to data held by you or your browser cache.
          </p>

          <h2>8. Security of Data</h2>
          <p>
            The security of your data is important to us, but remember that no method of transmission over the Internet
            or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to
            protect your Personal Data, we cannot guarantee its absolute security.
          </p>

          <h2>9. Links to Other Sites</h2>
          <p>
            Our Service may contain links to other sites that are not operated by us. If you click on a third-party
            link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy
            of every site you visit. We have no control over and assume no responsibility for the content, privacy
            policies, or practices of any third-party sites or services.
          </p>

          <h2>10. Children's Privacy</h2>
          <p>
            Our Service does not address anyone under the age of 13 ("Children"). We do not knowingly collect personally
            identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware
            that your Children has provided us with Personal Data, please contact us. If we become aware that we have
            collected Personal Data from children without verification of parental consent, we take steps to remove that
            information from our servers.
          </p>

          <h2>11. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page. We will let you know via email and/or a prominent notice on our Service, prior
            to the change becoming effective and update the "last updated" date at the top of this Privacy Policy. You
            are advised to review this Privacy Policy periodically for any changes.
          </p>

          <h2>12. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us:</p>
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
