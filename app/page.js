"use client"

import Link from "next/link"
import HeroIllustration from "@/components/hero-illustration"
import { useAuth } from "@/context/auth-context"
import "@/components/landing-page.css"

export default function Home() {
  return (
    <div className="landing-page">
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Share Your Skills, <span className="text-gradient">Learn Something New</span>
            </h1>
            <p className="hero-subtitle">
              Skill Swap connects people looking to learn new skills with those willing to teach them. Exchange
              knowledge using virtual coins, not real money.
            </p>
            <div className="cta-buttons">
              <Link href="/login" className="btn btn-primary">
                Get Started
              </Link>
              <Link href="/explore" className="btn btn-secondary">
                Browse Skills
              </Link>
            </div>
          </div>
          <div className="hero-illustration">
            <HeroIllustration />
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">How Skill Swap Works</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h3>Share Your Expertise</h3>
              <p>Offer skills you're good at and earn virtual coins</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Earn Virtual Coins</h3>
              <p>Get paid in our virtual currency for teaching others</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3>Spend on Learning</h3>
              <p>Use your earned coins to learn new skills from others</p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Users Say</h2>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">
                "I taught guitar lessons and learned web development in return. Best exchange ever!"
              </p>
              <div className="testimonial-author">- Alex P.</div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                "Found an amazing cooking instructor who taught me authentic Italian cuisine."
              </p>
              <div className="testimonial-author">- Maria S.</div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                "I've learned three languages and taught photography to dozens of people."
              </p>
              <div className="testimonial-author">- James K.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2 className="section-title">Ready to Start Your Learning Journey?</h2>
          <p className="cta-text">
            Join our community of learners and teachers today. Create your account and start sharing your skills!
          </p>
          <div className="cta-buttons">
            <Link href="/register" className="btn btn-primary">
              Create Account
            </Link>
            <Link href="/explore" className="btn btn-secondary">
              Explore Skills
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
