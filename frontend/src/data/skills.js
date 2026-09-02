/**
 * Skills data — grouped by category.
 * Each skill has a label and an optional icon slug from Simple Icons.
 * Concept-based skills (no specific tool logo) have no icon.
 * Consumed by Skills.jsx via SkillPill.
 */
export const skillsData = {
  'AI / ML': [
    { label: 'Generative AI' },
    { label: 'LLMs' },
    { label: 'RAG' },
    { label: 'LangChain',          icon: 'langchain' },
    { label: 'Prompt Engineering' },
    { label: 'Computer Vision',     icon: 'opencv' },
    { label: 'NLP' },
    { label: 'Scikit-learn',       icon: 'scikitlearn' },
    { label: 'Hugging Face',       icon: 'huggingface' },
  ],
  Languages: [
    { label: 'Python',      icon: 'python' },
    { label: 'JavaScript',  icon: 'javascript' },
    { label: 'TypeScript',  icon: 'typescript' },
    { label: 'Java',        icon: 'coffeescript' },
    { label: 'C',           icon: 'c' },
    { label: 'SQL' },
  ],
  Frontend: [
    { label: 'React',         icon: 'react' },
    { label: 'Vite',          icon: 'vite' },
    { label: 'Tailwind CSS',  icon: 'tailwindcss' },
    { label: 'Shadcn UI' },
    { label: 'HTML',          icon: 'html5' },
    { label: 'CSS',           icon: 'css3' },
  ],
  'Backend & APIs': [
    { label: 'FastAPI',    icon: 'fastapi' },
    { label: 'Node.js',   icon: 'nodedotjs' },
    { label: 'REST APIs' },
  ],
  'Data & Databases': [
    { label: 'PostgreSQL',         icon: 'postgresql' },
    { label: 'Supabase',           icon: 'supabase' },
    { label: 'Data Visualization' },
  ],
  'Tools & DevOps': [
    { label: 'Git',          icon: 'git' },
    { label: 'GitHub',       icon: 'github' },
    { label: 'Docker',       icon: 'docker' },
    { label: 'Streamlit',    icon: 'streamlit' },
    { label: 'VS Code',      icon: 'visualstudiocode' },
    { label: 'antigravity',  icon: 'google' },
    { label: 'Vercel',       icon: 'vercel' },
    { label: 'Render',       icon: 'render' },
  ],
};
