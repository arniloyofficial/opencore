import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getAllQuestions, SECTIONS, getScoreBand } from '../data/questions';
import styles from '../styles/Results.module.css';

const ALL_QUESTIONS = getAllQuestions();

export default function Results() {
  const router = useRouter();
  const [answers, setAnswers] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const resultCardRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    if (router.query.data) {
      try {
        const decoded = JSON.parse(atob(router.query.data));
        setAnswers(decoded);
      } catch (e) {
        router.push('/');
      }
    }
  }, [router.query.data, router]);

  if (!mounted || !answers) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
      </div>
    );
  }

  // Calculate scores
  const totalScore = ALL_QUESTIONS.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
  const band = getScoreBand(totalScore);

  const sectionScores = SECTIONS.map((section) => {
    const sectionQs = ALL_QUESTIONS.filter((q) => q.sectionId === section.id);
    const score = sectionQs.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
    const maxScore = sectionQs.length * 3;
    const pct = Math.round((score / maxScore) * 100);
    return { ...section, score, maxScore, pct };
  });

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const { default: html2canvas } = await import('html2canvas');
      const canvas = await html2canvas(resultCardRef.current, {
        backgroundColor: '#0d0d14',
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const link = document.createElement('a');
      link.download = `opencore-results-${Date.now()}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.92);
      link.click();
    } catch (e) {
      console.error('Download failed:', e);
    }
    setDownloading(false);
  };

  const handleShare = async () => {
    const text = `I just completed the OpenCore Mental Health Assessment.\n\nMy result: ${band.label} (${totalScore}/168)\n\n${band.description}\n\nTake yours at opencore-app.vercel.app`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My OpenCore Results', text });
      } catch (e) {}
    } else {
      await navigator.clipboard.writeText(text);
      alert('Result text copied to clipboard!');
    }
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`I scored ${totalScore}/168 on the OpenCore Mental Health Assessment — ${band.label}.\n\nTake yours:`);
    const url = encodeURIComponent('https://opencore-app.vercel.app');
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(`I just completed the OpenCore Mental Health Assessment.\n\nResult: ${band.label} (${totalScore}/168)\n${band.description}\n\nTake yours: https://opencore-app.vercel.app`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent('https://opencore-app.vercel.app');
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  return (
    <>
      <Head>
        <title>OpenCore — Your Results</title>
      </Head>

      <div className={styles.page}>
        <div className="noise" />
        <div className="mesh-bg" />

        <div className={styles.container}>
          {/* Actions bar */}
          <div className={styles.actionsBar}>
            <button className={styles.retakeBtn} onClick={() => router.push('/assessment')}>
              <RefreshIcon />
              Retake
            </button>
            <div className={styles.shareGroup}>
              <button className={styles.actionBtn} onClick={shareOnTwitter} title="Share on X/Twitter">
                <XIcon />
              </button>
              <button className={styles.actionBtn} onClick={shareOnWhatsApp} title="Share on WhatsApp">
                <WhatsAppIcon />
              </button>
              <button className={styles.actionBtn} onClick={shareOnFacebook} title="Share on Facebook">
                <FacebookIcon />
              </button>
              <button className={styles.actionBtn} onClick={handleShare} title="Share / Copy">
                <ShareIcon />
              </button>
              <button
                className={`${styles.downloadBtn} ${downloading ? styles.btnLoading : ''}`}
                onClick={handleDownload}
                disabled={downloading}
              >
                <DownloadIcon />
                {downloading ? 'Saving…' : 'Save as JPG'}
              </button>
            </div>
          </div>

          {/* Result card (captured for download) */}
          <div ref={resultCardRef} className={styles.resultCard}>
            {/* Card header */}
            <div className={styles.cardHeader}>
              <div className={styles.logoSmall}>
                <span>⬡</span> OpenCore
              </div>
              <div className={styles.cardDate}>
                {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>

            {/* Score hero */}
            <div className={styles.scoreHero}>
              <div className={styles.scoreRing} style={{ '--band-color': band.color }}>
                <div className={styles.scoreCircle} style={{ borderColor: band.color }}>
                  <span className={styles.scoreNum}>{totalScore}</span>
                  <span className={styles.scoreMax}>/ 168</span>
                </div>
                <svg className={styles.ringProgress} viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                  <circle
                    cx="60" cy="60" r="54"
                    fill="none"
                    stroke={band.color}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 54}`}
                    strokeDashoffset={`${2 * Math.PI * 54 * (1 - totalScore / 168)}`}
                    transform="rotate(-90 60 60)"
                    style={{ transition: 'stroke-dashoffset 1.5s ease' }}
                  />
                </svg>
              </div>

              <div className={styles.bandInfo}>
                <div className={styles.bandIcon}>{band.icon}</div>
                <h1 className={styles.bandLabel} style={{ color: band.color }}>{band.label}</h1>
                <p className={styles.bandDesc}>{band.description}</p>
                <p className={styles.bandAdvice}>{band.advice}</p>
              </div>
            </div>

            {/* Section breakdown */}
            <div className={styles.breakdownTitle}>Section Breakdown</div>
            <div className={styles.breakdown}>
              {sectionScores.map((s, i) => (
                <div key={s.id} className={styles.sectionRow} style={{ animationDelay: `${i * 60}ms` }}>
                  <div className={styles.sectionMeta}>
                    <span className={styles.sectionEmoji}>{s.emoji}</span>
                    <span className={styles.sectionName}>{s.title}</span>
                    <span className={styles.sectionScore}>{s.score}<span>/{s.maxScore}</span></span>
                  </div>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{
                        width: `${s.pct}%`,
                        background: s.color,
                        animationDelay: `${300 + i * 80}ms`,
                      }}
                    />
                  </div>
                  <div className={styles.sectionPct} style={{ color: s.color }}>{s.pct}%</div>
                </div>
              ))}
            </div>

            {/* Footer disclaimer */}
            <div className={styles.cardFooter}>
              ⚠️ This is a self-awareness tool, not a clinical diagnosis. If you are in distress, please contact a mental health professional.
            </div>
          </div>

          {/* Crisis resources */}
          <div className={styles.resources}>
            <h3 className={styles.resourcesTitle}>Crisis Resources</h3>
            <div className={styles.resourcesList}>
              {RESOURCES.map((r) => (
                <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" className={styles.resourceCard}>
                  <span className={styles.resourceName}>{r.name}</span>
                  <span className={styles.resourceDesc}>{r.desc}</span>
                  <ExternalLinkIcon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const RESOURCES = [
  { name: 'Crisis Text Line', desc: 'Text HOME to 741741 (US)', url: 'https://www.crisistextline.org' },
  { name: 'Samaritans', desc: 'Call 116 123 (UK & Ireland)', url: 'https://www.samaritans.org' },
  { name: 'Befrienders Worldwide', desc: 'Find a helpline near you', url: 'https://www.befrienders.org' },
  { name: 'NIMH Mental Health', desc: 'Info & resources (US)', url: 'https://www.nimh.nih.gov/health/find-help' },
];

function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.26 5.633 5.905-5.633zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.4 }}>
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
