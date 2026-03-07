import { useState, useEffect } from "react";
import { getHistory } from "../lib/history";
import { SectionIcon } from "./SectionIcons";

export default function History({ onBack, onViewShared }) {
  const [history, setHistory] = useState([]);
  const [copiedToken, setCopiedToken] = useState(null);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleCopy = async (token) => {
    const url = `https://tryopencore.vercel.app/r/${token}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedToken(token);
      setTimeout(() => setCopiedToken(null), 2000);
    } catch {}
  };

  return (
    <div style={{ minHeight:"100vh", background:"#080b14", fontFamily:"'DM Sans', sans-serif", position:"relative" }}>
      {/* Top bar */}
      <div style={{ padding:"1rem 1.5rem", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid rgba(255,255,255,0.05)", backdropFilter:"blur(10px)", background:"rgba(8,11,20,0.8)", position:"sticky", top:0, zIndex:10 }}>
        <button onClick={onBack}
          style={{ display:"flex", alignItems:"center", gap:"0.5rem", background:"none", border:"none", cursor:"pointer", color:"#94a3b8", fontSize:"0.85rem", fontFamily:"'DM Sans', sans-serif", padding:0 }}
          onMouseEnter={e => e.currentTarget.style.color="#f1f5f9"}
          onMouseLeave={e => e.currentTarget.style.color="#94a3b8"}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Back
        </button>
        <span style={{ fontFamily:"'Syne', sans-serif", fontWeight:700, color:"#f1f5f9", fontSize:"1rem" }}>My History</span>
        <span style={{ fontSize:"0.78rem", color:"#475569" }}>{history.length} / 10</span>
      </div>

      <div style={{ maxWidth:680, margin:"0 auto", padding:"2rem 1.5rem 4rem" }}>
        {history.length === 0 ? (
          <div style={{ textAlign:"center", paddingTop:"5rem", color:"#475569" }}>
            <div style={{ fontSize:"3rem", marginBottom:"1rem" }}>📋</div>
            <h2 style={{ fontFamily:"'Syne', sans-serif", color:"#64748b", marginBottom:"0.5rem" }}>No results yet</h2>
            <p style={{ fontSize:"0.9rem", marginBottom:"2rem" }}>Complete an assessment to see your history here.</p>
            <button onClick={onBack}
              style={{ padding:"0.75rem 2rem", background:"linear-gradient(135deg, #6366f1, #8b5cf6)", border:"none", borderRadius:12, color:"#fff", fontWeight:600, cursor:"pointer", fontSize:"0.95rem", fontFamily:"'DM Sans', sans-serif" }}>
              Start Assessment
            </button>
          </div>
        ) : (
          <>
            <p style={{ fontSize:"0.82rem", color:"#475569", marginBottom:"1.5rem" }}>
              Saved on this device only. Up to 10 results — oldest are removed automatically.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
              {history.map((entry) => (
                <HistoryCard
                  key={entry.token}
                  entry={entry}
                  isCopied={copiedToken === entry.token}
                  onCopy={() => handleCopy(entry.token)}
                  onView={() => onViewShared(entry.token)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function HistoryCard({ entry, isCopied, onCopy, onView }) {
  const date = new Date(entry.date).toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" });
  const time = new Date(entry.date).toLocaleTimeString("en-US", { hour:"2-digit", minute:"2-digit" });

  return (
    <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:"1.25rem 1.5rem", transition:"border-color 0.2s" }}
      onMouseEnter={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.14)"}
      onMouseLeave={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"}>

      {/* Card header: score info + buttons — wraps on mobile */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:"1rem", flexWrap:"wrap", gap:"0.75rem" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
          <div style={{ width:36, height:36, borderRadius:10, background:`${entry.bandColor}18`, border:`1px solid ${entry.bandColor}40`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <span style={{ fontSize:"1.1rem", fontWeight:700, color:entry.bandColor, fontFamily:"'Syne', sans-serif" }}>{entry.totalScore}</span>
          </div>
          <div>
            <div style={{ fontSize:"0.95rem", fontWeight:600, color:entry.bandColor, fontFamily:"'Syne', sans-serif", letterSpacing:"-0.01em" }}>{entry.bandLabel}</div>
            <div style={{ fontSize:"0.75rem", color:"#475569" }}>{date} · {time}</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:"0.5rem", flexShrink:0 }}>
          <button onClick={onCopy}
            style={{ display:"flex", alignItems:"center", gap:"0.3rem", padding:"0.4rem 0.875rem", background:isCopied?"rgba(34,197,94,0.1)":"rgba(255,255,255,0.05)", border:`1px solid ${isCopied?"rgba(34,197,94,0.3)":"rgba(255,255,255,0.1)"}`, borderRadius:8, color:isCopied?"#22c55e":"#64748b", cursor:"pointer", fontSize:"0.78rem", fontFamily:"'DM Sans', sans-serif", transition:"all 0.2s", whiteSpace:"nowrap" }}>
            {isCopied
              ? <><CheckIcon /> Copied!</>
              : <><LinkIcon /> Copy Link</>}
          </button>
          <button onClick={onView}
            style={{ display:"flex", alignItems:"center", gap:"0.3rem", padding:"0.4rem 0.875rem", background:"rgba(99,102,241,0.1)", border:"1px solid rgba(99,102,241,0.25)", borderRadius:8, color:"#818cf8", cursor:"pointer", fontSize:"0.78rem", fontFamily:"'DM Sans', sans-serif", transition:"all 0.2s", whiteSpace:"nowrap" }}
            onMouseEnter={e => e.currentTarget.style.background="rgba(99,102,241,0.2)"}
            onMouseLeave={e => e.currentTarget.style.background="rgba(99,102,241,0.1)"}>
            View →
          </button>
        </div>
      </div>

      {/* Dimension grid: 2 columns on mobile, 4 on wider screens */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:"0.625rem" }}>
        {entry.sectionScores.map((s) => (
          <div key={s.id} style={{ display:"flex", flexDirection:"column", gap:"0.25rem", minWidth:0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:"0.25rem" }}>
              <SectionIcon id={s.icon} size={10} color={s.color} />
              <span style={{ fontSize:"0.62rem", color:"#475569", fontFamily:"'DM Sans', sans-serif", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{s.title}</span>
            </div>
            <div style={{ height:3, background:"rgba(255,255,255,0.06)", borderRadius:2, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${s.pct}%`, background:s.color, borderRadius:2 }} />
            </div>
            <span style={{ fontSize:"0.62rem", color:s.color, fontWeight:600 }}>{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LinkIcon() { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>; }
function CheckIcon() { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>; }