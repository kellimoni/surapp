import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import type React from "react"
import { Wallet, PieChart, Settings } from "lucide-react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "CryptoVault",
  description: "Your secure crypto wallet",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            {children}
            <nav className="mt-auto border-t">
              <ul className="flex justify-around p-4">
                <li>
                  <a href="#" className="flex flex-col items-center text-blue-600">
                    <Wallet className="h-6 w-6" />
                    <span className="text-xs mt-1">Wallet</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex flex-col items-center text-gray-500">
                    <PieChart className="h-6 w-6" />
                    <span className="text-xs mt-1">Portfolio</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex flex-col items-center text-gray-500">
                    <Settings className="h-6 w-6" />
                    <span className="text-xs mt-1">Settings</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'