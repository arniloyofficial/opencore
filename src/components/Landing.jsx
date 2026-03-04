import { useState, useEffect } from "react";

export default function Landing({ onStart }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const sections = [["🧠","Depression","#6366f1"],["😰","Anxiety","#f59e0b"],["😴","Sleep","#8b5cf6"],["🤝","Social","#10b981"],["🧩","Focus","#3b82f6"],["🌊","Emotions","#06b6d4"],["💆","Stress","#f97316"],["🌟","Purpose","#ec4899"]];
  const stats = [["60","Questions"],["8","Dimensions"],["10min","To Complete"],["Free","Always"]];

  return (
    <div style={{ minHeight:"100vh", background:"#080b14", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"2rem 1.25rem 1rem", fontFamily:"'Syne', sans-serif", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"15%", left:"10%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"10%", right:"8%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)", pointerEvents:"none" }} />

      {/* Top nav */}
      <div style={{ position:"fixed", top:0, left:0, right:0, zIndex:50, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0.875rem 1.5rem", background:"rgba(8,11,20,0.8)", backdropFilter:"blur(12px)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"0.6rem" }}>
          <img src="/logo.svg" alt="OpenCore" style={{ height:26, width:"auto" }}
            onError={(e) => {
              e.currentTarget.style.display="none";
              document.getElementById("logo-fallback").style.display="flex";
            }} />
          <div id="logo-fallback" style={{ display:"none", alignItems:"center", gap:"0.5rem" }}>
            <div style={{ width:28, height:28, borderRadius:7, background:"linear-gradient(135deg, #6366f1, #8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>⬡</div>
            <span style={{ fontSize:"1.05rem", fontWeight:700, color:"#fff", fontFamily:"'DM Sans', sans-serif", letterSpacing:"-0.02em" }}>OpenCore</span>
          </div>
        </div>
        <a href="https://github.com/arniloyofficial/opencore" target="_blank" rel="noopener noreferrer"
          style={{ display:"flex", alignItems:"center", gap:"0.4rem", padding:"0.4rem 0.875rem", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:20, color:"#94a3b8", fontSize:"0.78rem", fontFamily:"'DM Sans', sans-serif", textDecoration:"none", transition:"all 0.2s" }}
          onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.1)"; e.currentTarget.style.color="#fff"; }}
          onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.05)"; e.currentTarget.style.color="#94a3b8"; }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
          Open Source
        </a>
      </div>

      {/* Hero content */}
      <div style={{ opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(30px)", transition:"all 0.9s ease 0.2s", maxWidth:640, paddingTop:"5rem", width:"100%" }}>

        {/* Badge */}
        <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", padding:"0.3rem 0.9rem", background:"rgba(99,102,241,0.1)", border:"1px solid rgba(99,102,241,0.25)", borderRadius:20, marginBottom:"1.75rem", width:"fit-content" }}>
          <span style={{ position:"relative", width:8, height:8, flexShrink:0, display:"inline-flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ position:"absolute", inset:0, borderRadius:"50%", background:"#22c55e", animation:"ping 1.5s cubic-bezier(0,0,0.2,1) infinite", opacity:0.6 }} />
            <span style={{ position:"relative", width:8, height:8, borderRadius:"50%", background:"#22c55e", boxShadow:"0 0 8px rgba(34,197,94,0.9), 0 0 16px rgba(34,197,94,0.4)", display:"block" }} />
          </span>
          <span style={{ fontSize:"0.7rem", color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.1em", fontFamily:"'DM Sans', sans-serif" }}>Free · Anonymous · No account needed</span>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize:"clamp(1.9rem, 5.3vw, 3.7rem)",
          margin:"0 0 1.5rem",
          lineHeight:1.2,
          letterSpacing:"-0.03em",
          fontWeight:800,
          background:"linear-gradient(135deg, #fff 0%, #a5b4fc 60%, #818cf8 100%)",
          WebkitBackgroundClip:"text",
          WebkitTextFillColor:"transparent",
          backgroundClip:"text",
          paddingBottom:"0.1em",
          overflowWrap:"break-word",
          wordBreak:"break-word",
        }}>
          Understand your mental wellbeing
        </h1>

        <p style={{ fontSize:"1.05rem", color:"#94a3b8", lineHeight:1.7, margin:"0 0 2.5rem", fontFamily:"'DM Sans', sans-serif" }}>
          A 60-question mental health assessment covering depression, anxiety, sleep, social connection, focus, emotional regulation, stress, and self-worth. Takes about 8–12 minutes.
        </p>

        {/* Stats */}
        <div style={{ display:"flex", gap:"1.5rem", marginBottom:"2.5rem", flexWrap:"wrap" }}>
          {stats.map(([val, label]) => (
            <div key={label}>
              <div style={{ fontSize:"1.5rem", fontWeight:700, color:"#818cf8" }}>{val}</div>
              <div style={{ fontSize:"0.72rem", color:"#64748b", textTransform:"uppercase", letterSpacing:"0.1em", fontFamily:"'DM Sans', sans-serif" }}>{label}</div>
            </div>
          ))}
        </div>

        <button onClick={onStart}
          style={{ background:"linear-gradient(135deg, #6366f1, #8b5cf6)", color:"#fff", border:"none", borderRadius:14, padding:"1rem 2.5rem", fontSize:"1.05rem", fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans', sans-serif", boxShadow:"0 8px 32px rgba(99,102,241,0.35)", transition:"all 0.2s ease", letterSpacing:"-0.01em" }}
          onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 12px 40px rgba(99,102,241,0.5)"; }}
          onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 8px 32px rgba(99,102,241,0.35)"; }}>
          Begin Assessment →
        </button>
      </div>

      {/* Section pills — left aligned, with colored hover */}
      <div style={{ opacity:visible?1:0, transition:"all 1s ease 0.5s", marginTop:"3.5rem", display:"flex", gap:"0.6rem", flexWrap:"wrap", justifyContent:"flex-start", maxWidth:640, width:"100%" }}>
        {sections.map(([emoji, label, color]) => (
          <div key={label}
            className="section-pill"
            style={{ "--pill-color": color }}
          >
            <span>{emoji}</span><span>{label}</span>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div style={{ opacity:visible?1:0, transition:"all 1s ease 0.7s", marginTop:"2rem", maxWidth:640, width:"100%", padding:"0.875rem 1.1rem", background:"rgba(255,200,0,0.03)", border:"1px solid rgba(255,200,0,0.1)", borderRadius:10 }}>
        <p className="disclaimer-text" style={{ fontSize:"0.8rem", color:"#64748b", fontFamily:"'DM Sans', sans-serif", lineHeight:1.6, margin:0 }}>
          ⚠️ This assessment is for <strong style={{ color:"#94a3b8", fontWeight:600 }}>self-awareness only</strong>. Not a clinical diagnosis. If you are in crisis, please contact a mental health helpline or medical professional immediately.
        </p>
      </div>

      {/* Footer */}
      <div style={{ opacity:visible?1:0, transition:"all 1s ease 0.9s", marginTop:"1.75rem", marginBottom:"0.5rem", maxWidth:640, width:"100%", textAlign:"center" }}>
        <p style={{ fontSize:"0.74rem", color:"#334155", fontFamily:"'DM Sans', sans-serif", margin:0 }}>
          Made with 💜 by{" "}
          <a href="https://arniloy.framer.website" target="_blank" rel="noopener noreferrer"
            style={{ color:"#334155", textDecoration:"none" }}
            onMouseEnter={e=>e.currentTarget.style.color="#64748b"}
            onMouseLeave={e=>e.currentTarget.style.color="#334155"}>
            Arifin Rahman Niloy
          </a>
        </p>
      </div>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        .section-pill {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 0.35rem 0.85rem;
          font-size: 0.78rem;
          color: #64748b;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          transition: all 0.2s ease;
          cursor: default;
        }
        .section-pill:hover {
          border-color: var(--pill-color);
          color: var(--pill-color);
          background: rgba(255,255,255,0.06);
          box-shadow: 0 0 12px color-mix(in srgb, var(--pill-color) 20%, transparent);
        }
        @media (max-width: 480px) {
          .disclaimer-text {
            text-align: center !important;
          }
        }
      `}</style>
    </div>
  );
}