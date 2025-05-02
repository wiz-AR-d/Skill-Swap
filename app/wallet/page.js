"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { useWalletStore } from "@/store/wallet-store"
import "@/components/wallet.css"

export default function WalletPage() {
  const { isAuthenticated } = useAuth()
  const { transactions, loadMockTransactions } = useWalletStore()
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // Load mock transactions if not already loaded
    if (transactions.length === 0) {
      loadMockTransactions()
    }

    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [transactions.length, loadMockTransactions])

  // Calculate totals
  const totalEarned = transactions.filter((t) => t.type === "earned").reduce((sum, t) => sum + t.amount, 0)

  const totalSpent = transactions.filter((t) => t.type === "spent").reduce((sum, t) => sum + t.amount, 0)

  const balance = totalEarned - totalSpent

  // Filter transactions based on active tab
  const filteredTransactions = activeTab === "all" ? transactions : transactions.filter((t) => t.type === activeTab)

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading wallet data...</p>
      </div>
    )
  }

  return (
    <div className="wallet-container">
      <div className="wallet-header">
        <h1>Coin Wallet</h1>
      </div>

      <div className="wallet-summary">
        <div className="balance-card main-balance">
          <h2>Current Balance</h2>
          <div className="balance-amount">
            <span className="coin-icon">🪙</span>
            <span className="amount">{balance}</span>
          </div>
        </div>

        <div className="balance-card earned">
          <h2>Total Earned</h2>
          <div className="balance-amount">
            <span className="coin-icon">⬆️</span>
            <span className="amount">{totalEarned}</span>
          </div>
        </div>

        <div className="balance-card spent">
          <h2>Total Spent</h2>
          <div className="balance-amount">
            <span className="coin-icon">⬇️</span>
            <span className="amount">{totalSpent}</span>
          </div>
        </div>
      </div>

      <div className="transactions-section">
        <div className="transactions-header">
          <h2>Transaction History</h2>
          <div className="transaction-tabs">
            <button className={`tab-button ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>
              All
            </button>
            <button
              className={`tab-button ${activeTab === "earned" ? "active" : ""}`}
              onClick={() => setActiveTab("earned")}
            >
              Earned
            </button>
            <button
              className={`tab-button ${activeTab === "spent" ? "active" : ""}`}
              onClick={() => setActiveTab("spent")}
            >
              Spent
            </button>
          </div>
        </div>

        <div className="transactions-list">
          {filteredTransactions.length === 0 ? (
            <div className="empty-state">
              <p>No transactions found.</p>
            </div>
          ) : (
            filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-icon">{transaction.type === "earned" ? "⬆️" : "⬇️"}</div>
                <div className="transaction-details">
                  <h3>{transaction.title}</h3>
                  <p className="transaction-date">{new Date(transaction.date).toLocaleDateString()}</p>
                </div>
                <div className="transaction-amount">
                  <span className={`amount ${transaction.type}`}>
                    {transaction.type === "earned" ? "+" : "-"}
                    {transaction.amount}
                  </span>
                  <span className="coin-icon small">🪙</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
