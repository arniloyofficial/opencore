import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getAllQuestions, ANSWERS, SECTIONS } from '../data/questions';
import styles from '../styles/Assessment.module.css';

const ALL_QUESTIONS = getAllQuestions();
const TOTAL = ALL_QUESTIONS.length;

export default function Assessment() {
  const router = useRouter();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [animDir, setAnimDir] = useState('right');
  const [animKey, setAnimKey] = useState(0);
  const [selected, setSelected] = useState(null);
  const [transitioning, setTransitioning] = useState(false);

  const question = ALL_QUESTIONS[currentIdx];
  const progress = (currentIdx / TOTAL) * 100;
  const currentSection = SECTIONS.find((s) => s.id === question.sectionId);

  // Pre-populate selected if answer already exists
  useEffect(() => {
    setSelected(answers[question.id] ?? null);
  }, [currentIdx, answers, question.id]);

  const goNext = useCallback(() => {
    if (selected === null) return;
    const newAnswers = { ...answers, [question.id]: selected };
    setAnswers(newAnswers);

    if (currentIdx === TOTAL - 1) {
      // Done — go to results
      const encoded = btoa(JSON.stringify(newAnswers));
      router.push(`/results?data=${encoded}`);
      return;
    }

    setTransitioning(true);
    setAnimDir('right');
    setTimeout(() => {
      setCurrentIdx((i) => i + 1);
      setAnimKey((k) => k + 1);
      setTransitioning(false);
    }, 180);
  }, [selected, answers, question.id, currentIdx, router]);

  const goPrev = useCallback(() => {
    if (currentIdx === 0) return;
    setTransitioning(true);
    setAnimDir('left');
    setTimeout(() => {
      setCurrentIdx((i) => i - 1);
      setAnimKey((k) => k + 1);
      setTransitioning(false);
    }, 180);
  }, [currentIdx]);

  // Keyboard nav
  useEffect(() => {
    function handleKey(e) {
      if (e.key === '1') setSelected(0);
      if (e.key === '2') setSelected(1);
      if (e.key === '3') setSelected(2);
      if (e.key === '4') setSelected(3);
      if (e.key === 'Enter' && selected !== null) goNext();
      if (e.key === 'ArrowLeft') goPrev();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selected, goNext, goPrev]);

  const sectionProgress = getSectionProgress(currentIdx);

  return (
    <>
      <Head>
        <title>OpenCore — Assessment ({currentIdx + 1}/{TOTAL})</title>
      </Head>

      <div className={styles.page}>
        <div className="noise" />
        <div className="mesh-bg" />

        {/* Top bar */}
        <div className={styles.topBar}>
          <button className={styles.backHome} onClick={() => router.push('/')}>
            <ChevronLeftIcon />
            OpenCore
          </button>

          <div className={styles.questionCount}>
            {currentIdx + 1} <span>/ {TOTAL}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, #7c6fcd, ${currentSection?.color || '#6366f1'})`,
            }}
          />
        </div>

        {/* Section indicators */}
        <div className={styles.sectionRow}>
          {SECTIONS.map((s, i) => {
            const sIdx = sectionProgress.findIndex((sp) => sp.sectionId === s.id);
            const sp = sectionProgress[sIdx];
            return (
              <div
                key={s.id}
                className={`${styles.sectionChip} ${sp?.active ? styles.sectionActive : ''} ${sp?.done ? styles.sectionDone : ''}`}
                style={sp?.active || sp?.done ? { '--col': s.color } : {}}
                title={s.title}
              >
                <span className={styles.sectionEmoji}>{s.emoji}</span>
                <span className={styles.sectionChipLabel}>{s.title}</span>
              </div>
            );
          })}
        </div>

        {/* Question card */}
        <main className={styles.main}>
          <div
            key={animKey}
            className={`${styles.card} ${animDir === 'right' ? styles.slideFromRight : styles.slideFromLeft} ${transitioning ? styles.exiting : ''}`}
          >
            {/* Section label */}
            <div className={styles.sectionLabel} style={{ color: currentSection?.color }}>
              <span>{currentSection?.emoji}</span>
              <span>Section {question.sectionId} · {question.sectionTitle}</span>
            </div>

            {/* Question */}
            <h2 className={styles.questionText}>
              {question.text}
            </h2>

            <p className={styles.timeframe}>In the past 30 days…</p>

            {/* Answer options */}
            <div className={styles.answers}>
              {ANSWERS.map((ans, i) => (
                <button
                  key={ans.score}
                  className={`${styles.answerBtn} ${selected === ans.score ? styles.answerSelected : ''}`}
                  style={selected === ans.score ? { '--sel-color': currentSection?.color } : {}}
                  onClick={() => setSelected(ans.score)}
                >
                  <div className={styles.answerInner}>
                    <div className={styles.answerNum}>{i + 1}</div>
                    <div className={styles.answerContent}>
                      <span className={styles.answerLabel}>{ans.label}</span>
                      <span className={styles.answerDesc}>{ans.description}</span>
                    </div>
                    <div className={styles.answerCheck}>
                      {selected === ans.score && <CheckIcon />}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className={styles.navRow}>
              <button
                className={styles.prevBtn}
                onClick={goPrev}
                disabled={currentIdx === 0}
              >
                <ChevronLeftIcon />
                Previous
              </button>

              <button
                className={`${styles.nextBtn} ${selected === null ? styles.nextDisabled : ''}`}
                onClick={goNext}
                disabled={selected === null}
                style={selected !== null ? { background: `linear-gradient(135deg, #7c6fcd, ${currentSection?.color || '#6366f1'})` } : {}}
              >
                {currentIdx === TOTAL - 1 ? 'View Results' : 'Continue'}
                <ChevronRightIcon />
              </button>
            </div>

            <p className={styles.keyHint}>
              Press <kbd>1–4</kbd> to select · <kbd>Enter</kbd> to continue
            </p>
          </div>
        </main>
      </div>
    </>
  );
}

function getSectionProgress(currentIdx) {
  return SECTIONS.map((section) => {
    const allQ = getAllQuestions();
    const sectionQs = allQ.filter((q) => q.sectionId === section.id);
    const firstIdx = sectionQs[0]?.index;
    const lastIdx = sectionQs[sectionQs.length - 1]?.index;
    return {
      sectionId: section.id,
      active: currentIdx >= firstIdx && currentIdx <= lastIdx,
      done: currentIdx > lastIdx,
    };
  });
}

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
