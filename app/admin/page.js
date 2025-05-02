"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useSkillStore } from "@/store/skill-store"
import "@/components/admin.css"

// Mock admin users
const ADMIN_EMAILS = ["admin@skillswap.com"]

export default function AdminPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const { allSkills, loadMockSkills, removeSkillOffered } = useSkillStore()
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [activeTab, setActiveTab] = useState("users")

  useEffect(() => {
    // Check if user is authenticated and is an admin
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    if (!ADMIN_EMAILS.includes(user?.email)) {
      router.push("/dashboard")
      return
    }

    // Load mock data
    if (allSkills.length === 0) {
      loadMockSkills()
    }

    // Load mock users
    const mockUsers = [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        joinedAt: "2023-05-10T08:30:00Z",
        status: "active",
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        joinedAt: "2023-06-15T14:20:00Z",
        status: "active",
      },
      {
        id: "3",
        name: "Mike Johnson",
        email: "mike@example.com",
        joinedAt: "2023-04-22T11:45:00Z",
        status: "inactive",
      },
      {
        id: "4",
        name: "Sarah Williams",
        email: "sarah@example.com",
        joinedAt: "2023-07-05T09:15:00Z",
        status: "active",
      },
    ]

    setUsers(mockUsers)

    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [isAuthenticated, user, router, allSkills.length, loadMockSkills])

  const handleBanUser = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: user.status === "active" ? "banned" : "active" } : user,
      ),
    )
  }

  const handleDeleteSkill = (skillId) => {
    removeSkillOffered(skillId)
  }

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading admin panel...</p>
      </div>
    )
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Panel</h1>
      </div>

      <div className="admin-tabs">
        <button className={`tab-button ${activeTab === "users" ? "active" : ""}`} onClick={() => setActiveTab("users")}>
          Users
        </button>
        <button
          className={`tab-button ${activeTab === "skills" ? "active" : ""}`}
          onClick={() => setActiveTab("skills")}
        >
          Skills
        </button>
        <button
          className={`tab-button ${activeTab === "reports" ? "active" : ""}`}
          onClick={() => setActiveTab("reports")}
        >
          Reports
        </button>
      </div>

      <div className="admin-content">
        {activeTab === "users" && (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Joined</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{new Date(user.joinedAt).toLocaleDateString()}</td>
                    <td>
                      <span className={`status-badge ${user.status}`}>{user.status}</span>
                    </td>
                    <td>
                      <button
                        className={`btn btn-sm ${user.status === "banned" ? "btn-secondary" : "btn-primary"}`}
                        onClick={() => handleBanUser(user.id)}
                      >
                        {user.status === "banned" ? "Unban" : "Ban"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "skills" && (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allSkills.map((skill) => (
                  <tr key={skill.id}>
                    <td>{skill.title}</td>
                    <td>{skill.category}</td>
                    <td>{skill.price} coins</td>
                    <td>{new Date(skill.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button className="btn btn-sm btn-primary" onClick={() => handleDeleteSkill(skill.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "reports" && (
          <div className="empty-state">
            <p>No reports have been submitted yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
