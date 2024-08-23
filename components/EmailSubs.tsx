"use client";

import { useRef, useState, useEffect } from "react";
import { useSubscribe } from "../app/hooks";
import siteData from "../app/site.config"; 
import Link from "next/link";
import "../styles/newsletter.css"

const emailRegex = new RegExp(
  "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
);

export default function EmailSubs ({
  title, description, error, thanks, incorrectEmail, thanksShort, btnSubscribe ,
}: {
 title: string, description: string, error: string, thanks: string, incorrectEmail: string, thanksShort: string, btnSubscribe: string 
})  {
  const [msg, setMsg] = useState<string>("");
  const [showErrorMsg, setShowErrorMsg] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const { subscribe, isError, isSuccess } = useSubscribe();

  useEffect(() => {
    if (isError) {
      setShowErrorMsg(true);
      setMsg(
        siteData.inputFeedback?.error ?? error
      );
    } else if (isSuccess && siteData.confirmEmail) {
      setShowErrorMsg(false);
      setMsg(
        siteData.inputFeedback?.emailSuccess ??
        thanks
      );
    } else if (isSuccess && !siteData.confirmEmail) {
      setShowErrorMsg(false);
      setMsg(
        siteData.inputFeedback?.noEmailSuccess ?? thanksShort
      );
    }
  }, [isError, isSuccess]);

  const handleClick = async () => {
    setShowLoading(true);
    setMsg("");
    const email = emailRef.current?.value;

    if (email ) {//&& emailRegex.test(email)
      setShowErrorMsg(false);
      await subscribe(email);
    } else {
      setShowErrorMsg(true);
      setMsg(
        siteData.inputFeedback?.incorrectEmail ??
        incorrectEmail
      );
    }

    setShowLoading(false);
  };

  return (
    <div className="justify-center p-10 border-2 border border-gray-400 light:border-gray-400 dark:border-gray-700 text-center mb-16 mt-16" style={{borderRadius: "40px"}}>
      <div className="flex-row p-0 justify-center text-center">
        <div className="text-center justify-center text-center">
         <h1 className="mx-auto light:text-gray-800 text-center dark:text-white max-w-xl font-display text-3xl font-bold text-gray-800">
          {title}
         </h1>
          <p className="my-4 text-center px-4 mx-auto max-w-xl text-lg light:text-gray-600 dark:text-gray-400">{description} 💜</p>
          <div className="flex flex-row sm:flex-col xs:flex-col md:flex-row xl:flex-row lg:flex-row gap-3 justify-center text-center">
          <div className="justify-center mt-3">
            <input
              type="email"
              placeholder="Your email here"
              className="input2 text-gray-800 light:text-gray-800 dark:text-white shadow-xl"
              autoComplete="email"
              ref={emailRef}
            /> 
          
          </div>
          <div
          className="bg-violet-600 cursor-pointer blog-animation rounded-2xl text-white font-medium p-3 mt-4 hover:bg-violet-500 text-center justify-center md:mx-0 xl:mx-0 lg:mx-0 sm:mx-20 xs:mx-20"
           onClick={handleClick}
        >
           {showLoading ? (
                <span className="animate-spin text-white">.....</span>
              ) : (
          btnSubscribe
          )}
        </div> 
        </div>
          <p
            className={`text-sm mt-1.5 justify-center justify-center ${
              showErrorMsg ? "text-rose-600" : "text-green-600"
            }`}
          >
            {msg}
          </p>
        </div>
      </div>
    </div>
  );
};
