"use client"

import { create } from "zustand"

// Mock data for skills
const mockSkills = [
  {
    id: "1",
    title: "Guitar Lessons for Beginners",
    description:
      "Learn the basics of guitar playing with easy-to-follow lessons. Perfect for absolute beginners who want to start their musical journey.",
    category: "Music",
    availability: "Weekends, Evenings",
    price: 15,
    teacherName: "Alex Johnson",
    teacherAvatar: "/placeholder-avatar.png",
    createdAt: "2023-05-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Spanish Conversation Practice",
    description:
      "Practice your Spanish speaking skills with a fluent speaker. We'll focus on everyday conversations and practical vocabulary.",
    category: "Languages",
    availability: "Weekday afternoons",
    price: 10,
    teacherName: "Maria Rodriguez",
    teacherAvatar: "/placeholder-avatar.png",
    createdAt: "2023-06-02T14:45:00Z",
  },
  {
    id: "3",
    title: "Web Development Fundamentals",
    description:
      "Learn HTML, CSS, and JavaScript basics. Build your first website from scratch with guidance from an experienced developer.",
    category: "Technology",
    availability: "Flexible",
    price: 25,
    teacherName: "David Kim",
    teacherAvatar: "/placeholder-avatar.png",
    createdAt: "2023-04-20T09:15:00Z",
  },
  {
    id: "4",
    title: "Yoga for Beginners",
    description:
      "Gentle introduction to yoga poses and breathing techniques. Perfect for stress relief and improving flexibility.",
    category: "Fitness",
    availability: "Mornings, Weekends",
    price: 12,
    teacherName: "Sarah Chen",
    teacherAvatar: "/placeholder-avatar.png",
    createdAt: "2023-07-10T08:00:00Z",
  },
  {
    id: "5",
    title: "Digital Photography Basics",
    description:
      "Learn how to use your camera effectively, understand composition, and edit your photos to make them stand out.",
    category: "Art & Design",
    availability: "Weekends only",
    price: 20,
    teacherName: "Michael Brown",
    teacherAvatar: "/placeholder-avatar.png",
    createdAt: "2023-05-28T16:30:00Z",
  },
  {
    id: "6",
    title: "Italian Cooking Class",
    description:
      "Learn to make authentic Italian pasta, sauces, and desserts from scratch. Bring the taste of Italy to your home kitchen!",
    category: "Cooking",
    availability: "Friday evenings",
    price: 18,
    teacherName: "Sophia Rossi",
    teacherAvatar: "/placeholder-avatar.png",
    createdAt: "2023-06-15T17:45:00Z",
  },
  {
    id: "7",
    title: "Piano Lessons - All Levels",
    description:
      "Comprehensive piano lessons for all skill levels. Learn classical pieces, jazz improvisation, and music theory.",
    category: "Music",
    availability: "Weekdays after 5pm",
    price: 22,
    teacherName: "Emma Wilson",
    teacherAvatar: "/placeholder-avatar.png",
    createdAt: "2023-07-05T11:20:00Z",
  },
  {
    id: "8",
    title: "French Language & Culture",
    description:
      "Master French language skills while learning about French culture, traditions, and daily life in France.",
    category: "Languages",
    availability: "Tuesday & Thursday evenings",
    price: 15,
    teacherName: "Pierre Dubois",
    teacherAvatar: "/placeholder-avatar.png",
    createdAt: "2023-06-20T13:10:00Z",
  },
  {
    id: "9",
    title: "Mobile App Development",
    description:
      "Learn to build cross-platform mobile apps using React Native. From setup to deployment, we'll cover everything you need to know.",
    category: "Technology",
    availability: "Weekends",
    price: 30,
    teacherName: "James Lee",
    teacherAvatar: "/placeholder-avatar.png",
    createdAt: "2023-05-10T15:45:00Z",
  },
  {
    id: "10",
    title: "CrossFit Training",
    description:
      "High-intensity functional training that combines elements of cardio, weightlifting, and gymnastics.",
    category: "Fitness",
    availability: "Mornings & Evenings",
    price: 20,
    teacherName: "Chris Taylor",
    teacherAvatar: "/placeholder-avatar.png",
    createdAt: "2023-07-01T09:30:00Z",
  },
  {
    id: "11",
    title: "Graphic Design Fundamentals",
    description:
      "Learn the principles of design, typography, and color theory. Create professional-looking designs using industry-standard tools.",
    category: "Art & Design",
    availability: "Flexible",
    price: 25,
    teacherName: "Lisa Wong",
    teacherAvatar: "/placeholder-avatar.png",
    createdAt: "2023-06-25T14:15:00Z",
  },
  {
    id: "12",
    title: "Sushi Making Workshop",
    description:
      "Learn the art of sushi making from a professional chef. Master the techniques of preparing perfect sushi rice and rolling beautiful maki.",
    category: "Cooking",
    availability: "Saturday afternoons",
    price: 35,
    teacherName: "Takashi Yamamoto",
    teacherAvatar: "/placeholder-avatar.png",
    createdAt: "2023-07-08T12:00:00Z",
  },
  {
    id: "13",
    title: "Business Writing & Communication",
    description:
      "Improve your professional writing skills, from emails to reports. Learn how to communicate effectively in the business world.",
    category: "Business",
    availability: "Weekday evenings",
    price: 18,
    teacherName: "Rachel Smith",
    teacherAvatar: "/placeholder-avatar.png",
    createdAt: "2023-06-12T16:45:00Z",
  },
  {
    id: "14",
    title: "Knitting & Crochet",
    description:
      "Learn to create beautiful handmade items. Perfect for beginners who want to start their crafting journey.",
    category: "Crafts",
    availability: "Sunday afternoons",
    price: 12,
    teacherName: "Margaret Brown",
    teacherAvatar: "/placeholder-avatar.png",
    createdAt: "2023-07-03T13:30:00Z",
  },
  {
    id: "15",
    title: "Public Speaking Mastery",
    description:
      "Overcome stage fright and learn to deliver powerful presentations. Perfect for professionals and students alike.",
    category: "Business",
    availability: "Flexible",
    price: 20,
    teacherName: "Daniel Carter",
    teacherAvatar: "/placeholder-avatar.png",
    createdAt: "2023-06-18T10:15:00Z",
  },
  {
    id: "16",
    title: "Pottery & Ceramics",
    description:
      "Learn the basics of pottery making, from hand-building to wheel throwing. Create your own unique ceramic pieces.",
    category: "Crafts",
    availability: "Wednesday evenings",
    price: 25,
    teacherName: "Olivia Martinez",
    teacherAvatar: "/placeholder-avatar.png",
    createdAt: "2023-07-12T17:00:00Z",
  },
  {
    id: "17",
    title: "Data Science Fundamentals",
    description:
      "Introduction to data analysis, visualization, and machine learning using Python. Perfect for beginners in data science.",
    category: "Technology",
    availability: "Weekends",
    price: 28,
    teacherName: "Alan Chen",
    teacherAvatar: "/placeholder-avatar.png",
    createdAt: "2023-06-28T14:30:00Z",
  },
  {
    id: "18",
    title: "Meditation & Mindfulness",
    description:
      "Learn various meditation techniques and mindfulness practices to reduce stress and improve mental well-being.",
    category: "Fitness",
    availability: "Mornings",
    price: 15,
    teacherName: "Priya Sharma",
    teacherAvatar: "/placeholder-avatar.png",
    createdAt: "2023-07-15T08:00:00Z",
  },
  {
    id: "19",
    title: "Chinese Calligraphy",
    description:
      "Discover the art of Chinese calligraphy. Learn the basic strokes and create beautiful characters with traditional brushes.",
    category: "Art & Design",
    availability: "Saturday mornings",
    price: 18,
    teacherName: "Wei Zhang",
    teacherAvatar: "/placeholder-avatar.png",
    createdAt: "2023-06-22T09:45:00Z",
  },
  {
    id: "20",
    title: "Baking & Pastry Arts",
    description:
      "Master the art of baking, from bread to pastries. Learn professional techniques and create delicious treats.",
    category: "Cooking",
    availability: "Sunday mornings",
    price: 22,
    teacherName: "Claire Dubois",
    teacherAvatar: "/placeholder-avatar.png",
    createdAt: "2023-07-07T10:30:00Z",
  }
]

export const useSkillStore = create((set) => ({
  // All skills (from all users)
  allSkills: [],

  // Current user's skills
  userSkillsOffered: [],
  userSkillsWanted: [],

  // Load mock skills
  loadMockSkills: () => set({ allSkills: mockSkills }),

  // Initialize user skills from profile creation
  initializeUserSkills: (skillsOffered, skillsWanted) =>
    set((state) => {
      const offered = skillsOffered.map((skill, index) => ({
        id: `offered-${Date.now()}-${index}`,
        title: skill,
        description: `I can teach ${skill} to beginners and intermediate learners.`,
        category: "Other",
        availability: "Flexible",
        price: 10 + Math.floor(Math.random() * 15),
        createdAt: new Date().toISOString(),
      }))

      const wanted = skillsWanted.map((skill, index) => ({
        id: `wanted-${Date.now()}-${index}`,
        title: skill,
        description: `I want to learn ${skill} from an experienced teacher.`,
        createdAt: new Date().toISOString(),
      }))

      return {
        userSkillsOffered: offered,
        userSkillsWanted: wanted,
      }
    }),

  // Add a new skill offered by the user
  addSkillOffered: (skill) =>
    set((state) => ({
      userSkillsOffered: [...state.userSkillsOffered, skill],
      allSkills: [...state.allSkills, skill],
    })),

  // Update a skill offered by the user
  updateSkillOffered: (updatedSkill) =>
    set((state) => ({
      userSkillsOffered: state.userSkillsOffered.map((skill) => (skill.id === updatedSkill.id ? updatedSkill : skill)),
      allSkills: state.allSkills.map((skill) => (skill.id === updatedSkill.id ? updatedSkill : skill)),
    })),

  // Remove a skill offered by the user
  removeSkillOffered: (skillId) =>
    set((state) => ({
      userSkillsOffered: state.userSkillsOffered.filter((skill) => skill.id !== skillId),
      allSkills: state.allSkills.filter((skill) => skill.id !== skillId),
    })),

  // Add a new skill wanted by the user
  addSkillWanted: (skill) =>
    set((state) => ({
      userSkillsWanted: [...state.userSkillsWanted, skill],
    })),

  // Update a skill wanted by the user
  updateSkillWanted: (updatedSkill) =>
    set((state) => ({
      userSkillsWanted: state.userSkillsWanted.map((skill) => (skill.id === updatedSkill.id ? updatedSkill : skill)),
    })),

  // Remove a skill wanted by the user
  removeSkillWanted: (skillId) =>
    set((state) => ({
      userSkillsWanted: state.userSkillsWanted.filter((skill) => skill.id !== skillId),
    })),
}))
