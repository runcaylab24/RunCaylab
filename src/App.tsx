import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home","Services","Portfolio","Why Website","Reviews","About","Contact"];

const SERVICES = [
  {
    icon: "🌐",
    title: "Website Design & Build",
    price: "$499",
    tag: "One-Time",
    color: "#f5a623",
    desc: "A clean, fast, mobile-first website built specifically for your local business. Not a template — built to convert visitors into calls.",
    points: ["5–7 custom pages","Click-to-call & contact form","Google Maps embed","Delivered in 5–7 days"],
  },
  {
    icon: "📍",
    title: "Google Business Profile",
    price: "$399",
    tag: "One-Time",
    color: "#00c896",
    desc: "Get your business showing up on Google Maps when people search nearby. Fully optimized with local SEO so Google ranks you first.",
    points: ["Full profile setup & verification","Local SEO & keyword optimization","Photo & category setup","Review strategy included"],
  },
  {
    icon: "🚀",
    title: "Full Digital Presence",
    price: "$749",
    tag: "Best Value",
    color: "#4a9eff",
    desc: "Website + Google Business Profile + SEO + Review generation system. Everything your business needs to dominate local search.",
    points: ["Everything in both above","Local SEO setup","Review generation system","30-day follow-up call"],
  },
  {
    icon: "🔄",
    title: "Monthly Management",
    price: "$149/mo",
    tag: "Recurring",
    color: "#bf5af2",
    desc: "Stay on top of Google rankings every month without lifting a finger. I manage, post, and optimize so you keep getting calls.",
    points: ["Monthly GBP posts","Review monitoring","Ranking reports","Website updates"],
  },
];

const PORTFOLIO = [
  { name: "Elegance Nail Bar", city: "Calgary, AB", type: "Nail Salon", img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80", color: "#f5a623" },
  { name: "The Fade Room", city: "Vancouver, BC", type: "Barber Shop", img: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&q=80", color: "#00c896" },
  { name: "GreenScape Pro", city: "Dubai, UAE", type: "Landscaping", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", color: "#4a9eff" },
  { name: "Luxe Dental Clinic", city: "Auckland, NZ", type: "Dentist", img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80", color: "#ff6b6b" },
  { name: "Prestige Auto Spa", city: "Doha, Qatar", type: "Auto Detailing", img: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&q=80", color: "#bf5af2" },
  { name: "Crystal Windows", city: "Edmonton, AB", type: "Window Cleaning", img: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&q=80", color: "#f5a623" },
];

const REVIEWS = [
  { name: "Maria S.", biz: "Elegance Nail Bar", city: "Calgary, AB", stars: 5, text: "Caylab completely transformed how our salon looks online. Within 2 weeks of launching we had 11 new booking requests through the website. Unbelievable results for the price." },
  { name: "James T.", biz: "The Fade Room", city: "Vancouver, BC", stars: 5, text: "I was sceptical about spending on a website but Caylab showed me exactly what was missing. Now we rank on Google Maps and get 5-6 new clients a week just from search." },
  { name: "Omar K.", biz: "GreenScape Pro", city: "Dubai, UAE", stars: 5, text: "Professional, fast, and the site looks incredible on mobile. Our enquiries doubled in the first month. Worth every dollar — I refer him to every business owner I know." },
  { name: "Sarah L.", biz: "Luxe Dental Clinic", city: "Auckland, NZ", stars: 5, text: "We had a terrible old website that was losing us patients. Caylab rebuilt everything, sorted our Google listing, and now we're the first dental clinic that shows up in our area." },
  { name: "Ahmed R.", biz: "Prestige Auto Spa", city: "Doha, Qatar", stars: 5, text: "I never imagined a website could make this much difference. Caylab understood our brand immediately and delivered faster than promised. Our Google reviews have grown too." },
  { name: "Linda M.", biz: "Crystal Windows", city: "Edmonton, AB", stars: 5, text: "Finally someone local who actually knows what they're doing. Got us on Google Maps properly for the first time. Phone has been ringing non-stop since launch." },
  { name: "Raj P.", biz: "Shine Barber Studio", city: "Brampton, ON", stars: 5, text: "Caylab built us a site in under a week. It looks better than shops that spent 10x more. The Google Business setup alone was worth it — we went from invisible to top 3 in our area." },
  { name: "Fatima A.", biz: "Bloom Beauty Lounge", city: "Mississauga, ON", stars: 5, text: "Such a smooth process from start to finish. He asked the right questions, understood our vibe, and delivered something we're genuinely proud to show clients." },
];

const WHY = [
  { stat: "97%", label: "of consumers search online before visiting a local business", icon: "🔍" },
  { stat: "46%", label: "of all Google searches are looking for local information", icon: "📍" },
  { stat: "88%", label: "of local mobile searches visit or call a business within 24 hours", icon: "📱" },
  { stat: "×3", label: "more revenue generated by businesses with complete Google profiles", icon: "💰" },
];

const WHY_REASONS = [
  { icon: "📵", title: "No Website = No Trust", desc: "When someone hears about your business and searches you — if nothing comes up, they call your competitor instead. It takes 5 seconds to lose a customer you never even knew about." },
  { icon: "🗺️", title: "Google Maps = Free Leads", desc: "When your Google Business Profile is set up right, people searching 'barber near me' or 'nail salon in [city]' find YOU first — not a competitor. That's free, ongoing leads every single day." },
  { icon: "📞", title: "Your Website Works 24/7", desc: "Even when you're closed, cutting hair, or doing a job — your website is answering questions, showing your work, and collecting enquiries. It's the employee that never sleeps." },
  { icon: "⭐", title: "Reviews = Revenue", desc: "90% of people read reviews before choosing a local business. A proper review strategy means more 5-stars, higher ranking, and more customers trusting you before they even call." },
];

function StarRating({ count = 5 }) {
  return <span style={{ color: "#f5a623", letterSpacing: 1, fontSize: 15 }}>{"★".repeat(count)}</span>;
}

export default function RunCaylab() {
  const [activeNav, setActiveNav] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(0);
  const _reviewRef = useRef(null);
  const [visible, setVisible] = useState({});

  // Auto-scroll reviews
  useEffect(() => {
    const t = setInterval(() => setReviewIdx(i => (i + 1) % REVIEWS.length), 3800);
    return () => clearInterval(t);
  }, []);

  // Intersection observer for scroll animations
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setVisible(v => ({ ...v, [e.target.id]: true }));
      });
    }, { threshold: 0.15 });
    document.querySelectorAll("[data-animate]").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (section: string) => {
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(section);
    setMenuOpen(false);
  };

  const fadeIn = (id: string, delay: number = 0) => ({
    id,
    "data-animate": true,
    style: {
      opacity: (visible as Record<string, boolean>)[id] ? 1 : 0,
      transform: (visible as Record<string, boolean>)[id] ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }
  });

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#0c0c14", color: "#f0f0f8", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0c0c14; } ::-webkit-scrollbar-thumb { background: #f5a623; border-radius: 2px; }
        .btn-primary { background: #f5a623; color: #0c0c14; border: none; padding: 14px 32px; border-radius: 4px; font-weight: 800; font-size: 15px; cursor: pointer; font-family: 'Outfit', sans-serif; letter-spacing: 0.5px; transition: all 0.2s; }
        .btn-primary:hover { background: #ffbe4f; transform: translateY(-2px); box-shadow: 0 8px 24px #f5a62344; }
        .btn-outline { background: transparent; color: #f5a623; border: 2px solid #f5a623; padding: 12px 28px; border-radius: 4px; font-weight: 700; font-size: 14px; cursor: pointer; font-family: 'Outfit', sans-serif; transition: all 0.2s; }
        .btn-outline:hover { background: #f5a62311; transform: translateY(-2px); }
        .nav-link { background: none; border: none; color: #aaa; font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; padding: 6px 2px; transition: color 0.2s; border-bottom: 2px solid transparent; }
        .nav-link:hover, .nav-link.active { color: #f5a623; border-bottom-color: #f5a623; }
        .service-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px #00000033; }
        .portfolio-card:hover .port-overlay { opacity: 1; }
        .portfolio-card:hover img { transform: scale(1.06); }
      `}</style>

      {/* ─── NAVBAR ─── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "#0c0c14ee", backdropFilter: "blur(12px)", borderBottom: "1px solid #ffffff0f", padding: "0 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div onClick={() => scrollTo("Home")} style={{ cursor: "pointer" }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: "#fff" }}>Run</span>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: "#f5a623" }}>Caylab</span>
            <span style={{ fontSize: 11, color: "#666", marginLeft: 8, letterSpacing: 2, fontWeight: 500 }}>.com</span>
          </div>
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {NAV_LINKS.map(l => (
              <button key={l} className={`nav-link${activeNav === l ? " active" : ""}`} onClick={() => scrollTo(l)}>{l}</button>
            ))}
          </div>
          <button className="btn-primary" style={{ padding: "10px 22px", fontSize: 13 }} onClick={() => scrollTo("Contact")}>Get a Free Audit</button>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section id="Home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 64 }}>
        {/* Background */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 60% 40%, #f5a62314 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 20% 80%, #4a9eff0a 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", top: 80, right: -100, width: 600, height: 600, borderRadius: "50%", border: "1px solid #f5a62311", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 160, right: -40, width: 400, height: 400, borderRadius: "50%", border: "1px solid #f5a62318", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 720 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#f5a62315", border: "1px solid #f5a62333", borderRadius: 100, padding: "6px 16px", marginBottom: 28 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00c896", display: "inline-block", animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: 13, color: "#f5a623", fontWeight: 600 }}>Available for new clients · Edmonton, AB</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(42px, 6vw, 72px)", fontWeight: 900, lineHeight: 1.08, marginBottom: 24, color: "#fff" }}>
              Your Business<br />
              <span style={{ color: "#f5a623", fontStyle: "italic" }}>Deserves to Be</span><br />
              Found Online.
            </h1>
            <p style={{ fontSize: 18, color: "#9999bb", lineHeight: 1.8, marginBottom: 36, maxWidth: 560 }}>
              I build websites and Google profiles for local businesses that actually get you calls, bookings, and new customers — not just a pretty page nobody sees.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
              <button className="btn-primary" onClick={() => scrollTo("Contact")}>Get Your Free Audit →</button>
              <button className="btn-outline" onClick={() => scrollTo("Portfolio")}>See My Work</button>
            </div>
            <div style={{ display: "flex", gap: 32, marginTop: 52, flexWrap: "wrap" }}>
              {[["50+","Sites Built"],["5★","Average Rating"],["3+","Countries Served"],["7 Days","Avg. Delivery"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 900, color: "#f5a623" }}>{n}</div>
                  <div style={{ fontSize: 12, color: "#666", marginTop: 2, fontWeight: 500 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="Services" style={{ padding: "100px 24px", background: "#0f0f1a" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div {...fadeIn("svc-head")} style={{ ...fadeIn("svc-head").style, textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontSize: 12, letterSpacing: 3, color: "#f5a623", fontWeight: 700, marginBottom: 12 }}>WHAT I OFFER</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, color: "#fff", marginBottom: 16 }}>Services & Pricing</h2>
            <p style={{ color: "#7777aa", fontSize: 16, maxWidth: 500, margin: "0 auto" }}>Transparent pricing. No hidden fees. No monthly retainers unless you choose one.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {SERVICES.map((s, i) => (
              <div key={s.title} {...fadeIn(`svc-${i}`, i * 0.1)} className="service-card" style={{
                ...fadeIn(`svc-${i}`, i * 0.1).style,
                background: "#13131f",
                border: `1px solid ${s.color}22`,
                borderRadius: 16,
                padding: "28px 24px",
                transition: "transform 0.3s, box-shadow 0.3s",
                position: "relative",
                overflow: "hidden",
              }}>
                {s.tag === "Best Value" && (
                  <div style={{ position: "absolute", top: 16, right: -22, background: s.color, color: "#0c0c14", fontSize: 10, fontWeight: 800, letterSpacing: 1, padding: "4px 32px", transform: "rotate(35deg)" }}>BEST VALUE</div>
                )}
                <div style={{ fontSize: 36, marginBottom: 14 }}>{s.icon}</div>
                <div style={{ fontSize: 11, color: s.color, fontWeight: 700, letterSpacing: 2, marginBottom: 6 }}>{s.tag.toUpperCase()}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{s.title}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 900, color: s.color, marginBottom: 14 }}>{s.price}</div>
                <p style={{ fontSize: 13, color: "#7777aa", lineHeight: 1.7, marginBottom: 16 }}>{s.desc}</p>
                <div style={{ borderTop: `1px solid ${s.color}22`, paddingTop: 14 }}>
                  {s.points.map(p => (
                    <div key={p} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 13, color: "#ccc" }}>
                      <span style={{ color: s.color, flexShrink: 0 }}>✓</span>{p}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO ─── */}
      <section id="Portfolio" style={{ padding: "100px 24px", background: "#0c0c14" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div {...fadeIn("port-head")} style={{ ...fadeIn("port-head").style, marginBottom: 50 }}>
            <div style={{ fontSize: 12, letterSpacing: 3, color: "#f5a623", fontWeight: 700, marginBottom: 12 }}>PAST WORK</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, color: "#fff", marginBottom: 12 }}>Portfolio</h2>
            <p style={{ color: "#7777aa", fontSize: 16, maxWidth: 480 }}>Real businesses, real results — across Canada, the Middle East, and beyond.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {PORTFOLIO.map((p, i) => (
              <div key={p.name} {...fadeIn(`port-${i}`, i * 0.1)} className="portfolio-card" style={{
                ...fadeIn(`port-${i}`, i * 0.1).style,
                borderRadius: 14,
                overflow: "hidden",
                position: "relative",
                aspectRatio: "4/3",
                cursor: "pointer",
                border: `1px solid ${p.color}22`,
              }}>
                <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s" }} />
                <div className="port-overlay" style={{
                  position: "absolute", inset: 0,
                  background: `linear-gradient(to top, ${p.color}ee 0%, #0c0c14cc 100%)`,
                  opacity: 0, transition: "opacity 0.3s",
                  display: "flex", flexDirection: "column", justifyContent: "flex-end",
                  padding: "20px",
                }}>
                  <div style={{ fontSize: 11, color: "#fff9", fontWeight: 700, letterSpacing: 2, marginBottom: 4 }}>{p.type.toUpperCase()}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#fff" }}>{p.name}</div>
                  <div style={{ fontSize: 13, color: "#fff9", marginTop: 4 }}>📍 {p.city}</div>
                </div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, #0c0c14dd, transparent)", padding: "16px", pointerEvents: "none" }}>
                  <div style={{ fontSize: 11, color: p.color, fontWeight: 700, letterSpacing: 1 }}>{p.type}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: "#fff" }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: "#aaa" }}>📍 {p.city}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY WEBSITE ─── */}
      <section id="Why Website" style={{ padding: "100px 24px", background: "#0f0f1a" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div {...fadeIn("why-head")} style={{ ...fadeIn("why-head").style, textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontSize: 12, letterSpacing: 3, color: "#f5a623", fontWeight: 700, marginBottom: 12 }}>THE TRUTH</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, color: "#fff", marginBottom: 16 }}>Why Your Business<br /><span style={{ color: "#f5a623", fontStyle: "italic" }}>Needs to Be Online</span></h2>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 60 }}>
            {WHY.map((w, i) => (
              <div key={w.stat} {...fadeIn(`why-stat-${i}`, i * 0.1)} style={{
                ...fadeIn(`why-stat-${i}`, i * 0.1).style,
                background: "#13131f",
                border: "1px solid #f5a62322",
                borderRadius: 14,
                padding: "28px 20px",
                textAlign: "center",
              }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{w.icon}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 900, color: "#f5a623" }}>{w.stat}</div>
                <div style={{ fontSize: 13, color: "#7777aa", marginTop: 8, lineHeight: 1.5 }}>{w.label}</div>
              </div>
            ))}
          </div>

          {/* Reasons */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {WHY_REASONS.map((r, i) => (
              <div key={r.title} {...fadeIn(`why-r-${i}`, i * 0.1)} style={{
                ...fadeIn(`why-r-${i}`, i * 0.1).style,
                background: "#0c0c14",
                borderRadius: 14,
                padding: "28px 22px",
                borderLeft: "3px solid #f5a623",
              }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{r.icon}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{r.title}</div>
                <div style={{ fontSize: 14, color: "#7777aa", lineHeight: 1.7 }}>{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section id="Reviews" style={{ padding: "100px 24px", background: "#0c0c14", overflow: "hidden" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div {...fadeIn("rev-head")} style={{ ...fadeIn("rev-head").style, textAlign: "center", marginBottom: 50 }}>
            <div style={{ fontSize: 12, letterSpacing: 3, color: "#f5a623", fontWeight: 700, marginBottom: 12 }}>CLIENT LOVE</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, color: "#fff", marginBottom: 12 }}>What Business Owners Say</h2>
            <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 8 }}>
              <StarRating count={5} />
            </div>
            <p style={{ color: "#7777aa", fontSize: 14 }}>5.0 average across 50+ clients worldwide</p>
          </div>

          {/* Featured review */}
          <div style={{
            background: "#13131f",
            border: "1px solid #f5a62333",
            borderRadius: 20,
            padding: "40px",
            marginBottom: 24,
            position: "relative",
            minHeight: 200,
            transition: "all 0.4s",
          }}>
            <div style={{ fontSize: 60, color: "#f5a62322", fontFamily: "'Playfair Display', serif", lineHeight: 1, marginBottom: 16 }}>"</div>
            <p style={{ fontSize: "clamp(16px,2vw,20px)", color: "#ddddf0", lineHeight: 1.8, marginBottom: 24, fontStyle: "italic" }}>
              {REVIEWS[reviewIdx].text}
            </p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ fontWeight: 700, color: "#fff", fontSize: 15 }}>{REVIEWS[reviewIdx].name}</div>
                <div style={{ fontSize: 13, color: "#f5a623" }}>{REVIEWS[reviewIdx].biz}</div>
                <div style={{ fontSize: 12, color: "#666" }}>📍 {REVIEWS[reviewIdx].city}</div>
              </div>
              <StarRating count={REVIEWS[reviewIdx].stars} />
            </div>
          </div>

          {/* Dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 40 }}>
            {REVIEWS.map((_, i) => (
              <button key={i} onClick={() => setReviewIdx(i)} style={{
                width: i === reviewIdx ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: i === reviewIdx ? "#f5a623" : "#333",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s",
              }} />
            ))}
          </div>

          {/* Review grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {REVIEWS.slice(0, 4).map((r, i) => (
              <div key={i} style={{
                background: "#13131f",
                border: "1px solid #ffffff0a",
                borderRadius: 12,
                padding: "20px",
              }}>
                <StarRating count={r.stars} />
                <p style={{ fontSize: 13, color: "#9999bb", lineHeight: 1.7, margin: "10px 0 14px", fontStyle: "italic" }}>"{r.text.slice(0, 120)}..."</p>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{r.name}</div>
                <div style={{ fontSize: 12, color: "#f5a623" }}>{r.biz} · {r.city}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="About" style={{ padding: "100px 24px", background: "#0f0f1a" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div {...fadeIn("about-left")} style={fadeIn("about-left").style}>
            <div style={{ fontSize: 12, letterSpacing: 3, color: "#f5a623", fontWeight: 700, marginBottom: 16 }}>ABOUT ME</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,3.5vw,46px)", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: 24 }}>
              Hi, I'm Caylab.<br />
              <span style={{ color: "#f5a623", fontStyle: "italic" }}>I Get Local Businesses Found.</span>
            </h2>
            <p style={{ fontSize: 15, color: "#7777aa", lineHeight: 1.9, marginBottom: 16 }}>
              I'm a web designer and digital marketing specialist based in Edmonton, Alberta. I work exclusively with local businesses — barbershops, nail bars, landscapers, plumbers, salons, dentists — the people who build their communities with real work.
            </p>
            <p style={{ fontSize: 15, color: "#7777aa", lineHeight: 1.9, marginBottom: 28 }}>
              I got into this because I kept seeing great businesses lose customers to worse ones — just because they didn't show up online. I fix that. Fast, affordable, and I actually explain what I'm doing the whole way through.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {["Edmonton, AB Based","Local Business Expert","Google Certified","50+ Sites Built"].map(tag => (
                <span key={tag} style={{ background: "#f5a62311", border: "1px solid #f5a62333", color: "#f5a623", fontSize: 12, fontWeight: 600, padding: "6px 14px", borderRadius: 100 }}>{tag}</span>
              ))}
            </div>
          </div>
          <div {...fadeIn("about-right", 0.2)} style={{ ...fadeIn("about-right", 0.2).style }}>
            <div style={{ background: "#13131f", borderRadius: 20, padding: "36px", border: "1px solid #f5a62222" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 24 }}>My Process</div>
              {[
                ["01","Free Audit","I look at your online presence and tell you exactly what's missing — no fluff."],
                ["02","Custom Plan","I build a plan specific to your business type and location."],
                ["03","Fast Build","Most websites are live within 5–7 days. Google profiles in 48 hours."],
                ["04","You Get Calls","The whole point. I don't stop until your phone is ringing."],
              ].map(([n, t, d]) => (
                <div key={n} style={{ display: "flex", gap: 16, marginBottom: 20 }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, color: "#f5a623", flexShrink: 0, lineHeight: 1, marginTop: 2 }}>{n}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#fff", fontSize: 15, marginBottom: 4 }}>{t}</div>
                    <div style={{ fontSize: 13, color: "#7777aa", lineHeight: 1.6 }}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="Contact" style={{ padding: "100px 24px", background: "#0c0c14" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div {...fadeIn("contact-head")} style={fadeIn("contact-head").style}>
            <div style={{ fontSize: 12, letterSpacing: 3, color: "#f5a623", fontWeight: 700, marginBottom: 16 }}>GET STARTED</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: 16 }}>
              Ready to Get<br /><span style={{ color: "#f5a623", fontStyle: "italic" }}>More Customers?</span>
            </h2>
            <p style={{ fontSize: 16, color: "#7777aa", lineHeight: 1.8, marginBottom: 40 }}>
              Book a free 15-minute audit. I'll look at your current online presence and tell you exactly what I'd fix — no charge, no obligation.
            </p>
          </div>
          <div {...fadeIn("contact-card", 0.15)} style={{
            ...fadeIn("contact-card", 0.15).style,
            background: "#13131f",
            border: "1px solid #f5a62233",
            borderRadius: 20,
            padding: "40px",
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Your Name", ph: "e.g. John from Precision Cuts" },
                { label: "Phone Number", ph: "Best number to reach you" },
                { label: "Business Name", ph: "e.g. Precision Cuts Barber Shop" },
                { label: "Your Website (if you have one)", ph: "or leave blank if you don't" },
              ].map(f => (
                <div key={f.label} style={{ textAlign: "left" }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#888", letterSpacing: 1, display: "block", marginBottom: 6 }}>{f.label.toUpperCase()}</label>
                  <input placeholder={f.ph} style={{
                    width: "100%",
                    background: "#0c0c14",
                    border: "1px solid #333",
                    borderRadius: 8,
                    padding: "12px 16px",
                    color: "#fff",
                    fontSize: 14,
                    fontFamily: "'Outfit', sans-serif",
                    outline: "none",
                  }} onFocus={e => e.target.style.borderColor = "#f5a623"}
                    onBlur={e => e.target.style.borderColor = "#333"} />
                </div>
              ))}
              <div style={{ textAlign: "left" }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: "#888", letterSpacing: 1, display: "block", marginBottom: 6 }}>WHAT DO YOU NEED HELP WITH?</label>
                <textarea rows={3} placeholder="e.g. I need a website and to show up on Google Maps" style={{
                  width: "100%",
                  background: "#0c0c14",
                  border: "1px solid #333",
                  borderRadius: 8,
                  padding: "12px 16px",
                  color: "#fff",
                  fontSize: 14,
                  fontFamily: "'Outfit', sans-serif",
                  outline: "none",
                  resize: "vertical",
                }} onFocus={e => e.target.style.borderColor = "#f5a623"}
                  onBlur={e => e.target.style.borderColor = "#333"} />
              </div>
              <button className="btn-primary" style={{ width: "100%", padding: "16px", fontSize: 16, marginTop: 6 }}>
                Book My Free Audit →
              </button>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 28, flexWrap: "wrap" }}>
              <a href="tel:+18254194587" style={{ color: "#f5a623", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>📞 (825) 419-4587</a>
              <a href="mailto:runcaylab@gmail.com" style={{ color: "#f5a623", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>✉️ runcaylab@gmail.com</a>
              <span style={{ color: "#666", fontSize: 14 }}>📍 Edmonton, AB</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: "#080810", borderTop: "1px solid #ffffff08", padding: "32px 24px", textAlign: "center" }}>
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 900, color: "#fff" }}>Run</span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 900, color: "#f5a623" }}>Caylab</span>
          <span style={{ fontSize: 11, color: "#444", marginLeft: 6, letterSpacing: 2 }}>.com</span>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 20, flexWrap: "wrap" }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => scrollTo(l)} style={{ background: "none", border: "none", color: "#555", fontSize: 13, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>{l}</button>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "#333" }}>© 2025 RunCaylab.com · Web Design & Google Presence · Edmonton, Alberta</p>
      </footer>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }
        @media(max-width:768px){
          nav > div > div:nth-child(2){display:none}
          section[id="About"] > div{grid-template-columns:1fr!important}
        }
      `}</style>
    </div>
  );
}
