import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { sections, getBand, getSectionScore, getTotalScore } from '../lib/questions';
import styles from '../styles/Results.module.css';

export default function Results() {
  const [answers, setAnswers] = useState(null);
  const [saving, setSaving] = useState(false);
  const shareCardRef = useRef(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('mindcheck-answers');
    if (stored) {
      setAnswers(JSON.parse(stored));
    }
  }, []);

  if (!answers) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Loading your results...</p>
        <Link href="/assessment" style={{ color: 'var(--accent)', marginTop: 16, fontSize: '0.9rem' }}>
          Take the assessment first →
        </Link>
      </div>
    );
  }

  const total = getTotalScore(answers);
  const band = getBand(total);
  const maxScore = 168;
  const percent = Math.round((total / maxScore) * 100);

  const sectionScores = sections.map((s) => {
    const score = getSectionScore(answers, s.id);
    const maxS = s.questions.length * 3;
    return {
      ...s,
      score,
      max: maxS,
      pct: Math.round((score / maxS) * 100),
    };
  });

  async function handleSaveImage() {
    setSaving(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(shareCardRef.current, {
        backgroundColor: '#0a0a0f',
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const link = document.createElement('a');
      link.download = 'opencore-mindcheck-results.jpg';
      link.href = canvas.toDataURL('image/jpeg', 0.95);
      link.click();
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  }

  function handleShare(platform) {
    const text = `I just completed the OpenCore MindCheck mental health assessment. My result: ${band.label} (${total}/${maxScore}). Take the free assessment at`;
    const url = encodeURIComponent(window.location.origin);
    const encoded = encodeURIComponent(text);
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encoded}&url=${url}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(`${text} ${window.location.origin}`);
      alert('Link copied to clipboard!');
    }
  }

  return (
    <>
      <Head>
        <title>Your MindCheck Results — OpenCore</title>
      </Head>
      <div className={styles.page}>
        <div
          className={styles.ambientGlow}
          style={{ background: `radial-gradient(circle at 50% 20%, ${band.color}20 0%, transparent 60%)` }}
        />

        <div className={styles.container}>
          {/* Share card (also what gets saved as image) */}
          <div className={styles.shareCard} ref={shareCardRef}>
            <div className={styles.shareCardHeader}>
              <span className={styles.shareCardLogo}>◈ OpenCore MindCheck</span>
              <span className={styles.shareCardDate}>{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            </div>

            <div className={styles.bandDisplay}>
              <div className={styles.bandEmoji}>{band.emoji}</div>
              <div>
                <div className={styles.bandLabel} style={{ color: band.color }}>{band.label}</div>
                <div className={styles.bandScore}>{total} / {maxScore} points ({percent}%)</div>
              </div>
            </div>

            <p className={styles.bandDesc}>{band.description}</p>

            {/* Section bar chart */}
            <div className={styles.sectionBars}>
              {sectionScores.map((s) => (
                <div key={s.id} className={styles.sectionBar}>
                  <div className={styles.sectionBarLabel}>
                    <span>{s.emoji} {s.title}</span>
                    <span className={styles.sectionBarScore} style={{ color: s.color }}>
                      {s.score}/{s.max}
                    </span>
                  </div>
                  <div className={styles.sectionBarTrack}>
                    <div
                      className={styles.sectionBarFill}
                      style={{ width: `${s.pct}%`, background: s.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.shareCardFooter}>
              opencore-mindcheck.vercel.app · Free & Open Source
            </div>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <button className={styles.actionBtn} onClick={handleSaveImage} disabled={saving}>
              {saving ? (
                <span className={styles.spinner} />
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
              )}
              Save as JPG
            </button>

            <button className={styles.actionBtn} onClick={() => handleShare('twitter')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Share on X
            </button>

            <button className={styles.actionBtn} onClick={() => handleShare('linkedin')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Share on LinkedIn
            </button>

            <button className={styles.actionBtn} onClick={() => handleShare('copy')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
              Copy Link
            </button>
          </div>

          {/* Disclaimer */}
          <div className={styles.disclaimer}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
            </svg>
            <p>
              This assessment is for self-awareness only and is <strong>not a clinical diagnosis</strong>.
              If you are in crisis or experiencing thoughts of self-harm, please contact a mental health helpline
              or medical professional immediately.
            </p>
          </div>

          {/* Retake */}
          <div className={styles.retake}>
            <Link href="/assessment" className={styles.retakeBtn}>
              Retake Assessment
            </Link>
            <Link href="/" className={styles.homeLink}>
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
