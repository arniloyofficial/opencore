# ⬡ OpenCore — Mental Health Assessment

> A free, open-source, anonymous mental health self-assessment tool.

![OpenCore](https://img.shields.io/badge/license-MIT-blue) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![Vercel](https://img.shields.io/badge/deployed-Vercel-blue)

---

## ✨ Features

- **56 questions** across 8 mental health dimensions
- One question per screen with smooth transitions
- Detailed results with section-by-section breakdown
- **Save results as JPG** (via html2canvas)
- **Share to X, WhatsApp, Facebook** or copy text
- Fully anonymous — no data stored anywhere
- Open source & free forever
- Responsive design (mobile-first)
- Keyboard navigation support

## 🧠 Assessment Sections

| Section | Questions |
|---------|-----------|
| 🧠 Depression Screening | 9 |
| 😰 Anxiety Screening | 9 |
| 😴 Sleep & Energy | 6 |
| 🤝 Social & Emotional Connection | 7 |
| 🧩 Focus & Cognitive Function | 6 |
| 🌊 Emotional Regulation | 7 |
| 💆 Stress & Coping | 6 |
| 🌟 Self-Worth & Purpose | 6 |

**Total: 56 questions · Max score: 168**

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/opencore-app/opencore.git
cd opencore

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Deploy to Vercel

The easiest way to deploy is with [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/opencore-app/opencore)

Or via CLI:
```bash
npm install -g vercel
vercel
```

## 🏗 Tech Stack

- **Framework:** Next.js 14 (Pages Router)
- **Styling:** CSS Modules
- **Fonts:** Syne + DM Sans (Google Fonts)
- **Image Export:** html2canvas
- **Animations:** CSS animations + transitions
- **Deployment:** Vercel

## 📁 Project Structure

```
opencore/
├── src/
│   ├── data/
│   │   └── questions.js       # All 56 questions & scoring logic
│   ├── pages/
│   │   ├── _app.js
│   │   ├── _document.js
│   │   ├── index.js           # Landing page
│   │   ├── assessment.js      # Quiz page
│   │   └── results.js         # Results page
│   └── styles/
│       ├── globals.css
│       ├── Home.module.css
│       ├── Assessment.module.css
│       └── Results.module.css
├── public/
├── next.config.js
└── package.json
```

## ⚠️ Disclaimer

This assessment is for **self-awareness purposes only**. It is not a clinical diagnosis. If you are in crisis or having thoughts of self-harm, please contact a mental health helpline or medical professional immediately.

**Crisis resources:**
- Crisis Text Line: Text HOME to 741741 (US)
- Samaritans: 116 123 (UK & Ireland)
- Befrienders Worldwide: [befrienders.org](https://befrienders.org)

## 📝 License

MIT License — free to use, modify, and distribute.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open a PR.

---

Made with ❤️ for mental health awareness
