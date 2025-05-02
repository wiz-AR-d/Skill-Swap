"use client"

import { useState } from "react"
import { useMessageStore } from "@/store/message-store"
import { useWalletStore } from "@/store/wallet-store"
import "./message-thread.css"

export default function MessageThread({ thread }) {
  const { addMessageToThread } = useMessageStore()
  const { addTransaction } = useWalletStore()
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (e) => {
    e.preventDefault()

    if (!newMessage.trim()) return

    setIsLoading(true)

    try {
      // Mock API call - in a real app, this would call an API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newMessageObj = {
        id: Date.now().toString(),
        sender: "user",
        text: newMessage,
        timestamp: new Date().toISOString(),
      }

      addMessageToThread(thread.id, newMessageObj)
      setNewMessage("")
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAcceptRequest = async () => {
    setIsLoading(true)

    try {
      // Mock API call - in a real app, this would call an API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const systemMessage = {
        id: Date.now().toString(),
        sender: "system",
        text: "Request accepted! You can now start the lesson.",
        timestamp: new Date().toISOString(),
      }

      addMessageToThread(thread.id, systemMessage)

      // Add transaction for earning coins
      if (thread.type === "incoming") {
        addTransaction({
          id: Date.now().toString(),
          type: "earned",
          amount: 20, // Mock amount
          title: `Payment for ${thread.skillTitle}`,
          date: new Date().toISOString(),
        })
      }
    } catch (error) {
      console.error("Error accepting request:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRejectRequest = async () => {
    setIsLoading(true)

    try {
      // Mock API call - in a real app, this would call an API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const systemMessage = {
        id: Date.now().toString(),
        sender: "system",
        text: "Request rejected.",
        timestamp: new Date().toISOString(),
      }

      addMessageToThread(thread.id, systemMessage)
    } catch (error) {
      console.error("Error rejecting request:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="message-thread">
      <div className="thread-header">
        <div className="thread-user">
          <div className="thread-avatar">
            <img src={thread.avatar || "/placeholder-avatar.png"} alt={thread.name} />
          </div>
          <div className="thread-info">
            <h3>{thread.name}</h3>
            <p className="thread-skill">{thread.skillTitle}</p>
          </div>
        </div>

        {thread.status === "pending" && thread.type === "incoming" && (
          <div className="thread-actions">
            <button className="btn btn-secondary btn-sm" onClick={handleRejectRequest} disabled={isLoading}>
              Reject
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleAcceptRequest} disabled={isLoading}>
              Accept
            </button>
          </div>
        )}

        {thread.status === "accepted" && <div className="thread-status accepted">Accepted</div>}

        {thread.status === "rejected" && <div className="thread-status rejected">Rejected</div>}
      </div>

      <div className="messages-list">
        {thread.messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender === "user" ? "outgoing" : message.sender === "system" ? "system" : "incoming"}`}
          >
            <div className="message-content">
              <p>{message.text}</p>
              <span className="message-time">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </div>
        ))}
      </div>

      <form className="message-input" onSubmit={handleSendMessage}>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={thread.status === "rejected" || isLoading}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!newMessage.trim() || thread.status === "rejected" || isLoading}
        >
          Send
        </button>
      </form>
    </div>
  )
}
