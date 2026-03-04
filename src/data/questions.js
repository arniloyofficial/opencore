export const ANSWER_OPTIONS = [
  { label: "Never", score: 0, description: "Not at all in the last 30 days" },
  { label: "Rarely", score: 1, description: "A few days in the last 30 days" },
  { label: "Often", score: 2, description: "More than half the days" },
  { label: "Always", score: 3, description: "Nearly every day" },
];

export const SECTIONS = [
  {
    id: "A", title: "Depression Screening", emoji: "🧠", color: "#6366f1",
    questions: [
      "Little interest or pleasure in doing things you used to enjoy",
      "Feeling down, depressed, or hopeless",
      "Trouble falling or staying asleep, or sleeping too much",
      "Feeling tired or having little energy throughout the day",
      "Poor appetite or overeating — noticeable changes in your eating habits",
      "Feeling bad about yourself — or feeling like a failure, or that you've let yourself or others down",
      "Trouble concentrating on things, such as reading, working, or watching TV",
      "Moving or speaking so slowly that others have noticed — or the opposite, being unusually restless or fidgety",
      "Thoughts that you would be better off dead, or thoughts of hurting yourself in any way",
      "Feeling a persistent sense of sadness or emptiness that doesn't seem to go away",
    ],
  },
  {
    id: "B", title: "Anxiety Screening", emoji: "😰", color: "#f59e0b",
    questions: [
      "Feeling nervous, anxious, or on edge without a clear reason",
      "Not being able to stop or control your worrying",
      "Worrying too much about different things in your daily life",
      "Trouble relaxing even when you have time to yourself",
      "Being so restless inside that it's hard to sit still",
      "Becoming easily annoyed or irritable over small things",
      "Feeling afraid, as if something awful might happen at any moment",
      "Experiencing sudden episodes of intense fear or panic (e.g., racing heart, shortness of breath)",
      "Avoiding places, people, or situations because they make you feel anxious",
      "Feeling a sense of dread about upcoming events or situations, even minor ones",
    ],
  },
  {
    id: "C", title: "Sleep & Energy", emoji: "😴", color: "#8b5cf6",
    questions: [
      "Difficulty falling asleep even when you wanted to",
      "Waking up in the middle of the night and struggling to go back to sleep",
      "Waking up feeling unrefreshed even after a full night's sleep",
      "Feeling so exhausted that simple daily tasks felt overwhelming",
      "Relying on caffeine, naps, or other stimulants just to get through the day",
      "Sleeping far more than usual yet still feeling drained",
    ],
  },
  {
    id: "D", title: "Social & Emotional Connection", emoji: "🤝", color: "#10b981",
    questions: [
      "Feeling lonely or emotionally cut off from people around you",
      "Withdrawing from friends, family, or social activities you used to enjoy",
      "Feeling like a burden to the people in your life",
      "Struggling to open up to others about how you're truly feeling",
      "Feeling misunderstood or unsupported by people close to you",
      "Having little desire to reach out or maintain relationships",
      "Feeling disconnected from the world around you, as if watching from a distance",
      "Feeling like no one truly understands what you are going through",
    ],
  },
  {
    id: "E", title: "Focus & Cognitive Function", emoji: "🧩", color: "#3b82f6",
    questions: [
      "Difficulty concentrating on tasks at work, school, or home",
      "Forgetting things more than usual — appointments, names, tasks",
      "Finding it hard to make even simple decisions",
      "Your mind going blank at moments when you needed to think clearly",
      'Feeling mentally foggy or like your brain is "slow"',
      "Losing track of what you were doing mid-task",
    ],
  },
  {
    id: "F", title: "Emotional Regulation", emoji: "🌊", color: "#06b6d4",
    questions: [
      "Experiencing sudden mood swings that were hard to explain or control",
      "Feeling emotionally numb or detached from things that should matter to you",
      "Crying unexpectedly or feeling on the verge of tears for no clear reason",
      "Reacting with anger or frustration much more strongly than the situation called for",
      "Feeling overwhelmed by emotions to the point of shutting down",
      "Feeling empty inside even when things in your life appear fine on the outside",
      "Struggling to bounce back after a stressful or upsetting event",
    ],
  },
  {
    id: "G", title: "Stress & Coping", emoji: "💆", color: "#f97316",
    questions: [
      "Feeling under constant pressure or stress with no relief",
      "Using food, alcohol, screens, or other habits to escape negative feelings",
      "Feeling like your responsibilities were completely overwhelming you",
      "Physical symptoms of stress — such as headaches, muscle tension, or an upset stomach",
      "Feeling like no matter what you do, nothing gets better",
      "Having no time or energy left for activities that help you recharge",
      "Feeling trapped with no clear way out of your current situation",
    ],
  },
  {
    id: "H", title: "Self-Worth & Purpose", emoji: "🌟", color: "#ec4899",
    questions: [
      "Being overly self-critical or harsh with yourself after mistakes",
      "Feeling like your life lacks purpose or direction",
      "Comparing yourself negatively to others and feeling inadequate",
      "Feeling unworthy of love, care, or success",
      "Struggling to feel proud of anything you've accomplished",
      "Feeling like your future looks bleak or that things won't improve",
    ],
  },
];

export const ALL_QUESTIONS = SECTIONS.flatMap((section) =>
  section.questions.map((q, i) => ({
    id: `${section.id}${i + 1}`,
    section: section.id,
    sectionTitle: section.title,
    sectionEmoji: section.emoji,
    sectionColor: section.color,
    text: q,
    index: i,
  }))
);

export const SCORE_BANDS = [
  {
    min: 0, max: 30,
    label: "Thriving",
    emoji: "🟢", color: "#22c55e", bg: "#052e16",
    description: "Your mental wellbeing appears genuinely strong across most areas of life. Your responses suggest you're managing stress well, maintaining energy, staying emotionally balanced, and feeling connected to the people and things that matter to you. This is something worth acknowledging and actively protecting.",
    advice: "Keep investing in the habits that got you here — sleep, movement, rest, and honest connection with others.",
  },
  {
    min: 31, max: 60,
    label: "Mild Stress",
    emoji: "🔵", color: "#60a5fa", bg: "#0c1a2e",
    description: "You're doing reasonably well overall, but your responses suggest some areas are beginning to feel the pressure. You may be experiencing occasional fatigue, low-level worry, or moments where things feel harder than usual. Nothing here is alarming, but these are early signals worth paying attention to before they grow.",
    advice: "Small consistent actions help — carving out time to unwind, talking to someone you trust, or simply slowing down.",
  },
  {
    min: 61, max: 105,
    label: "Moderate Distress",
    emoji: "🟡", color: "#fbbf24", bg: "#1c1400",
    description: "You're experiencing noticeable challenges across several areas of your wellbeing. Whether it's persistent stress, low mood, disrupted sleep, difficulty focusing, or a growing sense of disconnection — these feelings are real and meaningful. This is a clear signal that something needs to change, and that you deserve support.",
    advice: "Reach out to a trusted friend, counsellor, or mental health professional. Talking honestly is often the most powerful first step.",
  },
  {
    min: 106, max: 150,
    label: "High Distress",
    emoji: "🟠", color: "#fb923c", bg: "#1c0a00",
    description: "You're going through a genuinely difficult time across multiple areas of your life. Your responses reflect significant strain — emotionally, mentally, and possibly physically. This is not weakness. It's a sign that you've been carrying too much for too long, and that professional support is no longer optional — it's necessary.",
    advice: "Please reach out to a mental health professional soon. Services like Kaan Pete Roi and Moner Bondhu are available in Bangladesh.",
  },
  {
    min: 151, max: 180,
    label: "Severe Distress",
    emoji: "🔴", color: "#f87171", bg: "#1c0000",
    description: "Your results indicate you may be in significant pain right now — across nearly every dimension we measured. What you're feeling is real, and it deserves immediate care and attention. You don't have to keep carrying this alone. Reaching out is not a sign of failure; it is the most important thing you can do right now.",
    advice: "Please contact Kaan Pete Roi (01779-554391) or NIMH Bangladesh today. If you're in crisis, tell someone you trust immediately.",
  },
];

export function getBand(score) {
  return SCORE_BANDS.find((b) => score >= b.min && score <= b.max) || SCORE_BANDS[0];
}

export function getSectionScore(answers, sectionId) {
  return ALL_QUESTIONS.filter((q) => q.section === sectionId).reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
}

export function getTotalScore(answers) {
  return Object.values(answers).reduce((sum, v) => sum + v, 0);
}
