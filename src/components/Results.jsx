import { useRef, useState } from "react";
import { ALL_QUESTIONS, SECTIONS, getBand, getSectionScore, getTotalScore } from "../data/questions";

const MAX_SCORE = 180;

const BD_RESOURCES = [
  { name: "Kaan Pete Roi", desc: "01779-554391 · Emotional support helpline", url: "https://www.kaanpeteroi.org" },
  { name: "NIMH Bangladesh", desc: "National Institute of Mental Health, Dhaka", url: "https://nimh.gov.bd" },
  { name: "Moner Bondhu", desc: "Online mental health support platform", url: "https://monerbondhu.org" },
  { name: "NIMH Helpline", desc: "16263 · National mental health hotline (BD)", url: "tel:16263" },
];

const SITE_URL = "https://tryopencore.vercel.app/";

// ── Radar / Spider Chart ──
function RadarChart({ sectionScores }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const size = 300;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = 110;
  const n = sectionScores.length;
  const levels = 5;

  // angle for each axis (start from top, go clockwise)
  function angle(i) {
    return (Math.PI * 2 * i) / n - Math.PI / 2;
  }

  // point on the chart for a given axis index and radius fraction (0–1)
  function point(i, fraction) {
    const a = angle(i);
    return {
      x: cx + maxR * fraction * Math.cos(a),
      y: cy + maxR * fraction * Math.sin(a),
    };
  }

  // build polygon points string
  function polygonPoints(fractions) {
    return fractions.map((f, i) => {
      const p = point(i, f);
      return `${p.x},${p.y}`;
    }).join(" ");
  }

  // grid level polygons
  const gridPolygons = Array.from({ length: levels }, (_, lvl) => {
    const f = (lvl + 1) / levels;
    return polygonPoints(Array(n).fill(f));
  });

  // data polygon
  const dataFractions = sectionScores.map(s => s.pct / 100);
  const dataPoints = polygonPoints(dataFractions);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "2rem" }}>
      <div style={{ fontSize: "0.72rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1rem" }}>
        Dimension Map
      </div>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ overflow: "visible", maxWidth: "100%" }}
      >
        <defs>
          {sectionScores.map((sec, i) => (
            <filter key={`glow-${i}`} id={`glow-${i}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}
        </defs>

        {/* Grid polygons */}
        {gridPolygons.map((pts, lvl) => (
          <polygon
            key={lvl}
            points={pts}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {sectionScores.map((_, i) => {
          const outer = point(i, 1);
          return (
            <line
              key={i}
              x1={cx} y1={cy}
              x2={outer.x} y2={outer.y}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          );
        })}

        {/* Data polygon fill */}
        <polygon
          points={dataPoints}
          fill="rgba(99,102,241,0.12)"
          stroke="rgba(99,102,241,0.5)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Axis labels (emoji) */}
        {sectionScores.map((sec, i) => {
          const labelR = maxR + 22;
          const a = angle(i);
          const lx = cx + labelR * Math.cos(a);
          const ly = cy + labelR * Math.sin(a);
          return (
            <text
              key={i}
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="16"
              style={{ userSelect: "none" }}
            >
              {sec.emoji}
            </text>
          );
        })}

        {/* Data dots — colored per section */}
        {sectionScores.map((sec, i) => {
          const p = point(i, dataFractions[i]);
          const isHovered = hoveredIdx === i;
          return (
            <g key={i}>
              <title>{sec.title}: {sec.pct}%</title>
              {/* Outer glow ring when hovered */}
              {isHovered && (
                <circle
                  cx={p.x} cy={p.y}
                  r={10}
                  fill={`${sec.color}25`}
                  stroke={`${sec.color}60`}
                  strokeWidth="1"
                />
              )}
              <circle
                cx={p.x} cy={p.y}
                r={isHovered ? 6 : 4}
                fill={sec.color}
                stroke={`${sec.color}80`}
                strokeWidth="2"
                filter={`url(#glow-${i})`}
                style={{ cursor: "default", transition: "r 0.15s ease" }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
              {/* Percentage label on hover */}
              {isHovered && (
                <text
                  x={p.x}
                  y={p.y - 12}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="700"
                  fill={sec.color}
                  style={{ pointerEvents: "none", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {sec.pct}%
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function Results({ answers, onRetake }) {
  const posterRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const totalScore = getTotalScore(answers);
  const band = getBand(totalScore);
  const pct = Math.round((totalScore / MAX_SCORE) * 100);

  const sectionScores = SECTIONS.map(s => {
    const maxSec = s.questions.length * 3;
    const score = getSectionScore(answers, s.id);
    return { ...s, score, maxSec, pct: Math.round((score / maxSec) * 100) };
  });

  async function saveAsJpg() {
    setSaving(true);
    try {
      const { default: html2canvas } = await import("html2canvas");
      const poster = posterRef.current;
      poster.style.display = "flex";
      await new Promise(r => setTimeout(r, 150));
      const canvas = await html2canvas(poster, {
        backgroundColor: "#0a0010",
        scale: 2,
        useCORS: true,
        logging: false,
        width: 405,
        height: 720,
      });
      poster.style.display = "none";
      const link = document.createElement("a");
      link.download = `opencore-results-${Date.now()}.jpg`;
      link.href = canvas.toDataURL("image/jpeg", 0.95);
      link.click();
    } catch (e) {
      console.error(e);
      alert("Export failed. Please try again.");
    }
    setSaving(false);
  }

  function getShareText() {
    return `I just completed the OpenCore Mental Health Assessment.\nResult: ${band.label} (${totalScore}/${MAX_SCORE})\nTake yours: ${SITE_URL}`;
  }

  function shareOnTwitter() {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareText())}`, "_blank");
  }

  function shareOnWhatsApp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(getShareText())}`, "_blank");
  }

  function shareOnFacebook() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}`, "_blank");
  }

  function copyLink() {
    navigator.clipboard.writeText(SITE_URL);
    alert("Link copied!");
  }

  const dateStr = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  const btnBase = {
    border: "none", borderRadius: 12, padding: "0.85rem 1.5rem",
    fontSize: "0.88rem", fontWeight: 700, cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: "0.5rem", fontFamily: "'Syne', sans-serif", transition: "all 0.2s ease",
  };

  const iconBtnBase = {
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12,
    padding: "0.85rem 1.1rem", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "rgba(255,255,255,0.05)", transition: "all 0.2s ease",
  };

  return (
    <div style={{ minHeight:"100vh", background:"#080b14", padding:"2rem 1rem 4rem", fontFamily:"'DM Sans', sans-serif", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"20%", left:"50%", transform:"translate(-50%,-50%)", width:800, height:800, borderRadius:"50%", background:`radial-gradient(circle, ${band.color}08 0%, transparent 70%)`, pointerEvents:"none" }} />

      <div style={{ maxWidth:720, margin:"0 auto" }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"2rem", paddingBottom:"1.5rem", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.6rem" }}>
            <img src="/logo.svg" alt="OpenCore" style={{ height:26 }}
              onError={e => { e.currentTarget.style.display="none"; e.currentTarget.nextSibling.style.display="flex"; }} />
            <div style={{ display:"none", alignItems:"center", gap:"0.5rem" }}>
              <div style={{ width:30, height:30, borderRadius:8, background:"linear-gradient(135deg, #6366f1, #8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15 }}>⬡</div>
              <span style={{ fontSize:"1.1rem", fontWeight:700, color:"#fff", fontFamily:"'Syne', sans-serif" }}>OpenCore</span>
            </div>
          </div>
          <button onClick={onRetake}
            style={{ ...btnBase, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:"#94a3b8", padding:"0.5rem 1rem", fontSize:"0.82rem" }}
            onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.1)"}
            onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,0.06)"}>
            <RetakeIcon /> Retake
          </button>
        </div>

        {/* Result card */}
        <div style={{ background:"linear-gradient(135deg, #0d1117 0%, #0f172a 100%)", borderRadius:24, padding:"2.5rem", border:"1px solid rgba(255,255,255,0.07)", marginBottom:"1.5rem", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-100, right:-100, width:300, height:300, borderRadius:"50%", background:`radial-gradient(circle, ${band.color}12 0%, transparent 70%)`, pointerEvents:"none" }} />

          {/* Score hero */}
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", marginBottom:"2.5rem", textAlign:"center" }}>
            <div style={{ fontSize:"0.72rem", color:"#475569", textTransform:"uppercase", letterSpacing:"0.15em", marginBottom:"1rem" }}>Your Result</div>
            <div style={{ position:"relative", marginBottom:"1.5rem" }}>
              <svg width="160" height="160" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="68" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                <circle cx="80" cy="80" r="68" fill="none" stroke={band.color} strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 68}`}
                  strokeDashoffset={`${2 * Math.PI * 68 * (1 - pct / 100)}`}
                  strokeLinecap="round"
                  transform="rotate(-90 80 80)"
                  style={{ transition:"stroke-dashoffset 1.5s ease", filter:`drop-shadow(0 0 8px ${band.color}60)` }} />
              </svg>
              <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", textAlign:"center" }}>
                <div style={{ fontSize:"2.5rem", fontWeight:800, color:"#fff", fontFamily:"'Syne', sans-serif", lineHeight:1 }}>{totalScore}</div>
                <div style={{ fontSize:"0.72rem", color:"#475569" }}>out of {MAX_SCORE}</div>
              </div>
            </div>
            <h2 style={{ fontSize:"clamp(1.6rem, 5vw, 2.75rem)", color:band.color, margin:"0 0 0.75rem", fontFamily:"'Syne', sans-serif", letterSpacing:"-0.03em", fontWeight:900, lineHeight:1, textAlign:"center" }}>{band.label}</h2>
            <p style={{ color:"#94a3b8", fontSize:"1rem", maxWidth:480, lineHeight:1.6, margin:0 }}>{band.description}</p>
          </div>

          {/* Advice box */}
          <div style={{ background:`${band.color}10`, border:`1px solid ${band.color}25`, borderRadius:14, padding:"1.25rem 1.5rem", marginBottom:"2rem" }}>
            <p style={{ color:band.color, fontSize:"0.9rem", margin:0, lineHeight:1.6 }}>💡 {band.advice}</p>
          </div>

          {/* ── Radar Chart ── */}
          <RadarChart sectionScores={sectionScores} />

          {/* Section Breakdown */}
          <div>
            <div style={{ fontSize:"0.72rem", color:"#475569", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:"1.25rem" }}>Section Breakdown</div>
            <div style={{ display:"grid", gap:"0.875rem" }}>
              {sectionScores.map(sec => (
                <div key={sec.id}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.35rem" }}>
                    <span style={{ fontSize:"0.85rem", color:"#94a3b8", display:"flex", alignItems:"center", gap:"0.4rem" }}>
                      <span>{sec.emoji}</span>{sec.title}
                    </span>
                    <span style={{ fontSize:"0.8rem", color:"#64748b" }}>{sec.score}/{sec.maxSec}</span>
                  </div>
                  <div style={{ height:6, background:"rgba(255,255,255,0.06)", borderRadius:4, overflow:"hidden" }}>
                    <div style={{ height:"100%", width:`${sec.pct}%`, background:`linear-gradient(90deg, ${sec.color}90, ${sec.color})`, borderRadius:4, transition:"width 1.5s ease" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop:"2rem", paddingTop:"1.5rem", borderTop:"1px solid rgba(255,255,255,0.06)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:"0.72rem", color:"#334155" }}>tryopencore.vercel.app</span>
            <span style={{ fontSize:"0.72rem", color:"#334155" }}>Not a clinical diagnosis</span>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"0.75rem", marginBottom:"1.5rem", flexWrap:"wrap" }}>
          <button onClick={saveAsJpg} disabled={saving}
            style={{ ...btnBase, background:"linear-gradient(135deg, #6366f1, #8b5cf6)", color:"#fff", opacity: saving ? 0.7 : 1, boxShadow:"0 4px 20px rgba(99,102,241,0.35)" }}
            onMouseEnter={e => { if (!saving) { e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(99,102,241,0.5)"; }}}
            onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 20px rgba(99,102,241,0.35)"; }}>
            <DownloadIcon />
            {saving ? "Saving…" : "Download"}
          </button>

          <button onClick={copyLink}
            style={{ ...btnBase, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:"#94a3b8" }}
            onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.1)"; e.currentTarget.style.color="#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.color="#94a3b8"; }}>
            <CopyIcon />
            Copy Link
          </button>

          <div style={{ width:1, height:36, background:"rgba(255,255,255,0.08)" }} />

          <button onClick={shareOnTwitter} title="Share on X"
            style={{ ...iconBtnBase, color:"#1d9bf0", borderColor:"rgba(29,155,240,0.25)", background:"rgba(29,155,240,0.08)" }}
            onMouseEnter={e => { e.currentTarget.style.background="rgba(29,155,240,0.18)"; e.currentTarget.style.transform="translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background="rgba(29,155,240,0.08)"; e.currentTarget.style.transform="translateY(0)"; }}>
            <XIcon />
          </button>

          <button onClick={shareOnWhatsApp} title="Share on WhatsApp"
            style={{ ...iconBtnBase, color:"#25d366", borderColor:"rgba(37,211,102,0.25)", background:"rgba(37,211,102,0.08)" }}
            onMouseEnter={e => { e.currentTarget.style.background="rgba(37,211,102,0.18)"; e.currentTarget.style.transform="translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background="rgba(37,211,102,0.08)"; e.currentTarget.style.transform="translateY(0)"; }}>
            <WhatsAppIcon />
          </button>

          <button onClick={shareOnFacebook} title="Share on Facebook"
            style={{ ...iconBtnBase, color:"#1877f2", borderColor:"rgba(24,119,242,0.25)", background:"rgba(24,119,242,0.08)" }}
            onMouseEnter={e => { e.currentTarget.style.background="rgba(24,119,242,0.18)"; e.currentTarget.style.transform="translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background="rgba(24,119,242,0.08)"; e.currentTarget.style.transform="translateY(0)"; }}>
            <FacebookIcon />
          </button>
        </div>

        {/* Disclaimer */}
        <div style={{ background:"rgba(248,113,113,0.06)", border:"1px solid rgba(248,113,113,0.15)", borderRadius:12, padding:"1rem 1.25rem", marginBottom:"2rem" }}>
          <p style={{ color:"#94a3b8", fontSize:"0.8rem", margin:0, lineHeight:1.6 }}>
            <strong style={{ color:"#f87171" }}>⚠️ Disclaimer:</strong> This assessment is for self-awareness purposes only and is <strong>not a clinical diagnosis.</strong> If you are in crisis or having thoughts of self-harm, please contact a mental health helpline or a medical professional immediately.
          </p>
        </div>

        {/* Bangladesh Crisis Resources */}
        <div>
          <div style={{ fontSize:"0.72rem", color:"#475569", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:"1rem" }}>🇧🇩 Crisis Resources (Bangladesh)</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:"0.75rem" }}>
            {BD_RESOURCES.map(r => (
              <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer"
                style={{ display:"flex", flexDirection:"column", gap:"0.25rem", padding:"1rem 1.1rem", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:12, textDecoration:"none", transition:"all 0.2s" }}
                onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.12)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"; }}>
                <span style={{ fontSize:"0.9rem", fontWeight:600, color:"#f1f5f9" }}>{r.name}</span>
                <span style={{ fontSize:"0.75rem", color:"#64748b" }}>{r.desc}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop:"2.5rem", textAlign:"center" }}>
          <p style={{ fontSize:"0.74rem", color:"#334155", margin:0 }}>
            Made with 💜 by{" "}
            <a href="https://arniloy.framer.website" target="_blank" rel="noopener noreferrer"
              style={{ color:"#334155", textDecoration:"none" }}
              onMouseEnter={e=>e.currentTarget.style.color="#64748b"}
              onMouseLeave={e=>e.currentTarget.style.color="#334155"}>
              Arifin Rahman Niloy
            </a>
          </p>
        </div>
      </div>

      {/* 9:16 Story Poster */}
      <div ref={posterRef} style={{
        display: "none",
        position: "fixed",
        top: 0, left: 0,
        width: 405,
        height: 720,
        zIndex: -1,
        flexDirection: "column",
        background: "linear-gradient(160deg, #0a0010 0%, #0d0520 50%, #0a0010 100%)",
        padding: "36px 32px",
        fontFamily: "'DM Sans', sans-serif",
        overflow: "hidden",
        boxSizing: "border-box",
      }}>
        <div style={{ position:"absolute", top:"20%", left:"50%", transform:"translate(-50%,-50%)", width:320, height:320, borderRadius:"50%", background:`radial-gradient(circle, ${band.color}18 0%, transparent 70%)`, pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"10%", right:"-10%", width:250, height:250, borderRadius:"50%", background:"radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", pointerEvents:"none" }} />

        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:28, position:"relative", zIndex:1 }}>
          <span style={{ fontSize:16, fontWeight:700, color:"#fff", fontFamily:"'Syne', sans-serif", letterSpacing:"-0.02em" }}>OpenCore</span>
          <span style={{ fontSize:11, color:"#475569" }}>{dateStr}</span>
        </div>

        {/* Poster score ring */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", marginBottom:22, position:"relative", zIndex:1 }}>
          <div style={{ position:"relative", marginBottom:16 }}>
            <svg width="140" height="140" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="58" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="9" />
              <circle cx="70" cy="70" r="58" fill="none" stroke={band.color} strokeWidth="9"
                strokeDasharray={`${2 * Math.PI * 58}`}
                strokeDashoffset={`${2 * Math.PI * 58 * (1 - pct / 100)}`}
                strokeLinecap="round"
                transform="rotate(-90 70 70)"
                style={{ filter:`drop-shadow(0 0 6px ${band.color}80)` }} />
            </svg>
            <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", textAlign:"center" }}>
              <div style={{ fontSize:34, fontWeight:800, color:"#fff", lineHeight:1, fontFamily:"'Syne', sans-serif" }}>{totalScore}</div>
              <div style={{ fontSize:11, color:"#475569" }}>/ {MAX_SCORE}</div>
            </div>
          </div>
          <div style={{ fontSize:10, color:"#475569", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:8 }}>Mental Wellbeing Score</div>
          <div style={{ fontSize:26, fontWeight:800, color:band.color, letterSpacing:"-0.02em", lineHeight:1, marginBottom:8, fontFamily:"'Syne', sans-serif", textAlign:"center" }}>{band.label}</div>
          <div style={{ fontSize:12, color:"#94a3b8", textAlign:"center", lineHeight:1.5, maxWidth:280 }}>{band.description}</div>
        </div>

        {/* Poster section bars */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", gap:9, position:"relative", zIndex:1 }}>
          <div style={{ fontSize:9, color:"#334155", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:4 }}>Section Breakdown</div>
          {sectionScores.map(sec => (
            <div key={sec.id} style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontSize:11, width:16, textAlign:"center", flexShrink:0 }}>{sec.emoji}</span>
              <span style={{ fontSize:8.5, color:"#64748b", width:110, flexShrink:0, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", fontFamily:"'DM Sans', sans-serif" }}>{sec.title}</span>
              <div style={{ flex:1, height:5, background:"rgba(255,255,255,0.07)", borderRadius:3, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${sec.pct}%`, background:sec.color, borderRadius:3 }} />
              </div>
              <span style={{ fontSize:10, color:sec.color, width:28, textAlign:"right", fontWeight:600, flexShrink:0 }}>{sec.pct}%</span>
            </div>
          ))}
        </div>

        {/* Poster footer */}
        <div style={{ marginTop:20, paddingTop:14, borderTop:"1px solid rgba(255,255,255,0.07)", display:"flex", justifyContent:"space-between", alignItems:"center", position:"relative", zIndex:1 }}>
          <span style={{ fontSize:9, color:"#334155" }}>tryopencore.vercel.app</span>
          <span style={{ fontSize:9, color:"#334155" }}>Not a clinical diagnosis</span>
        </div>
      </div>
    </div>
  );
}

// ── Icons ──

function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
    </svg>
  );
}

function RetakeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/>
      <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.26 5.633 5.905-5.633zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}