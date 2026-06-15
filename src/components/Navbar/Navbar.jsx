import { useState, useEffect } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700;900&display=swap');

        /* ─── NAVBAR ─────────────────────────────────────────── */
        .navbar-custom {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 22px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: background 0.4s ease, padding 0.3s ease, box-shadow 0.3s ease;
          background: transparent;
          box-sizing: border-box;
        }

        .navbar-custom.scrolled {
          background: rgba(10, 8, 4, 0.88);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          padding: 14px 40px;
          box-shadow: 0 2px 20px rgba(0,0,0,0.4);
        }

        /* ─── BRAND ──────────────────────────────────────────── */
        .nav-brand {
          font-family: 'Montserrat', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0;
          white-space: nowrap;
          transition: color 0.25s;
          line-height: 1;
        }

        .nav-brand-accent {
          color: #c9a84c;
        }

        /* Subtle dot separator */
        .nav-brand-dot {
          display: inline-block;
          width: 4px;
          height: 4px;
          background: #c9a84c;
          border-radius: 50%;
          margin: 0 7px;
          vertical-align: middle;
          flex-shrink: 0;
        }

        .nav-brand:hover { color: rgba(255,255,255,0.85); }

        /* ─── NAV LINKS ──────────────────────────────────────── */
        .nav-links {
          display: flex;
          gap: 60px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-links a {
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 2.5px;
          color: #fff;
          text-decoration: none;
          text-transform: uppercase;
          transition: color 0.25s ease;
          position: relative;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 1px;
          background: #c9a84c;
          transition: width 0.3s ease;
        }

        .nav-links a:hover { color: #c9a84c; }
        .nav-links a:hover::after { width: 100%; }

        /* ─── THEME TOGGLE ───────────────────────────────────── */
        .nav-theme-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #fff;
          font-size: 20px;
          line-height: 1;
          transition: transform 0.4s ease, color 0.25s;
          flex-shrink: 0;
        }

        .nav-theme-btn:hover {
          transform: rotate(45deg);
          color: #c9a84c;
        }

        /* ─── HAMBURGER ──────────────────────────────────────── */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          position: fixed;
          top: 24px;
          left: 24px;
          z-index: 1002;
          padding: 4px;
        }

        .hamburger span {
          display: block;
          width: 26px;
          height: 2px;
          background: #fff;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .hamburger.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .hamburger.open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .hamburger.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* ─── MOBILE MENU ────────────────────────────────────── */
        .mobile-menu {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.95);
          z-index: 999;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 36px;
          opacity: 0;
          transform: translateY(-10px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .mobile-menu.open {
          display: flex;
          opacity: 1;
          transform: translateY(0);
        }

        .mobile-menu a {
          font-family: 'Montserrat', sans-serif;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 4px;
          color: #fff;
          text-decoration: none;
          text-transform: uppercase;
          transition: color 0.25s;
        }

        .mobile-menu a:hover { color: #c9a84c; }

        .mobile-menu-line {
          width: 40px;
          height: 2px;
          background: #c9a84c;
          margin: 4px 0;
        }

        /* ─── RESPONSIVE ─────────────────────────────────────── */
        @media (max-width: 768px) {
          .nav-links     { display: none; }
          .nav-theme-btn { display: none; }
          .hamburger     { display: flex; }
          .nav-brand     {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            /* Re-anchor to top when in fixed bar */
            top: 22px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1001;
          }
        }

        @media (max-width: 480px) {
          .nav-brand { font-size: 13px; letter-spacing: 2.5px; }
        }
      `}</style>

      {/* ─── MAIN NAVBAR ──────────────────────────────────────────── */}
      <nav className={`navbar-custom ${scrolled ? "scrolled" : ""}`}>

        {/* Brand — left */}
        <a href="#home" className="nav-brand">
          Suraj<span className="nav-brand-dot" />
          <span className="nav-brand-accent">Clips</span>
        </a>

        {/* Center links */}
        <ul className="nav-links">
          {["Home", "Portfolio", "About", "Testimonials", "Services", "Contact"].map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`}>{item}</a>
            </li>
          ))}
        </ul>

        {/* Right — theme toggle */}
        <button className="nav-theme-btn" aria-label="Toggle theme">
          ☀
        </button>

      </nav>

      {/* Hamburger */}
      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      {/* Mobile full-screen menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-menu-line" />
        {["Home", "Portfolio", "About", "Testimonials", "Services", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
          >
            {item}
          </a>
        ))}
        <div className="mobile-menu-line" />
      </div>
    </>
  );
};

export default Navbar;