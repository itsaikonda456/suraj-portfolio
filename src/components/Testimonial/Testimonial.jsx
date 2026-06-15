import React, { useState } from "react";

const testimonials = [
  {
    id: 1,
    // image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    name: "Ethan McCown",
    role: "Creative Director",
    company: "Lumière Studios",
    text: "Working with this team completely transformed how we tell our brand story. Every frame was intentional, every cut precise. The final film exceeded every expectation we had going in.",
    // rating: 5,
  },
  {
    id: 2,
    // image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
    name: "Craig Gowen",
    role: "Founder & CEO",
    company: "Apex Ventures",
    text: "Rare to find a cinematographer who truly listens. The documentary captured our company's essence in a way no written piece ever could. Clients now watch it instead of reading our deck.",
    // rating: 5,
  },
  {
    id: 3,
    // image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    name: "Sara Lindhoff",
    role: "Brand Manager",
    company: "Nōva Collective",
    text: "Our wedding film is something we will treasure forever. The attention to light, emotion, and storytelling turned our day into a cinematic experience we relive every anniversary.",
    // rating: 5,
  },
  {
    id: 4,
    // image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=200&q=80",
    name: "Marcus Webb",
    role: "Marketing VP",
    company: "Stratus Media",
    text: "Three campaigns in and the results speak for themselves — 40% lift in engagement and a product film that's been shared organically more than anything we've ever published.",
    // rating: 5,
  },
];

const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor">
    <path d="M7 1l1.545 3.13 3.455.502-2.5 2.437.59 3.44L7 8.885l-3.09 1.624.59-3.44L2 4.632l3.455-.502L7 1z" />
  </svg>
);

const QuoteIcon = () => (
  <svg width="22" height="17" viewBox="0 0 32 24" fill="none">
    <path
      d="M0 24V14.4C0 10.08 1.12 6.64 3.36 4.08 5.6 1.36 8.96 0 13.44 0v4.32c-2.08.32-3.76 1.2-5.04 2.64C7.2 8.4 6.56 10.24 6.56 12.48H13.44V24H0zm18.56 0V14.4c0-4.32 1.12-7.76 3.36-10.32C24.16 1.36 27.52 0 32 0v4.32c-2.08.32-3.76 1.2-5.04 2.64-1.2 1.44-1.84 3.28-1.84 5.52H32V24H18.56z"
      fill="currentColor"
    />
  </svg>
);

const Testimonial = () => {
  const [active, setActive] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --gold:        #c9a84c;
          --gold-light:  #e2c47e;
          --gold-dim:    rgba(201,168,76,0.1);
          --bg:          #0a0a0a;
          --card-bg:     #111111;
          --card-hover:  #161616;
          --text-primary:#f0ece4;
          --text-muted:  #888880;
          --text-dim:    #555550;
          --border:      rgba(255,255,255,0.07);
          --border-gold: rgba(201,168,76,0.2);
          --ease:        cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .tm-section {
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          padding: clamp(60px, 7vw, 96px) 0 clamp(52px, 6vw, 80px);
          position: relative;
          overflow: hidden;
        }

        .tm-section::after {
          content: '';
          position: absolute;
          bottom: -15%; left: -10%;
          width: clamp(240px, 40vw, 520px);
          height: clamp(240px, 40vw, 520px);
          background: radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 65%);
          pointer-events: none;
        }

        .tm-container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 clamp(20px, 5vw, 60px);
          position: relative;
          z-index: 1;
        }

        .tm-header {
          text-align: center;
          margin-bottom: clamp(36px, 5vw, 56px);
        }

        .tm-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--gold);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          margin-bottom: clamp(10px, 1.5vw, 14px);
        }

        .tm-eyebrow::before,
        .tm-eyebrow::after {
          content: '';
          display: block;
          width: clamp(20px, 2.5vw, 32px);
          height: 1px;
          background: var(--gold);
          opacity: 0.55;
        }

        .tm-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3.4rem);
          font-weight: 300;
          color: var(--text-primary);
          line-height: 1.05;
          letter-spacing: -0.01em;
        }

        .tm-title em {
          font-style: italic;
          font-weight: 600;
          color: var(--gold-light);
        }

        .tm-subtitle {
          font-size: clamp(13px, 1.2vw, 14.5px);
          font-weight: 300;
          color: var(--text-dim);
          margin-top: clamp(10px, 1.2vw, 14px);
          max-width: 440px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.75;
        }

        /* ── GRID: 2 cols always, smaller on mobile ── */
        .tm-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(10px, 1.5vw, 20px);
        }

        /* ── CARD ── */
        .tm-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: clamp(14px, 2vw, 28px);
          position: relative;
          transition:
            background 0.45s var(--ease),
            border-color 0.45s var(--ease),
            transform 0.45s var(--ease),
            box-shadow 0.45s var(--ease);
          cursor: default;
          overflow: hidden;
        }

        .tm-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 8px;
          background: linear-gradient(135deg, rgba(201,168,76,0.06) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.45s var(--ease);
        }

        .tm-card:hover {
          background: var(--card-hover);
          border-color: var(--border-gold);
          transform: translateY(-4px);
          box-shadow: 0 14px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(201,168,76,0.1);
        }

        .tm-card:hover::before { opacity: 1; }

        .tm-card-accent {
          position: absolute;
          top: 0;
          left: clamp(14px, 2vw, 28px);
          right: clamp(14px, 2vw, 28px);
          height: 2px;
          background: linear-gradient(to right, var(--gold), transparent);
          border-radius: 0 0 2px 2px;
          opacity: 0;
          transition: opacity 0.45s var(--ease);
        }

        .tm-card:hover .tm-card-accent { opacity: 1; }

        .tm-quote-icon {
          color: var(--gold);
          opacity: 0.16;
          margin-bottom: clamp(8px, 1vw, 14px);
          display: block;
          transition: opacity 0.45s var(--ease);
        }

        .tm-card:hover .tm-quote-icon { opacity: 0.26; }

        .tm-stars {
          display: flex;
          gap: 3px;
          color: var(--gold);
          margin-bottom: clamp(8px, 1vw, 12px);
        }

        /* Mobile: slightly smaller stars */
        @media (max-width: 480px) {
          .tm-stars svg { width: 10px; height: 10px; }
        }

        .tm-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.78rem, 1.2vw, 1.05rem);
          font-style: italic;
          font-weight: 300;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: clamp(12px, 1.5vw, 20px);
          position: relative;
          z-index: 1;
        }

        .tm-author {
          display: flex;
          align-items: center;
          gap: clamp(8px, 1vw, 14px);
          position: relative;
          z-index: 1;
          padding-top: clamp(10px, 1.2vw, 16px);
          border-top: 1px solid var(--border);
        }

        .tm-avatar {
          width: clamp(30px, 3.5vw, 44px);
          height: clamp(30px, 3.5vw, 44px);
          border-radius: 50%;
          object-fit: cover;
          object-position: center top;
          flex-shrink: 0;
          border: 2px solid var(--border-gold);
          transition: border-color 0.45s var(--ease);
        }

        .tm-card:hover .tm-avatar { border-color: var(--gold); }

        .tm-author-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .tm-name {
          font-size: clamp(10px, 1vw, 14px);
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .tm-role {
          font-size: clamp(9px, 0.85vw, 12px);
          font-weight: 400;
          color: var(--text-dim);
          letter-spacing: 0.03em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .tm-company {
          color: var(--gold);
          font-weight: 500;
        }

        .tm-divider {
          width: clamp(36px, 4vw, 52px);
          height: 1px;
          background: linear-gradient(to right, var(--gold), transparent);
          margin: clamp(36px, 5vw, 48px) auto 0;
        }

        /* ── MOBILE overrides ── */
        @media (max-width: 480px) {
          .tm-section { padding: 48px 0 40px; }
          .tm-header  { margin-bottom: 28px; }
          .tm-grid    { gap: 8px; }
          .tm-card    { padding: 12px 10px; border-radius: 6px; }
          .tm-title   { font-size: 1.7rem; }
          /* Hide company name on very small screens to save space */
          .tm-company { display: none; }
        }

        @media (max-width: 360px) {
          .tm-title { font-size: 1.5rem; }
          .tm-text  { font-size: 0.75rem; }
          .tm-card  { padding: 10px 8px; }
        }
      `}</style>

      <section className="tm-section" id="testimonials">
        <div className="tm-container">

          <div className="tm-header">
            <div className="tm-eyebrow">Testimonials</div>
            <h2 className="tm-title">
              What Clients <em>Say</em>
            </h2>
            <p className="tm-subtitle">
              Trusted by brands, creators, and couples who believe
              their story deserves to be told beautifully.
            </p>
          </div>

          <div className="tm-grid">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="tm-card"
                onMouseEnter={() => setActive(item.id)}
                onMouseLeave={() => setActive(null)}
              >
                <div className="tm-card-accent" />

                <span className="tm-quote-icon">
                  <QuoteIcon />
                </span>

                {/* <div className="tm-stars">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div> */}

                <p className="tm-text">"{item.text}"</p>

                <div className="tm-author">
                  {/* <img
                    className="tm-avatar"
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                  /> */}
                  <div className="tm-author-info">
                    <span className="tm-name">{item.name}</span>
                    <span className="tm-role">
                      {item.role},{" "}
                      <span className="tm-company">{item.company}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="tm-divider" />

        </div>
      </section>
    </>
  );
};

export default Testimonial;