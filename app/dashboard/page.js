"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { useSkillStore } from "@/store/skill-store"
import SkillCard from "@/components/skill-card"
import "@/components/dashboard.css"

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth()
  const { userSkillsOffered, userSkillsWanted } = useSkillStore()
  const router = useRouter()
  const [coinBalance, setCoinBalance] = useState(100) // Mock initial balance
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome, {user?.name || "User"}!</h1>
          <p className="coin-balance">
            <span className="coin-icon">🪙</span>
            <span className="coin-amount">{coinBalance}</span> coins available
          </p>
        </div>
        <div className="dashboard-actions">
          <Link href="/skills/new" className="btn btn-primary">
            Offer a New Skill
          </Link>
          <Link href="/explore" className="btn btn-secondary">
            Find Skills to Learn
          </Link>
        </div>
      </div>

      <div className="dashboard-content">
        <section className="skills-section">
          <div className="section-header">
            <h2>Skills I Can Teach</h2>
            <Link href="/skills/offered" className="view-all">
              View All
            </Link>
          </div>

          {userSkillsOffered.length === 0 ? (
            <div className="empty-state">
              <p>You haven't added any skills to teach yet.</p>
              <Link href="/skills/new" className="btn btn-secondary">
                Offer a Skill
              </Link>
            </div>
          ) : (
            <div className="skills-grid">
              {userSkillsOffered.map((skill) => (
                <SkillCard key={skill.id} skill={skill} type="offered" />
              ))}
            </div>
          )}
        </section>

        <section className="skills-section">
          <div className="section-header">
            <h2>Skills I Want to Learn</h2>
            <Link href="/skills/wanted" className="view-all">
              View All
            </Link>
          </div>

          {userSkillsWanted.length === 0 ? (
            <div className="empty-state">
              <p>You haven't added any skills you want to learn yet.</p>
              <Link href="/profile/edit" className="btn btn-secondary">
                Update Profile
              </Link>
            </div>
          ) : (
            <div className="skills-grid">
              {userSkillsWanted.map((skill) => (
                <SkillCard key={skill.id} skill={skill} type="wanted" />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
