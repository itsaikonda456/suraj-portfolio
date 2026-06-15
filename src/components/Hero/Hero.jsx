import { useEffect, useState } from "react";
import surajImg from "../../surajj.png";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;800;900&display=swap');

        .hero-section *,
        .hero-section *::before,
        .hero-section *::after {
          box-sizing: border-box;
        }

        .hero-section {
          position: relative;
          width: 100%;
          height: 100svh;
          min-height: 520px;
          max-height: 960px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          background: #000;
          font-family: 'Inter', sans-serif;
        }

        /* ── Background photo ── */
        .hero-bg-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 115%;
  object-fit: contain;
  object-position: center 20%;   /* ← was "center top", now shows face */
  filter: brightness(0.72) grayscale(0.18);
  will-change: transform;
  user-select: none;
  pointer-events: none;
  transition: opacity 0.9s ease;
  opacity: 0;
}
        .hero-bg-photo.loaded { opacity: 1; }

        /* ── Overlay — bottom-heavy dark fade, no gold tint ── */
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.05) 0%,
            rgba(0,0,0,0.08) 40%,
            rgba(0,0,0,0.82) 100%
          );
          z-index: 1;
          pointer-events: none;
        }

        /* ── Content block — sits at the bottom ── */
        .hero-content {
          position: relative;
          z-index: 5;
          text-align: center;
          padding: 0 clamp(20px, 5vw, 80px);
          padding-bottom: clamp(70px, 9vw, 110px);
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0;
          animation: heroFadeUp 0.85s 0.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes heroFadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── Name — huge, heavy, white ── */
        .hero-name {
          font-family: 'Inter', sans-serif;
          font-size: clamp(52px, 7vw, 110px);
          font-weight: 500;
          color: #ffffffd1;
          letter-spacing: clamp(-3px, -0.3vw, -1px);
          line-height: 1;
          display: block;
          text-shadow: 0 2px 40px rgba(0,0,0,0.5);
        }

        /* ── Tagline ── */
        .hero-tagline {
          display: block;
          font-family: 'Inter', sans-serif;
          font-size: clamp(13px, 1.4vw, 18px);
          font-weight: 400;
          color: rgba(255,255,255,0.68);
          margin-top: clamp(12px, 1.5vw, 18px);
          letter-spacing: 0.01em;
        }

        /* ── Scroll indicator ── */
        .hero-scroll-indicator {
          position: absolute;
          bottom: clamp(22px, 3vw, 36px);
          left: 50%;
          transform: translateX(-50%);
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          opacity: 0;
          animation: heroFadeUp 0.9s 0.95s cubic-bezier(0.22,1,0.36,1) forwards;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
        }

        .scroll-mouse {
          width: 20px;
          height: 32px;
          border: 1.5px solid rgba(255,255,255,0.30);
          border-radius: 10px;
          display: flex;
          justify-content: center;
          padding-top: 5px;
        }

        .scroll-dot {
          width: 3px;
          height: 5px;
          background: #fff;
          border-radius: 3px;
          animation: scrollDot 1.8s ease infinite;
        }

        @keyframes scrollDot {
          0%   { transform: translateY(0);   opacity: 1; }
          60%  { transform: translateY(7px); opacity: 0; }
          61%  { transform: translateY(0);   opacity: 0; }
          100% { transform: translateY(0);   opacity: 1; }
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .hero-section { max-height: 820px; }
        }

        @media (max-width: 640px) {
          .hero-section { max-height: 100svh; min-height: 500px; }
          .hero-name    { font-size: clamp(44px, 13vw, 72px); }
        }

        @media (max-width: 480px) {
          .hero-name    { font-size: clamp(38px, 14vw, 60px); }
          .hero-tagline { font-size: 13px; }
        }

        @media (max-width: 360px) {
          .hero-name    { font-size: 34px; }
        }

        @media (max-height: 500px) and (orientation: landscape) {
          .hero-section  { max-height: 100svh; }
          .hero-content  { padding-bottom: 20px; }
          .hero-scroll-indicator { display: none; }
        }

        /* =========================
   PROFESSIONAL EYE GLOW
========================= */

.laser-eyes-container{
  position:absolute;
  inset:0;
  pointer-events:none;
  z-index:4;
}

.eye-glow-left,
.eye-glow-right{
  position:absolute;
  width:14px;
  height:14px;
  border-radius:50%;
  background:#ff1a1a;

  transform:translate(-50%,-50%);

  box-shadow:
    0 0 8px rgba(255,0,0,.9),
    0 0 18px rgba(255,0,0,.8),
    0 0 30px rgba(255,0,0,.6);

  animation: eyeEnergy 1.2s ease-in-out infinite;
}

/* Based on YOUR screenshot */
.eye-glow-left{
  top:43.8%;
  left:42.9%;
}

.eye-glow-right{
  top:43.8%;
  left:53.7%;
}

@keyframes eyeEnergy{
  0%{
    opacity:.65;
    transform:translate(-50%,-50%) scale(.9);
  }

  50%{
    opacity:1;
    transform:translate(-50%,-50%) scale(1.2);
  }

  100%{
    opacity:.65;
    transform:translate(-50%,-50%) scale(.9);
  }
}

/* Outer energy ring */
.eye-glow-left::before,
.eye-glow-right::before{
  content:"";
  position:absolute;
  inset:-6px;
  border-radius:50%;

  border:1px solid rgba(255,0,0,.5);

  animation:ringPulse 1.5s infinite;
}

@keyframes ringPulse{
  from{
    opacity:.7;
    transform:scale(.8);
  }

  to{
    opacity:0;
    transform:scale(1.8);
  }
}
          
      `}</style>

      <section className="hero-section" id="home">

        <img
          className={`hero-bg-photo ${loaded ? "loaded" : ""}`}
          src={surajImg}
          alt="Suraj"
          onLoad={() => setLoaded(true)}
          style={{
  transform: `scale(1.04) translateY(${scrollY * 0.05}px)`,  /* ← was 1.08 / 0.08 */
}}
        />

        {/* <div className="laser-eyes-container">
  <div className="laser-eye-left"></div>
  <div className="laser-eye-right"></div>
</div> */}

        <div className="hero-overlay" />

        <div className="hero-content">
          {/* <span className="hero-name">Suraj Clips</span> */}
          <span className="hero-tagline">Filmmaker &nbsp;·&nbsp; Visual Storyteller &nbsp;·&nbsp; Editor &nbsp;·&nbsp; Cinematic</span>
        </div>

        <button
          className="hero-scroll-indicator"
          onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
          aria-label="Scroll down"
        >
          <div className="scroll-mouse">
            <div className="scroll-dot" />
          </div>
        </button>

      </section>
    </>
  );
};

export default Hero;