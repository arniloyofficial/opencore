import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Head>
        <title>OpenCore — Mental Health Assessment</title>
      </Head>

      <div className={styles.page}>
        <div className="noise" />
        <div className="mesh-bg" />

        <div className={styles.content}>
          {/* Header */}
          <header className={styles.header} style={{ animationDelay: '0ms' }}>
            <div className={styles.logoMark}>
              <span className={styles.logoIcon}>⬡</span>
              <span className={styles.logoText}>OpenCore</span>
            </div>
            <a
              href="https://github.com/opencore-app/opencore"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.githubLink}
            >
              <GithubIcon />
              Open Source
            </a>
          </header>

          {/* Hero */}
          <main className={styles.hero}>
            <div className={styles.badge} style={{ animationDelay: '100ms' }}>
              <span className={styles.badgeDot} />
              Free · Anonymous · No account needed
            </div>

            <h1 className={styles.title} style={{ animationDelay: '180ms' }}>
              Understand your
              <br />
              <span className={styles.titleAccent}>mental wellbeing</span>
            </h1>

            <p className={styles.subtitle} style={{ animationDelay: '260ms' }}>
              A comprehensive 56-question self-assessment across 8 dimensions of mental health.
              Takes about <strong>8–12 minutes</strong>. Your answers are never stored or shared.
            </p>

            <div className={styles.ctaRow} style={{ animationDelay: '340ms' }}>
              <button
                className={styles.startBtn}
                onClick={() => router.push('/assessment')}
              >
                <span>Start Assessment</span>
                <ArrowIcon />
              </button>
              <span className={styles.ctaNote}>56 questions · 8 sections</span>
            </div>

            {/* Dimension pills */}
            <div className={styles.dimensions} style={{ animationDelay: '420ms' }}>
              {DIMS.map((d, i) => (
                <div key={i} className={styles.dimPill} style={{ '--color': d.color, animationDelay: `${420 + i * 50}ms` }}>
                  <span>{d.emoji}</span>
                  <span>{d.label}</span>
                </div>
              ))}
            </div>
          </main>

          {/* Disclaimer */}
          <footer className={styles.footer} style={{ animationDelay: '700ms' }}>
            <WarningIcon />
            <span>
              This assessment is for <strong>self-awareness only</strong> and is not a clinical diagnosis.
              If you are in crisis or having thoughts of self-harm, please contact a mental health helpline immediately.
            </span>
          </footer>
        </div>
      </div>
    </>
  );
}

const DIMS = [
  { emoji: '🧠', label: 'Depression', color: '#6366f1' },
  { emoji: '😰', label: 'Anxiety', color: '#f59e0b' },
  { emoji: '😴', label: 'Sleep & Energy', color: '#8b5cf6' },
  { emoji: '🤝', label: 'Social', color: '#ec4899' },
  { emoji: '🧩', label: 'Focus', color: '#14b8a6' },
  { emoji: '🌊', label: 'Emotions', color: '#0ea5e9' },
  { emoji: '💆', label: 'Stress', color: '#f97316' },
  { emoji: '🌟', label: 'Self-Worth', color: '#84cc16' },
];

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
