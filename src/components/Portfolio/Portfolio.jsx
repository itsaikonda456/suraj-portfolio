import React, { useState, useRef, useCallback, useEffect } from "react";

const VIDEOS = [
  {
    id: 1,
    title: "Wedding Film",
    category: "Wedding",
    src: "https://res.cloudinary.com/dlybuktui/video/upload/v1781415980/vi3_mxsstz.mp4",
    poster: "https://res.cloudinary.com/dlybuktui/video/upload/so_2,f_jpg,q_80/v1781415980/vi3_mxsstz.jpg",
  },
  {
    id: 2,
    title: "Travel Documentary",
    category: "Travel",
    src: "https://res.cloudinary.com/dlybuktui/video/upload/v1781415958/vi1_cwknb5.mp4",
    poster: "https://res.cloudinary.com/dlybuktui/video/upload/so_2,f_jpg,q_80/v1781415958/vi1_cwknb5.jpg",
  },
  {
    id: 3,
    title: "Commercial Shoot",
    category: "Commercial",
    src: "https://res.cloudinary.com/dlybuktui/video/upload/v1781415997/vi2_e4doah.mp4",
    poster: "https://res.cloudinary.com/dlybuktui/video/upload/so_2,f_jpg,q_80/v1781415997/vi2_e4doah.jpg",
  },
  {
    id: 4,
    title: "Luxury Product Shoot",
    category: "Commercial",
    src: "https://res.cloudinary.com/dlybuktui/video/upload/v1781415969/vi5_apchmb.mp4",
    poster: "https://res.cloudinary.com/dlybuktui/video/upload/so_2,f_jpg,q_80/v1781415969/vi5_apchmb.jpg",
  },
  {
    id: 5,
    title: "Instagram Reels",
    category: "Reels",
    src: "https://res.cloudinary.com/dlybuktui/video/upload/v1781416040/vi4_vllpy4.mp4",
    poster: "https://res.cloudinary.com/dlybuktui/video/upload/so_2,f_jpg,q_80/v1781416040/vi4_vllpy4.jpg",
  },
];

const FILTERS = ["All", "Wedding", "Travel", "Commercial", "Reels"];

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <polygon points="6,3 20,12 6,21" />
  </svg>
);
const PauseIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <rect x="5" y="3" width="4" height="18" rx="1" />
    <rect x="15" y="3" width="4" height="18" rx="1" />
  </svg>
);
const VolumeOnIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);
const VolumeOffIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
    <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);
const FullscreenIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15,3 21,3 21,9" />
    <polyline points="9,21 3,21 3,15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);

const VideoCard = ({ item, active, onPlay, onRegister, onEnd }) => {
  const ref = useRef(null);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const isPlaying = active === item.id;

  useEffect(() => {
    if (ref.current) onRegister(item.id, ref.current);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!isPlaying) {
      el.pause();
      el.currentTime = 0;
      el.muted = false;
      setMuted(false);
      setProgress(0);
    }
  }, [isPlaying]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tick = () => {
      if (el.duration) setProgress((el.currentTime / el.duration) * 100);
    };
    el.addEventListener("timeupdate", tick);
    return () => el.removeEventListener("timeupdate", tick);
  }, []);

  const handleCardClick = () => {
    const el = ref.current;
    if (!el) return;
    if (isPlaying) {
      el.pause();
      onPlay(null);
    } else {
      el.muted = false;
      el.volume = 1;
      el.play().catch(() => {
        el.muted = true;
        setMuted(true);
        el.play().catch(() => {});
      });
      onPlay(item.id);
    }
  };

  const handleMute = (e) => {
    e.stopPropagation();
    const el = ref.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  const handleFullscreen = (e) => {
    e.stopPropagation();
    const el = ref.current;
    if (!el) return;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.webkitEnterFullscreen) el.webkitEnterFullscreen();
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    const el = ref.current;
    if (!el || !el.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    el.currentTime = ((e.clientX - rect.left) / rect.width) * el.duration;
  };

  return (
    <div
      className={`vc${isPlaying ? " vc--on" : ""}`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      aria-label={`${isPlaying ? "Pause" : "Play"} ${item.title}`}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), handleCardClick())}
    >
      <video
        ref={ref}
        className="vc__vid"
        src={item.src}
        poster={item.poster}
        playsInline
        preload="metadata"
        onEnded={() => onEnd(item.id)}
      />

      <div className="vc__grad" />

      {/* Play/Pause — centred idle, top-left when playing */}
      <div className={`vc__pp${isPlaying ? " vc__pp--active" : ""}`}>
        <div className="vc__btn">
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </div>
      </div>

      {/* Mute + Fullscreen — top-right, only while playing */}
      {isPlaying && (
        <div className="vc__tr">
          <button className="vc__ic" onClick={handleMute} aria-label={muted ? "Unmute" : "Mute"}>
            {muted ? <VolumeOffIcon /> : <VolumeOnIcon />}
          </button>
          <button className="vc__ic" onClick={handleFullscreen} aria-label="Fullscreen">
            <FullscreenIcon />
          </button>
        </div>
      )}

      {/* Title + category — bottom, hides while playing */}
      <div className="vc__meta">
        <span className="vc__cat">{item.category}</span>
        <span className="vc__name">{item.title}</span>
      </div>

      {/* Progress bar — bottom, only while playing */}
      {isPlaying && (
        <div className="vc__prog" onClick={handleSeek} title="Seek">
          <div className="vc__track">
            <div className="vc__fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}
    </div>
  );
};

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

        .port *, .port *::before, .port *::after {
          box-sizing: border-box; margin: 0; padding: 0;
        }

        :root {
          --gold:     #c9a84c;
          --gold-d:   rgba(201,168,76,0.12);
          --bg:       #080808;
          --card:     #0f0f0f;
          --text:     #f0ece4;
          --muted:    #7a7670;
          --dim:      #3a3830;
          --border:   rgba(255,255,255,0.08);
          --ease:     cubic-bezier(0.25,0.46,0.45,0.94);
        }

        /* ── SECTION ── */
        .port {
          background: var(--bg);
          padding: clamp(44px, 7vw, 80px) 0;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .port::before {
          content: '';
          position: absolute;
          top: -10%; left: 50%;
          transform: translateX(-50%);
          width: min(480px, 44vw);
          height: min(480px, 44vw);
          background: radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 68%);
          pointer-events: none;
        }

        /* ── CONTAINER ──
           1080px → 3 cols × ≈348px each (under 600px source = sharp) */
        .port__wrap {
          width: 100%;
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 clamp(12px, 3.5vw, 36px);
          position: relative;
          z-index: 1;
        }

        /* ── HEADER ── */
        .port__hd {
          text-align: center;
          margin-bottom: clamp(28px, 4.5vw, 52px);
        }

        .port__eyebrow {
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

        .port__eyebrow::before, .port__eyebrow::after {
          content: '';
          display: block;
          width: 22px; height: 1px;
          background: var(--gold);
          opacity: 0.5;
        }

        .port__h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.7rem, 3.2vw, 2.8rem);
          font-weight: 600;
          color: var(--text);
          line-height: 1.05;
          letter-spacing: -0.01em;
          margin-bottom: 9px;
        }

        .port__h1 em { font-style: italic; color: #e2c47e; }

        .port__desc {
          font-size: 13px;
          line-height: 1.78;
          color: var(--muted);
          max-width: 360px;
          margin: 0 auto;
          font-weight: 300;
        }

        /* ── FILTERS ── */
        .port__filters {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: clamp(20px, 3.5vw, 40px);
        }

        .port__f {
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

        .port__f:hover {
          border-color: rgba(201,168,76,0.38);
          color: #e2c47e;
          background: var(--gold-d);
        }

        .port__f.sel {
          background: var(--gold);
          border-color: var(--gold);
          color: #080808;
          font-weight: 600;
        }

        /* ── GRID ──
           Desktop  (>680px)  : 3 columns
           Mobile   (≤680px)  : always 2 columns — never 1
           Tiny     (≤300px)  : 1 column safety fallback             */
        .port__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        /* ── VIDEO CARD ── */
        .vc {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          background: var(--card);
          cursor: pointer;
          /* Portrait — compact, sharp */
          aspect-ratio: 4 / 5;
          outline: none;
          -webkit-tap-highlight-color: transparent;
          transition: box-shadow 0.28s ease;
        }

        .vc--on {
          box-shadow: 0 0 0 1.5px var(--gold), 0 8px 28px rgba(0,0,0,0.55);
        }

        .vc:not(.vc--on):hover {
          box-shadow: 0 10px 36px rgba(0,0,0,0.5);
        }

        /* ── VIDEO ELEMENT ── */
        .vc__vid {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          background: #000;
          transition: transform 0.55s var(--ease);
        }

        .vc:not(.vc--on):hover .vc__vid { transform: scale(1.04); }

        /* ── GRADIENT ── */
        .vc__grad {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.80) 0%,
            rgba(0,0,0,0.14) 42%,
            transparent 70%
          );
          transition: opacity 0.32s ease;
        }

        .vc--on .vc__grad { opacity: 0.15; }

        /* ── PLAY/PAUSE ──
           Idle    → centred, hidden, shown on hover
           Playing → top-left, always visible, smaller              */
        .vc__pp {
          position: absolute;
          z-index: 4;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          /* Animate position AND opacity smoothly */
          transition:
            top    0.32s var(--ease),
            left   0.32s var(--ease),
            transform 0.32s var(--ease),
            opacity   0.22s ease;
        }

        .vc:not(.vc--on):hover .vc__pp { opacity: 1; }

        /* ── Playing state: snap to top-left ── */
        .vc__pp--active {
          top: 9px  !important;
          left: 9px !important;
          transform: none !important;
          opacity: 1 !important;
        }

        .vc__btn {
          width: 40px; height: 40px;
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

        /* Smaller button once playing */
        .vc__pp--active .vc__btn {
          width: 30px; height: 30px;
          border-color: rgba(255,255,255,0.28);
          color: #fff;
        }

        .vc:hover .vc__btn {
          transform: scale(1.07);
          background: rgba(201,168,76,0.14);
        }

        /* ── TOP-RIGHT: mute + fullscreen ── */
        .vc__tr {
          position: absolute;
          top: 9px; right: 9px;
          z-index: 4;
          display: flex;
          gap: 5px;
        }

        .vc__ic {
          width: 30px; height: 30px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(0,0,0,0.52);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: rgba(255,255,255,0.78);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          transition: background 0.18s, border-color 0.18s, color 0.18s;
          padding: 0;
        }

        .vc__ic:hover {
          background: rgba(201,168,76,0.22);
          border-color: rgba(201,168,76,0.45);
          color: var(--gold);
        }

        /* ── META (title + category) ── */
        .vc__meta {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          z-index: 2;
          padding: 10px 12px 32px; /* room for progress bar */
          pointer-events: none;
          transform: translateY(4px);
          opacity: 0;
          transition: opacity 0.26s ease, transform 0.26s ease;
        }

        .vc:not(.vc--on):hover .vc__meta {
          opacity: 1;
          transform: translateY(0);
        }

        /* Touch devices: always show title */
        @media (hover: none) {
          .vc__meta { opacity: 1; transform: translateY(0); }
        }

        /* Hide title while playing — let the film breathe */
        .vc--on .vc__meta { opacity: 0 !important; }

        .vc__cat {
          display: block;
          font-size: 8px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 600;
          margin-bottom: 2px;
        }

        .vc__name {
          display: block;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.82rem, 1.3vw, 1.05rem);
          font-weight: 600;
          color: var(--text);
          line-height: 1.2;
        }

        /* ── PROGRESS BAR ── */
        .vc__prog {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          z-index: 5;
          padding-top: 8px;
          cursor: pointer;
        }

        .vc__track {
          width: 100%;
          height: 3px;
          background: rgba(255,255,255,0.14);
        }

        .vc__fill {
          height: 100%;
          background: var(--gold);
          border-radius: 0 2px 2px 0;
          transition: width 0.1s linear;
          position: relative;
        }

        .vc__fill::after {
          content: '';
          position: absolute;
          right: -4px; top: 50%;
          transform: translateY(-50%);
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--gold);
          box-shadow: 0 0 0 2px rgba(201,168,76,0.28);
        }

        /* ── EMPTY ── */
        .port__empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 52px 20px;
          color: var(--dim);
          font-size: 13px;
          font-style: italic;
        }

        /* ── DIVIDER ── */
        .port__divider {
          width: 38px; height: 1px;
          background: linear-gradient(to right, var(--gold), transparent);
          margin: clamp(24px, 4vw, 44px) auto;
        }

        /* ════════════════════════════════════════════════════════
           RESPONSIVE
           ════════════════════════════════════════════════════════

           ≥ 681px  → 3 columns  (desktop + large tablet)
           ≤ 680px  → 2 columns  (tablet portrait + ALL mobiles)
           ≤ 300px  → 1 column   (only the smallest phones)
        ═══════════════════════════════════════════════════════════ */

        /* Tablet landscape — still 3-col, just tighter gap */
        @media (max-width: 900px) {
          .port__grid { gap: 8px; }
        }

        /* Tablet portrait AND all mobile → 2 columns ALWAYS */
        @media (max-width: 680px) {
          .port__grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 7px;
          }
          /* Square-ish ratio looks better at small widths */
          .vc { aspect-ratio: 3 / 4; }
        }

        /* Small mobile — still 2-col, tighter gap, shorter cards */
        @media (max-width: 480px) {
          .port__grid { gap: 6px; }
          .vc { aspect-ratio: 1 / 1; }        /* square — maximises visible area */
          .vc__btn  { width: 34px; height: 34px; }
          .vc__pp--active .vc__btn { width: 26px; height: 26px; }
          .vc__ic   { width: 26px; height: 26px; }
          .port__h1 { font-size: 1.55rem; }
        }

        /* Tiny phones — 2-col still but square cards */
        @media (max-width: 380px) {
          .port__grid { gap: 5px; }
          .port__wrap { padding: 0 10px; }
        }

        /* Emergency 1-col only below 300px */
        @media (max-width: 300px) {
          .port__grid { grid-template-columns: 1fr; }
          .vc { aspect-ratio: 4 / 3; }
        }
      `}</style>

      <section className="port" id="portfolio">
        <div className="port__wrap">

          <div className="port__hd">
            <span className="port__eyebrow">Selected Works</span>
            <h2 className="port__h1">Crafted with <em>Vision</em></h2>
            <p className="port__desc">
              Weddings, documentaries, commercials — every frame
              edited to tell the story it was meant to tell.
            </p>
          </div>

          <div className="port__filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`port__f${filter === f ? " sel" : ""}`}
                onClick={() => handleFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="port__grid">
            {list.length === 0 ? (
              <p className="port__empty">No projects in this category yet.</p>
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

          <div className="port__divider" />

        </div>
      </section>
    </>
  );
};

export default Portfolio;