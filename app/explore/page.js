"use client"

import { useState, useEffect } from "react"
import { useSkillStore } from "@/store/skill-store"
import SkillCard from "@/components/skill-card"
import { useAuth } from "@/context/auth-context"
import "@/components/explore.css"

const CATEGORIES = [
  "All Categories",
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

export default function ExplorePage() {
  const { allSkills, loadMockSkills } = useSkillStore()
  const [filteredSkills, setFilteredSkills] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [sortBy, setSortBy] = useState("newest")

  useEffect(() => {
    // Load mock skills if not already loaded
    if (allSkills.length === 0) {
      loadMockSkills()
    }

    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [allSkills.length, loadMockSkills])

  useEffect(() => {
    // Filter and sort skills based on current filters
    let result = [...allSkills]

    // Apply category filter
    if (selectedCategory !== "All Categories") {
      result = result.filter((skill) => skill.category === selectedCategory)
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (skill) => skill.title.toLowerCase().includes(term) || skill.description.toLowerCase().includes(term),
      )
    }

    // Apply sorting
    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } else if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price)
    }

    setFilteredSkills(result)
  }, [allSkills, searchTerm, selectedCategory, sortBy])

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading skills...</p>
      </div>
    )
  }

  return (
    <div className="explore-container">
      <div className="explore-header">
        <h1>Explore Skills</h1>
        <p>Discover skills taught by our community members</p>
      </div>

      <div className="explore-filters">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-options">
          <div className="filter-group">
            <label htmlFor="category">Category:</label>
            <select id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="sortBy">Sort by:</label>
            <select id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="explore-results">
        {filteredSkills.length === 0 ? (
          <div className="empty-state">
            <p>No skills found matching your criteria.</p>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All Categories")
                setSortBy("newest")
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="skills-grid">
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} type="explore" />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
