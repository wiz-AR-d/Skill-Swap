"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useMessageStore } from "@/store/message-store"
import { useWalletStore } from "@/store/wallet-store"
import "./skill-card.css"

export default function SkillCard({ skill, type }) {
  const router = useRouter()
  const { user } = useAuth()
  const { addMessage } = useMessageStore()
  const { addTransaction } = useWalletStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleCardClick = () => {
    if (type === "explore") {
      setIsModalOpen(true)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setMessage("")
  }

  const handleSendRequest = async () => {
    if (!message.trim()) return

    setIsLoading(true)

    try {
      // Mock API call - in a real app, this would call an API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create a new message thread
      const newThread = {
        id: Date.now().toString(),
        type: "outgoing",
        name: skill.teacherName || "Skill Teacher",
        avatar: skill.teacherAvatar || "/placeholder-avatar.png",
        skillId: skill.id,
        skillTitle: skill.title,
        status: "pending",
        lastMessageAt: new Date().toISOString(),
        messages: [
          {
            id: Date.now().toString(),
            sender: "user",
            text: message,
            timestamp: new Date().toISOString(),
          },
        ],
      }

      addMessage(newThread)

      // Create a transaction if this is a purchase
      if (type === "explore") {
        addTransaction({
          id: Date.now().toString(),
          type: "spent",
          amount: skill.price,
          title: `Payment for ${skill.title}`,
          date: new Date().toISOString(),
        })
      }

      closeModal()
      router.push("/messages")
    } catch (error) {
      console.error("Error sending request:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className={`skill-card ${type}`} onClick={handleCardClick}>
        <div className="skill-header">
          <h3 className="skill-title">{skill.title}</h3>
          {type === "explore" && (
            <div className="skill-price">
              <span className="coin-icon">🪙</span>
              <span>{skill.price}</span>
            </div>
          )}
        </div>

        <div className="skill-category">{skill.category}</div>

        <p className="skill-description">
          {skill.description?.substring(0, 100)}
          {skill.description?.length > 100 ? "..." : ""}
        </p>

        <div className="skill-footer">
          {skill.availability && (
            <div className="skill-availability">
              <span className="availability-label">Available:</span>
              <span>{skill.availability}</span>
            </div>
          )}

          {type === "explore" && <button className="btn btn-primary btn-sm">Learn More</button>}

          {type === "offered" && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={(e) => {
                e.stopPropagation()
                router.push(`/skills/edit/${skill.id}`)
              }}
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>

            <h2>{skill.title}</h2>
            <div className="modal-price">
              <span className="coin-icon">🪙</span>
              <span>{skill.price} coins</span>
            </div>

            <div className="modal-details">
              <p>
                <strong>Category:</strong> {skill.category}
              </p>
              <p>
                <strong>Availability:</strong> {skill.availability}
              </p>
              <p className="modal-description">{skill.description}</p>
            </div>

            <div className="modal-request">
              <h3>Send a Request</h3>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Introduce yourself and explain what you'd like to learn..."
                rows={4}
              />

              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={closeModal} disabled={isLoading}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSendRequest} disabled={!message.trim() || isLoading}>
                  {isLoading ? "Sending..." : `Send Request (${skill.price} coins)`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
