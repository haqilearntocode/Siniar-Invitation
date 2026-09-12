import React from 'react';

export default function SilhouetteVisual({ dateText = "10/12", yearText = "2026" }) {
  return (
    <div className="relative w-full h-[320px] sm:h-[360px] flex items-end justify-center pointer-events-none select-none">
      
      {/* Background Stage/Plant Silhouettes */}
      <div className="absolute bottom-0 w-full flex justify-center items-end opacity-90 z-0">
        <svg viewBox="0 0 500 200" className="w-full h-auto max-h-[160px] fill-black" preserveAspectRatio="none">
          {/* Foliage/Abstract Cutouts */}
          <path d="M 20 200 C 30 140, 50 120, 70 200 M 60 200 C 70 110, 90 90, 110 200 M 140 200 C 150 130, 170 110, 180 200 M 210 200 C 230 100, 260 80, 290 200 M 320 200 C 340 120, 360 100, 380 200 M 410 200 C 430 130, 450 110, 470 200" stroke="#000" strokeWidth="12" strokeLinecap="round" />
          <rect x="0" y="140" width="500" height="60" fill="#000000" />
        </svg>
      </div>

      {/* Left Date Badge (Chalk Circle "10/12") */}
      <div className="absolute left-4 sm:left-6 bottom-24 sm:bottom-28 z-20 pointer-events-auto transition-transform hover:scale-110 duration-200">
        <div className="relative flex items-center justify-center px-4 py-2 bg-black/60 backdrop-blur-xs rounded-[45%_55%_60%_40%/50%_45%_55%_50%] border-2 border-dashed border-white/90 shadow-[0_0_15px_rgba(0,0,0,0.8)] rotate-[-6deg]">
          <span className="font-['Bebas_Neue'] text-2xl sm:text-3xl text-white tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
            {dateText}
          </span>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
        </div>
      </div>

      {/* Right Year Badge (Chalk Circle "2026") */}
      <div className="absolute right-4 sm:right-6 bottom-20 sm:bottom-24 z-20 pointer-events-auto transition-transform hover:scale-110 duration-200">
        <div className="relative flex items-center justify-center px-4 py-2 bg-black/60 backdrop-blur-xs rounded-[55%_45%_40%_60%/45%_55%_45%_55%] border-2 border-dashed border-white/90 shadow-[0_0_15px_rgba(0,0,0,0.8)] rotate-[8deg]">
          <span className="font-['Bebas_Neue'] text-2xl sm:text-3xl text-white tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
            {yearText}
          </span>
        </div>
      </div>

      {/* Two Men Silhouette (Back View Vector) */}
      <div className="relative z-10 w-full max-w-[340px] sm:max-w-[380px] h-[260px] sm:h-[300px] flex justify-between items-end px-2">
        {/* Man 1 (Left Silhouette) */}
        <div className="w-1/2 h-full relative flex justify-center items-end">
          <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]" preserveAspectRatio="xMidYMax meet">
            <g fill="#0a0a0a">
              {/* Head */}
              <ellipse cx="100" cy="55" rx="26" ry="32" fill="#050505" />
              {/* Hair outline */}
              <path d="M 72 50 C 70 30, 95 20, 120 28 C 128 35, 125 60, 120 62 C 100 65, 80 65, 72 50 Z" fill="#000" />
              {/* Neck & Shoulders */}
              <path d="M 85 80 L 115 80 L 145 105 L 155 150 L 142 220 L 138 300 L 62 300 L 58 220 L 45 150 L 55 105 Z" fill="#0a0a0a" />
              {/* Arms on hips pose details */}
              <path d="M 55 105 C 40 130, 30 160, 42 195 C 48 200, 62 190, 68 165 Z" fill="#000000" />
              <path d="M 145 105 C 160 130, 170 160, 158 195 C 152 200, 138 190, 132 165 Z" fill="#000000" />
              {/* T-Shirt fold vector lines */}
              <path d="M 65 110 Q 100 130 135 110" stroke="#1c1c1c" strokeWidth="3" fill="none" />
              <path d="M 60 210 Q 100 225 140 210" stroke="#1c1c1c" strokeWidth="4" fill="none" />
              {/* Pants/Jeans gap */}
              <path d="M 98 225 L 98 300" stroke="#000000" strokeWidth="6" />
            </g>
          </svg>
        </div>

        {/* Man 2 (Right Silhouette) */}
        <div className="w-1/2 h-full relative flex justify-center items-end">
          <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]" preserveAspectRatio="xMidYMax meet">
            <g fill="#0a0a0a">
              {/* Head */}
              <ellipse cx="100" cy="58" rx="25" ry="30" fill="#050505" />
              {/* Hair outline */}
              <path d="M 74 52 C 72 32, 98 22, 124 30 C 130 38, 126 62, 122 64 Z" fill="#000" />
              {/* Neck & Shoulders (slightly broader relaxed stance) */}
              <path d="M 84 82 L 116 82 L 152 108 L 160 155 L 146 225 L 140 300 L 60 300 L 54 225 L 40 155 L 48 108 Z" fill="#080808" />
              {/* Right arm on waist */}
              <path d="M 152 108 C 168 135, 175 168, 160 200 C 154 204, 140 192, 136 168 Z" fill="#000" />
              <path d="M 48 108 C 32 135, 25 168, 40 200 C 46 204, 60 192, 64 168 Z" fill="#000" />
              {/* Shirt wrinkles */}
              <path d="M 62 115 Q 100 135 138 115" stroke="#1a1a1a" strokeWidth="3" fill="none" />
              <path d="M 56 215 Q 100 230 144 215" stroke="#1a1a1a" strokeWidth="4" fill="none" />
              <path d="M 100 228 L 100 300" stroke="#000000" strokeWidth="6" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
