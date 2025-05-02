"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useTheme } from "@/context/theme-context"
import "./navbar.css"

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div className="navbar-logo">
          <Link href="/" onClick={closeMobileMenu}>
            <span className="logo-text">
              Skill<span className="logo-accent">Swap</span>
            </span>
          </Link>
        </div>

        <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
          <div className={`hamburger ${mobileMenuOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        <div className={`navbar-menu ${mobileMenuOpen ? "open" : ""}`}>
          {isAuthenticated ? (
            <>
              <div className="navbar-links">
                <Link href="/dashboard" className={pathname === "/dashboard" ? "active" : ""} onClick={closeMobileMenu}>
                  Dashboard
                </Link>
                <Link href="/explore" className={pathname === "/explore" ? "active" : ""} onClick={closeMobileMenu}>
                  Explore
                </Link>
                <Link href="/messages" className={pathname === "/messages" ? "active" : ""} onClick={closeMobileMenu}>
                  Messages
                </Link>
                <Link href="/wallet" className={pathname === "/wallet" ? "active" : ""} onClick={closeMobileMenu}>
                  Wallet
                </Link>
              </div>
              <div className="navbar-auth">
                <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                  {theme === "light" ? "🌙" : "☀️"}
                </button>
                <div className="user-menu">
                  <div className="user-avatar">
                    {user?.avatar ? (
                      <img src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    ) : (
                      <div className="avatar-placeholder">{user?.name?.charAt(0) || "?"}</div>
                    )}
                  </div>
                  <div className="user-dropdown">
                    <Link href="/profile" onClick={closeMobileMenu}>
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        closeMobileMenu()
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="navbar-auth">
              <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === "light" ? "🌙" : "☀️"}
              </button>
              <Link href="/login" className="btn btn-secondary" onClick={closeMobileMenu}>
                Login
              </Link>
              <Link href="/register" className="btn btn-primary" onClick={closeMobileMenu}>
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
