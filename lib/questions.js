export const sections = [
  {
    id: "A",
    title: "Depression",
    emoji: "🧠",
    color: "#6B7FF0",
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
    ],
  },
  {
    id: "B",
    title: "Anxiety",
    emoji: "😰",
    color: "#F07A6B",
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
    ],
  },
  {
    id: "C",
    title: "Sleep & Energy",
    emoji: "😴",
    color: "#6BBFF0",
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
    id: "D",
    title: "Social Connection",
    emoji: "🤝",
    color: "#A06BF0",
    questions: [
      "Feeling lonely or emotionally cut off from people around you",
      "Withdrawing from friends, family, or social activities you used to enjoy",
      "Feeling like a burden to the people in your life",
      "Struggling to open up to others about how you're truly feeling",
      "Feeling misunderstood or unsupported by people close to you",
      "Having little desire to reach out or maintain relationships",
      "Feeling disconnected from the world around you, as if watching from a distance",
    ],
  },
  {
    id: "E",
    title: "Focus & Cognition",
    emoji: "🧩",
    color: "#F0C46B",
    questions: [
      "Difficulty concentrating on tasks at work, school, or home",
      "Forgetting things more than usual — appointments, names, tasks",
      "Finding it hard to make even simple decisions",
      "Your mind going blank at moments when you needed to think clearly",
      "Feeling mentally foggy or like your brain is \"slow\"",
      "Losing track of what you were doing mid-task",
    ],
  },
  {
    id: "F",
    title: "Emotional Regulation",
    emoji: "🌊",
    color: "#6BF0D8",
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
    id: "G",
    title: "Stress & Coping",
    emoji: "💆",
    color: "#F06BAF",
    questions: [
      "Feeling under constant pressure or stress with no relief",
      "Using food, alcohol, screens, or other habits to escape negative feelings",
      "Feeling like your responsibilities were completely overwhelming you",
      "Physical symptoms of stress — such as headaches, muscle tension, or an upset stomach",
      "Feeling like no matter what you do, nothing gets better",
      "Having no time or energy left for activities that help you recharge",
    ],
  },
  {
    id: "H",
    title: "Self-Worth & Purpose",
    emoji: "🌟",
    color: "#F0A46B",
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

export const answers = [
  { label: "Never", score: 0, desc: "Not at all in the last 30 days" },
  { label: "Rarely", score: 1, desc: "A few days in the last 30 days" },
  { label: "Often", score: 2, desc: "More than half the days" },
  { label: "Always", score: 3, desc: "Nearly every day" },
];

export const bands = [
  {
    min: 0,
    max: 28,
    label: "Thriving",
    emoji: "🟢",
    color: "#22c55e",
    bg: "#052e16",
    description:
      "Your mental wellbeing appears strong. Keep nurturing healthy habits.",
  },
  {
    min: 29,
    max: 56,
    label: "Mild Stress",
    emoji: "🔵",
    color: "#3b82f6",
    bg: "#0f1729",
    description:
      "Some areas worth monitoring. Small lifestyle changes may help.",
  },
  {
    min: 57,
    max: 98,
    label: "Moderate Distress",
    emoji: "🟡",
    color: "#eab308",
    bg: "#1c1a05",
    description:
      "You may benefit from speaking with a trusted person or counsellor.",
  },
  {
    min: 99,
    max: 140,
    label: "High Distress",
    emoji: "🟠",
    color: "#f97316",
    bg: "#1c0d05",
    description:
      "Consider reaching out to a mental health professional soon.",
  },
  {
    min: 141,
    max: 168,
    label: "Severe Distress",
    emoji: "🔴",
    color: "#ef4444",
    bg: "#1c0505",
    description:
      "Please seek professional support — you don't have to face this alone.",
  },
];

export function getBand(score) {
  return bands.find((b) => score >= b.min && score <= b.max) || bands[0];
}

export function getSectionScore(answers, sectionId) {
  const section = sections.find((s) => s.id === sectionId);
  if (!section) return 0;
  return section.questions.reduce((sum, _, qi) => {
    const key = `${sectionId}-${qi}`;
    return sum + (answers[key] ?? 0);
  }, 0);
}

export function getTotalScore(answersMap) {
  return sections.reduce((total, section) => {
    return total + getSectionScore(answersMap, section.id);
  }, 0);
}

export function getAllQuestions() {
  const questions = [];
  sections.forEach((section) => {
    section.questions.forEach((q, qi) => {
      questions.push({
        key: `${section.id}-${qi}`,
        sectionId: section.id,
        sectionTitle: section.title,
        sectionEmoji: section.emoji,
        sectionColor: section.color,
        question: q,
        index: qi,
        sectionIndex: sections.indexOf(section),
      });
    });
  });
  return questions;
}
