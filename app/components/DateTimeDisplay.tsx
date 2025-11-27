/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";

export default function DateTimeDisplay() {
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return <div className="h-20 mb-8"></div>;

  const dateString = date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const timeString = date.toLocaleTimeString("id-ID", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="flex flex-col items-center gap-2 mb-8 font-mono select-none">
      <div className="text-sm md:text-base text-blue-600 dark:text-cyan-400 font-medium tracking-widest uppercase drop-shadow-sm dark:drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-colors duration-300">
        {dateString}
      </div>
      <div className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-400 tracking-widest drop-shadow-sm dark:drop-shadow-[0_0_10px_rgba(74,222,128,0.5)] transition-colors duration-300">
        {timeString}
      </div>
    </div>
  );
}
