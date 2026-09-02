/**
 * Skills data — grouped by category.
 * Each skill has a label and an optional icon slug from Simple Icons.
 * Consumed by Skills.jsx and LogoLoop.jsx.
 */
export const skillsData = {
  'AI / ML': [
    { label: 'Generative AI',      icon: 'spark' },
    { label: 'LLMs',               icon: 'anthropic' },
    { label: 'RAG',                icon: 'database' },
    { label: 'LangChain',          icon: 'langchain' },
    { label: 'PyTorch',            icon: 'pytorch' },
    { label: 'TensorFlow',         icon: 'tensorflow' },
    { label: 'Hugging Face',       icon: 'huggingface' },
    { label: 'Computer Vision',     icon: 'opencv' },
    { label: 'Scikit-learn',       icon: 'scikitlearn' },
    { label: 'Pandas',             icon: 'pandas' },
    { label: 'NumPy',              icon: 'numpy' },
    { label: 'NLP',                icon: 'spacy' },
  ],
  Languages: [
    { label: 'Python',      icon: 'python' },
    { label: 'JavaScript',  icon: 'javascript' },
    { label: 'TypeScript',  icon: 'typescript' },
    { label: 'Java',        icon: 'openjdk' },
    { label: 'C',           icon: 'c' },
    { label: 'SQL',         icon: 'mysql' },
  ],
  Frontend: [
    { label: 'React',         icon: 'react' },
    { label: 'Vite',          icon: 'vite' },
    { label: 'Tailwind CSS',  icon: 'tailwindcss' },
    { label: 'HTML5',         icon: 'html5' },
    { label: 'CSS3',          icon: 'css' },
  ],
  'Backend & APIs': [
    { label: 'FastAPI',    icon: 'fastapi' },
    { label: 'Node.js',   icon: 'nodedotjs' },
    { label: 'REST APIs', icon: 'postman' },
  ],
  'Data & Databases': [
    { label: 'PostgreSQL',         icon: 'postgresql' },
    { label: 'Supabase',           icon: 'supabase' },
    { label: 'Data Visualization', icon: 'd3' },
  ],
  'Tools & DevOps': [
    { label: 'Git',          icon: 'git' },
    { label: 'GitHub',       icon: 'github' },
    { label: 'Docker',       icon: 'docker' },
    { label: 'Streamlit',    icon: 'streamlit' },
    { label: 'VS Code',      icon: 'vscodium' },
    { label: 'antigravity',  icon: 'google' },
    { label: 'Vercel',       icon: 'vercel' },
    { label: 'Render',       icon: 'render' },
  ],
};

/**
 * 3 Curated Tracks for the Continuous Infinite Logo Loop.
 */
export const logoLoopTracks = [
  // Track 1: AI / Machine Learning & Data Science (Flows Left)
  [
    { label: 'Python',         icon: 'python',        category: 'AI / Core' },
    { label: 'LangChain',      icon: 'langchain',     category: 'AI / ML' },
    { label: 'PyTorch',        icon: 'pytorch',       category: 'AI / ML' },
    { label: 'TensorFlow',     icon: 'tensorflow',    category: 'AI / ML' },
    { label: 'Hugging Face',   icon: 'huggingface',   category: 'AI / ML' },
    { label: 'OpenCV',         icon: 'opencv',        category: 'Computer Vision' },
    { label: 'Scikit-learn',   icon: 'scikitlearn',   category: 'AI / ML' },
    { label: 'LLMs',           icon: 'anthropic',     category: 'GenAI' },
    { label: 'Streamlit',      icon: 'streamlit',     category: 'AI Apps' },
    { label: 'Pandas',         icon: 'pandas',        category: 'Data Science' },
    { label: 'NumPy',          icon: 'numpy',         category: 'Data Science' },
    { label: 'Generative AI',  icon: 'spark',         category: 'GenAI' },
    { label: 'RAG Systems',    icon: 'database',      category: 'AI / ML' },
  ],

  // Track 2: Languages, Frontend & Full-Stack (Flows Right)
  [
    { label: 'React',         icon: 'react',         category: 'Frontend' },
    { label: 'TypeScript',    icon: 'typescript',    category: 'Language' },
    { label: 'FastAPI',       icon: 'fastapi',       category: 'Backend' },
    { label: 'Node.js',       icon: 'nodedotjs',     category: 'Backend' },
    { label: 'JavaScript',    icon: 'javascript',    category: 'Language' },
    { label: 'Tailwind CSS',  icon: 'tailwindcss',   category: 'Frontend' },
    { label: 'Vite',          icon: 'vite',          category: 'Frontend' },
    { label: 'HTML5',         icon: 'html5',         category: 'Frontend' },
    { label: 'CSS3',          icon: 'css',           category: 'Frontend' },
    { label: 'Java',          icon: 'openjdk',       category: 'Language' },
    { label: 'C Language',    icon: 'c',             category: 'Language' },
    { label: 'REST APIs',     icon: 'postman',       category: 'Backend' },
  ],

  // Track 3: Databases, DevOps, Tools & Cloud (Flows Left)
  [
    { label: 'PostgreSQL',     icon: 'postgresql',    category: 'Database' },
    { label: 'Supabase',       icon: 'supabase',      category: 'Database' },
    { label: 'Docker',         icon: 'docker',        category: 'DevOps' },
    { label: 'Git',            icon: 'git',           category: 'DevOps' },
    { label: 'GitHub',         icon: 'github',        category: 'DevOps' },
    { label: 'Vercel',         icon: 'vercel',        category: 'Cloud' },
    { label: 'Render',         icon: 'render',        category: 'Cloud' },
    { label: 'VS Code',        icon: 'vscodium',      category: 'Tools' },
    { label: 'SQL',            icon: 'mysql',         category: 'Database' },
    { label: 'Antigravity',    icon: 'google',        category: 'Tools' },
    { label: 'Data Viz',       icon: 'd3',            category: 'Analytics' },
  ],
];
