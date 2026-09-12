import React from 'react';

export default function TitleSection() {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center my-2 sm:my-4 px-2 relative z-20 select-none">
      {/* Title Container */}
      <div className="relative flex flex-col items-center leading-none">
        
        {/* WORD 1: Siniar */}
        <div className="relative">
          {/* Black shadow layer */}
          <h1 
            className="font-['Mochiy_Pop_P_One'] text-6xl sm:text-7xl tracking-wide absolute top-2 left-1 text-black select-none pointer-events-none"
            style={{
              WebkitTextStroke: '12px black',
              paintOrder: 'stroke fill',
            }}
          >
            Siniar
          </h1>

          {/* White outline layer */}
          <h1 
            className="font-['Mochiy_Pop_P_One'] text-6xl sm:text-7xl tracking-wide absolute top-0 left-0 text-white select-none pointer-events-none"
            style={{
              WebkitTextStroke: '7px white',
              paintOrder: 'stroke fill',
            }}
          >
            Siniar
          </h1>

          {/* Orange fill front layer */}
          <h1 
            className="font-['Mochiy_Pop_P_One'] text-6xl sm:text-7xl tracking-wide relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-[#FFAA00] via-[#FF8800] to-[#E65100]"
            style={{
              filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.6))',
            }}
          >
            Siniar
          </h1>
        </div>

        {/* WORD 2: SHOW */}
        <div className="relative -mt-2 sm:-mt-3">
          {/* Black shadow layer */}
          <h1 
            className="font-['Mochiy_Pop_P_One'] text-7xl sm:text-8xl tracking-wider absolute top-2 left-1 text-black select-none pointer-events-none"
            style={{
              WebkitTextStroke: '14px black',
              paintOrder: 'stroke fill',
            }}
          >
            SHOW
          </h1>

          {/* White outline layer */}
          <h1 
            className="font-['Mochiy_Pop_P_One'] text-7xl sm:text-8xl tracking-wider absolute top-0 left-0 text-white select-none pointer-events-none"
            style={{
              WebkitTextStroke: '8px white',
              paintOrder: 'stroke fill',
            }}
          >
            SHOW
          </h1>

          {/* Yellow-Orange fill front layer */}
          <h1 
            className="font-['Mochiy_Pop_P_One'] text-7xl sm:text-8xl tracking-wider relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-[#FFF59D] via-[#FFCA28] to-[#FF8F00]"
            style={{
              filter: 'drop-shadow(0px 6px 10px rgba(0,0,0,0.8))',
            }}
          >
            SHOW
          </h1>
        </div>

        {/* Tagline Badge under title */}
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/70 border border-yellow-400/40 backdrop-blur-xs shadow-lg">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
          <span className="font-['Oswald'] text-xs uppercase tracking-widest text-yellow-300 font-medium">
            Live Concert & Podcast Event
          </span>
        </div>

      </div>
    </div>
  );
}
