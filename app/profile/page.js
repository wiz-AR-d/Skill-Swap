"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useSkillStore } from "@/store/skill-store"
import SkillCard from "@/components/skill-card"
import "@/components/profile.css"

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth()
  const { userSkillsOffered, userSkillsWanted } = useSkillStore()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
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
        <p>Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} />
          ) : (
            <div className="avatar-placeholder">{user?.name?.charAt(0) || "?"}</div>
          )}
        </div>
        <div className="profile-info">
          <div className="profile-info-header">
            <h1>{user?.name}</h1>
            <button className="btn btn-secondary btn-sm" onClick={() => router.push("/profile/edit")}>
              Edit Profile
            </button>
          </div>
          <p className="profile-email">{user?.email}</p>
          <p className="profile-bio">{user?.bio || "No bio yet"}</p>
        </div>
      </div>

      <div className="profile-content">
        <section className="skills-section">
          <div className="section-header">
            <h2>Skills I Can Teach</h2>
          </div>

          {userSkillsOffered.length === 0 ? (
            <div className="empty-state">
              <p>You haven't added any skills to teach yet.</p>
              <button className="btn btn-secondary" onClick={() => router.push("/skills/new")}>
                Offer a Skill
              </button>
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
          </div>

          {userSkillsWanted.length === 0 ? (
            <div className="empty-state">
              <p>You haven't added any skills you want to learn yet.</p>
              <button className="btn btn-secondary" onClick={() => router.push("/profile/edit")}>
                Update Profile
              </button>
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