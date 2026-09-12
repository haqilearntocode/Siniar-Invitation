import React from 'react';

export default function HeaderSection() {
  return (
    <div className="w-full pt-6 pb-2 px-4 flex flex-col items-center justify-center text-center relative z-20">
      {/* Top Logo Graphic */}
      <div className="flex flex-col items-center group cursor-pointer">
        <div className="flex items-center justify-center gap-1">
          <svg className="w-6 h-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 5 35 L 20 5 L 35 35 H 26 L 20 20 L 14 35 H 5 Z" fill="currentColor" />
            <path d="M 20 23 L 26 35 H 14 L 20 23 Z" fill="#FF9900" />
          </svg>
        </div>
        
        {/* Brand Sub-label */}
        <span className="text-[10px] font-['Oswald'] tracking-[0.35em] text-neutral-200 uppercase font-semibold mt-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
          - NETWORK -
        </span>
      </div>

      {/* Presenter Text */}
      <div className="mt-3 flex items-center justify-center gap-2">
        <div className="h-[1px] w-6 bg-gradient-to-r from-transparent to-yellow-400 opacity-80"></div>
        <p className="font-['Oswald'] text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          KKP Network Presents
        </p>
        <div className="h-[1px] w-6 bg-gradient-to-l from-transparent to-yellow-400 opacity-80"></div>
      </div>
    </div>
  );
}
