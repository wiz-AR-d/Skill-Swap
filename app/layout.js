import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/context/theme-context"
import Navbar from "@/components/navbar"
import { AuthProvider } from "@/context/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Skill Swap - Exchange Skills with Virtual Coins",
  description: "Connect with people to learn and teach skills using virtual coins",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <main>{children}</main>
            <footer className="footer">
              <div className="container">
                <p>&copy; {new Date().getFullYear()} Skill Swap. All rights reserved.</p>
              </div>
            </footer>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
