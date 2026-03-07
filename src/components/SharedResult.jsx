import { useState, useEffect } from "react";
import { SECTIONS, ALL_QUESTIONS, getBand } from "../data/questions";
import { SectionIcon, BandIcon } from "./SectionIcons";
import { supabase } from "../lib/supabase";

function RadarChart({ sectionScores }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const size = 300; const cx = size / 2; const cy = size / 2; const maxR = 110;
  const n = sectionScores.length; const levels = 5;
  function angle(i) { return (Math.PI * 2 * i) / n - Math.PI / 2; }
  function point(i, fraction) { const a = angle(i); return { x: cx + maxR * fraction * Math.cos(a), y: cy + maxR * fraction * Math.sin(a) }; }
  function polygonPoints(fractions) { return fractions.map((f, i) => { const p = point(i, f); return `${p.x},${p.y}`; }).join(" "); }
  const gridPolygons = Array.from({ length: levels }, (_, lvl) => { const f = (lvl + 1) / levels; return polygonPoints(Array(n).fill(f)); });
  const dataFractions = sectionScores.map(s => s.pct / 100);
  const dataPoints = polygonPoints(dataFractions);

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", margin:"2rem 0" }}>
      <div style={{ fontSize:"0.72rem", color:"#475569", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"1rem", fontFamily:"'DM Sans', sans-serif" }}>Dimension Map</div>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow:"visible", maxWidth:"100%" }}>
        <defs>{sectionScores.map((_, i) => (<filter key={i} id={`sr-glow-${i}`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>))}</defs>
        {gridPolygons.map((pts, lvl) => (<polygon key={lvl} points={pts} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>))}
        {sectionScores.map((_, i) => { const outer = point(i, 1); return <line key={i} x1={cx} y1={cy} x2={outer.x} y2={outer.y} stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>; })}
        <polygon points={dataPoints} fill="rgba(99,102,241,0.12)" stroke="rgba(99,102,241,0.5)" strokeWidth="1.5" strokeLinejoin="round"/>
        {sectionScores.map((sec, i) => { const labelR = maxR + 24; const a = angle(i); const lx = cx + labelR * Math.cos(a); const ly = cy + labelR * Math.sin(a); return (<foreignObject key={i} x={lx-10} y={ly-10} width="20" height="20" style={{ overflow:"visible" }}><SectionIcon id={sec.icon} size={20} color={sec.color}/></foreignObject>); })}
        {sectionScores.map((sec, i) => { const p = point(i, dataFractions[i]); const isHovered = hoveredIdx === i; return (<g key={i}><title>{sec.title}: {sec.pct}%</title>{isHovered && <circle cx={p.x} cy={p.y} r={10} fill={`${sec.color}25`} stroke={`${sec.color}60`} strokeWidth="1"/>}<circle cx={p.x} cy={p.y} r={isHovered?6:4} fill={sec.color} stroke={`${sec.color}80`} strokeWidth="2" filter={`url(#sr-glow-${i})`} style={{ cursor:"default", transition:"r 0.15s ease" }} onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)}/>{isHovered && <text x={p.x} y={p.y-12} textAnchor="middle" fontSize="10" fontWeight="700" fill={sec.color} style={{ pointerEvents:"none", fontFamily:"'DM Sans', sans-serif" }}>{sec.pct}%</text>}</g>); })}
      </svg>
    </div>
  );
}

export default function SharedResult({ token, onBack }) {
  const [result, setResult] = useState(null);
  const [sectionScores, setSectionScores] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copy Link");

  useEffect(() => {
    if (!token) return;
    supabase.from("results").select("*").eq("token", token).single()
      .then(({ data, error }) => {
        if (error || !data) { setNotFound(true); return; }

        const answers = data.answers;
        const scores = SECTIONS.map((section) => {
          const sectionQs = ALL_QUESTIONS.filter(q => q.section === section.id);
          const score = sectionQs.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
          const maxSec = sectionQs.length * 3;
          const pct = Math.round((score / maxSec) * 100);
          return { ...section, score, maxSec, pct };
        });

        setResult(data);
        setSectionScores(scores);
      });
  }, [token]);

  const handleCopyLink = async () => {
    const url = `https://tryopencore.vercel.app/r/${token}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopyLabel("Copied!");
      setTimeout(() => setCopyLabel("Copy Link"), 2000);
    } catch {}
  };

  if (notFound) {
    return (
      <div style={{ minHeight:"100vh", background:"#080b14", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"'DM Sans', sans-serif", color:"#f1f5f9", textAlign:"center", padding:"2rem" }}>
        <div style={{ fontSize:"3rem", marginBottom:"1rem" }}>🔍</div>
        <h1 style={{ fontFamily:"'Syne', sans-serif", fontSize:"1.5rem", marginBottom:"0.5rem" }}>Result Not Found</h1>
        <p style={{ color:"#64748b", marginBottom:"2rem" }}>This link may have expired or been removed.</p>
        <button onClick={onBack} style={{ padding:"0.75rem 2rem", background:"linear-gradient(135deg, #6366f1, #8b5cf6)", border:"none", borderRadius:12, color:"#fff", fontWeight:600, cursor:"pointer", fontSize:"0.95rem", fontFamily:"'DM Sans', sans-serif" }}>
          Go Home
        </button>
      </div>
    );
  }

  if (!result || !sectionScores) {
    return (
      <div style={{ minHeight:"100vh", background:"#080b14", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ width:36, height:36, border:"3px solid rgba(99,102,241,0.3)", borderTopColor:"#6366f1", borderRadius:"50%", animation:"spin 0.8s linear infinite" }}/>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const band = getBand(result.total_score);
  const MAX_SCORE = 180;
  const pct = Math.round((result.total_score / MAX_SCORE) * 100);
  const dateStr = new Date(result.created_at).toLocaleDateString("en-US", { month:"long", day:"numeric", year:"numeric" });

  return (
    <div style={{ minHeight:"100vh", background:"#080b14", fontFamily:"'DM Sans', sans-serif", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"20%", left:"50%", transform:"translate(-50%,-50%)", width:800, height:800, borderRadius:"50%", background:`radial-gradient(circle, ${band.color}08 0%, transparent 70%)`, pointerEvents:"none" }} />

      {/* Top bar — wraps on mobile */}
      <div style={{ padding:"0.75rem 1rem", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid rgba(255,255,255,0.05)", backdropFilter:"blur(10px)", background:"rgba(8,11,20,0.8)", position:"sticky", top:0, zIndex:10, flexWrap:"wrap", gap:"0.5rem" }}>
        <button onClick={onBack}
          style={{ display:"flex", alignItems:"center", gap:"0.4rem", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, padding:"0.45rem 0.875rem", color:"#94a3b8", cursor:"pointer", fontSize:"0.82rem", fontFamily:"'DM Sans', sans-serif", transition:"all 0.2s", whiteSpace:"nowrap" }}
          onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.1)"}
          onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,0.06)"}>
          ← Home
        </button>
        <div style={{ display:"flex", gap:"0.5rem", alignItems:"center", flexWrap:"wrap" }}>
          <button onClick={handleCopyLink}
            style={{ display:"flex", alignItems:"center", gap:"0.4rem", padding:"0.45rem 0.875rem", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, color:"#94a3b8", cursor:"pointer", fontSize:"0.8rem", fontFamily:"'DM Sans', sans-serif", transition:"all 0.2s", whiteSpace:"nowrap" }}
            onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.1)"}
            onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,0.05)"}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
            {copyLabel}
          </button>
          <button onClick={onBack}
            style={{ padding:"0.45rem 1rem", background:"linear-gradient(135deg, #6366f1, #8b5cf6)", border:"none", borderRadius:10, color:"#fff", fontSize:"0.8rem", fontWeight:600, fontFamily:"'DM Sans', sans-serif", cursor:"pointer", whiteSpace:"nowrap" }}>
            Take the Test
          </button>
        </div>
      </div>

      {/* Shared badge */}
      <div style={{ textAlign:"center", padding:"1.5rem 1rem 0" }}>
        <span style={{ display:"inline-block", padding:"0.3rem 1rem", background:"rgba(99,102,241,0.1)", border:"1px solid rgba(99,102,241,0.25)", borderRadius:20, fontSize:"0.72rem", color:"#818cf8", fontFamily:"'DM Sans', sans-serif", textTransform:"uppercase", letterSpacing:"0.1em" }}>
          Shared Result · {dateStr}
        </span>
      </div>

      <div style={{ maxWidth:720, margin:"0 auto", padding:"2rem 1rem 4rem" }}>

        {/* Result card */}
        <div style={{ background:"linear-gradient(135deg, #0d1117 0%, #0f172a 100%)", borderRadius:24, padding:"2.5rem", border:"1px solid rgba(255,255,255,0.07)", marginBottom:"1.5rem", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-100, right:-100, width:300, height:300, borderRadius:"50%", background:`radial-gradient(circle, ${band.color}12 0%, transparent 70%)`, pointerEvents:"none" }} />

          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", marginBottom:"2.5rem", textAlign:"center" }}>
            <div style={{ fontSize:"0.72rem", color:"#475569", textTransform:"uppercase", letterSpacing:"0.15em", marginBottom:"1rem" }}>Assessment Result</div>
            <div style={{ position:"relative", marginBottom:"1.5rem" }}>
              <svg width="160" height="160" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="68" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10"/>
                <circle cx="80" cy="80" r="68" fill="none" stroke={band.color} strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 68}`}
                  strokeDashoffset={`${2 * Math.PI * 68 * (1 - pct / 100)}`}
                  strokeLinecap="round" transform="rotate(-90 80 80)"
                  style={{ transition:"stroke-dashoffset 1.5s ease", filter:`drop-shadow(0 0 8px ${band.color}60)` }}/>
              </svg>
              <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", textAlign:"center" }}>
                <div style={{ fontSize:"2.5rem", fontWeight:800, color:"#fff", fontFamily:"'Syne', sans-serif", lineHeight:1 }}>{result.total_score}</div>
                <div style={{ fontSize:"0.72rem", color:"#475569" }}>out of {MAX_SCORE}</div>
              </div>
            </div>
            <div style={{ marginBottom:"0.75rem" }}><BandIcon id={band.icon} size={36} color={band.color}/></div>
            <h2 style={{ fontSize:"clamp(1.6rem, 5vw, 2.75rem)", color:band.color, margin:"0 0 0.75rem", fontFamily:"'Syne', sans-serif", letterSpacing:"-0.03em", fontWeight:900, lineHeight:1 }}>{band.label}</h2>
            <p style={{ color:"#94a3b8", fontSize:"1rem", maxWidth:480, lineHeight:1.6, margin:0 }}>{band.description}</p>
          </div>

          <div style={{ background:`${band.color}10`, border:`1px solid ${band.color}25`, borderRadius:14, padding:"1.25rem 1.5rem", marginBottom:"2rem" }}>
            <p style={{ color:band.color, fontSize:"0.9rem", margin:0, lineHeight:1.6 }}>💡 {band.advice}</p>
          </div>

          <RadarChart sectionScores={sectionScores}/>

          <div>
            <div style={{ fontSize:"0.72rem", color:"#475569", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:"1.25rem" }}>Section Breakdown</div>
            <div style={{ display:"grid", gap:"0.875rem" }}>
              {sectionScores.map(sec => (
                <div key={sec.id}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.35rem" }}>
                    <span style={{ fontSize:"0.85rem", color:"#94a3b8", display:"flex", alignItems:"center", gap:"0.5rem" }}>
                      <SectionIcon id={sec.icon} size={15} color={sec.color}/>{sec.title}
                    </span>
                    <span style={{ fontSize:"0.8rem", color:"#64748b" }}>{sec.score}/{sec.maxSec}</span>
                  </div>
                  <div style={{ height:6, background:"rgba(255,255,255,0.06)", borderRadius:4, overflow:"hidden" }}>
                    <div style={{ height:"100%", width:`${sec.pct}%`, background:`linear-gradient(90deg, ${sec.color}90, ${sec.color})`, borderRadius:4, transition:"width 1.5s ease" }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer — flex-wrap ensures space between items on mobile */}
          <div style={{ marginTop:"2rem", paddingTop:"1.5rem", borderTop:"1px solid rgba(255,255,255,0.06)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"0.5rem" }}>
            <span style={{ fontSize:"0.72rem", color:"#334155" }}>tryopencore.vercel.app</span>
            <span style={{ fontSize:"0.72rem", color:"#334155" }}>Not a clinical diagnosis</span>
          </div>
        </div>

        <div style={{ background:"rgba(248,113,113,0.06)", border:"1px solid rgba(248,113,113,0.15)", borderRadius:12, padding:"1rem 1.25rem", marginBottom:"2rem" }}>
          <p style={{ color:"#94a3b8", fontSize:"0.8rem", margin:0, lineHeight:1.6 }}>
            <strong style={{ color:"#f87171" }}>⚠️ Disclaimer:</strong> This assessment is for self-awareness purposes only and is <strong>not a clinical diagnosis.</strong>
          </p>
        </div>

        <div style={{ textAlign:"center" }}>
          <button onClick={onBack}
            style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", padding:"0.9rem 2.5rem", background:"linear-gradient(135deg, #6366f1, #8b5cf6)", border:"none", borderRadius:14, color:"#fff", fontSize:"1rem", fontWeight:600, fontFamily:"'DM Sans', sans-serif", boxShadow:"0 8px 28px rgba(99,102,241,0.35)", cursor:"pointer" }}>
            Take Your Own Assessment →
          </button>
        </div>
      </div>
    </div>
  );
}