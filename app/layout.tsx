import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { getCategories } from "@/services/google_sheet"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cambium Academy",
  description: "A knowledge hub for educational content organized by categories",
}

const categories = await getCategories()

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className="light"
      style={{ colorScheme: "light" }}
    >
      <head />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="flex min-h-screen flex-col bg-[#FFEBD8] dark:bg-[#0a0043] text-[#0a0043] dark:text-[#FFEBD8]">
            <Navbar categories={categories} />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
