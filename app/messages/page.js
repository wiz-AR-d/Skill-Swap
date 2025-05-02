"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { useMessageStore } from "@/store/message-store"
import MessageThread from "@/components/message-thread"
import "@/components/messages.css"

export default function MessagesPage() {
  const { isAuthenticated } = useAuth()
  const { messages, loadMockMessages } = useMessageStore()
  const [activeTab, setActiveTab] = useState("incoming")
  const [selectedThread, setSelectedThread] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load mock messages if not already loaded
    if (messages.length === 0) {
      loadMockMessages()
    }

    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [messages.length, loadMockMessages])

  const incomingRequests = messages.filter((msg) => msg.type === "incoming")
  const sentRequests = messages.filter((msg) => msg.type === "outgoing")

  const displayMessages = activeTab === "incoming" ? incomingRequests : sentRequests

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading messages...</p>
      </div>
    )
  }

  return (
    <div className="messages-container">
      <div className="messages-header">
        <h1>Messages & Requests</h1>
      </div>

      <div className="messages-tabs">
        <button
          className={`tab-button ${activeTab === "incoming" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("incoming")
            setSelectedThread(null)
          }}
        >
          Incoming Requests
          {incomingRequests.length > 0 && <span className="badge">{incomingRequests.length}</span>}
        </button>
        <button
          className={`tab-button ${activeTab === "outgoing" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("outgoing")
            setSelectedThread(null)
          }}
        >
          Sent Requests
          {sentRequests.length > 0 && <span className="badge">{sentRequests.length}</span>}
        </button>
      </div>

      <div className="messages-content">
        <div className="threads-list">
          {displayMessages.length === 0 ? (
            <div className="empty-state">
              <p>No {activeTab} requests yet.</p>
            </div>
          ) : (
            displayMessages.map((thread) => (
              <div
                key={thread.id}
                className={`thread-item ${selectedThread?.id === thread.id ? "active" : ""}`}
                onClick={() => setSelectedThread(thread)}
              >
                <div className="thread-avatar">
                  <img src={thread.avatar || "/placeholder-avatar.png"} alt={thread.name} />
                </div>
                <div className="thread-info">
                  <h3>{thread.name}</h3>
                  <p className="thread-skill">{thread.skillTitle}</p>
                  <p className="thread-preview">
                    {thread.messages[thread.messages.length - 1].text.substring(0, 40)}...
                  </p>
                </div>
                <div className="thread-meta">
                  <span className="thread-date">{new Date(thread.lastMessageAt).toLocaleDateString()}</span>
                  {thread.status === "pending" && <span className="thread-status pending">Pending</span>}
                  {thread.status === "accepted" && <span className="thread-status accepted">Accepted</span>}
                  {thread.status === "rejected" && <span className="thread-status rejected">Rejected</span>}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="message-detail">
          {selectedThread ? (
            <MessageThread thread={selectedThread} />
          ) : (
            <div className="empty-state">
              <p>Select a conversation to view messages</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
