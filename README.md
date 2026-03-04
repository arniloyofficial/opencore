# ◈ OpenCore MindCheck

**A free, open-source mental health self-assessment tool.**

OpenCore MindCheck is a 56-question assessment covering 8 dimensions of mental wellbeing:
- 🧠 Depression
- 😰 Anxiety
- 😴 Sleep & Energy
- 🤝 Social Connection
- 🧩 Focus & Cognition
- 🌊 Emotional Regulation
- 💆 Stress & Coping
- 🌟 Self-Worth & Purpose

**Features:**
- One question per screen with smooth transitions
- Keyboard navigation (1–4 to select, Enter to continue)
- Detailed results with per-section breakdown
- Save results as a JPG image
- Share to Twitter/X and LinkedIn
- No account required — all data stays on your device
- Fully responsive for mobile and desktop

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/opencore-mindcheck.git
cd opencore-mindcheck
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🌐 Deploy to Vercel

The easiest way to deploy:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/opencore-mindcheck)

Or manually:
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Vercel will auto-detect Next.js and deploy

---

## 📁 Project Structure

```
opencore/
├── lib/
│   └── questions.js        # All questions, scoring logic, bands
├── pages/
│   ├── _app.js
│   ├── _document.js
│   ├── index.js            # Landing page
│   ├── assessment.js       # Quiz engine (one question per screen)
│   └── results.js          # Results, charts, save/share
├── styles/
│   ├── globals.css
│   ├── Home.module.css
│   ├── Assessment.module.css
│   └── Results.module.css
├── public/
│   └── favicon.ico
├── next.config.js
└── package.json
```

---

## 📊 Scoring

| Score | Band | Interpretation |
|---|---|---|
| 0–28 | 🟢 Thriving | Strong mental wellbeing |
| 29–56 | 🔵 Mild Stress | Some areas to monitor |
| 57–98 | 🟡 Moderate Distress | Consider speaking with someone |
| 99–140 | 🟠 High Distress | Seek professional support soon |
| 141–168 | 🔴 Severe Distress | Please reach out for help |

---

## ⚠️ Disclaimer

This tool is for **self-awareness purposes only**. It is **not a clinical diagnosis**. If you are in crisis or experiencing thoughts of self-harm, please contact a mental health helpline or medical professional immediately.

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repository
2. Create your branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

Built with ❤️ by the OpenCore community.
