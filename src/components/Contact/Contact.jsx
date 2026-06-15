import React, { useState } from "react";

const Contact = () => {
  const [focused, setFocused] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required.";
    } else if (!/^[\d\s\+\-\(\)]{7,20}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid phone number.";
    }
    if (!form.date.trim()) {
      newErrors.date = "Preferred date is required.";
    } else {
      const selected = new Date(form.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) newErrors.date = "Please select a future date.";
    }
    if (!form.message.trim()) newErrors.message = "Message is required.";
    else if (form.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("https://formspree.io/f/xjgdezla", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          preferred_date: form.date,
          message: form.message,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", date: "", message: "" });
        setErrors({});
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  // Today's date in YYYY-MM-DD for min attribute
  const todayStr = new Date().toISOString().split("T")[0];

  const contactDetails = [
    { label: "Email",   value: "channalwarsuraj@gmail.com", href: "mailto:channalwarsuraj@gmail.com" },
    { label: "Phone",   value: "+91 91588 22909",           href: "tel:+919158822909" },
    { label: "Address", value: "Kolekar chawl Kombadpada, Bhiwandi", href: null },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Montserrat:wght@300;400;500;600&display=swap');

        .contact-section {
          padding: clamp(60px, 7vw, 96px) 0 clamp(52px, 6vw, 80px);
          background: var(--bg);
          font-family: 'Montserrat', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .contact-section::before {
          content: '';
          position: absolute;
          top: -160px; right: -160px;
          width: 400px; height: 400px;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.06);
          pointer-events: none;
        }

        .contact-section::after {
          content: '';
          position: absolute;
          bottom: -100px; left: -100px;
          width: 300px; height: 300px;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.05);
          pointer-events: none;
        }

        /* ─── HEADER ──────────────────────────────────────────── */
        .contact-eyebrow {
          text-align: center;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: #c9a84c;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .contact-eyebrow::before,
        .contact-eyebrow::after {
          content: '';
          display: inline-block;
          width: 28px; height: 1px;
          background: #c9a84c;
        }

        .contact-main-title {
          text-align: center;
          color: #fff;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(26px, 3.2vw, 42px);
          font-weight: 300;
          letter-spacing: -0.3px;
          margin-bottom: clamp(36px, 4.5vw, 56px);
          line-height: 1.15;
        }

        .contact-main-title span { font-style: italic; color: #c9a84c; }

        /* ─── VERTICAL DIVIDER ────────────────────────────────── */
        .contact-col-divider { position: relative; }

        @media (min-width: 992px) {
          .contact-col-divider::before {
            content: '';
            position: absolute;
            top: 0; right: 0;
            width: 1px; height: 100%;
            background: linear-gradient(
              to bottom,
              transparent,
              rgba(201,168,76,0.22) 20%,
              rgba(201,168,76,0.22) 80%,
              transparent
            );
          }
        }

        /* ─── FORM SIDE ───────────────────────────────────────── */
        .contact-form-wrap {
          padding-right: clamp(0px, 3.5vw, 44px);
        }

        .contact-form-title {
          font-family: 'Cormorant Garamond', serif;
          color: #fff;
          font-size: clamp(18px, 2vw, 26px);
          font-weight: 300;
          margin-bottom: clamp(20px, 2.5vw, 28px);
          line-height: 1.2;
        }

        .contact-form-title em { font-style: italic; color: #c9a84c; }

        .field-group {
          position: relative;
          margin-bottom: 18px;
        }

        .contact-form .form-control {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-bottom: 1px solid rgba(255,255,255,0.2);
          color: #fff;
          height: 46px;
          border-radius: 3px;
          padding: 11px 16px;
          font-family: 'Montserrat', sans-serif;
          font-size: 13.5px;
          font-weight: 400;
          box-shadow: none;
          transition: border-color 0.3s ease, background 0.3s ease;
          width: 100%;
        }

        /* ─── DATE INPUT ──────────────────────────────────────── */
        .contact-form input[type="date"].form-control {
          color-scheme: dark;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          padding-right: 12px;
        }

        /* placeholder-like muted state when empty */
        .contact-form input[type="date"].form-control:not(:valid) {
          color: #555;
        }

        .contact-form input[type="date"].form-control::-webkit-calendar-picker-indicator {
          filter: invert(0.55) sepia(1) saturate(2) hue-rotate(5deg) brightness(0.95);
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.2s;
        }

        .contact-form input[type="date"].form-control::-webkit-calendar-picker-indicator:hover {
          opacity: 1;
        }

        /* date field label floats above */
        .date-field-label {
          display: block;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #c9a84c;
          margin-bottom: 6px;
        }

        .contact-form textarea.form-control {
          height: 110px;
          resize: none;
          padding-top: 13px;
          line-height: 1.7;
        }

        .contact-form .form-control::placeholder { color: #555; }

        .contact-form .form-control:focus {
          background: rgba(201,168,76,0.04);
          color: #fff;
          border-color: #c9a84c;
          box-shadow: none;
          outline: none;
        }

        /* Error state */
        .contact-form .form-control.has-error {
          border-color: #e05c5c !important;
          background: rgba(224, 92, 92, 0.04);
        }

        .field-error {
          color: #e05c5c;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.3px;
          margin-top: 5px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .field-error::before {
          content: '!';
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 13px; height: 13px;
          border-radius: 50%;
          border: 1px solid #e05c5c;
          font-size: 9px;
          font-weight: 700;
          flex-shrink: 0;
        }

        /* Gold sweep underline on focus */
        .field-group::after {
          content: '';
          position: absolute;
          bottom: 0; left: 50%;
          width: 0; height: 2px;
          background: #c9a84c;
          border-radius: 0 0 3px 3px;
          transition: width 0.35s ease, left 0.35s ease;
          pointer-events: none;
        }

        .field-group.is-focused::after { width: 100%; left: 0; }
        .field-group.has-field-error::after { background: #e05c5c; }

        /* ─── SUCCESS BANNER ──────────────────────────────────── */
        .contact-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 48px 24px;
          text-align: center;
          animation: fadeInUp 0.5s ease forwards;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .contact-success-icon {
          width: 52px; height: 52px;
          border-radius: 50%;
          border: 1.5px solid #c9a84c;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
          color: #c9a84c;
        }

        .contact-success h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 300;
          color: #fff;
          margin: 0;
        }

        .contact-success p {
          font-size: 13px;
          color: #888;
          margin: 0;
          line-height: 1.7;
        }

        .contact-success-reset {
          background: transparent;
          border: none;
          color: #c9a84c;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          padding: 0;
          text-decoration: underline;
          text-underline-offset: 3px;
          opacity: 0.8;
          transition: opacity 0.2s;
        }
        .contact-success-reset:hover { opacity: 1; }

        /* ─── SUBMIT ERROR ────────────────────────────────────── */
        .contact-submit-error {
          background: rgba(224,92,92,0.08);
          border: 1px solid rgba(224,92,92,0.25);
          border-radius: 3px;
          padding: 11px 16px;
          color: #e05c5c;
          font-size: 12.5px;
          margin-top: 12px;
          line-height: 1.6;
        }

        /* ─── SEND BUTTON ─────────────────────────────────────── */
        .send-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          border: 1px solid #c9a84c;
          color: #c9a84c;
          padding: 12px 30px;
          border-radius: 2px;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-top: 4px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: color 0.3s ease, transform 0.25s ease, opacity 0.2s;
        }

        .send-btn:disabled {
          opacity: 0.55;
          cursor: not-allowed;
          transform: none !important;
        }

        .send-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #c9a84c;
          transform: translateX(-101%);
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
          z-index: 0;
        }

        .send-btn:not(:disabled):hover::before { transform: translateX(0); }
        .send-btn:not(:disabled):hover { color: #181818; transform: translateY(-2px); }
        .send-btn span  { position: relative; z-index: 1; }

        .send-btn-arrow {
          position: relative; z-index: 1;
          font-size: 15px;
          transition: transform 0.25s ease;
        }

        .send-btn:not(:disabled):hover .send-btn-arrow { transform: translateX(4px); }

        /* Spinner inside button */
        .btn-spinner {
          position: relative; z-index: 1;
          width: 13px; height: 13px;
          border: 1.5px solid rgba(201,168,76,0.3);
          border-top-color: #c9a84c;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* ─── DETAILS SIDE ────────────────────────────────────── */
        .contact-details {
          padding-left: clamp(16px, 3vw, 40px);
        }

        .contact-details-title {
          font-family: 'Cormorant Garamond', serif;
          color: #fff;
          font-size: clamp(18px, 2vw, 26px);
          font-weight: 300;
          margin-bottom: clamp(20px, 2.5vw, 28px);
          line-height: 1.2;
        }

        .contact-details-title em { font-style: italic; color: #c9a84c; }

        .contact-detail-item {
          margin-bottom: clamp(16px, 2vw, 24px);
          padding-bottom: clamp(16px, 2vw, 24px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .contact-detail-item:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .contact-label {
          color: #c9a84c;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .contact-label::after {
          content: '';
          flex: 1; height: 1px;
          background: rgba(201,168,76,0.15);
          max-width: 36px;
        }

        .contact-info {
          color: #bfbfbf;
          font-size: 13.5px;
          font-weight: 400;
          line-height: 1.8;
          white-space: pre-line;
        }

        .contact-info a {
          color: #bfbfbf;
          text-decoration: none;
          transition: color 0.25s;
        }

        .contact-info a:hover { color: #c9a84c; }

        /* ─── RESPONSIVE ──────────────────────────────────────── */
        @media (min-width: 1400px) {
          .contact-section { padding: 80px 0 68px; }
        }

        @media (max-width: 1199px) {
          .contact-details   { padding-left: 20px; }
          .contact-form-wrap { padding-right: 20px; }
        }

        @media (max-width: 991px) {
          .contact-details {
            padding-left: 0;
            padding-top: 40px;
            margin-top: 36px;
            border-top: 1px solid rgba(255,255,255,0.07);
          }
          .contact-form-wrap { padding-right: 0; }
        }

        @media (max-width: 767px) {
          .contact-form .form-control         { height: 44px; font-size: 13px; }
          .contact-form textarea.form-control { height: 100px; }
          .contact-info                       { font-size: 13px; }
        }

        @media (max-width: 480px) {
          .contact-form .form-control         { height: 42px; padding: 10px 14px; font-size: 12.5px; }
          .contact-form textarea.form-control { height: 96px; }
          .send-btn { width: 100%; justify-content: center; padding: 12px 20px; }
          .field-group { margin-bottom: 14px; }
          .contact-info { font-size: 12.5px; }
        }

        @media (max-width: 360px) {
          .contact-form .form-control { font-size: 12px; }
          .contact-info               { font-size: 12px; }
        }
      `}</style>

      <section className="contact-section" id="contact">
        <div className="container">

          {/* Header */}
          <div className="contact-eyebrow">Let's Work Together</div>
          <h2 className="contact-main-title">
            Get <span>In Touch</span>
          </h2>

          <div className="row align-items-start">

            {/* ─── FORM ─────────────────────────────────────────── */}
            <div className="col-lg-7 contact-col-divider">
              <div className="contact-form-wrap">

                <h3 className="contact-form-title">
                  Send Me a <em>Message</em>
                </h3>

                {status === "success" ? (
                  <div className="contact-success">
                    <div className="contact-success-icon">✓</div>
                    <h4>Message Sent</h4>
                    <p>
                      Thanks for reaching out — I'll get back to you as soon as possible.
                    </p>
                    <button
                      className="contact-success-reset"
                      onClick={() => setStatus("idle")}
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form className="contact-form" onSubmit={handleSubmit} noValidate>

                    <div className="row ">
                      <div className="col-sm-6">
                        <div className={`field-group ${focused === "name" ? "is-focused" : ""} ${errors.name ? "has-field-error" : ""}`}>
                          <input
                            type="text" name="name"
                            className={`form-control${errors.name ? " has-error" : ""}`}
                            placeholder="Your Name"
                            value={form.name} onChange={handleChange}
                            onFocus={() => setFocused("name")} onBlur={() => setFocused("")}
                            aria-describedby={errors.name ? "error-name" : undefined}
                          />
                          {errors.name && <div className="field-error" id="error-name">{errors.name}</div>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className={`field-group ${focused === "email" ? "is-focused" : ""} ${errors.email ? "has-field-error" : ""}`}>
                          <input
                            type="email" name="email"
                            className={`form-control${errors.email ? " has-error" : ""}`}
                            placeholder="Your Email"
                            value={form.email} onChange={handleChange}
                            onFocus={() => setFocused("email")} onBlur={() => setFocused("")}
                            aria-describedby={errors.email ? "error-email" : undefined}
                          />
                          {errors.email && <div className="field-error" id="error-email">{errors.email}</div>}
                        </div>
                      </div>
                    </div>

                    <div className="row ">
                      <div className="col-sm-6">
                        <div className={`field-group ${focused === "phone" ? "is-focused" : ""} ${errors.phone ? "has-field-error" : ""}`}>
                          <input
                            type="tel" name="phone"
                            className={`form-control${errors.phone ? " has-error" : ""}`}
                            placeholder="Your Phone"
                            value={form.phone} onChange={handleChange}
                            onFocus={() => setFocused("phone")} onBlur={() => setFocused("")}
                            aria-describedby={errors.phone ? "error-phone" : undefined}
                          />
                          {errors.phone && <div className="field-error" id="error-phone">{errors.phone}</div>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className={`field-group ${focused === "date" ? "is-focused" : ""} ${errors.date ? "has-field-error" : ""}`}>
                          {/* <label className="date-field-label" htmlFor="preferred-date">
                            Preferred Date
                          </label> */}
                          <input
                            type="date"
                            id="preferred-date"
                            placeholder="Select a Date"
                            name="date"
                            className={`form-control${errors.date ? " has-error" : ""}`}
                            min={todayStr}
                            value={form.date} onChange={handleChange}
                            onFocus={() => setFocused("date")} onBlur={() => setFocused("")}
                            aria-describedby={errors.date ? "error-date" : undefined}
                          />
                          {errors.date && <div className="field-error" id="error-date">{errors.date}</div>}
                        </div>
                      </div>
                    </div>

                    <div className={`field-group ${focused === "message" ? "is-focused" : ""} ${errors.message ? "has-field-error" : ""}`}>
                      <textarea
                        name="message"
                        className={`form-control${errors.message ? " has-error" : ""}`}
                        placeholder="Write a Message"
                        value={form.message} onChange={handleChange}
                        onFocus={() => setFocused("message")} onBlur={() => setFocused("")}
                        aria-describedby={errors.message ? "error-message" : undefined}
                      />
                      {errors.message && <div className="field-error" id="error-message">{errors.message}</div>}
                    </div>

                    {status === "error" && (
                      <div className="contact-submit-error">
                        Something went wrong. Please try again or email directly.
                      </div>
                    )}

                    <button
                      type="submit"
                      className="send-btn"
                      disabled={status === "submitting"}
                    >
                      {status === "submitting" ? (
                        <>
                          <span>Sending</span>
                          <span className="btn-spinner" />
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <span className="send-btn-arrow">›</span>
                        </>
                      )}
                    </button>

                  </form>
                )}
              </div>
            </div>

            {/* ─── DETAILS ──────────────────────────────────────── */}
            <div className="col-lg-5">
              <div className="contact-details">

                <h3 className="contact-details-title">
                  Contact <em>Details</em>
                </h3>

                {contactDetails.map((item, i) => (
                  <div className="contact-detail-item" key={i}>
                    <div className="contact-label">{item.label}</div>
                    <div className="contact-info">
                      {item.href
                        ? <a href={item.href}>{item.value}</a>
                        : item.value}
                    </div>
                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;