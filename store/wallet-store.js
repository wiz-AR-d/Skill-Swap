"use client"

import { create } from "zustand"

// Mock data for transactions
const mockTransactions = [
  {
    id: "1",
    type: "earned",
    amount: 25,
    title: "Payment for Web Development Fundamentals",
    date: "2023-07-05T14:30:00Z",
  },
  {
    id: "2",
    type: "earned",
    amount: 15,
    title: "Payment for Guitar Lessons",
    date: "2023-07-10T09:45:00Z",
  },
  {
    id: "3",
    type: "spent",
    amount: 12,
    title: "Payment for Yoga for Beginners",
    date: "2023-07-12T16:20:00Z",
  },
  {
    id: "4",
    type: "spent",
    amount: 18,
    title: "Payment for Italian Cooking Class",
    date: "2023-07-15T11:10:00Z",
  },
  {
    id: "5",
    type: "earned",
    amount: 20,
    title: "Payment for Digital Photography Basics",
    date: "2023-07-18T15:30:00Z",
  },
]

export const useWalletStore = create((set) => ({
  // All transactions
  transactions: [],

  // Load mock transactions
  loadMockTransactions: () => set({ transactions: mockTransactions }),

  // Add a new transaction
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [...state.transactions, transaction],
    })),

  // Remove a transaction
  removeTransaction: (transactionId) =>
    set((state) => ({
      transactions: state.transactions.filter((transaction) => transaction.id !== transactionId),
    })),
}))
