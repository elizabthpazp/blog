"use client";

import 'highlight.js/styles/night-owl.css';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import { useEffect, useState } from 'react';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', xml);
 
export default function CodeHighlight({ code, language = 'javascript' }: { code: any; language?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    hljs.highlightAll();
  }, [code]);

  const handleCopy = () => {
    const rawText = typeof code === 'string' ? code : String(code || '');
    navigator.clipboard.writeText(rawText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="code-block my-6 w-full max-w-full sm:max-w-4xl mx-auto rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl bg-[#011627] text-left min-w-0">
      {/* macOS Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0b1320] border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <span className="ml-2 text-xs font-mono text-gray-400 uppercase tracking-wider">
            {language}
          </span>
        </div>

        <button
          onClick={handleCopy}
          type="button"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-150 active:scale-95"
          title="Copy code"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-emerald-400 font-semibold">Copiado</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body - scroll interno, nunca desborda página | fix mobile: no bloquea scroll vertical */}
      <pre
        className="!p-4 sm:!p-6 !m-0 !bg-transparent overflow-x-auto max-w-full text-sm font-mono leading-relaxed text-[#d6deeb] overscroll-x-contain"
        style={{ WebkitOverflowScrolling: 'touch', overscrollBehaviorX: 'contain', touchAction: 'pan-x pan-y' } as any}
      >
        <code className={`${language} whitespace-pre max-w-none !bg-transparent`}>
          {code}
        </code>
      </pre>
    </div>
  );
}
