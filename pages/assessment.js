import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getAllQuestions, answers, sections } from '../lib/questions';
import styles from '../styles/Assessment.module.css';

const allQuestions = getAllQuestions();
const TOTAL = allQuestions.length;

export default function Assessment() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState('forward');

  const q = allQuestions[current];
  const progress = (current / TOTAL) * 100;
  const isLast = current === TOTAL - 1;

  // Restore selection for current question
  useEffect(() => {
    const existing = userAnswers[q.key];
    setSelected(existing !== undefined ? existing : null);
  }, [current, q.key, userAnswers]);

  function handleSelect(score) {
    setSelected(score);
  }

  function handleNext() {
    if (selected === null) return;
    const newAnswers = { ...userAnswers, [q.key]: selected };
    setUserAnswers(newAnswers);

    if (isLast) {
      // Save to sessionStorage and go to results
      sessionStorage.setItem('mindcheck-answers', JSON.stringify(newAnswers));
      router.push('/results');
      return;
    }

    setDirection('forward');
    setAnimating(true);
    setTimeout(() => {
      setCurrent((c) => c + 1);
      setAnimating(false);
    }, 250);
  }

  function handleBack() {
    if (current === 0) {
      router.push('/');
      return;
    }
    setDirection('back');
    setAnimating(true);
    setTimeout(() => {
      setCurrent((c) => c - 1);
      setAnimating(false);
    }, 250);
  }

  function handleKeyDown(e) {
    if (e.key === '1') handleSelect(0);
    if (e.key === '2') handleSelect(1);
    if (e.key === '3') handleSelect(2);
    if (e.key === '4') handleSelect(3);
    if (e.key === 'Enter' && selected !== null) handleNext();
    if (e.key === 'ArrowLeft' || e.key === 'Backspace') handleBack();
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Section progress
  const currentSection = sections.find((s) => s.id === q.sectionId);
  const sectionQuestions = allQuestions.filter((x) => x.sectionId === q.sectionId);
  const sectionCurrent = sectionQuestions.findIndex((x) => x.key === q.key) + 1;

  return (
    <>
      <Head>
        <title>MindCheck — Question {current + 1} of {TOTAL}</title>
      </Head>
      <div className={styles.page}>
        {/* Ambient glow */}
        <div
          className={styles.ambientGlow}
          style={{ background: `radial-gradient(circle at 50% 30%, ${q.sectionColor}22 0%, transparent 60%)` }}
        />

        {/* Top bar */}
        <div className={styles.topBar}>
          <button className={styles.backBtn} onClick={handleBack}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {current === 0 ? 'Home' : 'Back'}
          </button>

          <div className={styles.progressInfo}>
            <span className={styles.progressText} style={{ color: q.sectionColor }}>
              {q.sectionEmoji} {q.sectionTitle}
            </span>
            <span className={styles.progressCount}>
              {current + 1} / {TOTAL}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, var(--accent), ${q.sectionColor})`,
            }}
          />
        </div>

        {/* Section pills */}
        <div className={styles.sectionDots}>
          {sections.map((s) => {
            const sqs = allQuestions.filter((x) => x.sectionId === s.id);
            const answered = sqs.filter((x) => userAnswers[x.key] !== undefined).length;
            const isActive = s.id === q.sectionId;
            return (
              <div
                key={s.id}
                className={`${styles.sectionDot} ${isActive ? styles.sectionDotActive : ''}`}
                style={{
                  background: isActive ? s.color : answered === sqs.length ? `${s.color}44` : 'var(--surface)',
                  borderColor: isActive ? s.color : answered > 0 ? `${s.color}55` : 'var(--border)',
                }}
                title={s.title}
              >
                {s.emoji}
              </div>
            );
          })}
        </div>

        {/* Question card */}
        <div className={`${styles.card} ${animating ? (direction === 'forward' ? styles.slideOut : styles.slideOutBack) : styles.slideIn}`}>
          <div className={styles.sectionLabel} style={{ color: q.sectionColor }}>
            <span>{q.sectionEmoji}</span>
            <span>{q.sectionTitle}</span>
            <span className={styles.sectionProgress}>{sectionCurrent}/{sectionQuestions.length}</span>
          </div>

          <p className={styles.questionText}>{q.question}</p>
          <p className={styles.timeframe}>Over the last 30 days</p>

          <div className={styles.options}>
            {answers.map((a) => (
              <button
                key={a.score}
                className={`${styles.option} ${selected === a.score ? styles.optionSelected : ''}`}
                onClick={() => handleSelect(a.score)}
                style={selected === a.score ? {
                  borderColor: q.sectionColor,
                  background: `${q.sectionColor}18`,
                  color: '#fff',
                } : {}}
              >
                <div className={styles.optionTop}>
                  <span className={styles.optionLabel}>{a.label}</span>
                  <span className={styles.optionScore}
                    style={selected === a.score ? { color: q.sectionColor } : {}}>
                    {a.score}pts
                  </span>
                </div>
                <span className={styles.optionDesc}>{a.desc}</span>
                {selected === a.score && (
                  <div className={styles.optionCheck} style={{ background: q.sectionColor }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>

          <button
            className={`${styles.nextBtn} ${selected !== null ? styles.nextBtnActive : ''}`}
            onClick={handleNext}
            disabled={selected === null}
            style={selected !== null ? { background: q.sectionColor } : {}}
          >
            {isLast ? 'View Results' : 'Next Question'}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          <p className={styles.keyHint}>
            Press <kbd>1</kbd>–<kbd>4</kbd> to select · <kbd>Enter</kbd> to continue
          </p>
        </div>
      </div>
    </>
  );
}
