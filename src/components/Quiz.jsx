import { useState, useEffect, useRef } from "react";
import { ALL_QUESTIONS, ANSWER_OPTIONS, SECTIONS } from "../data/questions";
import { SectionIcon } from "./SectionIcons";

// ─── Section Transition Screen ───────────────────────────────────────────────
function SectionTransition({ completedSection, nextSection, onContinue }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after mount
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "#080b14",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif",
      opacity: visible ? 1 : 0,
      transform: visible ? "scale(1)" : "scale(0.96)",
      transition: "opacity 0.4s ease, transform 0.4s ease",
    }}>

      {/* Background glow for completed section */}
      <div style={{
        position: "absolute", top: "40%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500, height: 500, borderRadius: "50%",
        background: `radial-gradient(circle, ${completedSection.color}12 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", textAlign: "center", maxWidth: 480, padding: "0 2rem" }}>

        {/* Completed section block */}
        <div style={{
          display: "inline-flex", flexDirection: "column", alignItems: "center",
          gap: "1.25rem", marginBottom: "2.5rem",
        }}>
          {/* Icon ring */}
          <div style={{
            position: "relative",
            width: 90, height: 90, borderRadius: "50%",
            background: `${completedSection.color}15`,
            border: `2px solid ${completedSection.color}40`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <SectionIcon id={completedSection.icon} size={36} color={completedSection.color} />
            {/* Completion checkmark badge */}
            <div style={{
              position: "absolute", bottom: -4, right: -4,
              width: 28, height: 28, borderRadius: "50%",
              background: "#22c55e",
              border: "2px solid #080b14",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>

          {/* Section name + "Complete" label */}
          <div>
            <p style={{ margin: 0, fontSize: "0.72rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.4rem" }}>
              Section Complete
            </p>
            <h2 style={{
              margin: 0, fontSize: "clamp(1.5rem, 4vw, 2rem)",
              fontFamily: "'Syne', sans-serif", fontWeight: 700,
              color: completedSection.color, letterSpacing: "-0.02em",
            }}>
              {completedSection.title}
            </h2>
          </div>
        </div>

        {/* Divider with arrow */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", justifyContent: "center", marginBottom: "2.5rem" }}>
          <div style={{ height: 1, width: 48, background: "rgba(255,255,255,0.07)" }} />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
          <div style={{ height: 1, width: 48, background: "rgba(255,255,255,0.07)" }} />
        </div>

        {/* Up next block */}
        {nextSection && (
          <div style={{ marginBottom: "2.75rem" }}>
            <p style={{ margin: "0 0 0.85rem", fontSize: "0.72rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.12em" }}>
              Up Next
            </p>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.65rem",
              background: `${nextSection.color}12`,
              border: `1px solid ${nextSection.color}30`,
              borderRadius: 14, padding: "0.65rem 1.25rem",
            }}>
              <SectionIcon id={nextSection.icon} size={18} color={nextSection.color} />
              <span style={{ fontSize: "1rem", fontWeight: 600, color: nextSection.color, fontFamily: "'Syne', sans-serif" }}>
                {nextSection.title}
              </span>
            </div>
          </div>
        )}

        {/* Continue button */}
        <button
          onClick={onContinue}
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.6rem",
            padding: "0.9rem 2.5rem",
            background: nextSection
              ? `linear-gradient(135deg, #6366f1, ${nextSection.color})`
              : "linear-gradient(135deg, #6366f1, #8b5cf6)",
            border: "none", borderRadius: 14,
            color: "#fff", fontSize: "0.95rem", fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            cursor: "pointer",
            boxShadow: `0 8px 28px ${nextSection ? nextSection.color : "#6366f1"}35`,
            transition: "all 0.2s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
        >
          {nextSection ? `Start: ${nextSection.title}` : "View Results"}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Keyboard hint */}
        <p style={{ marginTop: "1.25rem", fontSize: "0.72rem", color: "#334155" }}>
          Press{" "}
          <kbd style={{ padding: "1px 5px", border: "1px solid #334155", borderRadius: 4, fontSize: "0.68rem", fontFamily: "monospace" }}>
            Enter
          </kbd>
          {" "}to continue
        </p>
      </div>
    </div>
  );
}

// ─── Helper: is `idx` the last question of its section? ──────────────────────
function isLastInSection(idx) {
  const q = ALL_QUESTIONS[idx];
  const next = ALL_QUESTIONS[idx + 1];
  return next !== undefined && next.section !== q.section;
}

// ─── Main Quiz Component ──────────────────────────────────────────────────────
export default function Quiz({ onComplete, onBack }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState(1);
  const [selected, setSelected] = useState(null);
  const [transition, setTransition] = useState(null); // { completedSection, nextSection } | null
  const autoAdvanceTimer = useRef(null);

  const question = ALL_QUESTIONS[currentIdx];
  const total = ALL_QUESTIONS.length;
  const progress = (currentIdx / total) * 100;
  const currentSection = SECTIONS.find(s => s.id === question.section);

  useEffect(() => {
    setSelected(answers[question.id] ?? null);
  }, [currentIdx, question.id, answers]);

  function handleNext(scoreOverride) {
    const scoreToUse = scoreOverride !== undefined ? scoreOverride : selected;
    if (scoreToUse === null) return;
    const newAnswers = { ...answers, [question.id]: scoreToUse };
    setAnswers(newAnswers);

    if (currentIdx === total - 1) {
      onComplete(newAnswers);
      return;
    }

    // Show section transition if this was the last question of the current section
    if (isLastInSection(currentIdx)) {
      const completedSection = currentSection;
      const nextSectionId = ALL_QUESTIONS[currentIdx + 1].section;
      const nextSection = SECTIONS.find(s => s.id === nextSectionId);
      setTransition({ completedSection, nextSection, pendingIdx: currentIdx + 1 });
      return;
    }

    setDirection(1);
    setAnimating(true);
    setTimeout(() => { setCurrentIdx(i => i + 1); setAnimating(false); }, 300);
  }

  function handleTransitionContinue() {
    if (!transition) return;
    const nextIdx = transition.pendingIdx;
    setTransition(null);
    setDirection(1);
    setAnimating(true);
    setTimeout(() => { setCurrentIdx(nextIdx); setAnimating(false); }, 300);
  }

  function handleSelect(score) {
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    setSelected(score);
    autoAdvanceTimer.current = setTimeout(() => { handleNext(score); }, 400);
  }

  useEffect(() => {
    return () => { if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current); };
  }, []);

  function handleBack() {
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    if (currentIdx === 0) { onBack(); return; }
    setDirection(-1);
    setAnimating(true);
    setTimeout(() => { setCurrentIdx(i => i - 1); setAnimating(false); }, 300);
  }

  useEffect(() => {
    function handleKey(e) {
      // If transition screen is visible, only listen for Enter
      if (transition) {
        if (e.key === "Enter") handleTransitionContinue();
        return;
      }
      if (e.key === "1") handleSelect(0);
      else if (e.key === "2") handleSelect(1);
      else if (e.key === "3") handleSelect(2);
      else if (e.key === "4") handleSelect(3);
      else if (e.key === "Enter") handleNext();
      else if (e.key === "ArrowLeft") handleBack();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected, currentIdx, transition]);

  const sectionQuestions = ALL_QUESTIONS.filter(q => q.section === question.section);
  const questionNumInSection = sectionQuestions.findIndex(q => q.id === question.id) + 1;

  return (
    <div style={{ minHeight: "100vh", background: "#080b14", display: "flex", flexDirection: "column", fontFamily: "'DM Sans', sans-serif", position: "relative", overflow: "hidden" }}>

      {/* Section transition overlay */}
      {transition && (
        <SectionTransition
          completedSection={transition.completedSection}
          nextSection={transition.nextSection}
          onContinue={handleTransitionContinue}
        />
      )}

      {/* Background glow */}
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${currentSection.color}10 0%, transparent 70%)`, transition: "background 0.8s ease", pointerEvents: "none" }} />

      {/* Top bar */}
      <div style={{ padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", borderBottom: "1px solid rgba(255,255,255,0.05)", backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 10, background: "rgba(8,11,20,0.8)" }}>
        <button onClick={handleBack}
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "0.5rem 1rem", color: "#94a3b8", cursor: "pointer", fontSize: "0.85rem", transition: "all 0.2s", fontFamily: "'DM Sans', sans-serif" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}>
          ← Back
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem", alignItems: "center" }}>
            <span style={{ fontSize: "0.75rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em" }}>Progress</span>
            <span style={{ fontSize: "0.85rem", color: "#64748b" }}>{currentIdx + 1} / {total}</span>
          </div>
          <div style={{ height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, #6366f1, ${currentSection.color})`, borderRadius: 4, transition: "width 0.5s ease" }} />
          </div>
        </div>
      </div>

      {/* Question area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2.5rem 1.5rem 1.5rem" }}>
        <div style={{
          opacity: animating ? 0 : 1,
          transform: animating ? `translateX(${direction * 30}px)` : "translateX(0)",
          transition: "all 0.3s ease",
          width: "100%",
          maxWidth: 660,
        }}>

          {/* Section badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.75rem" }}>
            <div style={{ background: `${currentSection.color}20`, border: `1px solid ${currentSection.color}40`, borderRadius: 20, padding: "0.35rem 1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <SectionIcon id={currentSection.icon} size={15} color={currentSection.color} />
              <span style={{ fontSize: "0.8rem", color: currentSection.color, fontWeight: 600 }}>{currentSection.title}</span>
              <span style={{ fontSize: "0.75rem", color: `${currentSection.color}80` }}>· {questionNumInSection}/{sectionQuestions.length}</span>
            </div>
          </div>

          {/* Question text */}
          <h2 style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)", color: "#f1f5f9", lineHeight: 1.35, margin: "0 0 0.75rem", fontFamily: "'Syne', sans-serif", letterSpacing: "-0.02em", fontWeight: 700 }}>
            {question.text}
          </h2>

          <p style={{ fontSize: "0.85rem", color: "#475569", margin: "0 0 2rem", fontStyle: "italic" }}>
            In the past 30 days…
          </p>

          {/* Answer options */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
            {ANSWER_OPTIONS.map((opt, i) => {
              const isSelected = selected === opt.score;
              return (
                <button key={opt.label} onClick={() => handleSelect(opt.score)} style={{
                  background: isSelected ? `${currentSection.color}18` : "rgba(255,255,255,0.03)",
                  border: `1.5px solid ${isSelected ? currentSection.color : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 14,
                  padding: "1rem 1.25rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  transition: "all 0.2s ease",
                  textAlign: "left",
                  transform: isSelected ? "scale(1.01)" : "translateX(0)",
                  boxShadow: isSelected ? `0 4px 24px ${currentSection.color}20` : "none",
                }}
                  onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.transform = "translateX(6px)"; } }}
                  onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateX(0)"; } }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: isSelected ? currentSection.color : "rgba(255,255,255,0.06)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.8rem", fontWeight: 700,
                    color: isSelected ? "#fff" : "#64748b",
                    transition: "all 0.2s",
                  }}>
                    {i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "1rem", fontWeight: 600, color: isSelected ? "#f1f5f9" : "#94a3b8", marginBottom: "0.15rem", fontFamily: "'Syne', sans-serif" }}>
                      {opt.label}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: isSelected ? "#94a3b8" : "#475569" }}>
                      {opt.description}
                    </div>
                  </div>
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                    border: `2px solid ${isSelected ? currentSection.color : "rgba(255,255,255,0.12)"}`,
                    background: isSelected ? currentSection.color : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s",
                  }}>
                    {isSelected && (
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <button onClick={handleBack} disabled={currentIdx === 0}
              style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.75rem 1.25rem", background: "transparent", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, color: currentIdx === 0 ? "#334155" : "#64748b", cursor: currentIdx === 0 ? "not-allowed" : "pointer", fontSize: "0.9rem", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s" }}
              onMouseEnter={e => { if (currentIdx !== 0) e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              Previous
            </button>

            <button onClick={() => handleNext()} disabled={selected === null}
              style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                padding: "0.85rem 2rem",
                background: selected !== null ? `linear-gradient(135deg, #6366f1, ${currentSection.color})` : "rgba(255,255,255,0.05)",
                border: "none", borderRadius: 12,
                color: selected !== null ? "#fff" : "#334155",
                cursor: selected !== null ? "pointer" : "not-allowed",
                fontSize: "0.95rem", fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
                boxShadow: selected !== null ? `0 8px 24px ${currentSection.color}35` : "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => { if (selected !== null) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = `0 12px 32px ${currentSection.color}50`; } }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = selected !== null ? `0 8px 24px ${currentSection.color}35` : "none"; }}>
              {currentIdx === total - 1 ? "View Results" : "Continue"}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>

          <p style={{ textAlign: "center", fontSize: "0.72rem", color: "#475569", margin: "0 0 0.4rem" }}>
            Press{" "}
            <kbd style={{ padding: "1px 5px", border: "1px solid #475569", borderRadius: 4, fontSize: "0.68rem", fontFamily: "monospace" }}>1–4</kbd>
            {" "}to select · auto-advances in 0.4s
          </p>
          <p style={{ textAlign: "center", fontSize: "0.72rem", color: "#475569", margin: 0 }}>
            All questions are based on your activities in the <strong style={{ fontWeight: 500, color: "#475569" }}>last 30 days</strong>
          </p>

        </div>
      </div>
    </div>
  );
}