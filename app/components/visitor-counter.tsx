"use client";

import { useEffect, useState } from "react";

// Helper hook for animating numbers
function useAnimatedCount(endValue: number | null, duration: number = 2000) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (endValue === null) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo curve for smooth deceleration
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.floor(ease * endValue));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setValue(endValue);
      }
    };
    window.requestAnimationFrame(step);
  }, [endValue, duration]);

  return value;
}

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const animatedCount = useAnimatedCount(count, 1500);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only increment once per session to avoid artificial inflation during development/navigation
    const hasVisited = sessionStorage.getItem("hasVisited");
    
    const fetchCounter = async () => {
      try {
        const url = hasVisited 
          ? "/api/visitor-count?action=get" // Just get count
          : "/api/visitor-count?action=up"; // Increment and get count

        const response = await fetch(url);
        const data = await response.json();
        
        if (data && data.count) {
          setCount(data.count);
          if (!hasVisited) {
            sessionStorage.setItem("hasVisited", "true");
          }
        }
      } catch (error) {
        console.error("Failed to fetch visitor count:", error);
      }
    };

    fetchCounter();
  }, []);

  // Handle animation sequence once data is loaded
  useEffect(() => {
    if (count !== null) {
      // Trigger slide-in shortly after data is ready
      const t1 = setTimeout(() => setShow(true), 100);
      // Trigger slide-out after a comfortable reading duration (5 seconds)
      const t2 = setTimeout(() => setShow(false), 5000);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [count]);

  return (
    <div
      className={`fixed top-24 z-50 transition-all duration-700 ease-out ${
        show ? "right-4 opacity-100 translate-x-0" : "-right-full opacity-0 translate-x-10"
      }`}
    >
      <div className="group relative inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-black/40 px-3.5 py-1.5 text-xs font-medium text-slate-100 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-cyan-500/30 hover:bg-white/5 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] cursor-default">
        {/* Background glow on hover */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-purple-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Icon with pulsing indicator */}
        <div className="relative flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400 group-hover:text-cyan-300 transition-colors drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          {/* Only show pinging dot when loading or loaded */}
          {count === null ? (
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-slate-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-slate-500"></span>
            </span>
          ) : (
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
            </span>
          )}
        </div>

        {/* Text Context */}
        <span className="relative z-10 flex items-center gap-1.5">
          <span className="text-slate-400 group-hover:text-slate-300 transition-colors">Total Visitors</span>
          <span className="font-mono text-white group-hover:text-cyan-50 font-bold tracking-tight tabular-nums min-w-[20px] text-right">
            {count === null ? "..." : animatedCount.toLocaleString()}
          </span>
        </span>
      </div>
    </div>
  );
}
