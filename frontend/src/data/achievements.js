/**
 * Achievements data — academic distinction, hackathons, competitive programming, and milestones.
 */
export const achievementsStats = [
  {
    target: 4,
    suffix: ' Sems',
    label: 'Dept Topper',
    detail: 'Rank #1 consistently (AI & DS)',
  },
  {
    target: 5,
    suffix: '+',
    label: 'Offline Hackathons',
    detail: 'In-person builds & internship won',
  },
  {
    target: 200,
    suffix: '+',
    label: 'LeetCode Solved',
    detail: 'Data structures & algorithms',
  },
  {
    target: 5,
    suffix: '+',
    label: 'Industry Roles',
    detail: 'AI & software engineering',
  },
];

export const achievementsList = [
  {
    id: 'dept-topper',
    category: 'Academic Distinction',
    badge: 'Rank #1 Undefeated',
    title: 'Consistent Department Topper (4 Semesters)',
    organization: 'SNS Institutions — B.Tech AI & DS',
    period: '2024 – 2026',
    description:
      'Secured and maintained the #1 rank across the entire Artificial Intelligence & Data Science department consistently for all 4 semesters, demonstrating relentless discipline, strong fundamentals, and academic excellence.',
    metrics: [
      { label: 'Rank', value: '#1 in Dept' },
      { label: 'Consistency', value: '4 Consecutive Semesters' },
      { label: 'Field', value: 'AI & Data Science' },
    ],
    highlights: [
      'Top-performing student across all foundational & advanced engineering subjects',
      'Excellence in Mathematics, Data Structures, Algorithms, Machine Learning & Database Systems',
      'Recognized by department faculty and leadership for consistent scholastic leadership',
    ],
    icon: 'trophy',
  },
  {
    id: 'hackathons',
    category: 'Competitive Innovation',
    badge: 'Hackathon to Career',
    title: '5+ Offline Hackathons & Career Conversion',
    organization: 'In-Person Engineering & AI Sprints',
    period: '2024 – Present',
    description:
      'Competed on-site in 5+ high-pressure, 24-to-48-hour offline hackathons. Built production-ready prototypes under stringent deadlines, solved complex real-world challenges with AI, and secured a direct software development internship through standout performance.',
    metrics: [
      { label: 'Attended', value: '5+ In-Person' },
      { label: 'Conversion', value: '1 Direct Internship Won' },
      { label: 'Build Focus', value: 'AI & Full-Stack Prototypes' },
    ],
    highlights: [
      'Demonstrated high-velocity execution, collaborative problem solving, and architectural poise under pressure',
      'Directly impressed industry evaluators, converting hackathon innovation into an offer',
      'Deep hands-on experience presenting technical demos live before engineering panels',
    ],
    icon: 'flame',
  },
  {
    id: 'leetcode',
    category: 'Algorithmic Mastery',
    badge: '200+ Solved',
    title: '200+ LeetCode DSA Problem Solving',
    organization: 'LeetCode Community',
    period: 'Continuous Practice',
    description:
      'Engineered a disciplined problem-solving habit, solving 200+ algorithmic challenges across essential and advanced data structures, dynamic programming, graph algorithms, and optimal time-space complexity techniques.',
    metrics: [
      { label: 'Problems Solved', value: '200+' },
      { label: 'Core Focus', value: 'DSA & Algorithms' },
      { label: 'Profile', value: 'Nivethitha_R' },
    ],
    highlights: [
      'Mastery of Arrays, Hash Maps, Linked Lists, Trees, Graphs, and Two-Pointer paradigms',
      'Proficiency in writing optimal O(N) / O(log N) solutions in Python and Java',
      'Continuous daily consistency sharpening technical interview readiness',
    ],
    link: 'https://leetcode.com/u/Nivethitha_R/',
    linkText: 'View LeetCode Profile ↗',
    icon: 'code',
  },
  {
    id: 'industry-impact',
    category: 'Engineering Milestones',
    badge: 'Real-world Scale',
    title: 'Multiple AI & Software Engineering Internships',
    organization: 'Eduspine, ServiceNow, Buildicy, ONEDOT, SNS Square',
    period: '2025 – Present',
    description:
      'Promoted from Junior to Senior AI Software Development Intern at Eduspine, architected multi-modal and multilingual RAG systems at Buildicy, engaged with enterprise automation at ServiceNow, and delivered production systems at ONEDOT and SNS Square.',
    metrics: [
      { label: 'Companies', value: '5+ Industry Teams' },
      { label: 'Progression', value: 'Junior → Senior AI Intern' },
      { label: 'Specialization', value: 'LLMs, RAG & Full-Stack' },
    ],
    highlights: [
      'Engineered PolyRAG — a state-of-the-art multilingual RAG system',
      'Selected for Analytics Vidhya Pinnacle & Black Belt Track in Data Science',
      'Cross-functional expertise spanning frontend, backend APIs, LLM orchestration, and cloud deployments',
    ],
    icon: 'rocket',
  },
];
