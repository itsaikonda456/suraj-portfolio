import { useState, useRef, useEffect, useCallback } from "react";

const CONFIG = {
  brandName:   "Suraj · Clips",
  ownerName:   "Suraj",
  email:       "channalwarsuraj@gmail.com",
  contactLink: "91588 22909",
  baseRate:    "rs 1500 / per video",
  floorRate:   "rs 1000 (our quality floor, never go below)",
  packageDeal: "rs 4000 for 3 videos (best value)",
};

// ─── LOCAL KNOWLEDGE BASE ─────────────────────────────────────────────────────
// All answers are pre-written. No API needed for these questions.
const KB = [
  {
    tags: ["service","offer","do","provide","work","help","what can","specialize","specialise"],
    q: "What services do you offer?",
    a: `At Suraj · Clips, we offer five core services crafted for brands and individuals who take their story seriously:\n\n✦ Commercial Videography — brand films, product shoots, ad campaigns\n✦ Wedding & Event Cinematography — cinematic storytelling, not just coverage\n✦ Post-Production & Editing — colour grading, sound design, motion graphics\n✦ Social Content & Reels — Instagram, YouTube Shorts, platform-native formats\n✦ Portrait & Documentary — personal brand films and short-form docs\n\nWhich of these feels closest to what you have in mind?`
  },
  {
    tags: ["price","cost","charge","rate","how much","fee","budget","pricing","expensive","afford","cheap"],
    q: "How much does a video cost?",
    a: `Our base rate starts at ${CONFIG.baseRate} per video — this reflects the craft, equipment, and post-production that goes into every frame.\n\nIf you're thinking about multiple videos, our 3-video package at ${CONFIG.packageDeal} is our best value.\n\nThat said, every project is different. Tell me a little about what you have in mind — length, style, locations — and I'll give you a much clearer picture of what fits your budget.`
  },
  {
    tags: ["package","bundle","deal","multiple","3 video","three video","discount"],
    q: "Do you have packages or bundles?",
    a: `Yes! Our most popular option is the 3-Video Package at ${CONFIG.packageDeal} — that's ${CONFIG.floorRate} per video, a significant saving on the individual rate.\n\nThis works great for brands running a content series, couples who want highlights + documentary + teaser, or businesses launching a campaign.\n\nInterested in the package? Drop your details at ${CONFIG.email} and Suraj will put together a custom proposal.`
  },
  {
    tags: ["wedding","bride","groom","ceremony","reception","engagement","nuptial","marriage"],
    q: "I need a wedding film",
    a: `Wedding films are one of our most meaningful services. Suraj approaches every wedding as a cinematic story — capturing the emotion, the light, the quiet in-between moments that make your day yours.\n\nA typical wedding package includes:\n✦ Full ceremony and reception coverage\n✦ A cinematic highlight film (5–8 min)\n✦ Colour graded, professionally sound-mixed delivery\n✦ Optional: short teaser reel for social media\n\nWedding films start at ${CONFIG.baseRate}. Tell me your date and location and we'll check availability for you.`
  },
  {
    tags: ["brand","commercial","corporate","business","company","product","campaign","advertisement","ad","promo"],
    q: "I want a brand commercial",
    a: `Brand films are where we truly shine. Whether it's a product launch, a company story, or a full campaign, Suraj crafts visuals that feel premium and intentional — not generic.\n\nOur commercial process:\n✦ Discovery call to align on brand voice and goals\n✦ Concept and shot list development\n✦ Professional shoot with full crew\n✦ Post-production: edit, colour grade, sound design, motion graphics\n\nCommercials start at  and scale with scope. What's the brand and what are you launching?`
  },
  {
    tags: ["post","edit","editing","colour","color","grade","grading","sound","motion","graphic","vfx","effect"],
    q: "Tell me about post-production",
    a: `Post-production is where raw footage transforms into something that genuinely moves people.\n\nOur post-production suite covers:\n✦ Cinematic colour grading (LUT development, mood matching)\n✦ Professional sound design and music licensing\n✦ Motion graphics and title sequences\n✦ Pacing, story editing, and narrative arc\n\nWe also offer post-only services — so if you've already shot footage and need it elevated, we can handle that too.\n\nShare your footage details and we'll give you a post-only quote.`
  },
  {
    tags: ["reel","reels","instagram","youtube","shorts","tiktok","social","content","platform","viral"],
    q: "I need social media content / reels",
    a: `Social content is one of the fastest-growing things we do — and we do it right.\n\nFor Instagram Reels, YouTube Shorts, and TikTok, we create:\n✦ Vertical-first, platform-native formats\n✦ Hook-driven edits optimised for scroll-stopping performance\n✦ Fast turnaround (typically 3–5 days post-shoot)\n✦ Batch content sessions (shoot once, get 4–8 pieces of content)\n\nOur social content starts at $800 per video, with batch deals available. How many pieces of content are you looking for?`
  },
  {
    tags: ["portrait","documentary","personal brand","personal","brand film","doc","story","founder"],
    q: "I'm interested in a personal brand film or documentary",
    a: `Personal brand films and short documentaries are some of the most powerful things we create.\n\nThese are for founders, creatives, and professionals who want the world to see not just what they do — but why they do it.\n\nWhat we deliver:\n✦ A 3–8 minute cinematic film about your story\n✦ Interview-led with b-roll storytelling\n✦ Colour graded and professionally scored\n✦ Optional: cut-downs for social platforms\n\nPricing starts at $800. Who's the subject, and what's their story?`
  },
  {
    tags: ["turnaround","how long","timeline","deadline","delivery","when","days","weeks","fast","quick","rush"],
    q: "How long does delivery take?",
    a: `Typical turnaround times:\n\n✦ Social Reels / Short clips — 3 to 5 business days\n✦ Wedding highlight films — 3 to 6 weeks\n✦ Brand commercials — 1 to 2 weeks post-shoot\n✦ Documentaries / Brand films — 2 to 4 weeks\n\nNeed something faster? Rush delivery is available for most projects — just mention your deadline when you reach out and we'll make it work.\n\nWhat's your timeline?`
  },
  {
    tags: ["location","travel","where","city","mumbai","delhi","bangalore","india","overseas","destination","shoot location"],
    q: "Do you travel for shoots?",
    a: `Absolutely. Suraj is based in India and travels for shoots across the country and internationally.\n\n✦ Local shoots (your city) — no travel surcharge\n✦ Domestic travel — travel + accommodation at cost\n✦ International / destination work — quoted per project\n\nDestination weddings, overseas brand shoots, and travel documentaries are very much in our wheelhouse.\n\nWhere are you located and where's the shoot?`
  },
  {
    tags: ["equipment","camera","gear","drone","4k","cinematic","resolution","tech","lens"],
    q: "What equipment do you use?",
    a: `Suraj shoots with professional cinema-grade equipment, including:\n\n✦ Full-frame cinema cameras (Sony FX / Canon Cinema line)\n✦ A range of prime and anamorphic lenses for that signature cinematic look\n✦ Drone / aerial cinematography for select projects\n✦ Professional lighting rigs for controlled and on-location work\n✦ Gimbal stabilisation for fluid, flowing movement\n\nEvery tool is chosen for the story — not just spec. What kind of look are you going for?`
  },
  {
    tags: ["raw","footage","files","format","deliver","mp4","drive","download","source"],
    q: "Do you deliver raw footage?",
    a: `We deliver fully edited, colour-graded, export-ready files in your preferred format (MP4/H.264 for web, ProRes for broadcast).\n\nRaw footage delivery is available as an add-on for an additional fee — this is useful if you have an in-house editor or want source files archived.\n\nAll final deliverables are shared via a private Google Drive or WeTransfer link within the agreed timeline.`
  },
  {
    tags: ["revise","revision","change","edit","update","round","feedback","tweak"],
    q: "How many revisions do I get?",
    a: `Every project includes two rounds of revisions — which covers the vast majority of feedback.\n\nHere's how the process works:\n✦ We share a first cut for your review\n✦ You send consolidated feedback (one round)\n✦ We deliver a revised cut\n✦ Final round of minor tweaks if needed\n\nAdditional revision rounds beyond two can be added at a flat rate. We've found that with a clear brief upfront, most clients are happy after round one.`
  },
  {
    tags: ["book","booking","reserve","hire","availability","available","slot","schedule","start","begin"],
    q: "How do I book you?",
    a: `Booking is simple:\n\n1. Reach out at ${CONFIG.email} or tap the contact link below\n2. Suraj will schedule a free 20-minute discovery call\n3. We'll confirm your date with a 30% deposit to hold the slot\n4. Production begins once the brief is locked\n\nWe typically book 2–4 Days in advance, so the sooner you reach out, the better — especially for weddings and events.\n\nReady to get started? → ${CONFIG.contactLink}`
  },
  {
    tags: ["deposit","payment","pay","invoice","advance","installment","upfront"],
    q: "What are the payment terms?",
    a: `Our standard payment structure:\n\n✦ 30% deposit to confirm and hold your date\n✦ 40% due on the shoot day\n✦ 30% on final delivery of edited files\n\nWe accept bank transfer, UPI, and international wire for overseas clients. All projects begin with a signed agreement to protect both parties.\n\nAny questions about payment? Write to us at ${CONFIG.email}.`
  },
  {
    tags: ["contract","agreement","legal","terms","copyright","rights","ownership","usage"],
    q: "Who owns the rights to the video?",
    a: `Once the final payment is made, full usage rights transfer to you — you own the video and can use it however you like: ads, social, website, broadcast, everywhere.\n\nSuraj · Clips retains the right to use the footage in our portfolio and showreel (we'll always ask first for sensitive or private projects like weddings).\n\nAll of this is outlined clearly in our project agreement before any work begins.`
  },
  {
    tags: ["sample","portfolio","work","previous","example","showreel","reel","demo","past"],
    q: "Can I see your previous work / portfolio?",
    a: `Absolutely — our full portfolio and showreel are on the website.\n\nYou can browse work across weddings, brand commercials, social content, and documentaries to get a feel for the visual style and storytelling approach.\n\nIf you have a specific style or industry in mind (luxury, lifestyle, tech, fashion, etc.), share it and I'll point you to the most relevant examples.\n\nAnything in particular you're looking to see?`
  },
  {
    tags: ["negotiat","lower","discount","cheaper","reduce","less","flexible","budget tight","can you do","better price"],
    q: "Can you do it for less?",
    a: `I understand budget matters — it always does.\n\nHere's what I can offer: if you're looking at three or more videos, our package rate of $1,800 brings each video down to $600, which is a meaningful saving.\n\nFor very specific budget situations, our floor is $550 — below that, the quality we're known for starts to suffer and that's not fair to either of us.\n\nIf your budget is below that, let's jump on a quick discovery call and build something that works. Reach Suraj directly: ${CONFIG.email}`
  },
  {
    tags: ["contact","reach","email","phone","call","speak","talk","meet","suraj","direct","personally"],
    q: "How do I contact Suraj directly?",
    a: `You can reach Suraj directly at:\n\n✉️ ${CONFIG.email}\n\nHe personally reads and replies to every inquiry — usually within a few hours during business days.\n\nAlternatively, use the contact form on the website: ${CONFIG.contactLink}\n\nFor urgent projects or same-week shoots, email is the fastest route.`
  },
  {
    tags: ["process","how does it work","workflow","step","approach","what happen","next step"],
    q: "What's your process from start to finish?",
    a: `Here's exactly how a typical project unfolds:\n\n1. Discovery Call — We align on your vision, goals, and timeline (free, 20 min)\n2. Brief & Proposal — We send a detailed scope of work and quote\n3. Deposit & Agreement — 30% secures your date and we sign off on the brief\n4. Pre-Production — Shot list, location scouting, crew planning\n5. Shoot Day — Professional production with full crew and equipment\n6. Post-Production — Edit, colour grade, sound design, motion graphics\n7. Review & Revisions — Two rounds of feedback\n8. Final Delivery — High-quality files delivered via private link\n\nStart to finish: typically 2–4 weeks. What stage are you at?`
  },
  {
    tags: ["hello","hi","hey","hii","good morning","good evening","good afternoon","greet","namaste","start","help me"],
    q: "Hello / greeting",
    a: `Hello! Welcome to Suraj · Clips.\n\nI'm here to help you explore our services, pricing, availability, or anything else you'd like to know.\n\nAre you thinking about a wedding film, a brand commercial, social content, or something else entirely?`
  },
];

// ─── SMART MATCHER ─────────────────────────────────────────────────────────────
function findAnswer(userInput) {
  const input = userInput.toLowerCase().trim();
  let bestMatch = null;
  let bestScore = 0;

  for (const entry of KB) {
    let score = 0;
    for (const tag of entry.tags) {
      if (input.includes(tag)) score += tag.length; // longer tag = more specific = higher weight
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  // Return answer only if we have a meaningful match
  return bestScore >= 3 ? bestMatch.a : null;
}

// ─── FALLBACK VIA CLAUDE API ───────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are the premium AI concierge for ${CONFIG.brandName}, a high-end videographer named ${CONFIG.ownerName}.

PERSONALITY: Sophisticated, warm, confident. Never robotic. Never say "As an AI". Keep replies to 2–4 sentences unless explaining pricing.

SERVICES: Commercial Videography, Wedding & Event Cinematography, Post-Production & Editing, Social Content/Reels, Portrait & Documentary.

PRICING: Base $800/video. Floor $550 (never go below). Package $1,800 for 3 videos.
- Never lead with price. Anchor on value first.
- If they push below floor, offer a discovery call at ${CONFIG.email}

GOAL: Collect name, email, project description before ending. Direct bookings to ${CONFIG.contactLink}.

RESPONSE FORMAT: Plain text only. No markdown, no asterisks, no bullets. Use line breaks.`;

async function callClaude(messages) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 600,
      system: SYSTEM_PROMPT,
      messages,
    }),
  });
  if (!res.ok) throw new Error(`${res.status}`);
  const data = await res.json();
  return (data?.content?.find(b => b.type === "text")?.text || "").trim();
}

// ─── GREETING ─────────────────────────────────────────────────────────────────
const GREETING = `Welcome to ${CONFIG.brandName}. I'm here to help bring your visual story to life — whether that's a cinematic wedding film, a brand commercial, or a social campaign.\n\nWhat kind of project are you thinking about?`;

const QUICK_REPLIES = [
  "What services do you offer?",
  "How much does a video cost?",
  "I need a wedding film",
  "I want a brand commercial",
  "How do I book you?",
];

// ─── ICONS ────────────────────────────────────────────────────────────────────
const IconChat = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const IconClose = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconSend = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const IconRefresh = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10"/>
    <path d="M3.51 15a9 9 0 1 0 .49-4"/>
  </svg>
);

const TypingDots = () => (
  <span style={{display:"inline-flex",gap:4,alignItems:"center",height:20}}>
    {[0,1,2].map(i=>(
      <span key={i} style={{
        width:5,height:5,borderRadius:"50%",background:"#c9a84c",
        animation:`cwDot 1.3s ease-in-out ${i*0.18}s infinite`
      }}/>
    ))}
  </span>
);

function formatMessage(text) {
  return text.split("\n").map((line, i, arr) => (
    <span key={i}>{line}{i < arr.length - 1 && <br/>}</span>
  ));
}

function Timestamp({ date }) {
  const t = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return <span style={{fontSize:10,color:"rgba(255,255,255,0.2)",marginTop:2,display:"block"}}>{t}</span>;
}

// ─── MAIN WIDGET ──────────────────────────────────────────────────────────────
export default function ChatWidget() {
  const [open, setOpen]       = useState(false);
  const [msgs, setMsgs]       = useState([]);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);
  const [unread, setUnread]   = useState(1);
  const [greeted, setGreeted] = useState(false);
  const [error, setError]     = useState(null);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  const initGreeting = useCallback(() => {
    setMsgs([{ role: "assistant", content: GREETING, ts: new Date() }]);
    setGreeted(true);
    setError(null);
    setInput("");
    setLoading(false);
  }, []);

  useEffect(() => {
    if (open && !greeted) { initGreeting(); setUnread(0); }
    if (open) setUnread(0);
  }, [open, greeted, initGreeting]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 220);
  }, [open]);

  const handleRestart = () => {
    setMsgs([]); setInput(""); setLoading(false);
    setError(null); setGreeted(false);
    setTimeout(initGreeting, 40);
  };

  const send = useCallback(async (text) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setInput("");
    setError(null);

    const userMsg = { role: "user", content, ts: new Date() };
    const history = [...msgs, userMsg];
    setMsgs(history);
    setLoading(true);

    // 1. Try local knowledge base first — instant, no API needed
    const localAnswer = findAnswer(content);

    if (localAnswer) {
      // Small delay to feel natural, not instant-robotic
      setTimeout(() => {
        setMsgs(prev => [...prev, { role: "assistant", content: localAnswer, ts: new Date() }]);
        setLoading(false);
      }, 420);
      return;
    }

    // 2. Fall back to Claude API for unknown questions
    try {
      const apiMessages = history.map(({ role, content }) => ({ role, content }));
      const reply = await callClaude(apiMessages);
      setMsgs(prev => [...prev, { role: "assistant", content: reply, ts: new Date() }]);
    } catch {
      // 3. Graceful fallback if API also fails
      const fallback = `That's a great question — let me connect you directly with Suraj for a personalised answer.\n\nReach out at ${CONFIG.email} and he'll reply personally, usually within a few hours.`;
      setMsgs(prev => [...prev, { role: "assistant", content: fallback, ts: new Date() }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, msgs]);

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const handleQuick = (q) => {
    if (loading) return;
    setTimeout(() => send(q), 30);
  };



  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes cwDot{0%,80%,100%{transform:translateY(0);opacity:.4}40%{transform:translateY(-5px);opacity:1}}
        @keyframes cwSlideUp{from{opacity:0;transform:translateY(18px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes cwFadeIn{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
        @keyframes cwPulse{0%{transform:scale(1);opacity:.6}70%{transform:scale(1.6);opacity:0}100%{transform:scale(1.6);opacity:0}}

        .cw-fab{
          position:fixed;bottom:28px;right:28px;z-index:9999;
          width:56px;height:56px;border-radius:50%;
          background:linear-gradient(145deg,#b8924a,#c9a84c,#ddb96e);
          border:none;cursor:pointer;
          display:flex;align-items:center;justify-content:center;
          color:#0a0a0a;
          box-shadow:0 4px 24px rgba(201,168,76,.4),0 2px 8px rgba(0,0,0,.5);
          transition:transform .2s,box-shadow .2s;padding:0;
        }
        .cw-fab:hover{transform:scale(1.08);box-shadow:0 6px 32px rgba(201,168,76,.55),0 4px 14px rgba(0,0,0,.5)}
        .cw-fab:focus-visible{outline:2px solid #c9a84c;outline-offset:3px}
        .cw-fab::before{content:'';position:absolute;inset:0;border-radius:50%;border:2px solid rgba(201,168,76,.45);animation:cwPulse 2.6s ease-out infinite}

        .cw-badge{
          position:absolute;top:-3px;right:-3px;width:18px;height:18px;
          border-radius:50%;background:#e05c5c;border:2px solid #0a0a0a;
          font-size:10px;font-weight:700;color:#fff;
          display:flex;align-items:center;justify-content:center;
          font-family:'DM Sans',sans-serif;
        }

        .cw-panel{
          position:fixed;bottom:96px;right:28px;z-index:9998;
          width:min(400px,calc(100vw - 32px));
          height:min(590px,calc(100dvh - 120px));
          background:#0c0c0c;
          border:1px solid rgba(201,168,76,.18);
          border-radius:18px;
          box-shadow:0 32px 80px rgba(0,0,0,.75),0 0 0 1px rgba(255,255,255,.04);
          display:flex;flex-direction:column;overflow:hidden;
          animation:cwSlideUp .3s cubic-bezier(.22,1,.36,1) both;
          font-family:'DM Sans',sans-serif;
        }

        .cw-header{
          background:linear-gradient(160deg,#111008 0%,#14120d 100%);
          border-bottom:1px solid rgba(201,168,76,.13);
          padding:13px 15px;display:flex;align-items:center;gap:11px;flex-shrink:0;
        }
        .cw-avatar{
          width:40px;height:40px;border-radius:50%;flex-shrink:0;
          background:linear-gradient(145deg,#1a1610,#231d12);
          border:1.5px solid rgba(201,168,76,.4);
          display:flex;align-items:center;justify-content:center;
          font-family:'Cormorant Garamond',serif;font-size:14px;font-weight:600;
          color:#c9a84c;letter-spacing:.02em;
        }
        .cw-header-info{flex:1;min-width:0}
        .cw-header-name{
          font-family:'Cormorant Garamond',serif;font-size:16px;font-weight:600;
          color:#f0ece4;line-height:1.2;letter-spacing:.01em;
        }
        .cw-header-status{
          font-size:11px;color:#6a6660;
          display:flex;align-items:center;gap:5px;margin-top:2px;
        }
        .cw-status-dot{width:6px;height:6px;border-radius:50%;background:#4caf80;flex-shrink:0}

        .cw-header-actions{display:flex;align-items:center;gap:6px;flex-shrink:0}
        .cw-restart-btn{
          display:flex;align-items:center;gap:5px;
          padding:4px 10px;border-radius:100px;
          border:1px solid rgba(201,168,76,.2);background:transparent;
          color:#7a6830;font-family:'DM Sans',sans-serif;font-size:11px;
          cursor:pointer;transition:all .18s;line-height:1;
        }
        .cw-restart-btn:hover{background:rgba(201,168,76,.08);color:#c9a84c;border-color:rgba(201,168,76,.35)}

        .cw-icon-btn{
          width:30px;height:30px;border-radius:50%;
          border:1px solid rgba(255,255,255,.09);background:transparent;
          color:#555;display:flex;align-items:center;justify-content:center;
          cursor:pointer;transition:background .18s,color .18s;padding:0;flex-shrink:0;
        }
        .cw-icon-btn:hover{background:rgba(255,255,255,.06);color:#ccc}

        .cw-msgs{
          flex:1;overflow-y:auto;padding:14px 13px 6px;
          display:flex;flex-direction:column;gap:8px;
          scrollbar-width:thin;scrollbar-color:rgba(201,168,76,.15) transparent;
        }
        .cw-msgs::-webkit-scrollbar{width:3px}
        .cw-msgs::-webkit-scrollbar-thumb{background:rgba(201,168,76,.18);border-radius:2px}

        .cw-msg-group{display:flex;flex-direction:column;gap:2px;animation:cwFadeIn .26s ease both}
        .cw-msg-group--bot{align-items:flex-start}
        .cw-msg-group--user{align-items:flex-end}

        .cw-bubble{
          max-width:88%;padding:10px 13px;
          font-size:13px;line-height:1.7;border-radius:14px;
          word-break:break-word;
        }
        .cw-bubble--bot{
          background:#161412;border:1px solid rgba(255,255,255,.055);
          color:#d5d1c9;border-bottom-left-radius:3px;
        }
        .cw-bubble--user{
          background:linear-gradient(145deg,#1e1a10,#27200f);
          border:1px solid rgba(201,168,76,.18);
          color:#f0ece4;border-bottom-right-radius:3px;
        }

        .cw-typing{
          background:#161412;border:1px solid rgba(255,255,255,.055);
          padding:11px 14px;border-radius:14px;border-bottom-left-radius:3px;
          align-self:flex-start;animation:cwFadeIn .26s ease both;
        }

        .cw-quick{
          padding:8px 13px 8px;display:flex;gap:5px;flex-wrap:wrap;flex-shrink:0;
          border-top:1px solid rgba(255,255,255,.04);
        }
        .cw-qr{
          padding:5px 11px;border-radius:100px;
          border:1px solid rgba(201,168,76,.2);background:transparent;
          color:#8a7040;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:500;
          cursor:pointer;transition:all .2s;white-space:nowrap;
        }
        .cw-qr:hover{background:rgba(201,168,76,.1);border-color:rgba(201,168,76,.4);color:#d4a84c}
        .cw-qr:disabled{opacity:.4;cursor:default}

        .cw-inputrow{
          padding:10px 12px 13px;border-top:1px solid rgba(255,255,255,.055);
          display:flex;gap:8px;align-items:flex-end;flex-shrink:0;background:#0c0c0c;
        }
        .cw-textarea{
          flex:1;background:#161412;
          border:1px solid rgba(255,255,255,.08);border-radius:11px;
          padding:9px 12px;color:#f0ece4;
          font-family:'DM Sans',sans-serif;font-size:13px;font-weight:300;line-height:1.55;
          resize:none;outline:none;min-height:38px;max-height:110px;
          transition:border-color .2s;field-sizing:content;
        }
        .cw-textarea::placeholder{color:#3a3836}
        .cw-textarea:focus{border-color:rgba(201,168,76,.32)}
        .cw-textarea:disabled{opacity:.6;cursor:not-allowed}

        .cw-send{
          width:36px;height:36px;border-radius:50%;border:none;
          background:linear-gradient(145deg,#b8924a,#c9a84c);
          color:#0a0a0a;display:flex;align-items:center;justify-content:center;
          cursor:pointer;flex-shrink:0;padding:0;
          transition:transform .18s,box-shadow .18s,opacity .18s;
        }
        .cw-send:hover:not(:disabled){transform:scale(1.1);box-shadow:0 4px 18px rgba(201,168,76,.35)}
        .cw-send:disabled{opacity:.35;cursor:default}

        .cw-credit{
          text-align:center;font-size:10px;color:#272420;
          padding:3px 0 7px;letter-spacing:.05em;font-family:'DM Sans',sans-serif;flex-shrink:0;
        }

        @media(max-width:480px){
          .cw-panel{
            bottom:0;right:0;width:100vw;
            height:min(620px,92dvh);
            border-radius:22px 22px 0 0;
            border-left:none;border-right:none;border-bottom:none;
          }
          .cw-fab{bottom:20px;right:20px}
        }
      `}</style>

      {/* FAB */}
      <button className="cw-fab" onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close chat" : "Open chat"} aria-expanded={open}>
        {open ? <IconClose /> : <IconChat />}
        {!open && unread > 0 && <span className="cw-badge">{unread}</span>}
      </button>

      {/* Panel */}
      {open && (
        <div className="cw-panel" role="dialog" aria-label={`Chat with ${CONFIG.brandName}`}>

          {/* Header */}
          <div className="cw-header">
            <div className="cw-avatar" aria-hidden="true">SC</div>
            <div className="cw-header-info">
              <div className="cw-header-name">{CONFIG.brandName}</div>
              <div className="cw-header-status">
                <span className="cw-status-dot" aria-hidden="true"/>
                Available now · replies instantly
              </div>
            </div>
            <div className="cw-header-actions">
              <button className="cw-restart-btn" onClick={handleRestart} title="Start a new conversation">
                <IconRefresh /> New chat
              </button>
              <button className="cw-icon-btn" onClick={() => setOpen(false)} aria-label="Close">
                <IconClose />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="cw-msgs" role="log" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={`cw-msg-group cw-msg-group--${m.role === "user" ? "user" : "bot"}`}>
                <div className={`cw-bubble cw-bubble--${m.role === "user" ? "user" : "bot"}`}>
                  {formatMessage(m.content)}
                </div>
                <Timestamp date={m.ts} />
              </div>
            ))}
            {loading && (
              <div className="cw-typing"><TypingDots /></div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          <div className="cw-quick">
            {QUICK_REPLIES.map(q => (
              <button key={q} className="cw-qr" onClick={() => handleQuick(q)} disabled={loading}>
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="cw-inputrow">
            <textarea
              ref={inputRef}
              className="cw-textarea"
              rows={1}
              placeholder="Ask about pricing, services, availability…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              aria-label="Message"
              disabled={loading}
            />
            <button className="cw-send" onClick={() => send()}
              disabled={!input.trim() || loading} aria-label="Send">
              <IconSend />
            </button>
          </div>

          <div className="cw-credit" aria-hidden="true">Powered by Claude AI</div>
        </div>
      )}
    </>
  );
}