"use client";

import { useState } from "react";

export default function CopyCode(code: any) {
  let [showCopy, setCopy] = useState(false);

  const copyCode = () => {
    const selection = window.getSelection();
    const range = document.createRange();
    const textToCopy: any = document.getElementsByClassName("textToCopy");

    var i = 0;
    while (i <= 9) {
      if (textToCopy[i].textContent == code?.code) {
        range?.selectNodeContents(textToCopy[i]);
        selection?.removeAllRanges();
        selection?.addRange(range);
        const successful = document.execCommand("copy");
        if (successful) {
          setCopy((showCopy = true));
        }
        window?.getSelection()?.removeAllRanges();
        i = 9;
      } else i++;
    }
  };
  return (
    <button className="copyButton ml-10" onClick={() => copyCode()}>
      {" "}
      📋{" "}
      <span style={showCopy ? { display: "block" } : { display: "none" }}>
        Copied!
      </span>
    </button>
  );
}
