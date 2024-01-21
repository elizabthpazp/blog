"use client";

import 'highlight.js/styles/night-owl.css';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import { useEffect } from 'react';
import CopyButtonPlugin from 'highlightjs-copy/dist/highlightjs-copy.min.js';
import 'highlightjs-copy/dist/highlightjs-copy.min.css';
hljs.registerLanguage('javascript', javascript);
hljs.addPlugin(new CopyButtonPlugin({
    lang: "en",  
  }));
 
export default function CodeHighlight(code: any) {
    useEffect(() => {
        hljs.initHighlighting();
    }, []); 
  return (  
    <div className='flex mt-6 flex-1 w-full flex-col items-center justify-center'>
    <pre><code className="js" style={{borderRadius: '22px', padding: '30px'}}>
    {code?.code}
    </code> 
    </pre> 
    </div>
  );
}
