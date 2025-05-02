"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSkillStore } from "@/store/skill-store"
import { useAuth } from "@/context/auth-context"
import "@/components/skills.css"

const CATEGORIES = [
  "Art & Design",
  "Music",
  "Cooking",
  "Languages",
  "Technology",
  "Fitness",
  "Business",
  "Academic",
  "Crafts",
  "Other",
]

export default function NewSkill() {
  const router = useRouter()
  const { addSkillOffered } = useSkillStore()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [availability, setAvailability] = useState("")
  const [price, setPrice] = useState(10)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!title.trim()) newErrors.title = "Title is required"
    if (!description.trim()) newErrors.description = "Description is required"
    if (!category) newErrors.category = "Please select a category"
    if (!availability.trim()) newErrors.availability = "Please specify your availability"
    if (!price || price < 1) newErrors.price = "Price must be at least 1 coin"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Mock API call - in a real app, this would call an API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newSkill = {
        id: Date.now().toString(),
        title,
        description,
        category,
        availability,
        price: Number(price),
        createdAt: new Date().toISOString(),
      }

      addSkillOffered(newSkill)
      router.push("/dashboard")
    } catch (error) {
      setErrors({ form: "Failed to create skill. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="skills-container">
      <div className="skills-card">
        <h1>Offer a New Skill</h1>

        {errors.form && <div className="error-message">{errors.form}</div>}

        <form onSubmit={handleSubmit} className="skills-form">
          <div className="form-group">
            <label htmlFor="title">Skill Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Guitar Lessons, Spanish Conversation Practice"
              className={errors.title ? "input-error" : ""}
            />
            {errors.title && <div className="error-message">{errors.title}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you'll teach, your experience level, and what students can expect to learn..."
              className={errors.description ? "input-error" : ""}
              rows={4}
            />
            {errors.description && <div className="error-message">{errors.description}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={errors.category ? "input-error" : ""}
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && <div className="error-message">{errors.category}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="availability">Availability</label>
            <input
              id="availability"
              type="text"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              placeholder="e.g., Weekends, Evenings after 6pm, Flexible"
              className={errors.availability ? "input-error" : ""}
            />
            {errors.availability && <div className="error-message">{errors.availability}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="price">Price (in coins)</label>
            <input
              id="price"
              type="number"
              min="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={errors.price ? "input-error" : ""}
            />
            {errors.price && <div className="error-message">{errors.price}</div>}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => router.back()} disabled={isLoading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Skill Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
