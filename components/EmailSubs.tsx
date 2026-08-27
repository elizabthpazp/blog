"use client";

import { useRef, useState, useEffect } from "react";
import { useSubscribe } from "../app/hooks";
import siteData from "../app/site.config"; 
import Link from "next/link";
import "../styles/newsletter.css"

const emailRegex = new RegExp(
  "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
);

export default function EmailSubs({
  title, description, error, thanks, incorrectEmail, thanksShort, btnSubscribe,
}: {
  title: string; description: string; error: string; thanks: string; incorrectEmail: string; thanksShort: string; btnSubscribe: string; 
}) {
  const [msg, setMsg] = useState<string>("");
  const [showErrorMsg, setShowErrorMsg] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const { subscribe, isError, isSuccess } = useSubscribe();

  useEffect(() => {
    if (isError) {
      setShowErrorMsg(true);
      setMsg(siteData.inputFeedback?.error ?? error);
    } else if (isSuccess && siteData.confirmEmail) {
      setShowErrorMsg(false);
      setMsg(siteData.inputFeedback?.emailSuccess ?? thanks);
    } else if (isSuccess && !siteData.confirmEmail) {
      setShowErrorMsg(false);
      setMsg(siteData.inputFeedback?.noEmailSuccess ?? thanksShort);
    }
  }, [isError, isSuccess, error, thanks, thanksShort]);

  const handleClick = async () => {
    setShowLoading(true);
    setMsg("");
    const email = emailRef.current?.value;

    if (email && emailRegex.test(email)) {
      setShowErrorMsg(false);
      await subscribe(email);
    } else {
      setShowErrorMsg(true);
      setMsg(siteData.inputFeedback?.incorrectEmail ?? incorrectEmail);
    }

    setShowLoading(false);
  };

  return (
    <div className="my-12 w-full max-w-2xl mx-auto rounded-3xl p-6 sm:p-10 backdrop-blur-xl bg-gradient-to-br from-violet-500/[0.07] via-transparent to-indigo-500/[0.05] border border-violet-500/20 shadow-xl text-center">
      <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
        ✨ {title} ✨
      </h3>
      <p className="mt-3 mb-6 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-lg mx-auto leading-relaxed">
        {description} 💜
      </p>

      <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto items-stretch">
        <input
          type="email"
          placeholder="Your email here"
          className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-[#121520] border border-violet-500/20 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 dark:focus:border-violet-500 transition-all duration-200 text-sm shadow-inner autofill:!bg-white dark:autofill:!bg-[#121520]"
          autoComplete="email"
          ref={emailRef}
          style={{ colorScheme: 'light dark' }}
        /> 
        
        <button
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-md hover:shadow-violet-500/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer flex items-center justify-center min-w-[120px]"
          onClick={handleClick}
          type="button"
        >
          {showLoading ? (
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            btnSubscribe
          )}
        </button> 
      </div>

      {msg && (
        <p className={`text-sm mt-3 font-medium ${showErrorMsg ? "text-rose-500" : "text-emerald-500"}`}>
          {msg}
        </p>
      )}
    </div>
  );
};
