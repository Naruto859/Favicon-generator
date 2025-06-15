import Breadcrumb from "@/components/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, FileText } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Disclaimer for CognifyTech.in and the Favicon Generator tool. Information about tool accuracy, warranties, and third-party links.",
}

export default function DisclaimerPage() {
  const lastUpdated = "May 29, 2025"

  return (
    <div className="space-y-8">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Disclaimer" }]} />
      <section className="text-center">
        <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-2">Disclaimer</h1>
        <p className="text-muted-foreground">Last Updated: {lastUpdated}</p>
      </section>

      <Card className="prose dark:prose-invert max-w-4xl mx-auto p-6 md:p-8 prose-headings:font-heading prose-headings:text-amber-600 dark:prose-headings:text-amber-400">
        <CardHeader className="px-0 pt-0 -mx-6 md:-mx-8">
          <CardTitle className="flex items-center text-3xl not-prose">
            <FileText className="w-8 h-8 mr-3" /> Disclaimer for CognifyTech.in
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0 -mx-6 md:-mx-8">
          <h2>1. General Information</h2>
          <p>
            The information provided by CognifyTech.in ("we," "us," or "our") on CognifyTech.in (the "Site") and our
            Favicon Generator tool (the "Service") is for general informational purposes only. All information on the
            Site and Service is provided in good faith, however, we make no representation or warranty of any kind,
            express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness
            of any information on the Site or Service.
          </p>

          <h2>2. Tool Accuracy and No Warranty</h2>
          <p>
            The Favicon Generator tool is provided on an "AS IS" and "AS AVAILABLE" basis. While we endeavor to provide
            a high-quality tool, we make no warranty that the favicons generated will be perfectly accurate, suitable
            for all purposes, or free from errors or defects. The quality and appearance of the generated favicons can
            depend significantly on the quality of the image uploaded by the user and the settings chosen.
          </p>
          <p>
            YOUR USE OF THE SITE AND SERVICE AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE AND SERVICE IS SOLELY AT
            YOUR OWN RISK. UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND
            INCURRED AS A RESULT OF THE USE OF THE SITE OR SERVICE OR RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE
            AND SERVICE.
          </p>
          <p>
            We expressly disclaim all warranties of any kind, whether express or implied, including, but not limited to,
            the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
          </p>

          <h2>3. External Links Disclaimer</h2>
          <p>
            The Site and Service may contain (or you may be sent through the Site or Service) links to other websites or
            content belonging to or originating from third parties or links to websites and features in banners or other
            advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy,
            validity, reliability, availability, or completeness by us.
          </p>
          <p>
            WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR THE ACCURACY OR RELIABILITY OF ANY
            INFORMATION OFFERED BY THIRD-PARTY WEBSITES LINKED THROUGH THE SITE OR ANY WEBSITE OR FEATURE LINKED IN ANY
            BANNER OR OTHER ADVERTISING. WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY
            TRANSACTION BETWEEN YOU AND THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES.
          </p>

          <h2>4. Professional Disclaimer</h2>
          <p>
            The Site cannot and does not contain professional advice. The information is provided for general
            informational and educational purposes only and is not a substitute for professional advice. Accordingly,
            before taking any actions based upon such information, we encourage you to consult with the appropriate
            professionals. We do not provide any kind of professional advice.
          </p>

          <h2>5. Errors and Omissions Disclaimer</h2>
          <p>
            While we have made every attempt to ensure that the information contained in this site has been obtained
            from reliable sources, CognifyTech.in is not responsible for any errors or omissions or for the results
            obtained from the use of this information. All information in this site is provided "as is", with no
            guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information.
          </p>

          <h2>6. Fair Use Disclaimer (If applicable for blog content, etc.)</h2>
          <p>
            The Site may contain copyrighted material the use of which has not always been specifically authorized by
            the copyright owner. We are making such material available for criticism, comment, news reporting, teaching,
            scholarship, or research. We believe this constitutes a "fair use" of any such copyrighted material as
            provided for in section 107 of the United States Copyright law.
          </p>

          <h2>7. Views Expressed Disclaimer</h2>
          <p>
            The Site may contain views and opinions which are those of the authors and do not necessarily reflect the
            official policy or position of any other author, agency, organization, employer, or company, including
            CognifyTech.in.
          </p>

          <h2>8. Copyright Information</h2>
          <p>
            All content on CognifyTech.in, including text, graphics, logos (excluding user-uploaded images for favicon
            generation), and software, is the property of CognifyTech.in or its content suppliers and protected by
            international copyright laws. The compilation of all content on this site is the exclusive property of
            CognifyTech.in.
          </p>
          <p>
            If you believe that any content on our Site infringes upon your copyright, please contact us at{" "}
            <a href="mailto:contact@cognifytech.in">contact@cognifytech.in</a> with a detailed description of the
            alleged infringement.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            Should you have any feedback, comments, requests for technical support or other inquiries, please contact us
            by email: <a href="mailto:contact@cognifytech.in">contact@cognifytech.in</a>.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
