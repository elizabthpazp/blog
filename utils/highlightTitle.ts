// Detecta la palabra o palabras clave del título para resaltarlas con SquigglyLines (igual que en home)
const KEYWORDS = [
  "Next.js",
  "Node.js",
  "React Hooks",
  "React 19",
  "React",
  "Tailwind CSS",
  "TypeScript",
  "JavaScript",
  "Bun",
  "Vibe Coding",
  "Prompt Engineering",
  "Server Actions",
  "Server Components",
  "Glassmorphism",
  "MCP",
  "LLM",
  "SEO",
  "CSS",
  "HTML",
  "Desarrollo Frontend",
  "Frontend Development",
  "Frontend",
  "Desarrollo Web",
  "Web Development",
  "Diseño Web",
  "Diseno Web",
  "Web Design",
  "Hooks",
  "Redes Sociales",
  "Social Media",
  "IA",
  "AI",
];

const LETTER_OR_DIGIT = /[0-9A-Za-zÀ-ÖØ-öø-ÿ]/;

const countWords = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

const isStandalone = (title: string, index: number, length: number) => {
  const previous = index > 0 ? title.charAt(index - 1) : "";
  const next = title.charAt(index + length);
  return !LETTER_OR_DIGIT.test(previous) && !LETTER_OR_DIGIT.test(next);
};

type Match = { index: number; length: number } | null;

const findKeyword = (title: string): Match => {
  const lower = title.toLowerCase();
  for (const keyword of KEYWORDS) {
    const needle = keyword.toLowerCase();
    let from = 0;
    while (from <= lower.length - needle.length) {
      const index = lower.indexOf(needle, from);
      if (index === -1) break;
      if (isStandalone(title, index, needle.length)) return { index, length: needle.length };
      from = index + 1;
    }
  }
  return null;
};

const findSegment = (title: string): Match => {
  const trailingSeparator = Math.max(title.lastIndexOf(":"), title.lastIndexOf(","));
  if (trailingSeparator > 0 && trailingSeparator < title.length - 1) {
    const tail = title.slice(trailingSeparator + 1);
    const segment = tail.trim();
    if (segment && countWords(segment) <= 5) {
      return { index: trailingSeparator + 1 + (tail.length - tail.replace(/^\s+/, "").length), length: segment.length };
    }
  }

  const leadingSeparator = title.search(/[:,]/);
  if (leadingSeparator > 0) {
    const head = title.slice(0, leadingSeparator).trim();
    if (head && countWords(head) <= 5) return { index: 0, length: head.length };
  }

  const words = title.split(/\s+/).filter(Boolean);
  if (words.length > 2) {
    const tail = words.slice(-2).join(" ");
    const index = title.lastIndexOf(tail);
    if (index > 0) return { index, length: tail.length };
  }

  return null;
};

export default function highlightTitle(title: string): {
  before: string;
  keyword: string;
  after: string;
} {
  const clean = (title || "").trim();
  if (!clean) return { before: "", keyword: "", after: "" };
  if (countWords(clean) <= 3) return { before: "", keyword: clean, after: "" };

  const match = findKeyword(clean) || findSegment(clean);
  if (!match) return { before: "", keyword: clean, after: "" };

  return {
    before: clean.slice(0, match.index),
    keyword: clean.slice(match.index, match.index + match.length),
    after: clean.slice(match.index + match.length),
  };
}
