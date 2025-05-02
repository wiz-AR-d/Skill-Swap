"use client"

import { create } from "zustand"

// Mock data for messages
const mockMessages = [
  {
    id: "1",
    type: "incoming",
    name: "Sarah Chen",
    avatar: "/placeholder-avatar.png",
    skillId: "4",
    skillTitle: "Yoga for Beginners",
    status: "pending",
    lastMessageAt: "2023-07-15T09:30:00Z",
    messages: [
      {
        id: "101",
        sender: "other",
        text: "Hi there! I saw your profile and I'm interested in learning yoga. Do you have any availability next week?",
        timestamp: "2023-07-15T09:30:00Z",
      },
    ],
  },
  {
    id: "2",
    type: "outgoing",
    name: "David Kim",
    avatar: "/placeholder-avatar.png",
    skillId: "3",
    skillTitle: "Web Development Fundamentals",
    status: "accepted",
    lastMessageAt: "2023-07-14T16:45:00Z",
    messages: [
      {
        id: "201",
        sender: "user",
        text: "Hello! I'm interested in learning web development. I have some basic knowledge of HTML but would like to improve my skills.",
        timestamp: "2023-07-14T14:20:00Z",
      },
      {
        id: "202",
        sender: "other",
        text: "Hi! I'd be happy to help you learn web development. What specific areas are you most interested in?",
        timestamp: "2023-07-14T15:05:00Z",
      },
      {
        id: "203",
        sender: "user",
        text: "I'd like to focus on JavaScript and building interactive websites. When can we start?",
        timestamp: "2023-07-14T15:30:00Z",
      },
      {
        id: "204",
        sender: "other",
        text: "Great! I'm available on Tuesdays and Thursdays evenings. Does that work for you?",
        timestamp: "2023-07-14T16:00:00Z",
      },
      {
        id: "205",
        sender: "user",
        text: "Tuesday evenings work perfectly for me. Shall we start next week?",
        timestamp: "2023-07-14T16:45:00Z",
      },
      {
        id: "206",
        sender: "system",
        text: "Request accepted! You can now start the lesson.",
        timestamp: "2023-07-14T16:50:00Z",
      },
    ],
  },
  {
    id: "3",
    type: "incoming",
    name: "Michael Brown",
    avatar: "/placeholder-avatar.png",
    skillId: "5",
    skillTitle: "Digital Photography Basics",
    status: "rejected",
    lastMessageAt: "2023-07-10T11:20:00Z",
    messages: [
      {
        id: "301",
        sender: "other",
        text: "Hello! I noticed you're offering photography lessons. I just got a new DSLR camera and would love to learn how to use it properly.",
        timestamp: "2023-07-10T10:15:00Z",
      },
      {
        id: "302",
        sender: "user",
        text: "Hi Michael! I'd be happy to help you learn photography. What kind of camera did you get?",
        timestamp: "2023-07-10T10:45:00Z",
      },
      {
        id: "303",
        sender: "other",
        text: "I got a Canon EOS Rebel T7. I'm completely new to photography so I need help with the basics.",
        timestamp: "2023-07-10T11:00:00Z",
      },
      {
        id: "304",
        sender: "user",
        text: "I'm sorry, but I'm actually more familiar with Nikon cameras. I don't think I'd be the best teacher for you with a Canon.",
        timestamp: "2023-07-10T11:20:00Z",
      },
      {
        id: "305",
        sender: "system",
        text: "Request rejected.",
        timestamp: "2023-07-10T11:25:00Z",
      },
    ],
  },
]

export const useMessageStore = create((set) => ({
  // All messages
  messages: [],

  // Load mock messages
  loadMockMessages: () => set({ messages: mockMessages }),

  // Add a new message thread
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  // Update an existing message thread
  updateMessageThread: (updatedThread) =>
    set((state) => ({
      messages: state.messages.map((thread) => (thread.id === updatedThread.id ? updatedThread : thread)),
    })),

  // Add a new message to an existing thread
  addMessageToThread: (threadId, newMessage) =>
    set((state) => ({
      messages: state.messages.map((thread) => {
        if (thread.id === threadId) {
          return {
            ...thread,
            lastMessageAt: new Date().toISOString(),
            messages: [...thread.messages, newMessage],
          }
        }
        return thread
      }),
    })),

  // Remove a message thread
  removeMessage: (messageId) =>
    set((state) => ({
      messages: state.messages.filter((message) => message.id !== messageId),
    })),
}))
