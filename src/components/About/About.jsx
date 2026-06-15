import React from "react";
import surajjImg from "../../surajj.png";

const About = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --gold:         #c9a84c;
          --gold-light:   #e2c47e;
          --gold-dim:     rgba(201,168,76,0.12);
          --bg:           #0d0d0d;
          --text-primary: #f0ece4;
          --text-muted:   #888880;
          --text-dim:     #666660;
          --border:       rgba(255,255,255,0.07);
          --ease:         cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .ab-section {
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          padding: clamp(72px, 8vw, 110px) 0;
          position: relative;
          overflow: hidden;
        }

        .ab-section::before {
          content: '';
          position: absolute;
          top: -10%; right: -10%;
          width: min(600px, 45vw);
          height: min(600px, 45vw);
          background: radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 65%);
          pointer-events: none;
        }

        .ab-container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 clamp(20px, 5vw, 60px);
          position: relative;
          z-index: 1;
        }

        .ab-row {
          display: grid;
          grid-template-columns: 48fr 52fr;
          gap: clamp(36px, 5vw, 72px);
          align-items: start;
        }

        /* ── IMAGE COLUMN ── */
        .ab-image-col {
          position: relative;
          /* Extra bottom padding so the badge doesn't get clipped */
          padding-bottom: 24px;
        }

        /* The decorative offset border — sits BEHIND the image wrap */
        .ab-image-frame {
          position: relative;
          display: block;
          width: 100%;
        }

        /* Decorative frame offset — only visible on large screens */
        .ab-image-frame::before {
          content: '';
          position: absolute;
          top: 12px;
          left: 12px;
          right: -12px;
          bottom: -12px;
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 4px;
          pointer-events: none;
          z-index: 0;
        }

        /* The actual image container — strictly clips the image */
        .ab-image-wrap {
          position: relative;
          z-index: 1;
          overflow: hidden;          /* ← this is what keeps image inside */
          border-radius: 4px;
          width: 100%;
          aspect-ratio: 3 / 4;      /* portrait ratio */
          max-height: 520px;
          background: #0a0a0a;      /* fallback while image loads */
        }

        .ab-image {
          position: absolute;        /* fill the wrap completely */
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          filter: grayscale(15%) contrast(1.08) brightness(0.95);
          transition: transform 1s var(--ease), filter 0.6s ease;
        }

        .ab-image-wrap:hover .ab-image {
          transform: scale(1.04);
          filter: grayscale(0%) contrast(1.05) brightness(1);
        }

        /* ── BADGE — smaller, tucked inside the column padding ── */
        .ab-badge {
          position: absolute;
          bottom: 0;                 /* sits in the 24px col padding */
          right: 0;
          z-index: 2;
          background: var(--gold);
          color: #0a0a0a;
          border-radius: 4px;
          padding: 8px 14px;
          text-align: center;
          box-shadow: 0 6px 20px rgba(0,0,0,0.5);
        }

        .ab-badge-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.1rem, 1.8vw, 1.5rem);
          font-weight: 700;
          line-height: 1;
          display: block;
        }

        .ab-badge-label {
          font-size: clamp(7px, 0.65vw, 9px);
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0.75;
          display: block;
          margin-top: 2px;
          white-space: nowrap;
        }

        /* ── CONTENT COLUMN ── */
        .ab-content {
          padding-top: clamp(0px, 1vw, 10px);
        }

        .ab-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--gold);
          font-size: clamp(10px, 0.9vw, 12px);
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          margin-bottom: clamp(12px, 1.6vw, 18px);
        }

        .ab-eyebrow::before {
          content: '';
          display: block;
          width: clamp(22px, 2.5vw, 32px);
          height: 1px;
          background: var(--gold);
          opacity: 0.6;
        }

        .ab-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.9rem, 3.2vw, 3.2rem);
          font-weight: 300;
          color: var(--text-primary);
          line-height: 1.1;
          letter-spacing: -0.01em;
          margin-bottom: clamp(14px, 1.8vw, 22px);
        }

        .ab-title strong {
          font-weight: 700;
          font-style: italic;
          color: var(--gold-light);
        }

        .ab-rule {
          width: clamp(32px, 3.5vw, 52px);
          height: 2px;
          background: linear-gradient(to right, var(--gold), transparent);
          margin-bottom: clamp(14px, 1.8vw, 22px);
        }

        .ab-lead {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.95rem, 1.4vw, 1.15rem);
          font-weight: 300;
          font-style: italic;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: clamp(10px, 1.3vw, 16px);
        }

        .ab-body {
          font-size: clamp(12.5px, 1.1vw, 14.5px);
          font-weight: 300;
          line-height: 1.85;
          color: var(--text-dim);
          margin-bottom: clamp(20px, 3vw, 36px);
          max-width: 440px;
        }

        .ab-stats {
          display: flex;
          gap: clamp(18px, 3vw, 40px);
          padding-bottom: clamp(18px, 2.5vw, 30px);
          border-bottom: 1px solid var(--border);
        }

        .ab-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.3rem, 2.2vw, 1.9rem);
          font-weight: 700;
          color: var(--gold-light);
          line-height: 1;
          display: block;
        }

        .ab-stat-label {
          font-size: clamp(8px, 0.8vw, 10px);
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-dim);
          display: block;
          margin-top: 5px;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .ab-row {
            grid-template-columns: 1fr;
            gap: clamp(28px, 5vw, 44px);
          }
          .ab-image-col { padding-bottom: 20px; }
          .ab-image-wrap { aspect-ratio: 4 / 5; max-height: 400px; }
          .ab-content { text-align: center; }
          .ab-eyebrow { justify-content: center; }
          .ab-rule { margin-left: auto; margin-right: auto; }
          .ab-body { margin-left: auto; margin-right: auto; }
          .ab-stats { justify-content: center; }
        }

        @media (max-width: 640px) {
          .ab-section { padding: 60px 0; }
          .ab-image-wrap { aspect-ratio: 3 / 4; max-height: 340px; }
          .ab-image-frame::before { display: none; }
          .ab-badge { padding: 6px 10px; }
        }

        @media (max-width: 480px) {
          .ab-section { padding: 52px 0; }
          .ab-image-wrap { aspect-ratio: 3 / 4; max-height: 300px; }
          .ab-stats { gap: 14px; }
        }

        @media (max-width: 360px) {
          .ab-title { font-size: 1.7rem; }
          .ab-image-wrap { max-height: 260px; }
        }
      `}</style>

      <section className="ab-section" id="about">
        <div className="ab-container">
          <div className="ab-row">

            <div className="ab-image-col">
              <div className="ab-image-frame">
                <div className="ab-image-wrap">
                  <img
                    className="ab-image"
                    src={surajjImg}
                    alt="Surajj"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="ab-badge">
                <span className="ab-badge-num">2+</span>
                <span className="ab-badge-label">Years Exp.</span>
              </div>
            </div>

            <div className="ab-content">
              <div className="ab-eyebrow">About Me</div>
              <h2 className="ab-title">
                Crafting Stories<br />
                Through <strong>Visual Art</strong>
              </h2>
              <div className="ab-rule" />
              <p className="ab-lead">
                A filmmaker and visual storyteller based at the coast of
                Semantics, where every frame has a purpose.
              </p>
              <p className="ab-body">
                A small river named Duden flows by their place and supplies
                it with the necessary regelialia. It is a paradisematic
                country, in which roasted parts of sentences fly into your
                mouth — and every frame tells a story worth remembering.
              </p>
              <div className="ab-stats">
                <div>
                  <span className="ab-stat-num">50+</span>
                  <span className="ab-stat-label">Projects</span>
                </div>
                <div>
                  <span className="ab-stat-num">30+</span>
                  <span className="ab-stat-label">Clients</span>
                </div>
                <div>
                  <span className="ab-stat-num">10+</span>
                  <span className="ab-stat-label">Awards</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default About;