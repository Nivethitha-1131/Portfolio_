/**
 * Achievements data — academic distinction, hackathons, competitive programming, and milestones.
 */
export const achievementsStats = [
  {
    id: 'dept-topper',
    target: 4,
    suffix: ' Sems',
    label: 'Dept Topper',
    detail: 'Rank #1 consistently (AI & DS)',
  },
  {
    id: 'hackathons',
    target: 4,
    suffix: '+',
    label: 'Offline Hackathons',
    detail: 'In-person builds & internship won',
  },
  {
    id: 'leetcode',
    target: 200,
    suffix: '+',
    label: 'LeetCode Solved',
    detail: 'Data structures & algorithms',
    directLink: 'https://leetcode.com/u/Nivethitha_R/',
  },
  {
    id: 'industry-impact',
    target: 5,
    suffix: '+',
    label: 'Industry Roles',
    detail: 'AI & software engineering',
    directLink: 'https://www.linkedin.com/in/nivethitha-ramesh/#experience',
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
    semesterGPAs: [
      { sem: 'Sem I', gpa: '9.38' },
      { sem: 'Sem II', gpa: '9.71' },
      { sem: 'Sem III', gpa: '9.00' },
      { sem: 'Sem IV', gpa: '9.55' },
    ],
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
    images: [
      {
        src: '/assets/achievements/dept_topper_award.jpg',
        alt: 'Nivethitha Ramesh receiving Department Rank #1 Award & Certificate at Annual Day 2026',
        caption: 'Award Felicitation — Annual Day 2026',
        label: 'Award',
      },
      {
        src: '/assets/achievements/dept_topper_certificate.jpg',
        alt: 'Certificate of Appreciation & Gold Plaque Trophy — Rank Holder with 9.34 CGPA',
        caption: 'Gold Plaque & Certificate (9.34 CGPA)',
        label: 'Certificate',
      },
    ],
    icon: 'trophy',
  },
  {
    id: 'hackathons',
    category: 'Competitive Innovation',
    badge: 'Hackathon to Career',
    title: '4+ Offline Hackathons & Career Conversion',
    organization: 'In-Person Engineering & AI Sprints',
    period: '2024 – Present',
    description:
      'Competed on-site in 4+ high-pressure, 24-to-48-hour offline hackathons across top engineering institutes. Built production-ready GenAI prototypes under stringent deadlines, solved real-world challenges, and secured a direct software development internship at iBots.in.',
    metrics: [
      { label: 'Attended', value: '4+ In-Person' },
      { label: 'Conversion', value: '1 Direct Internship Won' },
      { label: 'Build Focus', value: 'AI & Full-Stack Prototypes' },
    ],
    highlights: [
      'Demonstrated high-velocity execution, collaborative problem solving, and architectural poise under pressure',
      'Directly impressed industry evaluators, converting hackathon innovation into an offer',
      'Deep hands-on experience presenting technical demos live before engineering panels',
    ],
    images: [
      {
        src: '/assets/achievements/hackathons/hackathon_ibots.jpg',
        alt: 'iBots AI Hackathon in Trichy — Secured Exclusive Software Engineering Internship',
        caption: 'iBots AI Hackathon — Direct Internship Won',
        label: 'iBots',
        link: 'https://www.linkedin.com/posts/nivethitha-ramesh_snsinstitution-snsdesignthinker-designthing-activity-7453378811020120064-fp9C',
      },
      {
        src: '/assets/achievements/hackathons/hackathon_gptathon_cit.jpg',
        alt: 'GPTathon Offline Finals at Coimbatore Institute of Technology (CIT) — Intellina 2K26',
        caption: 'GPTathon Finals — CIT Coimbatore',
        label: 'GPTathon',
        link: 'https://www.linkedin.com/posts/nivethitha-ramesh_gptathon-intellina2k26-artificialintelligence-activity-7437358617906933760-fG4I',
      },
      {
        src: '/assets/achievements/hackathons/hackathon_genai_kpr.jpg',
        alt: '18-Hour Gen AI Hackathon at KPR Institute — Built NeuroviaX AI Biotech Learning Platform',
        caption: '18-Hr GenAI Sprint — NeuroviaX AI (KPR)',
        label: 'KPR GenAI',
        link: 'https://www.linkedin.com/posts/nivethitha-ramesh_snsinstitution-designthinking-designthinkers-activity-7431282378611810304-aqCZ',
      },
      {
        src: '/assets/achievements/hackathons/hackathon_codeoclock_cit.jpg',
        alt: 'CodeOClock 2K25 Hackathon at CIT Coimbatore — AI Meeting Buddy with Team VisionZ',
        caption: 'CodeOClock 2K25 — Team VisionZ (CIT)',
        label: 'CodeOClock',
        link: 'https://www.linkedin.com/posts/nivethitha-ramesh_hackathon-genai-saas22-activity-7379356853211684865-tWKF',
      },
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
    link: 'https://www.linkedin.com/in/nivethitha-ramesh/#experience',
    linkText: 'View Experience on LinkedIn ↗',
    icon: 'rocket',
  },
];
