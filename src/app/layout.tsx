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
          <Navbar />
          <div>{children}</div>
        </body>
      </html>
    </ClerkProvider>
  )
}
