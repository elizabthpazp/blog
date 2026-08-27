import fs from "fs";
import path from "path";
import { Locale } from "./i18n-config";
import matter from "gray-matter";
import { PostMetadata } from "./PostMetadata";
import getDate from "./utils/getDate";

// 1. Sync generated 3D images from artifacts to public
const artifactDir = "C:\\Users\\eliza\\.gemini\\antigravity-ide\\brain\\4b3988bd-faa4-40a4-b902-23081a27b480";
const imageCopies: [string, string][] = [
  ["vibe_coding_ai_1787790823300.jpg", "vibe-coding.jpg"],
  ["ai_agents_mcp_1787790836243.jpg", "ai-agents-mcp.jpg"],
  ["react_server_actions_1787790853302.jpg", "react-19-server-actions.jpg"],
  ["llm_models_web_1787790872743.jpg", "llm-models-web.jpg"],
  ["nextjs_performance_1787790896629.jpg", "nextjs-performance.jpg"],
  ["ai_dev_tools_1787790918576.jpg", "ai-dev-tools.jpg"],
];

try {
  const publicDir = path.join(process.cwd(), "public");

  // Copy 3D generated images
  for (const [srcName, destName] of imageCopies) {
    const srcPath = path.join(artifactDir, srcName);
    if (fs.existsSync(srcPath)) {
      for (const subDir of ["es", "en"]) {
        const destSub = path.join(publicDir, subDir, destName);
        if (!fs.existsSync(destSub)) fs.copyFileSync(srcPath, destSub);
      }
      const rootDest = path.join(publicDir, destName);
      if (!fs.existsSync(rootDest)) fs.copyFileSync(srcPath, rootDest);
    }
  }

  // Copy all images from public/es and public/en to root public so all image paths resolve at /image-name
  for (const subDir of ["es", "en"]) {
    const subPath = path.join(publicDir, subDir);
    if (fs.existsSync(subPath)) {
      const files = fs.readdirSync(subPath);
      for (const f of files) {
        const src = path.join(subPath, f);
        const dest = path.join(publicDir, f);
        if (fs.statSync(src).isFile() && !fs.existsSync(dest)) {
          fs.copyFileSync(src, dest);
        }
      }
    }
  }
} catch (e) {
  // Ignore sync errors in restricted envs
}

const resolveLang = (langInput: any): string => {
  if (typeof langInput === 'string' && langInput) return langInput;
  if (langInput && typeof langInput === 'object' && typeof langInput.lang === 'string') return langInput.lang;
  return 'es';
};

// ==================== Related analysis ====================
const STOPWORDS = new Set<string>([
  // Spanish
  "de","la","que","el","en","y","a","los","del","se","las","por","un","para","con","no","una","su","al","lo","como","mas","pero","sus","le","ya","o","este","si","porque","esta","entre","cuando","muy","sin","sobre","tambien","me","hasta","hay","donde","quien","desde","todo","nos","durante","todos","uno","les","ni","contra","otros","ese","eso","ante","ellos","e","esto","mi","antes","algunos","qué","unos","yo","otro","otras","otra","el","tanto","esa","estos","mucho","quienes","nada","muchos","cual","poco","ella","estar","estas","algunas","algo","nosotros","mis","tu","te","ti","tus","ellas","nosotras","vosotros","vosotras","os","mio","mia","mios","mias","tuyo","tuya","tuyos","tuyas","suyo","suya","suyos","suyas","nuestro","nuestra","nuestros","nuestras","vuestro","vuestra","vuestros","vuestras","esos","esas","estoy","esta","estamos","estan","estaba","estaban","he","has","ha","hemos","han","habia","habian","ser","es","soy","eres","somos","son","era","eran","fue","fueron","sea","sean","sido","tiene","tienen","tenia","tenian",
  // English
  "the","be","to","of","and","a","in","that","have","i","it","for","not","on","with","he","as","you","do","at","this","but","his","by","from","they","we","say","her","she","or","an","will","my","one","all","would","there","their","what","so","up","out","if","about","who","get","which","go","me","when","make","can","like","time","just","him","know","take","people","into","year","your","good","some","could","them","see","other","than","then","now","look","only","come","its","over","think","also","back","after","use","two","how","our","work","first","well","way","even","new","want","because","any","these","give","day","most","us","are","was","were","has","had","been","will","would","should","could","may","might","is"
]);

function tokenize(text: string): string[] {
  if (!text) return [];
  const normalized = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const raw = normalized.match(/[a-z0-9]+/g) || [];
  const out: string[] = [];
  for (const t of raw) {
    if (t.length < 3) continue;
    if (STOPWORDS.has(t)) continue;
    out.push(t);
  }
  return out;
}

function getRelatedScoredPosts(lang: string, actualSlug: string, limit = 3, threshold = 0.08): PostMetadata[] {
  const folder = "posts/";
  if (!fs.existsSync(folder)) return [];
  const files = fs.readdirSync(folder);

  type Doc = {
    slug: string;
    tokens: string[];
    category: string;
    language?: string;
    metadata: PostMetadata;
  };

  const docs: Doc[] = [];

  for (const filename of files) {
    try {
      const filePath = `posts/${filename}/${lang}/${filename}.md`;
      let targetPath = filePath;
      if (!fs.existsSync(targetPath)) {
        targetPath = `posts/${filename}/es/${filename}.md`;
      }
      if (!fs.existsSync(targetPath)) continue;
      const fileContents = fs.readFileSync(targetPath, "utf8");
      const matterResult = matter(fileContents);
      const category = (matterResult.data.title || "Desarrollo Web").toString();
      const headline = matterResult.data.subtitle || category || filename;
      const description = matterResult.data.description || headline;
      const date = matterResult.data.date || "";
      let image = matterResult.data.image || "";
      if (image === "./css1.png") image = "./css.png";
      const langField = matterResult.data.language ? String(matterResult.data.language) : undefined;
      const body = matterResult.content || "";
      const combined = `${category} ${headline} ${description} ${category} ${headline} ${description} ${body}`;
      const tokens = tokenize(combined);
      if (tokens.length === 0) continue;
      const metadata: PostMetadata = {
        title: category,
        subtitle: headline,
        description: description,
        slug: filename,
        date: date,
        image: image,
        likes: matterResult.data.likes || 0,
        language: langField,
      };
      docs.push({ slug: filename, tokens, category, language: langField, metadata });
    } catch (e) {
      continue;
    }
  }

  if (docs.length < 2) return [];

  const N = docs.length;
  // document frequency
  const df = new Map<string, number>();
  for (const doc of docs) {
    const uniq = new Set(doc.tokens);
    uniq.forEach((t) => {
      df.set(t, (df.get(t) || 0) + 1);
    });
  }

  // tf-idf vectors normalized
  const vectors = new Map<string, Map<string, number>>();
  for (const doc of docs) {
    const tf = new Map<string, number>();
    for (const t of doc.tokens) tf.set(t, (tf.get(t) || 0) + 1);
    const total = doc.tokens.length || 1;
    const vec = new Map<string, number>();
    let sumSq = 0;
    tf.forEach((cnt, term) => {
      const tfVal = cnt / total;
      const idf = Math.log(N / (df.get(term) || 1)) + 1;
      const v = tfVal * idf;
      vec.set(term, v);
      sumSq += v * v;
    });
    const norm = Math.sqrt(sumSq) || 1;
    vec.forEach((v, k) => {
      vec.set(k, v / norm);
    });
    vectors.set(doc.slug, vec);
  }

  const actualDoc = docs.find(d => d.slug === actualSlug);
  if (!actualDoc) {
    // fallback: return most recent excluding actual, limited
    const filtered = docs.filter(d => d.slug !== actualSlug).map(d => d.metadata);
    filtered.sort((a,b)=> getDate(b.date)-getDate(a.date));
    return filtered.slice(0, limit);
  }

  const actualVec = vectors.get(actualSlug);
  if (!actualVec) return [];

  type Scored = { meta: PostMetadata; score: number; dateVal: number };
  const scored: Scored[] = [];

  for (const doc of docs) {
    if (doc.slug === actualSlug) continue;
    const vec = vectors.get(doc.slug);
    if (!vec) continue;
    // cosine dot product (both normalized)
    let dot = 0;
    // iterate smaller
    const small = actualVec.size < vec.size ? actualVec : vec;
    const large = actualVec.size < vec.size ? vec : actualVec;
    small.forEach((val, term) => {
      const ov = large.get(term);
      if (ov !== undefined) dot += val * ov;
    });
    let score = dot;
    // boost same category (title field)
    if (doc.category && actualDoc.category && doc.category === actualDoc.category) {
      score += 0.12;
    }
    // boost same language field (js/css etc)
    if (doc.language && actualDoc.language && doc.language === actualDoc.language) {
      score += 0.05;
    }
    scored.push({ meta: doc.metadata, score, dateVal: getDate(doc.metadata.date) });
  }

  scored.sort((a,b)=>{
    if (Math.abs(b.score - a.score) > 0.0001) return b.score - a.score;
    return b.dateVal - a.dateVal;
  });

  const filtered = scored.filter(s => s.score >= threshold).slice(0, limit).map(s=>s.meta);
  // if filtered is too few but we have high relevance, return filtered; if empty due to threshold, return empty to respect "solo los relacionados"
  // However if threshold filters everything but there are close candidates, show empty as per requirement
  return filtered;
}

const getPostMetaData = (
  langParam: Locale | string = "es",
  related: boolean = false,
  actual?: any
): PostMetadata[] => {
  const lang = resolveLang(langParam);
  const folder = "posts/";

  if (!fs.existsSync(folder)) return [];

  // Related mode: use TF-IDF analysis to return only truly related
  if (related && actual) {
    const actualSlug = typeof actual === 'string' ? actual : String(actual);
    return getRelatedScoredPosts(lang, actualSlug, 3, 0.08);
  }

  const files = fs.readdirSync(folder);

  let posts = files
    .map((filename) => {
      try {
        const filePath = `posts/${filename}/${lang}/${filename}.md`;
        let targetPath = filePath;

        // Fallback to Spanish if requested language file doesn't exist
        if (!fs.existsSync(targetPath)) {
          targetPath = `posts/${filename}/es/${filename}.md`;
        }

        if (!fs.existsSync(targetPath)) {
          return null;
        }

        const fileContents = fs.readFileSync(targetPath, "utf8");
        const matterResult = matter(fileContents);
        
        if (related && filename === actual) {
          return null;
        }

        const category = matterResult.data.title || "Desarrollo Web";
        const headline = matterResult.data.subtitle || matterResult.data.title || filename;
        const description = matterResult.data.description || headline;
        const date = matterResult.data.date || "";
        let image = matterResult.data.image || "";

        if (image === "./css1.png") {
          image = "./css.png";
        }

        return {
          title: category,
          subtitle: headline,
          description: description,
          slug: filename,
          date: date,
          image: image,
          likes: matterResult.data.likes || 0,
        };
      } catch (e) {
        return null;
      }
    })
    .filter((p): p is PostMetadata => p !== null && Boolean(p.slug));

  // Sort posts strictly from newest (2026) to oldest (2024/2023)
  posts.sort((a, b) => getDate(b.date) - getDate(a.date));

  return posts;
};

export default getPostMetaData;
