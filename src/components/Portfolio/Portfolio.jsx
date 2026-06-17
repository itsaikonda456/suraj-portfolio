import React, { useState, useRef, useCallback, useEffect } from "react";

const VIDEOS = [
  {
    id: 1,
    title: "Wedding Film",
    category: "Wedding",
    src: "https://res.cloudinary.com/dlybuktui/video/upload/v1781674967/vi1_n5e900.mov",
    poster: "https://res.cloudinary.com/dlybuktui/video/upload/so_2,f_jpg,q_80/v1781674967/vi1_n5e900.jpg",
    description: "An intimate cinematic story of two souls uniting — captured with soft light, stolen glances, and the kind of emotion that lives in the quiet in-between moments.",
    software: "Premiere Pro · DaVinci Resolve · After Effects",
    duration: "4 min highlight reel",
    client: "Sharma & Kapoor Wedding",
  },
  {
    id: 2,
    title: "Travel Documentary",
    category: "Travel",
    src: "https://res.cloudinary.com/dlybuktui/video/upload/v1781674935/vi2_lcnrxy.mov",
    poster: "https://res.cloudinary.com/dlybuktui/video/upload/so_2,f_jpg,q_80/v1781674935/vi2_lcnrxy.jpg",
    description: "From Himalayan ridgelines to coastal monsoons — a visual diary that turns travel into art and geography into feeling.",
    software: "DaVinci Resolve · Luma AI · Topaz Video",
    duration: "12 min documentary",
    client: "Wanderlust India Series",
  },
  {
    id: 3,
    title: "Commercial Shoot",
    category: "Commercial",
    src: "https://res.cloudinary.com/dlybuktui/video/upload/v1781674354/vi3_ybg6vr.mp4",
    poster: "https://res.cloudinary.com/dlybuktui/video/upload/so_2,f_jpg,q_80/v1781674354/vi3_ybg6vr.jpg",
    description: "Brand storytelling that cuts through noise — product meets narrative in a 30-second spot engineered to convert and captivate.",
    software: "After Effects · Premiere Pro · Cinema 4D",
    duration: "30 sec TVC",
    client: "Tata Consumer Products",
  },
  {
    id: 4,
    title: "Luxury Product Shoot",
    category: "Commercial",
    src: "https://res.cloudinary.com/dlybuktui/video/upload/v1781674576/vi4_hyb85h.mp4",
    poster: "https://res.cloudinary.com/dlybuktui/video/upload/so_2,f_jpg,q_80/v1781674576/vi4_hyb85h.jpg",
    description: "Every frame is a still life — macro precision, controlled light, and product hero sequences built to make desire tangible.",
    software: "Premiere Pro · Mocha Pro · Nuke",
    duration: "60 sec brand film",
    client: "House of Rare, Mumbai",
  },
  {
    id: 5,
    title: "Instagram Reels",
    category: "Reels",
    src: "https://res.cloudinary.com/dlybuktui/video/upload/v1781674297/vi5_k9ile3.mp4",
    poster: "https://res.cloudinary.com/dlybuktui/video/upload/so_2,f_jpg,q_80/v1781674297/vi5_k9ile3.jpg",
    description: "Scroll-stopping short form — paced to the beat, cut for retention, designed to grow accounts and dominate the feed.",
    software: "CapCut Pro · Premiere Pro · Audition",
    duration: "15–60 sec reels pack",
    client: "Various influencer clients",
  },
  {
    id: 6,
    title: "Instagram Reels",
    category: "Reels",
    src: "https://res.cloudinary.com/dlybuktui/video/upload/v1781674294/vi6_wae9v3.mp4",
    poster: "https://res.cloudinary.com/dlybuktui/video/upload/so_2,f_jpg,q_80/v1781674294/vi6_wae9v3.jpg",
    description: "Scroll-stopping short form — paced to the beat, cut for retention, designed to grow accounts and dominate the feed.",
    software: "CapCut Pro · Premiere Pro · Audition",
    duration: "15–60 sec reels pack",
    client: "Various influencer clients",
  },
];

// const FILTERS = ["All", "Wedding", "Travel", "Commercial", "Reels"];

/* ─── Icons ─── */
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <polygon points="6,3 20,12 6,21" />
  </svg>
);
const PauseIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <rect x="5" y="3" width="4" height="18" rx="1" />
    <rect x="15" y="3" width="4" height="18" rx="1" />
  </svg>
);
const VolumeOnIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);
const VolumeOffIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
    <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);
const FullscreenIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15,3 21,3 21,9" /><polyline points="9,21 3,21 3,15" />
    <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);
const FlipIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 4v6h6" /><path d="M3.51 15a9 9 0 1 0 .49-3.59" />
  </svg>
);

/* ─── Lerp helper ─── */
const lerp = (a, b, t) => a + (b - a) * t;

/* ─── 3D Tilt Card ─── */
const VideoCard = ({ item, active, onPlay, onRegister, onEnd }) => {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const rafRef = useRef(null);
  const currentTilt = useRef({ rx: 0, ry: 0, glowX: 50, glowY: 50, mx: 0, my: 0, scale: 1, shadow: 0 });
  const targetTilt = useRef({ rx: 0, ry: 0, glowX: 50, glowY: 50, mx: 0, my: 0, scale: 1, shadow: 0 });
  const isMobile = useRef(false);

  const [isFlipped, setIsFlipped] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isPlaying = active === item.id;

  useEffect(() => {
    isMobile.current = window.matchMedia("(hover: none)").matches;
    if (videoRef.current) onRegister(item.id, videoRef.current);
  }, []);

  /* Pause / reset when no longer active */
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (!isPlaying) {
      el.pause();
      el.currentTime = 0;
      el.muted = false;
      setMuted(false);
      setProgress(0);
    }
  }, [isPlaying]);

  /* Progress tracking */
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const tick = () => { if (el.duration) setProgress((el.currentTime / el.duration) * 100); };
    el.addEventListener("timeupdate", tick);
    return () => el.removeEventListener("timeupdate", tick);
  }, []);

  /* RAF animation loop */
  const startLoop = useCallback(() => {
    if (rafRef.current) return;
    const loop = () => {
      const c = currentTilt.current;
      const t = targetTilt.current;
      const SPEED = 0.1;
      c.rx = lerp(c.rx, t.rx, SPEED);
      c.ry = lerp(c.ry, t.ry, SPEED);
      c.glowX = lerp(c.glowX, t.glowX, SPEED);
      c.glowY = lerp(c.glowY, t.glowY, SPEED);
      c.mx = lerp(c.mx, t.mx, SPEED);
      c.my = lerp(c.my, t.my, SPEED);
      c.scale = lerp(c.scale, t.scale, SPEED);
      c.shadow = lerp(c.shadow, t.shadow, SPEED);

      if (cardRef.current) {
        const el = cardRef.current;
        const s = el.style;
        s.transform = `
          translate(${c.mx.toFixed(2)}px, ${c.my.toFixed(2)}px)
          perspective(1400px)
          rotateX(${c.rx.toFixed(2)}deg)
          rotateY(${c.ry.toFixed(2)}deg)
          scale(${c.scale.toFixed(4)})
        `;
        s.boxShadow = `
          0 ${(8 + c.shadow * 0.5).toFixed(1)}px ${(24 + c.shadow).toFixed(1)}px rgba(0,0,0,${(0.4 + c.shadow * 0.012).toFixed(3)}),
          0 0 0 ${isPlaying ? "1.5px" : "0"} var(--gold)
        `;
        /* Glow reflection layer */
        const glow = el.querySelector(".vc3__glow");
        if (glow) {
          glow.style.background = `radial-gradient(circle at ${c.glowX.toFixed(1)}% ${c.glowY.toFixed(1)}%, rgba(255,255,255,0.13) 0%, transparent 62%)`;
          glow.style.opacity = c.shadow > 2 ? "1" : "0";
        }
      }

      /* Keep looping only if values aren't settled */
      const diff = Math.abs(c.rx - t.rx) + Math.abs(c.ry - t.ry) + Math.abs(c.mx - t.mx) + Math.abs(c.my - t.my) + Math.abs(c.scale - t.scale);
      if (diff < 0.003) { rafRef.current = null; return; }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
  }, [isPlaying]);

  const handleMouseMove = useCallback((e) => {
    if (isMobile.current || isFlipped) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rx = (y - 0.5) * -18;
    const ry = (x - 0.5) * 22;
    targetTilt.current = {
      rx, ry,
      glowX: x * 100,
      glowY: y * 100,
      mx: (x - 0.5) * 15,
      my: (y - 0.5) * 12,
      scale: 1.03,
      shadow: 40,
    };
    startLoop();
  }, [isFlipped, startLoop]);

  const handleMouseEnter = useCallback(() => {
    if (isMobile.current) return;
    setIsHovered(true);
    targetTilt.current.scale = 1.03;
    targetTilt.current.shadow = 40;
    startLoop();
  }, [startLoop]);

  const handleMouseLeave = useCallback(() => {
    if (isMobile.current) return;
    setIsHovered(false);
    targetTilt.current = { rx: 0, ry: 0, glowX: 50, glowY: 50, mx: 0, my: 0, scale: 1, shadow: 0 };
    startLoop();
  }, [startLoop]);

  useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  /* Touch: tap flips, hold plays */
  const handleCardClick = (e) => {
    if (isMobile.current) {
      if (!isFlipped) { setIsFlipped(true); return; }
      return;
    }
    if (isFlipped) return;
    const el = videoRef.current;
    if (!el) return;
    if (isPlaying) { el.pause(); onPlay(null); }
    else {
      el.muted = false; el.volume = 1;
      el.play().catch(() => { el.muted = true; setMuted(true); el.play().catch(() => {}); });
      onPlay(item.id);
    }
  };

  const handleFlipFront = (e) => { e.stopPropagation(); setIsFlipped(false); };
  const handleFlipBack = (e) => { e.stopPropagation(); setIsFlipped(true); };

  const handleMute = (e) => {
    e.stopPropagation();
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  const handleFullscreen = (e) => {
    e.stopPropagation();
    const el = videoRef.current;
    if (!el) return;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.webkitEnterFullscreen) el.webkitEnterFullscreen();
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    const el = videoRef.current;
    if (!el || !el.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    el.currentTime = ((e.clientX - rect.left) / rect.width) * el.duration;
  };

  return (
    <div
      className="vc3__scene"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className={`vc3__card${isFlipped ? " vc3__card--flipped" : ""}${isPlaying ? " vc3__card--playing" : ""}`}
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        aria-label={`${isPlaying ? "Pause" : "Play"} ${item.title}`}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), handleCardClick(e))}
        style={{ willChange: "transform", transformStyle: "preserve-3d" }}
      >

        {/* ── FRONT ── */}
        <div className="vc3__face vc3__front">
          {/* Glow reflection */}
          <div className="vc3__glow" aria-hidden="true" />

          {/* Video */}
          <video
            ref={videoRef}
            className="vc3__vid"
            src={item.src}
            poster={item.poster}
            playsInline
            preload="metadata"
            onEnded={() => onEnd(item.id)}
            style={{ transform: isHovered && !isFlipped ? "scale(1.07) translateZ(12px)" : "scale(1) translateZ(0)" }}
          />

          <div className="vc3__grad" />

          {/* Play/Pause */}
          <div className={`vc3__pp${isPlaying ? " vc3__pp--active" : ""}`}>
            <div className="vc3__btn">
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </div>
          </div>

          {/* Top-right controls while playing */}
          {isPlaying && (
            <div className="vc3__tr">
              <button className="vc3__ic" onClick={handleMute} aria-label={muted ? "Unmute" : "Mute"}>
                {muted ? <VolumeOffIcon /> : <VolumeOnIcon />}
              </button>
              <button className="vc3__ic" onClick={handleFullscreen} aria-label="Fullscreen">
                <FullscreenIcon />
              </button>
            </div>
          )}

          {/* Flip button (top-right when not playing) */}
          {!isPlaying && (
            <button className="vc3__flip-btn" onClick={handleFlipBack} aria-label="See project details">
              <FlipIcon /> <span>Info</span>
            </button>
          )}

          {/* Meta */}
          <div className="vc3__meta" style={{ transform: isHovered && !isFlipped ? "translateZ(20px)" : "translateZ(0)" }}>
            <span className="vc3__cat" style={{ transform: isHovered && !isFlipped ? "translateZ(8px)" : "translateZ(0)" }}>
              {item.category}
            </span>
            <span className="vc3__name">{item.title}</span>
          </div>

          {/* Progress */}
          {isPlaying && (
            <div className="vc3__prog" onClick={handleSeek} title="Seek">
              <div className="vc3__track">
                <div className="vc3__fill" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}
        </div>

        {/* ── BACK ── */}
        <div className="vc3__face vc3__back">
          <div className="vc3__back-inner">
            <div className="vc3__back-top">
              <span className="vc3__cat">{item.category}</span>
              <h3 className="vc3__back-title">{item.title}</h3>
            </div>

            <p className="vc3__back-desc">{item.description}</p>

            <div className="vc3__back-stats">
              <div className="vc3__stat">
                <span className="vc3__stat-label">Client</span>
                <span className="vc3__stat-val">{item.client}</span>
              </div>
              <div className="vc3__stat">
                <span className="vc3__stat-label">Duration</span>
                <span className="vc3__stat-val">{item.duration}</span>
              </div>
              <div className="vc3__stat vc3__stat--full">
                <span className="vc3__stat-label">Tools</span>
                <span className="vc3__stat-val">{item.software}</span>
              </div>
            </div>

            <div className="vc3__back-actions">
              <button className="vc3__cta" onClick={(e) => { e.stopPropagation(); handleFlipFront(e); }}>
                Watch Film
              </button>
              <button className="vc3__ghost" onClick={handleFlipFront} aria-label="Go back">
                ← Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Portfolio Section ─── */
const Portfolio = () => {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(null);
  const refsMap = useRef({});

  const handleRegister = useCallback((id, el) => { refsMap.current[id] = el; }, []);

  const handlePlay = useCallback((id) => {
    if (active !== null && active !== id && refsMap.current[active]) {
      refsMap.current[active].pause();
      refsMap.current[active].currentTime = 0;
    }
    setActive(id);
  }, [active]);

  const handleEnd = useCallback((id) => {
    setActive((prev) => (prev === id ? null : prev));
  }, []);

  const handleFilter = (f) => {
    if (active !== null && refsMap.current[active]) {
      refsMap.current[active].pause();
      refsMap.current[active].currentTime = 0;
    }
    setActive(null);
    setFilter(f);
  };

  const list = filter === "All" ? VIDEOS : VIDEOS.filter((v) => v.category === filter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .port3 *, .port3 *::before, .port3 *::after {
          box-sizing: border-box; margin: 0; padding: 0;
        }

        :root {
          --gold:    #c9a84c;
          --gold-d:  rgba(201,168,76,0.12);
          --bg:      #080808;
          --card:    #0f0f0f;
          --text:    #f0ece4;
          --muted:   #7a7670;
          --dim:     #3a3830;
          --border:  rgba(255,255,255,0.08);
          --ease:    cubic-bezier(0.25,0.46,0.45,0.94);
        }

        /* ── SECTION ── */
        .port3 {
          background: var(--bg);
          padding: clamp(44px,7vw,80px) 0;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .port3::before {
          content: '';
          position: absolute;
          top: -10%; left: 50%;
          transform: translateX(-50%);
          width: min(480px,44vw);
          height: min(480px,44vw);
          background: radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 68%);
          pointer-events: none;
        }

        .port3__wrap {
          width: 100%;
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 clamp(12px,3.5vw,36px);
          position: relative;
          z-index: 1;
        }

        /* ── HEADER ── */
        .port3__hd { text-align: center; margin-bottom: clamp(28px,4.5vw,52px); }

        .port3__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 11px;
        }
        .port3__eyebrow::before, .port3__eyebrow::after {
          content: '';
          display: block;
          width: 22px; height: 1px;
          background: var(--gold);
          opacity: 0.5;
        }

        .port3__h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.7rem,3.2vw,2.8rem);
          font-weight: 600;
          color: var(--text);
          line-height: 1.05;
          letter-spacing: -0.01em;
          margin-bottom: 9px;
        }
        .port3__h1 em { font-style: italic; color: #e2c47e; }

        .port3__desc {
          font-size: 13px;
          line-height: 1.78;
          color: var(--muted);
          max-width: 360px;
          margin: 0 auto;
          font-weight: 300;
        }

        /* ── FILTERS ── */
        .port3__filters {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: clamp(20px,3.5vw,40px);
        }

        .port3__f {
          padding: 5px 16px;
          border-radius: 100px;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--muted);
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: all 0.24s var(--ease);
          white-space: nowrap;
        }
        .port3__f:hover { border-color: rgba(201,168,76,0.38); color: #e2c47e; background: var(--gold-d); }
        .port3__f.sel { background: var(--gold); border-color: var(--gold); color: #080808; font-weight: 600; }

        /* ── GRID ── */
        .port3__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          /* Enough padding so tilted cards don't clip */
          padding: 20px 10px;
          margin: -20px -10px;
        }

        /* ── SCENE (3D context) ── */
        .vc3__scene {
          perspective: 1400px;
          perspective-origin: center center;
        }

        /* ── CARD ── */
        .vc3__card {
          position: relative;
          border-radius: 10px;
          aspect-ratio: 4 / 5;
          cursor: pointer;
          transform-style: preserve-3d;
          transition: box-shadow 0.3s ease;
          /* GPU hints */
          will-change: transform;
          transform: perspective(1400px) rotateX(0) rotateY(0) scale(1);
          outline: none;
          -webkit-tap-highlight-color: transparent;
        }

        /* Playing ring is handled inline via box-shadow in RAF */
        .vc3__card--playing .vc3__front {
          box-shadow: inset 0 0 0 1.5px var(--gold);
        }

        /* ── FACE (shared front/back) ── */
        .vc3__face {
          position: absolute;
          inset: 0;
          border-radius: 10px;
          overflow: hidden;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /* ── FRONT ── */
        .vc3__front {
          background: var(--card);
          transform: rotateY(0deg);
        }

        /* ── BACK ── */
        .vc3__back {
          background: linear-gradient(160deg, #111 0%, #0a0a0a 60%, #0d0c08 100%);
          border: 1px solid rgba(201,168,76,0.18);
          transform: rotateY(180deg);
          display: flex;
          align-items: stretch;
        }

        /* Flip state */
        .vc3__card--flipped { cursor: default; }
        .vc3__card--flipped .vc3__front { transform: rotateY(-180deg); }
        .vc3__card--flipped .vc3__back  { transform: rotateY(0deg); }

        /* Smooth flip */
        .vc3__front, .vc3__back {
          transition: transform 0.7s cubic-bezier(0.77,0,0.175,1);
        }

        /* ── GLOW reflection ── */
        .vc3__glow {
          position: absolute;
          inset: 0;
          z-index: 6;
          pointer-events: none;
          border-radius: 10px;
          background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 62%);
          opacity: 0;
          transition: opacity 0.3s ease;
          mix-blend-mode: screen;
        }

        /* ── VIDEO ── */
        .vc3__vid {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          background: #000;
          transition: transform 0.6s var(--ease);
          will-change: transform;
        }

        /* ── GRADIENT overlay ── */
        .vc3__grad {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.82) 0%,
            rgba(0,0,0,0.12) 44%,
            transparent 70%
          );
          transition: opacity 0.3s ease;
        }
        .vc3__card--playing .vc3__grad { opacity: 0.15; }

        /* ── PLAY/PAUSE ── */
        .vc3__pp {
          position: absolute;
          z-index: 4;
          top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          opacity: 0;
          transition: top 0.32s var(--ease), left 0.32s var(--ease),
                      transform 0.32s var(--ease), opacity 0.22s ease;
        }
        .vc3__scene:hover .vc3__pp:not(.vc3__pp--active) { opacity: 1; }
        .vc3__pp--active { top: 9px !important; left: 9px !important; transform: none !important; opacity: 1 !important; }

        .vc3__btn {
          width: 42px; height: 42px;
          border-radius: 50%;
          background: rgba(0,0,0,0.52);
          border: 1.5px solid rgba(201,168,76,0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gold);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          transition: transform 0.18s ease, background 0.18s ease;
        }
        .vc3__pp--active .vc3__btn { width: 30px; height: 30px; border-color: rgba(255,255,255,0.28); color: #fff; }
        .vc3__scene:hover .vc3__btn { transform: scale(1.07); background: rgba(201,168,76,0.14); }

        /* ── TOP-RIGHT controls ── */
        .vc3__tr { position: absolute; top: 9px; right: 9px; z-index: 5; display: flex; gap: 5px; }

        .vc3__ic {
          width: 30px; height: 30px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(0,0,0,0.52);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: rgba(255,255,255,0.78);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          transition: background 0.18s, border-color 0.18s, color 0.18s;
          padding: 0;
        }
        .vc3__ic:hover { background: rgba(201,168,76,0.22); border-color: rgba(201,168,76,0.45); color: var(--gold); }

        /* ── FLIP button ── */
        .vc3__flip-btn {
          position: absolute;
          top: 9px; right: 9px;
          z-index: 5;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 9px;
          border-radius: 100px;
          border: 1px solid rgba(201,168,76,0.28);
          background: rgba(0,0,0,0.48);
          color: rgba(255,255,255,0.65);
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          transition: all 0.2s ease;
          opacity: 0;
        }
        .vc3__scene:hover .vc3__flip-btn { opacity: 1; }
        .vc3__flip-btn:hover { background: rgba(201,168,76,0.16); border-color: rgba(201,168,76,0.55); color: var(--gold); }

        /* ── META ── */
        .vc3__meta {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          z-index: 2;
          padding: 10px 12px 32px;
          pointer-events: none;
          transform: translateY(4px) translateZ(0);
          opacity: 0;
          transition: opacity 0.26s ease, transform 0.26s ease;
          will-change: transform;
        }
        .vc3__scene:hover .vc3__meta { opacity: 1; transform: translateY(0) translateZ(20px); }
        .vc3__card--playing .vc3__meta { opacity: 0 !important; }

        @media (hover: none) { .vc3__meta { opacity: 1; transform: translateY(0); } }

        .vc3__cat {
          display: block;
          font-size: 8px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 600;
          margin-bottom: 2px;
        }

        .vc3__name {
          display: block;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.82rem,1.3vw,1.05rem);
          font-weight: 600;
          color: var(--text);
          line-height: 1.2;
        }

        /* ── PROGRESS ── */
        .vc3__prog { position: absolute; bottom: 0; left: 0; right: 0; z-index: 5; padding-top: 8px; cursor: pointer; }
        .vc3__track { width: 100%; height: 3px; background: rgba(255,255,255,0.14); }
        .vc3__fill { height: 100%; background: var(--gold); border-radius: 0 2px 2px 0; transition: width 0.1s linear; position: relative; }
        .vc3__fill::after { content: ''; position: absolute; right: -4px; top: 50%; transform: translateY(-50%); width: 7px; height: 7px; border-radius: 50%; background: var(--gold); box-shadow: 0 0 0 2px rgba(201,168,76,0.28); }

        /* ── BACK SIDE ── */
        .vc3__back-inner {
          width: 100%;
          padding: 18px 16px 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .vc3__back-top { border-bottom: 1px solid rgba(201,168,76,0.12); padding-bottom: 10px; }

        .vc3__back-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1rem,1.6vw,1.25rem);
          font-weight: 600;
          color: var(--text);
          line-height: 1.15;
          margin-top: 3px;
        }

        .vc3__back-desc {
          font-size: 11px;
          line-height: 1.72;
          color: rgba(240,236,228,0.68);
          font-weight: 300;
          flex: 1;
        }

        .vc3__back-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .vc3__stat { display: flex; flex-direction: column; gap: 2px; }
        .vc3__stat--full { grid-column: 1 / -1; }

        .vc3__stat-label {
          font-size: 8px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
          font-weight: 600;
        }

        .vc3__stat-val {
          font-size: 10px;
          color: var(--text);
          line-height: 1.4;
          font-weight: 400;
        }

        .vc3__back-actions { display: flex; align-items: center; gap: 8px; margin-top: 4px; }

        .vc3__cta {
          flex: 1;
          padding: 8px 0;
          border-radius: 4px;
          background: var(--gold);
          border: none;
          color: #080808;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .vc3__cta:hover { opacity: 0.85; }

        .vc3__ghost {
          padding: 8px 10px;
          border-radius: 4px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.12);
          color: var(--muted);
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .vc3__ghost:hover { border-color: rgba(201,168,76,0.3); color: var(--gold); }

        /* ── EMPTY ── */
        .port3__empty { grid-column: 1/-1; text-align: center; padding: 52px 20px; color: var(--dim); font-size: 13px; font-style: italic; }

        /* ── DIVIDER ── */
        .port3__divider { width: 38px; height: 1px; background: linear-gradient(to right,var(--gold),transparent); margin: clamp(24px,4vw,44px) auto; }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) { .port3__grid { gap: 10px; } }

        @media (max-width: 680px) {
          .port3__grid { grid-template-columns: repeat(2,1fr); gap: 8px; }
          .vc3__card { aspect-ratio: 3/4; }
          /* Disable 3D tilt on mobile — scene perspective stays but RAF doesn't fire */
          .vc3__flip-btn { opacity: 1; }
        }

        @media (max-width: 480px) {
          .port3__grid { gap: 6px; }
          .vc3__card { aspect-ratio: 1/1; }
          .vc3__btn { width: 34px; height: 34px; }
          .vc3__pp--active .vc3__btn { width: 26px; height: 26px; }
          .vc3__ic { width: 26px; height: 26px; }
          .port3__h1 { font-size: 1.55rem; }
          .vc3__back-inner { padding: 12px; gap: 8px; }
          .vc3__back-desc { font-size: 10px; }
          .vc3__back-title { font-size: 0.95rem; }
        }

        @media (max-width: 380px) { .port3__grid { gap: 5px; } .port3__wrap { padding: 0 10px; } }
        @media (max-width: 300px) { .port3__grid { grid-template-columns: 1fr; } .vc3__card { aspect-ratio: 4/3; } }

        /* Mobile tap-to-flip always shows flip button */
        @media (hover: none) { .vc3__flip-btn { opacity: 1 !important; } }
      `}</style>

      <section className="port3" id="portfolio">
        <div className="port3__wrap">

          <div className="port3__hd">
            <span className="port3__eyebrow">Selected Works</span>
            <h2 className="port3__h1">Crafted with <em>Vision</em></h2>
            <p className="port3__desc">
              Weddings, documentaries, commercials — every frame
              edited to tell the story it was meant to tell.
            </p>
          </div>

          {/* <div className="port3__filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`port3__f${filter === f ? " sel" : ""}`}
                onClick={() => handleFilter(f)}
              >
                {f}
              </button>
            ))}
          </div> */}

          <div className="port3__grid">
            {list.length === 0 ? (
              <p className="port3__empty">No projects in this category yet.</p>
            ) : (
              list.map((item) => (
                <VideoCard
                  key={item.id}
                  item={item}
                  active={active}
                  onPlay={handlePlay}
                  onRegister={handleRegister}
                  onEnd={handleEnd}
                />
              ))
            )}
          </div>

          <div className="port3__divider" />

        </div>
      </section>
    </>
  );
};

export default Portfolio;