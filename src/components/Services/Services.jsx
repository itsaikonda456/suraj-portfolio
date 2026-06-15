import React from "react";
import {
  FiCamera,
  FiUser,
  FiHeart,
  FiCalendar,
  FiTruck,
  FiPlay,
  FiFlag,
  FiTrendingUp,
  FiMoreHorizontal,
} from "react-icons/fi";

const Services = () => {
  const services = [
    {
      icon: <FiCamera />,
      title: "Birthday Shoots",
      description: "Timeless portraits capturing your special day in every smile.",
    },
    {
      icon: <FiUser />,
      title: "Personal Shoots",
      description: "Authentic portraits that reflect your unique personality.",
    },
    {
      icon: <FiHeart />,
      title: "Pre-Wedding & Wedding",
      description: "Elegant stories told frame by frame, from proposal to vows.",
    },
    {
      icon: <FiCalendar />,
      title: "Event Coverage",
      description: "Full-spectrum coverage of every moment that matters.",
    },
    {
      icon: <FiTruck />,
      title: "Vehicle Shoots",
      description: "Dynamic angles that bring out the soul of every machine.",
    },
    {
      icon: <FiPlay />,
      title: "Social Media Reels",
      description: "Short-form content crafted to stop the scroll instantly.",
    },
    {
      icon: <FiFlag />,
      title: "Political Shoots",
      description: "Strong, credible visuals that command trust and presence.",
    },
    // {
    //   icon: <FiTrendingUp />,
    //   title: "Promotional Shoots",
    //   description: "Brand-driven imagery that sells your product visually.",
    // },
    {
      icon: <FiMoreHorizontal />,
      title: "And Many More…",
      description: "Custom shoots tailored to your creative vision and needs.",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --gold:         #c9a84c;
          --gold-light:   #e2c47e;
          --gold-dim:     rgba(201,168,76,0.1);
          --bg:           #0d0d0d;
          --card-bg:      #111111;
          --text-primary: #f0ece4;
          --text-muted:   #888880;
          --border:       rgba(255,255,255,0.07);
          --ease:         cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .sv-section {
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          padding: clamp(48px, 6vw, 80px) 0;
          position: relative;
          overflow: hidden;
        }

        .sv-section::before {
          content: '';
          position: absolute;
          top: -20%; left: 50%;
          transform: translateX(-50%);
          width: min(600px, 55vw);
          height: min(600px, 55vw);
          background: radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 65%);
          pointer-events: none;
        }

        .sv-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 clamp(16px, 4vw, 48px);
          position: relative;
          z-index: 1;
        }

        /* ── HEADER ── */
        .sv-header {
          text-align: center;
          margin-bottom: clamp(28px, 4vw, 48px);
        }

        .sv-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--gold);
          font-size: clamp(9px, 0.85vw, 11px);
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          margin-bottom: clamp(10px, 1.2vw, 14px);
        }

        .sv-eyebrow::before,
        .sv-eyebrow::after {
          content: '';
          display: block;
          width: clamp(18px, 2vw, 28px);
          height: 1px;
          background: var(--gold);
          opacity: 0.55;
        }

        .sv-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.7rem, 3.2vw, 3rem);
          font-weight: 300;
          color: var(--text-primary);
          line-height: 1.1;
          letter-spacing: -0.01em;
        }

        .sv-title em {
          font-style: italic;
          font-weight: 600;
          color: var(--gold-light);
        }

        /* ── GRID ──
           4 columns on large screens
           3 columns on tablet (≤1024px)
           3 columns on mobile (≤600px) — smaller cards  */
        .sv-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(8px, 1.2vw, 16px);
        }

        @media (max-width: 1024px) {
          .sv-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 600px) {
          .sv-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 6px;
          }
        }

        /* ── CARD ── */
        .sv-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: clamp(14px, 2vw, 24px) clamp(10px, 1.4vw, 18px);
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s var(--ease),
                      box-shadow 0.3s var(--ease),
                      border-color 0.3s var(--ease);
        }

        .sv-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 2px;
          background: var(--gold);
          transition: width 0.35s var(--ease);
        }

        .sv-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 36px rgba(0,0,0,0.4);
          border-color: rgba(201,168,76,0.22);
        }

        .sv-card:hover::after { width: 100%; }

        /* ── ICON ── */
        .sv-icon {
          width: clamp(40px, 5vw, 60px);
          height: clamp(40px, 5vw, 60px);
          margin: 0 auto clamp(10px, 1.4vw, 16px);
          border: 1.5px solid var(--gold);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gold);
          font-size: clamp(15px, 1.8vw, 22px);
          transition: background 0.3s ease, color 0.3s ease;
        }

        .sv-card:hover .sv-icon {
          background: var(--gold);
          color: #0a0a0a;
        }

        /* ── TEXT ── */
        .sv-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.72rem, 1.1vw, 0.95rem);
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.01em;
          margin-bottom: clamp(5px, 0.7vw, 8px);
          line-height: 1.3;
        }

        .sv-card-desc {
          font-size: clamp(9.5px, 0.8vw, 11.5px);
          font-weight: 300;
          color: var(--text-muted);
          line-height: 1.6;
        }

        /* ── MOBILE overrides ── */
        @media (max-width: 600px) {
          .sv-card { padding: 12px 8px; border-radius: 8px; }
          .sv-icon { width: 36px; height: 36px; font-size: 14px; margin-bottom: 8px; }
          .sv-card-title { font-size: 0.62rem; }
          .sv-card-desc  { font-size: 9px; line-height: 1.5; }
        }

        @media (max-width: 360px) {
          .sv-card-title { font-size: 0.56rem; }
          .sv-card-desc  { display: none; }
        }

        /* ── FOOTER RULE ── */
        .sv-rule {
          width: clamp(36px, 4vw, 52px);
          height: 1px;
          background: linear-gradient(to right, var(--gold), transparent);
          margin: clamp(32px, 5vw, 56px) auto 0;
        }
      `}</style>

      <section className="sv-section" id="services">
        <div className="sv-container">

          <div className="sv-header">
            <div className="sv-eyebrow">What I Offer</div>
            <h2 className="sv-title">My <em>Services</em></h2>
          </div>

          <div className="sv-grid">
            {services.map((service, index) => (
              <div className="sv-card" key={index}>
                <div className="sv-icon">{service.icon}</div>
                <h3 className="sv-card-title">{service.title}</h3>
                <p className="sv-card-desc">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="sv-rule" />

        </div>
      </section>
    </>
  );
};

export default Services;