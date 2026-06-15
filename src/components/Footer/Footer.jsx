import React from "react";
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

const socials = [
  { icon: <FaInstagram />,  href: "https://www.instagram.com/suraj_clips_9?utm_source=qr", label: "Instagram" },
  { icon: <FaYoutube />,    href: "https://www.youtube.com/@Suraj_clips_9/shorts", label: "Youtube"   },
  { icon: <FaFacebookF />,  href: "https://www.facebook.com/share/1DcopdfCrk/?mibextid=wwXIfr", label: "Facebook"  },
];

const Footer = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap');

        .footer-section {
          background: var(--bg);
          padding: 40px 0 48px;
          text-align: center;
          font-family: 'Montserrat', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .footer-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 2px;
          background: #c9a84c;
        }

        .footer-brand {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #c9a84c;
          margin-bottom: 10px;
        }

        .footer-tagline {
          font-size: 12px;
          font-weight: 300;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          margin-bottom: 40px;
        }

        .footer-divider {
          width: 100%;
          max-width: 480px;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            rgba(201,168,76,0.25) 30%,
            rgba(201,168,76,0.25) 70%,
            transparent
          );
          margin: 0 auto 40px;
        }

        .social-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 48px;
        }

        .social-icon {
          width: 44px;
          height: 44px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999;
          font-size: 15px;
          text-decoration: none;
          transition: background 0.3s ease, border-color 0.3s ease,
                      color 0.3s ease, transform 0.3s ease;
          position: relative;
        }

        .social-icon::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 1px solid transparent;
          transition: border-color 0.3s ease;
        }

        .social-icon:hover {
          background: #c9a84c;
          border-color: #c9a84c;
          color: #111;
          transform: translateY(-5px);
        }

        .social-icon:hover::after {
          border-color: rgba(201,168,76,0.3);
        }

        .footer-text {
          color: rgba(255,255,255,0.3);
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0.5px;
          line-height: 1.8;
          margin-bottom: 0;
        }

        .back-to-top {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          color: rgba(255,255,255,0.25);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          text-decoration: none;
          margin-bottom: 40px;
          transition: color 0.25s;
          cursor: pointer;
          background: none;
          border: none;
        }

        .back-to-top:hover { color: #c9a84c; }

        .back-to-top-arrow {
          width: 32px;
          height: 32px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          transition: border-color 0.25s, transform 0.25s;
        }

        .back-to-top:hover .back-to-top-arrow {
          border-color: #c9a84c;
          transform: translateY(-3px);
        }

        @media (max-width: 767px) {
          .footer-section   { padding: 64px 0 40px; }
          .social-wrapper   { gap: 12px; margin-bottom: 40px; }
          .social-icon      { width: 42px; height: 42px; font-size: 14px; }
          .footer-brand     { font-size: 12px; letter-spacing: 4px; }
          .footer-tagline   { font-size: 11px; letter-spacing: 2px; }
          .footer-text      { font-size: 11.5px; }
        }

        @media (max-width: 480px) {
          .footer-section   { padding: 56px 0 36px; }
          .social-wrapper   { gap: 10px; }
          .social-icon      { width: 40px; height: 40px; font-size: 14px; }
          .footer-text      { font-size: 11px; }
        }

        @media (max-width: 360px) {
          .social-icon      { width: 38px; height: 38px; font-size: 13px; }
          .footer-text      { font-size: 10.5px; }
        }
      `}</style>

      <footer className="footer-section">
        <div className="container">

          <div className="footer-brand">Suraj Clips</div>
          <div className="footer-tagline">Video Editor &amp; Visual Storyteller</div>

          <div className="footer-divider" />

          <button
            className="back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
          >
            <span className="back-to-top-arrow">↑</span>
            Back to Top
          </button>

          {/* Social icons — open in new tab */}
          <div className="social-wrapper">
            {socials.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="social-icon"
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
              >
                {icon}
              </a>
            ))}
          </div>

          <p className="footer-text">
            Copyright &copy; {new Date().getFullYear()} All rights reserved
          </p>

        </div>
      </footer>
    </>
  );
};

export default Footer;