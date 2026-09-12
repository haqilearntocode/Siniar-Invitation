import React, { useState, useEffect } from 'react';

export default function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2 font-['Bebas_Neue'] tracking-wider text-white">
      <div className="flex flex-col items-center bg-black/50 border border-white/10 rounded px-2 py-1 min-w-[42px]">
        <span className="text-xl sm:text-2xl font-bold leading-none text-yellow-400">
          {String(timeLeft.days).padStart(2, '0')}
        </span>
        <span className="text-[9px] font-['Montserrat'] uppercase tracking-widest text-neutral-400 mt-0.5">
          HARI
        </span>
      </div>
      <span className="text-yellow-400 font-bold text-lg leading-none">:</span>

      <div className="flex flex-col items-center bg-black/50 border border-white/10 rounded px-2 py-1 min-w-[42px]">
        <span className="text-xl sm:text-2xl font-bold leading-none text-yellow-400">
          {String(timeLeft.hours).padStart(2, '0')}
        </span>
        <span className="text-[9px] font-['Montserrat'] uppercase tracking-widest text-neutral-400 mt-0.5">
          JAM
        </span>
      </div>
      <span className="text-yellow-400 font-bold text-lg leading-none">:</span>

      <div className="flex flex-col items-center bg-black/50 border border-white/10 rounded px-2 py-1 min-w-[42px]">
        <span className="text-xl sm:text-2xl font-bold leading-none text-yellow-400">
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span className="text-[9px] font-['Montserrat'] uppercase tracking-widest text-neutral-400 mt-0.5">
          MENIT
        </span>
      </div>
      <span className="text-yellow-400 font-bold text-lg leading-none">:</span>

      <div className="flex flex-col items-center bg-black/50 border border-white/10 rounded px-2 py-1 min-w-[42px]">
        <span className="text-xl sm:text-2xl font-bold leading-none text-red-500 animate-pulse">
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
        <span className="text-[9px] font-['Montserrat'] uppercase tracking-widest text-neutral-400 mt-0.5">
          DETIK
        </span>
      </div>
    </div>
  );
}
