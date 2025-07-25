// ZIP file generation utility
import JSZip from "jszip"

export interface ZipFileEntry {
  name: string
  content: Blob | string
  folder?: string
}

export async function createFaviconZip(
  faviconResults: Array<{ name: string; url: string }>,
  htmlCode: string,
  manifestContent: string,
  browserConfigXml?: string,
): Promise<Blob> {
  const zip = new JSZip()

  // Create folders
  const iconsFolder = zip.folder("icons")
  const codeFolder = zip.folder("code")

  // Add favicon files
  for (const result of faviconResults) {
    try {
      const response = await fetch(result.url)
      const blob = await response.blob()
      iconsFolder?.file(result.name, blob)
    } catch (error) {
      console.error(`Failed to add ${result.name} to zip:`, error)
    }
  }

  // Add code files
  codeFolder?.file("favicon-html.html", htmlCode)
  codeFolder?.file("manifest.json", manifestContent)

  if (browserConfigXml) {
    codeFolder?.file("browserconfig.xml", browserConfigXml)
  }

  // Add README
  const readme = `# Favicon Package
  
Generated by CognifyTech Favicon Generator

## Installation Instructions

1. Upload all files from the 'icons' folder to your website's root directory
2. Copy the HTML code from 'code/favicon-html.html' and paste it in your <head> section
3. Upload the manifest.json file to your root directory
4. Test your favicon by visiting your website

## Files Included

### Icons
- favicon.ico: Standard favicon for browsers
- Various PNG sizes: For different devices and contexts
- apple-touch-icon.png: For iOS devices
- android-chrome-*.png: For Android devices

### Code
- favicon-html.html: HTML code to include in your website
- manifest.json: Web app manifest for PWA support
- browserconfig.xml: Microsoft browser configuration (if applicable)

## Support

For support or questions, visit: https://cognifytech.in/contact

Generated on: ${new Date().toISOString()}
`

  zip.file("README.md", readme)

  return await zip.generateAsync({ type: "blob" })
}

export async function downloadZipFile(zipBlob: Blob, filename = "favicon-package.zip") {
  const url = URL.createObjectURL(zipBlob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
