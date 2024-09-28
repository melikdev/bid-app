import Navbar from "@/components/navbar"
import { ClerkProvider } from "@clerk/nextjs"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div>
            <Navbar />
          </div>
          <div>{children}</div>
        </body>
      </html>
    </ClerkProvider>
  )
}
