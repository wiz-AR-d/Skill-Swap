"use client"

import Link from "next/link"

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        <Link href="/" className="btn btn-primary">
          Return to Home
        </Link>
      </div>

      <style jsx global>{`
        .not-found-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - var(--header-height) - var(--footer-height));
          padding: 2rem;
          text-align: center;
        }
        
        .not-found-content {
          max-width: 500px;
        }
        
        .not-found-content h1 {
          font-size: 6rem;
          font-weight: 700;
          color: var(--primary-color);
          margin-bottom: 0;
          line-height: 1;
        }
        
        .not-found-content h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        
        .not-found-content p {
          margin-bottom: 2rem;
          color: var(--muted-foreground);
        }
      `}</style>
    </div>
  )
}
