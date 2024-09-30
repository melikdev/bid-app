import Navbar from "@/components/navbar"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"
import "@uploadthing/react/styles.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-slate-500 h-screen">
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
