export const SECTIONS = [
  {
    id: 'A',
    title: 'Depression Screening',
    emoji: '🧠',
    color: '#6366f1',
    questions: [
      'Little interest or pleasure in doing things you used to enjoy',
      'Feeling down, depressed, or hopeless',
      'Trouble falling or staying asleep, or sleeping too much',
      'Feeling tired or having little energy throughout the day',
      'Poor appetite or overeating — noticeable changes in your eating habits',
      'Feeling bad about yourself — or feeling like a failure, or that you\'ve let yourself or others down',
      'Trouble concentrating on things, such as reading, working, or watching TV',
      'Moving or speaking so slowly that others have noticed — or the opposite, being unusually restless or fidgety',
      'Thoughts that you would be better off dead, or thoughts of hurting yourself in any way',
    ],
  },
  {
    id: 'B',
    title: 'Anxiety Screening',
    emoji: '😰',
    color: '#f59e0b',
    questions: [
      'Feeling nervous, anxious, or on edge without a clear reason',
      'Not being able to stop or control your worrying',
      'Worrying too much about different things in your daily life',
      'Trouble relaxing even when you have time to yourself',
      'Being so restless inside that it\'s hard to sit still',
      'Becoming easily annoyed or irritable over small things',
      'Feeling afraid, as if something awful might happen at any moment',
      'Experiencing sudden episodes of intense fear or panic (e.g., racing heart, shortness of breath)',
      'Avoiding places, people, or situations because they make you feel anxious',
    ],
  },
  {
    id: 'C',
    title: 'Sleep & Energy',
    emoji: '😴',
    color: '#8b5cf6',
    questions: [
      'Difficulty falling asleep even when you wanted to',
      'Waking up in the middle of the night and struggling to go back to sleep',
      'Waking up feeling unrefreshed even after a full night\'s sleep',
      'Feeling so exhausted that simple daily tasks felt overwhelming',
      'Relying on caffeine, naps, or other stimulants just to get through the day',
      'Sleeping far more than usual yet still feeling drained',
    ],
  },
  {
    id: 'D',
    title: 'Social & Emotional Connection',
    emoji: '🤝',
    color: '#ec4899',
    questions: [
      'Feeling lonely or emotionally cut off from people around you',
      'Withdrawing from friends, family, or social activities you used to enjoy',
      'Feeling like a burden to the people in your life',
      'Struggling to open up to others about how you\'re truly feeling',
      'Feeling misunderstood or unsupported by people close to you',
      'Having little desire to reach out or maintain relationships',
      'Feeling disconnected from the world around you, as if watching from a distance',
    ],
  },
  {
    id: 'E',
    title: 'Focus & Cognitive Function',
    emoji: '🧩',
    color: '#14b8a6',
    questions: [
      'Difficulty concentrating on tasks at work, school, or home',
      'Forgetting things more than usual — appointments, names, tasks',
      'Finding it hard to make even simple decisions',
      'Your mind going blank at moments when you needed to think clearly',
      'Feeling mentally foggy or like your brain is "slow"',
      'Losing track of what you were doing mid-task',
    ],
  },
  {
    id: 'F',
    title: 'Emotional Regulation',
    emoji: '🌊',
    color: '#0ea5e9',
    questions: [
      'Experiencing sudden mood swings that were hard to explain or control',
      'Feeling emotionally numb or detached from things that should matter to you',
      'Crying unexpectedly or feeling on the verge of tears for no clear reason',
      'Reacting with anger or frustration much more strongly than the situation called for',
      'Feeling overwhelmed by emotions to the point of shutting down',
      'Feeling empty inside even when things in your life appear fine on the outside',
      'Struggling to bounce back after a stressful or upsetting event',
    ],
  },
  {
    id: 'G',
    title: 'Stress & Coping',
    emoji: '💆',
    color: '#f97316',
    questions: [
      'Feeling under constant pressure or stress with no relief',
      'Using food, alcohol, screens, or other habits to escape negative feelings',
      'Feeling like your responsibilities were completely overwhelming you',
      'Physical symptoms of stress — such as headaches, muscle tension, or an upset stomach',
      'Feeling like no matter what you do, nothing gets better',
      'Having no time or energy left for activities that help you recharge',
    ],
  },
  {
    id: 'H',
    title: 'Self-Worth & Purpose',
    emoji: '🌟',
    color: '#84cc16',
    questions: [
      'Being overly self-critical or harsh with yourself after mistakes',
      'Feeling like your life lacks purpose or direction',
      'Comparing yourself negatively to others and feeling inadequate',
      'Feeling unworthy of love, care, or success',
      'Struggling to feel proud of anything you\'ve accomplished',
      'Feeling like your future looks bleak or that things won\'t improve',
    ],
  },
];

export const ANSWERS = [
  { label: 'Never', score: 0, description: 'Not at all in the last 30 days' },
  { label: 'Rarely', score: 1, description: 'A few days in the last 30 days' },
  { label: 'Often', score: 2, description: 'More than half the days' },
  { label: 'Always', score: 3, description: 'Nearly every day' },
];

export const SCORE_BANDS = [
  {
    min: 0,
    max: 28,
    label: 'Thriving',
    color: '#22c55e',
    bgColor: '#dcfce7',
    icon: '🟢',
    description: 'Your mental wellbeing appears strong. Keep nurturing healthy habits.',
    advice: 'You\'re doing great! Continue the positive habits that support your wellbeing — regular exercise, good sleep, meaningful connections, and activities that bring you joy.',
  },
  {
    min: 29,
    max: 56,
    label: 'Mild Stress',
    color: '#3b82f6',
    bgColor: '#dbeafe',
    icon: '🔵',
    description: 'Some areas worth monitoring. Small lifestyle changes may help.',
    advice: 'You\'re managing well overall, but there are some areas to pay attention to. Consider small lifestyle improvements like better sleep hygiene, regular breaks, or talking to someone you trust.',
  },
  {
    min: 57,
    max: 98,
    label: 'Moderate Distress',
    color: '#eab308',
    bgColor: '#fef9c3',
    icon: '🟡',
    description: 'You may benefit from speaking with a trusted person or counsellor.',
    advice: 'Your results suggest you\'re experiencing some meaningful challenges. Consider speaking with a trusted friend, family member, or mental health counsellor. You don\'t have to navigate this alone.',
  },
  {
    min: 99,
    max: 140,
    label: 'High Distress',
    color: '#f97316',
    bgColor: '#ffedd5',
    icon: '🟠',
    description: 'Consider reaching out to a mental health professional soon.',
    advice: 'Your responses indicate significant distress in multiple areas. We strongly encourage you to reach out to a mental health professional. Taking this step is a sign of strength, not weakness.',
  },
  {
    min: 141,
    max: 168,
    label: 'Severe Distress',
    color: '#ef4444',
    bgColor: '#fee2e2',
    icon: '🔴',
    description: 'Please seek professional support — you don\'t have to face this alone.',
    advice: 'Your results indicate you may be experiencing severe distress. Please reach out to a mental health professional or crisis line as soon as possible. You deserve support and care.',
  },
];

export function getScoreBand(score) {
  return SCORE_BANDS.find((band) => score >= band.min && score <= band.max) || SCORE_BANDS[0];
}

export function getAllQuestions() {
  const questions = [];
  SECTIONS.forEach((section) => {
    section.questions.forEach((q, i) => {
      questions.push({
        id: `${section.id}${i + 1}`,
        sectionId: section.id,
        sectionTitle: section.title,
        sectionEmoji: section.emoji,
        sectionColor: section.color,
        text: q,
        index: questions.length,
      });
    });
  });
  return questions;
}
