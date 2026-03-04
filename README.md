# 🧠 OpenCore — Mental Health Assessment

An open-source, free mental health self-assessment tool built with React + Vite. 60 questions across 8 dimensions of mental wellbeing.

**Live Demo:** [opencore.vercel.app](https://opencore.vercel.app) *(deploy your own below)*

![OpenCore Screenshot](https://raw.githubusercontent.com/yourusername/opencore/main/screenshot.png)

---

## ✨ Features

- 📋 **60 questions** across 8 mental health dimensions
- 🎯 One question per screen — focused, calm experience
- 📊 Detailed results with section breakdown
- 📥 **Save results as JPG** for personal records
- 🔗 **Share on social media** (X/Twitter, Facebook)
- 📱 Fully responsive — works on mobile & desktop
- ♿ Accessible design with keyboard navigation
- 🌙 Beautiful dark theme
- ⚡ Built with Vite — blazing fast

## 🧩 Assessment Dimensions

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

## 📊 Score Bands

| Score | Band |
|-------|------|
| 0–28 | 🟢 Thriving |
| 29–56 | 🔵 Mild Stress |
| 57–98 | 🟡 Moderate Distress |
| 99–140 | 🟠 High Distress |
| 141–168 | 🔴 Severe Distress |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/opencore.git
cd opencore
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## 🌐 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/opencore)

1. Fork this repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your fork
4. Click **Deploy** — no configuration needed!

---

## 📁 Project Structure

```
opencore/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Landing.jsx     # Home screen
│   │   ├── Quiz.jsx        # Question flow
│   │   └── Results.jsx     # Score & sharing
│   ├── data/
│   │   └── questions.js    # All questions & scoring logic
│   ├── App.jsx             # Root component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

---

## ⚠️ Disclaimer

This tool is for **self-awareness purposes only**. It is **not a clinical diagnosis**. If you are in crisis or having thoughts of self-harm, please contact a mental health helpline or a medical professional immediately.

**International resources:**
- 🌍 [findahelpline.com](https://findahelpline.com) — worldwide crisis lines
- 🇺🇸 988 Suicide & Crisis Lifeline (US): call or text **988**
- 🇬🇧 Samaritans (UK): **116 123**

---

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m 'Add my feature'`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

MIT — free to use, modify, and distribute.

---

*Built with ❤️ to make mental health self-awareness more accessible.*
