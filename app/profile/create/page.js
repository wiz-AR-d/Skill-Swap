"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useSkillStore } from "@/store/skill-store"
import TagInput from "@/components/tag-input"
import "@/components/profile.css"

export default function CreateProfile() {
  const { user, updateProfile } = useAuth()
  const { initializeUserSkills } = useSkillStore()
  const router = useRouter()

  const [bio, setBio] = useState("")
  const [skillsOffered, setSkillsOffered] = useState([])
  const [skillsWanted, setSkillsWanted] = useState([])
  const [avatar, setAvatar] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatar(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!bio) newErrors.bio = "Please provide a short bio"
    if (skillsOffered.length === 0) newErrors.skillsOffered = "Please add at least one skill you can teach"
    if (skillsWanted.length === 0) newErrors.skillsWanted = "Please add at least one skill you want to learn"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Mock profile creation - in a real app, this would call an API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const profileData = {
        bio,
        skillsOffered,
        skillsWanted,
        avatar: avatarPreview || "/placeholder-avatar.png",
      }

      updateProfile(profileData)
      initializeUserSkills(skillsOffered, skillsWanted)

      router.push("/dashboard")
    } catch (error) {
      setErrors({ form: "Failed to create profile. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>Create Your Profile</h1>

        {errors.form && <div className="error-message">{errors.form}</div>}

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="avatar-section">
            <div className="avatar-preview">
              {avatarPreview ? (
                <img src={avatarPreview || "/placeholder.svg"} alt="Avatar preview" />
              ) : (
                <div className="avatar-placeholder">{user?.name?.charAt(0) || "?"}</div>
              )}
            </div>
            <div className="avatar-upload">
              <label htmlFor="avatar" className="btn btn-secondary">
                Upload Avatar
              </label>
              <input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: "none" }}
              />
              <p className="avatar-help">Optional: Upload a profile picture</p>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself, your background, and interests..."
              className={errors.bio ? "input-error" : ""}
              rows={4}
            />
            {errors.bio && <div className="error-message">{errors.bio}</div>}
          </div>

          <div className="form-group">
            <label>Skills You Can Teach</label>
            <TagInput
              tags={skillsOffered}
              setTags={setSkillsOffered}
              placeholder="Add skills you can teach (e.g., Guitar, Spanish, Cooking)"
              hasError={!!errors.skillsOffered}
            />
            {errors.skillsOffered && <div className="error-message">{errors.skillsOffered}</div>}
          </div>

          <div className="form-group">
            <label>Skills You Want to Learn</label>
            <TagInput
              tags={skillsWanted}
              setTags={setSkillsWanted}
              placeholder="Add skills you want to learn (e.g., Photography, Coding, Yoga)"
              hasError={!!errors.skillsWanted}
            />
            {errors.skillsWanted && <div className="error-message">{errors.skillsWanted}</div>}
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
            {isLoading ? "Creating Profile..." : "Complete Profile"}
          </button>
        </form>
      </div>
    </div>
  )
}
