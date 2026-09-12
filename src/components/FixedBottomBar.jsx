import React from 'react';
import CountdownTimer from './CountdownTimer';

export default function FixedBottomBar({ targetDate, onOpenRsvp }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-40 bg-black/85 backdrop-blur-lg border-t border-white/15 px-3 py-3 sm:px-4 sm:py-3.5 flex flex-col gap-2.5 items-center justify-center shadow-[0_-15px_30px_rgba(0,0,0,0.9)]">
      
      {/* Timer Section Label */}
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
        <span className="font-['Oswald'] text-[11px] tracking-[0.2em] text-neutral-300 uppercase font-medium">
          COUNTDOWN TO LIVE SHOW
        </span>
      </div>

      {/* Live Countdown Timer */}
      <CountdownTimer targetDate={targetDate} />

      {/* CTA Button */}
      <button
        onClick={onOpenRsvp}
        className="w-full py-3 px-6 bg-gradient-to-r from-[#FF9900] via-[#FF8800] to-[#E65100] hover:from-[#FFAA00] hover:to-[#FF6D00] text-black font-['Bebas_Neue'] text-2xl tracking-widest uppercase rounded-xl font-extrabold shadow-[0_0_20px_rgba(255,153,0,0.5)] transform active:scale-95 transition-all flex items-center justify-center gap-2 border border-yellow-300/40"
      >
        <span>RSVP SEKARANG</span>
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
