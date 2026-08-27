"use client"  
import { useEffect, useState } from "react"; 
import { links } from "../links-web";  
import { getLikesPage } from "../get-likes-post";

export default function LikeCount({ 
  slug, 
  title, 
  animation 
}: { 
  slug: any; 
  title: string; 
  animation: boolean; 
}) {  
  const [count2, setCount] = useState(0); 
  const [isFirst, setFirst] = useState(false);  
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const count = await getLikesPage(slug);
        setFirst(count === undefined || count === 0);
        setCount(count || 0);
      } catch {
        setFirst(true);
        setCount(0);
      }
      try {
        if (typeof window !== 'undefined' && localStorage.getItem(`liked:${slug}`)) {
          setIsLiked(true);
        }
      } catch {}
    })();
  }, [slug]);
   
  const insertLike = async () => {   
    if (isLiked) return;
    const nextCount = count2 + 1;
    // optimista
    setCount(nextCount);
    setIsLiked(true);
   
    try {
      const res = await fetch(`/api/post?id=${encodeURIComponent(slug)}&count=${nextCount}&first=${isFirst}`, {
        cache: 'no-store',
        method: 'POST',
      });
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      // tras primer like exitoso, ya no es first
      setFirst(false);
      // opcional: persistir para evitar doble voto en este navegador
      try { localStorage.setItem(`liked:${slug}`, '1'); } catch {}
    } catch (e) {
      // revertir en caso de error (Failed to fetch por CORS/DB)
      console.error('insertLike failed', e);
      setCount((c) => Math.max(0, c - 1));
      setIsLiked(false);
    }
  };
 
  return ( 
    <button 
      type="button"
      onClick={insertLike}
      className={`group flex items-center gap-2 px-3.5 py-2 rounded-2xl backdrop-blur-xl bg-white/70 dark:bg-[#161926]/70 border border-black/10 dark:border-white/10 hover:border-violet-500 shadow-md hover:shadow-violet-500/20 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
        isLiked ? 'border-pink-500/50 bg-pink-500/10' : ''
      }`}
      title="Like this article"
    > 
      <img
        alt="like"
        title="like"
        src={links.iconLike}
        className={`w-6 h-6 object-contain forcedImage transition-transform duration-300 ${
          animation ? 'group-hover:scale-125' : ''
        } ${isLiked ? 'animate-bounce' : ''}`}
        width={24}
        height={24} 
      /> 
      <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">
        {count2}
      </span>
    </button>
  );
}
