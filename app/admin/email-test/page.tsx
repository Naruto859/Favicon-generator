"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { testEmailConfiguration } from "@/lib/email-test"
import { useToast } from "@/hooks/use-toast"
import { Mail, CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EmailTestPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; messageId?: string } | null>(null)
  const { toast } = useToast()

  const handleTestEmail = async () => {
    setIsLoading(true)
    try {
      const result = await testEmailConfiguration()
      setTestResult(result)

      if (result.success) {
        toast({
          title: "Email Test Successful",
          description: "Test email sent successfully to contact@cognifytech.in",
        })
      } else {
        toast({
          title: "Email Test Failed",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      setTestResult({ success: false, message: "Failed to run email test" })
      toast({
        title: "Error",
        description: "Failed to run email test",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center mb-8">
        <Mail className="h-16 w-16 mx-auto text-primary mb-4" />
        <h1 className="text-3xl font-bold mb-2">Email Configuration Test</h1>
        <p className="text-muted-foreground">Test the email configuration for the contact form</p>
      </div>

      <Tabs defaultValue="test">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="test">Test Email</TabsTrigger>
          <TabsTrigger value="config">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="test">
          <Card>
            <CardHeader>
              <CardTitle>Hostinger Email Test</CardTitle>
              <CardDescription>
                This will send a test email to contact@cognifytech.in to verify the email configuration is working
                properly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                  Make sure you have set the EMAIL_PASSWORD environment variable before testing.
                </AlertDescription>
              </Alert>

              <Button onClick={handleTestEmail} disabled={isLoading} className="w-full">
                {isLoading ? "Sending Test Email..." : "Send Test Email"}
              </Button>

              {testResult && (
                <div
                  className={`flex items-center gap-2 p-4 rounded-lg ${
                    testResult.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                  }`}
                >
                  {testResult.success ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                  <div>
                    <p className="text-sm font-medium">{testResult.message}</p>
                    {testResult.messageId && <p className="text-xs mt-1">Message ID: {testResult.messageId}</p>}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="config">
          <Card>
            <CardHeader>
              <CardTitle>Hostinger Email Configuration</CardTitle>
              <CardDescription>Your current email configuration details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">SMTP Settings</h3>
                  <div className="bg-muted p-3 rounded-md text-sm">
                    <p>
                      <strong>Server:</strong> smtp.hostinger.com
                    </p>
                    <p>
                      <strong>Port:</strong> 587
                    </p>
                    <p>
                      <strong>Security:</strong> STARTTLS
                    </p>
                    <p>
                      <strong>Username:</strong> contact@cognifytech.in
                    </p>
                    <p>
                      <strong>Password:</strong> [Set via environment variable]
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">MX Records</h3>
                  <div className="bg-muted p-3 rounded-md text-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Records correctly configured</span>
                    </div>
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-1">Type</th>
                          <th className="text-left py-1">Name</th>
                          <th className="text-left py-1">Value</th>
                          <th className="text-left py-1">Priority</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-1">MX</td>
                          <td className="py-1">@</td>
                          <td className="py-1">mx1.hostinger.com</td>
                          <td className="py-1">5</td>
                        </tr>
                        <tr>
                          <td className="py-1">MX</td>
                          <td className="py-1">@</td>
                          <td className="py-1">mx2.hostinger.com</td>
                          <td className="py-1">10</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Alert className="w-full">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  If you change your Hostinger email password, remember to update the EMAIL_PASSWORD environment
                  variable.
                </AlertDescription>
              </Alert>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
