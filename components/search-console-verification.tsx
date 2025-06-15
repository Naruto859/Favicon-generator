"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, FileCode, Database } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { generateSearchConsoleVerificationCode } from "@/lib/search-console-utils"

type VerificationType = {
  type: string
  value: string
}

export default function SearchConsoleVerification() {
  const { toast } = useToast()
  const [verification, setVerification] = useState<VerificationType>({
    type: "meta",
    value: "",
  })
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast({ title: "Copied to clipboard!" })
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Google Search Console Verification</CardTitle>
        <CardDescription>
          Verify your website ownership with Google Search Console to access powerful SEO tools and insights.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="meta">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="meta">
              <FileCode className="w-4 h-4 mr-2" />
              Meta Tag
            </TabsTrigger>
            <TabsTrigger value="html">
              <FileCode className="w-4 h-4 mr-2" />
              HTML File
            </TabsTrigger>
            <TabsTrigger value="dns">
              <Database className="w-4 h-4 mr-2" />
              DNS Record
            </TabsTrigger>
          </TabsList>

          <TabsContent value="meta" className="space-y-4">
            <div>
              <Label>Meta Tag Verification Code</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Enter the verification code from Google Search Console
              </p>
              <Input
                value={verification.value}
                onChange={(e) => setVerification({ type: "meta", value: e.target.value })}
                placeholder="Enter verification code (e.g., 1a2b3c4d5e6f7g8h9i0j)"
              />
            </div>

            {verification.value && (
              <div>
                <Label>Add this to your &lt;head&gt; section:</Label>
                <div className="relative mt-1">
                  <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto">
                    <code>{generateSearchConsoleVerificationCode({ type: "meta", value: verification.value })}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() =>
                      copyToClipboard(
                        generateSearchConsoleVerificationCode({ type: "meta", value: verification.value }),
                      )
                    }
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="html" className="space-y-4">
            <div>
              <Label>HTML File Verification</Label>
              <p className="text-sm text-muted-foreground mb-2">Enter the HTML filename from Google Search Console</p>
              <Input
                value={verification.value}
                onChange={(e) => setVerification({ type: "html", value: e.target.value })}
                placeholder="Enter filename (e.g., google1a2b3c4d5e6f.html)"
              />
            </div>

            {verification.value && (
              <div>
                <Label>Create this file in your website root:</Label>
                <div className="relative mt-1">
                  <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto">
                    <code>{generateSearchConsoleVerificationCode({ type: "html", value: verification.value })}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() =>
                      copyToClipboard(
                        generateSearchConsoleVerificationCode({ type: "html", value: verification.value }),
                      )
                    }
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="dns" className="space-y-4">
            <div>
              <Label>DNS Verification</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Enter the TXT record value from Google Search Console
              </p>
              <Input
                value={verification.value}
                onChange={(e) => setVerification({ type: "dns", value: e.target.value })}
                placeholder="Enter TXT record value"
              />
            </div>

            {verification.value && (
              <div>
                <Label>Add this TXT record to your domain DNS:</Label>
                <div className="relative mt-1">
                  <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto">
                    <code>{generateSearchConsoleVerificationCode({ type: "dns", value: verification.value })}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() =>
                      copyToClipboard(generateSearchConsoleVerificationCode({ type: "dns", value: verification.value }))
                    }
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="pt-4 border-t">
          <p className="text-sm font-medium">Why verify with Google Search Console?</p>
          <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc pl-5">
            <li>Monitor your site's performance in Google Search results</li>
            <li>Receive alerts if Google encounters indexing issues</li>
            <li>See which sites link to your website</li>
            <li>Troubleshoot mobile usability issues</li>
            <li>Request indexing of new or updated content</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
