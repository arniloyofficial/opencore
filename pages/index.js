import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>OpenCore MindCheck — Mental Health Assessment</title>
      </Head>
      <div className={styles.page}>
        {/* Background orbs */}
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.orb3} />

        <header className={styles.header}>
          <div className={styles.logo}>
            <span className={styles.logoMark}>◈</span>
            <span>OpenCore</span>
          </div>
          <a
            href="https://github.com/opencore-mindcheck/opencore"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubBtn}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
        </header>

        <main className={styles.main}>
          <div className={styles.badge}>Free & Open Source</div>

          <h1 className={styles.title}>
            Know your
            <br />
            <span className={styles.titleAccent}>mind.</span>
          </h1>

          <p className={styles.subtitle}>
            A 56-question self-assessment across 8 dimensions of mental wellbeing —
            depression, anxiety, sleep, focus, and more. Takes about 8 minutes.
            No account required. Your data never leaves your device.
          </p>

          <div className={styles.dimensions}>
            {[
              { emoji: '🧠', label: 'Depression' },
              { emoji: '😰', label: 'Anxiety' },
              { emoji: '😴', label: 'Sleep & Energy' },
              { emoji: '🤝', label: 'Social Connection' },
              { emoji: '🧩', label: 'Focus & Cognition' },
              { emoji: '🌊', label: 'Emotional Regulation' },
              { emoji: '💆', label: 'Stress & Coping' },
              { emoji: '🌟', label: 'Self-Worth' },
            ].map((d) => (
              <div key={d.label} className={styles.dimensionChip}>
                <span>{d.emoji}</span>
                <span>{d.label}</span>
              </div>
            ))}
          </div>

          <Link href="/assessment" className={styles.startBtn}>
            Begin Assessment
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          <p className={styles.disclaimer}>
            ⚠️ This is a self-awareness tool, not a clinical diagnosis.
            If you're in crisis, please contact a mental health helpline immediately.
          </p>
        </main>

        <footer className={styles.footer}>
          <span>OpenCore MindCheck — Open Source under MIT License</span>
          <a
            href="https://github.com/opencore-mindcheck/opencore"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contribute on GitHub ↗
          </a>
        </footer>
      </div>
    </>
  );
}
