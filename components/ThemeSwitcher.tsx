"use client";

import {useTheme} from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const getStroke=()=>{return theme == 'dark' ? '#fff' : 'black'}
  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null
 
  return ( 
        <button className="themeSwitch" onClick={() => setTheme(theme=='dark' ? 'light' : 'dark')}>
         <svg viewBox="0 0 24 24" width="35" height="35" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="6" stroke={getStroke()} ></circle> <path d="M12 2V3" stroke={getStroke()} ></path> <path d="M12 21V22" stroke={getStroke()} ></path> <path d="M22 12L21 12" stroke={getStroke()}  ></path> <path d="M3 12L2 12" stroke={getStroke()} ></path> <path d="M19.0708 4.92969L18.678 5.32252" stroke={getStroke()}  ></path> <path d="M5.32178 18.6777L4.92894 19.0706" stroke={getStroke()} ></path> <path d="M19.0708 19.0703L18.678 18.6775" stroke={getStroke()} ></path> <path d="M5.32178 5.32227L4.92894 4.92943" stroke={getStroke()} ></path> </g></svg>
        </button>     
  )
};