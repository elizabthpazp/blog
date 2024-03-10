"use client";

import { useState } from "react";

export default function CopyCode(code: any) {
  let [showCopy, setCopy] = useState(false);

  const copyCode = () => {
    navigator.clipboard
      .writeText(code?.code?.code)
      .then(() => {
        setCopy((showCopy = true));
      })
      .catch((err) => {
        console.error("Error al copiar al portapapeles:", err);
      });
  };
  return (
    <button onClick={() => copyCode()} className="btn-copy flex">
      {" "}
      <span style={!showCopy ? { display: "block" } : { display: "none" }}>
       Copy
      </span> 
      📋{" "}
      <span style={showCopy ? { display: "block" } : { display: "none" }}>
        Copied!
      </span>
    </button>
  );
}
