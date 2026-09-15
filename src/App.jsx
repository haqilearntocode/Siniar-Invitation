import { useState, useEffect, useRef } from 'react';
import { Home, Users, Calendar, Play, Pause, MapPin, Sparkles, Radio, Mic, Star, Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { parse, formatRgb } from 'culori';

import siniarbg from './assets/Element/Latar Belakang Siniar fix.png';
import siniarLogo from './assets/Element/Logo Siniar Show.png';

export default function App() {
  // References
  const audioRef = useRef(null);
  const coverRef = useRef(null);
  
  // Logic State
  const [isOpened, setIsOpened] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [guestName, setGuestName] = useState('teman teman');
  const [isGenerating, setIsGenerating] = useState(false);

  // Initialize Audio Element
  useEffect(() => {
    audioRef.current = new Audio('/Audio/Musica instrumental Copa America 2021 _ _La Gozadera_ OFICIAL.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.6;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Toggle Play/Pause Function
  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log('Audio play failed:', err));
    }
    setIsPlaying(!isPlaying);
  };

  // Handle Open Invitation (Play Audio + Open)
  const handleOpenInvitation = () => {
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log('Audio play failed:', err));
      setIsPlaying(true);
    }
  };

  // Convert oklch/oklab color strings to rgb using culori
  const convertColorValue = (colorStr) => {
    if (!colorStr || (!colorStr.includes('oklch') && !colorStr.includes('oklab'))) return colorStr;
    
    let result = colorStr;
    
    // Convert all oklch(...) and oklab(...) occurrences
    result = result.replace(/ok(?:lch|lab)\([^)]+\)/g, (match) => {
      try {
        const parsed = parse(match);
        if (!parsed) return match;
        const rgb = formatRgb(parsed);
        return rgb || match;
      } catch (err) {
        console.warn('[Color Conversion Failed]', match, err);
        return match;
      }
    });
    
    return result;
  };

  // Handle Generate and Share Invitation
  const handleShareInvitation = async (e) => {
    e.stopPropagation();
    if (!coverRef.current || isGenerating) return;
    
    setIsGenerating(true);
    try {
      const element = coverRef.current;
      const canvas = await html2canvas(element, { 
        backgroundColor: '#000000', 
        scale: 2, 
        useCORS: true, 
        logging: false,
        onclone: (clonedDoc) => {
          const clonedWindow = clonedDoc.defaultView || window;

          // Properties that can contain color or gradients
          const colorProperties = [
            'color',
            'background-color',
            'border-color',
            'border-top-color',
            'border-right-color',
            'border-bottom-color',
            'border-left-color',
            'outline-color',
            'text-decoration-color',
            'fill',
            'stroke',
            'box-shadow',
            'text-shadow',
            'background-image',
            'border-image-source'
          ];

          // Normalize all elements in the cloned document
          const allElements = clonedDoc.querySelectorAll('*');
          allElements.forEach((el) => {
            const computed = clonedWindow.getComputedStyle(el);

            colorProperties.forEach((prop) => {
              const val = computed.getPropertyValue(prop);
              if (val && (val.includes('oklch') || val.includes('oklab'))) {
                const converted = convertColorValue(val);
                if (converted !== val) {
                  el.style.setProperty(prop, converted, 'important');
                }
              }
            });

            // Check inline styles
            const inlineStyle = el.getAttribute('style');
            if (inlineStyle && (inlineStyle.includes('oklch') || inlineStyle.includes('oklab'))) {
              const convertedInline = convertColorValue(inlineStyle);
              el.setAttribute('style', convertedInline);
            }
          });

          // Final verification - ensure no oklch/oklab remains
          let remainingOklch = 0;
          allElements.forEach((el) => {
            const computed = clonedWindow.getComputedStyle(el);
            colorProperties.forEach((prop) => {
              const val = computed.getPropertyValue(prop);
              if (val && (val.includes('oklch') || val.includes('oklab'))) {
                console.error('[OKLCH Still Present]', el.tagName, prop, ':', val);
                remainingOklch++;
              }
            });
          });

          if (remainingOklch > 0) {
            console.warn(`[Warning] ${remainingOklch} oklch/oklab properties remain in cloned DOM`);
          }

          // Adjust greeting positioning for capture image only
          const greetingH1 = clonedDoc.querySelector('h1');
          if (greetingH1 && greetingH1.textContent.includes('Halo')) {
            greetingH1.style.transform = 'translateY(-8px)';
          }
        }
      });

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png', 1.0));
      if (!blob) throw new Error('Blob gagal dibuat');

      const file = new File([blob], 'Undangan-Siniar-SHOW.png', { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ 
          files: [file], 
          title: 'Undangan Siniar SHOW',
          text: `Halo! Saya mengundang Anda ke acara Siniar SHOW. Cek undangannya di sini!`
        });
      } else {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Undangan-Siniar-SHOW.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(url), 100);
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Share error:', error);
        alert('Gagal membagikan undangan. Silakan coba lagi.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  // Countdown timer state targeting Dec 10, 2026
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Extract ?to= parameter from URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const toParam = params.get('to');
      if (toParam && toParam.trim() !== '') {
        setGuestName(toParam.trim());
      }
    }
  }, []);

  // Countdown timer logic
  useEffect(() => {
    const targetDate = new Date('2026-12-10T19:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

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

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Tab Switching with Transition Animation
  const handleTabChange = (newTab) => {
    if (newTab === activeTab || isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(newTab);
      setIsAnimating(false);
    }, 200);
  };

  return (
    <div className="fixed inset-0 w-full h-[100dvh] bg-black flex justify-center items-center font-sans antialiased text-white select-none overflow-hidden m-0 p-0">
      
        {/* Desktop Background Blur */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-80 filter blur-xl scale-105 pointer-events-none"
          style={{ backgroundImage: `url(${siniarbg})` }}
        ></div>

        {/* ---------------- MOBILE FRAME CONTAINER ---------------- */}
        <div className="max-w-md mx-auto w-full h-[100dvh] relative bg-black text-white overflow-hidden shadow-2xl flex flex-col justify-between m-0 p-0 border-none">
          
          {/* Global Background Image */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
            style={{ backgroundImage: `url(${siniarbg})` }}
          ></div>
          
          {/* Vignette Overlay (Dark edges) */}
          <div className="absolute inset-0 w-full h-full bg-radial-vignette z-[5] pointer-events-none"></div>

          {/* Optional Noise Overlay */}
          <div className="absolute inset-0 w-full h-full bg-noise mix-blend-overlay opacity-25 z-[6] pointer-events-none"></div>


          {/* ================= 1. COVER SCREEN ================= */}
          <div 
            ref={coverRef}
            data-capture="cover"
            className={`absolute inset-0 w-full h-full z-[60] bg-black flex flex-col items-center justify-center p-6 text-center transition-transform duration-700 ease-in-out ${
              isOpened ? '-translate-y-full pointer-events-none' : 'translate-y-0'
            }`}
          >
            {/* Cover Background */}
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none opacity-80"
              style={{ backgroundImage: `url(${siniarbg})` }}
            ></div>
            <div className="absolute inset-0 w-full h-full bg-radial-vignette pointer-events-none"></div>
            <div className="absolute inset-0 w-full h-full bg-black/40 backdrop-blur-xs pointer-events-none"></div>
            <div className="absolute inset-0 w-full h-full bg-noise mix-blend-overlay opacity-30 pointer-events-none"></div>

            {/* Official Logo Banner in Cover */}
            <div className="relative mb-4 z-10 flex flex-col items-center">
              <img 
                src={siniarLogo} 
                alt="Logo Siniar Show" 
                className="w-64 max-w-[85%] drop-shadow-[0_10px_30px_rgba(0,0,0,0.95)] animate-pulse -rotate-2 hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Greeting Container */}
            <div className="relative bg-neutral-900/90 border-2 border-yellow-500/50 p-6 rounded-2xl shadow-[6px_6px_0_rgba(0,0,0,1)] -rotate-1 max-w-xs w-full mb-6 z-10 backdrop-blur-md">
              <span className="font-['Oswald'] text-xs uppercase tracking-[0.35em] text-yellow-400 font-extrabold block mb-2">
                OFFICIAL INVITATION
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold italic text-yellow-400 tracking-tight drop-shadow-[3px_3px_0_rgba(0,0,0,1)] -rotate-1">
                Halo, {guestName}!
              </h1>
              <p className="text-gray-300 text-xs leading-relaxed mt-2 font-['Montserrat'] italic">
                Kamu diundang secara eksklusif untuk hadir di acara live podcast kami.
              </p>
            </div>

            {/* Actions Buttons */}
            <div data-html2canvas-ignore="true" className="flex flex-col gap-3 w-full max-w-xs z-10">
              <button
                onClick={handleOpenInvitation}
                className="w-full py-4 px-8 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black font-['Bebas_Neue'] text-2xl tracking-widest uppercase font-extrabold italic rounded-2xl shadow-[6px_6px_0_rgba(0,0,0,1)] animate-pulse active:scale-95 active:shadow-none transition-all border-2 border-black flex items-center justify-center gap-2 cursor-pointer rotate-1"
              >
                <span>BUKA UNDANGAN</span>
                <Sparkles className="w-6 h-6" />
              </button>
              <button
                onClick={handleShareInvitation}
                className="w-full py-3 px-6 bg-transparent border-2 border-yellow-400 text-yellow-400 font-['Bebas_Neue'] text-xl tracking-widest uppercase font-extrabold rounded-2xl shadow-[6px_6px_0_rgba(0,0,0,1)] active:scale-95 transition-all flex items-center justify-center gap-2 rotate-1"
              >
                <Share2 className="w-5 h-5" />
                <span>{isGenerating ? 'Memproses...' : 'POST YOUR INVITE!'}</span>
              </button>
            </div>
          </div>


        {/* ================= 2. FLOATING AUDIO CONTROLS (z-[40]) ================= */}
        <div className="absolute bottom-28 right-4 z-[40] flex flex-col gap-2.5 items-center">
          
          {/* Play / Pause Toggle Button */}
          <button
            onClick={toggleAudio}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 p-[2px] shadow-[4px_4px_0_rgba(0,0,0,1)] active:scale-90 transition-transform cursor-pointer border-2 border-black"
            title={isPlaying ? "Pause" : "Play"}
          >
            <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-yellow-400">
              {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
            </div>
          </button>
        </div>


        {/* ================= 3. TAB CONTENTS WRAPPER WITH ANIMATION (z-10) ================= */}
        <div className="relative z-10 w-full h-full overflow-y-auto pb-32 pt-4 px-4">
          
          <div 
            className={`transition-all duration-300 ease-out transform ${
              isAnimating ? 'opacity-0 translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100'
            }`}
          >

            {/* ---------------- HOME TAB ---------------- */}
            {activeTab === 'home' && (
              <div className="w-full min-h-[70vh] flex flex-col items-center justify-end text-center animate-fadeIn py-6 pb-48">
                
                {/* Information Group: KKP NETWORK PRESENT, LOGO SINIAR SHOW, LIVE PODCAST 2026, Date/Year */}
                <div className="w-full flex flex-col items-center gap-5 transform translate-y-16">
                  
                  {/* 1. KKP NETWORK PRESENT */}
                  <div className="flex flex-col items-center">
                    <div className="bg-white text-black font-extrabold italic px-5 py-2.5 border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] -rotate-2 inline-block rounded-xs">
                      <span className="text-base font-['Oswald'] tracking-[0.25em] uppercase font-bold">
                        KKP NETWORK PRESENTS
                      </span>
                    </div>
                  </div>

                  {/* 2. LOGO SINIAR SHOW */}
                  <img 
                    src={siniarLogo} 
                    alt="Siniar Show Logo" 
                    className="w-[105%] sm:w-[460px] max-w-[95%] drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] -rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-300"
                  />

                  {/* 3. LIVE PODCAST 2026 */}
                  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-yellow-400 text-black border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] -rotate-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-black animate-ping"></span>
                    <span className="font-['Oswald'] text-base uppercase tracking-widest font-bold">
                      Live Podcast 2026
                    </span>
                  </div>

                  {/* 4. Tanggal / Tahun */}
                  <div className="flex flex-row items-center justify-center gap-5">
                    {/* 10/12 Badge */}
                    <div className="px-5 py-2 bg-white text-black font-['Bebas_Neue'] text-4xl tracking-widest rounded-[45%_55%_60%_40%/50%_45%_55%_50%] border-3 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] -rotate-6">
                      10/12
                    </div>

                    {/* 2026 Badge */}
                    <div className="px-5 py-2 bg-white text-black font-['Bebas_Neue'] text-4xl tracking-widest rounded-[55%_45%_40%_60%/45%_55%_45%_55%] border-3 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] rotate-6">
                      2026
                    </div>
                  </div>

                </div>

              </div>
            )}


            {/* ---------------- LINE UP TAB ---------------- */}
            {activeTab === 'lineup' && (
              <div className="w-full min-h-[70vh] flex flex-col items-center justify-center animate-fadeIn py-4">
                
                {/* Ripped Sticker Header */}
                <div className="text-center mb-8">
                  <div className="inline-block bg-yellow-400 text-black px-5 py-2 border-2 border-black rounded-sm shadow-[4px_4px_0_rgba(0,0,0,1)] -rotate-3">
                    <h2 className="font-['Oswald'] text-2xl font-extrabold tracking-widest uppercase italic">
                      THE LINE UP
                    </h2>
                  </div>
                </div>

                {/* 2x2 Grid of Rough Paper Cutout Cards */}
                <div className="grid grid-cols-2 gap-4 w-full">
                  
                  {/* Card 1 */}
                  <div className="relative bg-neutral-900 border-2 border-white/80 p-4 rounded-2xl flex flex-col items-center text-center shadow-[5px_5px_0_rgba(0,0,0,1)] -rotate-2">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-600 p-[2px] mb-2 shadow-md">
                      <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-yellow-400">
                        <Mic className="w-7 h-7" />
                      </div>
                    </div>
                    <h3 className="font-['Montserrat'] font-extrabold text-sm text-white italic">
                      Guest Star 1
                    </h3>
                    <p className="font-['Montserrat'] text-xs text-gray-400 font-bold mt-0.5">
                      Podcast Host
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="relative bg-neutral-900 border-2 border-white/80 p-4 rounded-2xl flex flex-col items-center text-center shadow-[5px_5px_0_rgba(0,0,0,1)] rotate-2">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-orange-500 to-red-600 p-[2px] mb-2 shadow-md">
                      <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-orange-400">
                        <Radio className="w-7 h-7" />
                      </div>
                    </div>
                    <h3 className="font-['Montserrat'] font-extrabold text-sm text-white italic">
                      Guest Star 2
                    </h3>
                    <p className="font-['Montserrat'] text-xs text-gray-400 font-bold mt-0.5">
                      Co-Host & DJ
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="relative bg-neutral-900 border-2 border-white/80 p-4 rounded-2xl flex flex-col items-center text-center shadow-[5px_5px_0_rgba(0,0,0,1)] -rotate-1">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-teal-400 to-yellow-400 p-[2px] mb-2 shadow-md">
                      <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-teal-400">
                        <Sparkles className="w-7 h-7" />
                      </div>
                    </div>
                    <h3 className="font-['Montserrat'] font-extrabold text-sm text-white italic">
                      Guest Star 3
                    </h3>
                    <p className="font-['Montserrat'] text-xs text-gray-400 font-bold mt-0.5">
                      Comedian Guest
                    </p>
                  </div>

                  {/* Card 4 */}
                  <div className="relative bg-neutral-900 border-2 border-white/80 p-4 rounded-2xl flex flex-col items-center text-center shadow-[5px_5px_0_rgba(0,0,0,1)] rotate-3">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-red-500 to-yellow-400 p-[2px] mb-2 shadow-md">
                      <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-red-400">
                        <Star className="w-7 h-7" />
                      </div>
                    </div>
                    <h3 className="font-['Montserrat'] font-extrabold text-sm text-white italic">
                      Guest Star 4
                    </h3>
                    <p className="font-['Montserrat'] text-xs text-gray-400 font-bold mt-0.5">
                      Special Creator
                    </p>
                  </div>

                </div>

              </div>
            )}


            {/* ---------------- EVENT TAB ---------------- */}
            {activeTab === 'event' && (
              <div className="w-full min-h-[70vh] flex flex-col items-center justify-center animate-fadeIn space-y-4 py-2 transform translate-y-4">
                
                {/* Countdown Card */}
                <div className="relative bg-black/90 p-5 rounded-2xl border-2 border-white/30 text-center shadow-[5px_5px_0_rgba(0,0,0,1)] rotate-1 w-full max-w-[340px]">
                  <span className="block font-['Oswald'] text-sm tracking-[0.25em] text-yellow-400 uppercase font-bold mb-2">
                    DAYS TO GO
                  </span>
                  <div className="grid grid-cols-3 gap-3 font-['Bebas_Neue']">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl py-2.5 px-1.5 flex flex-col items-center">
                      <span className="text-4xl font-extrabold text-orange-500 leading-none">
                        {String(timeLeft.days).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] font-['Montserrat'] text-gray-400 font-bold uppercase mt-1">DAYS</span>
                    </div>
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl py-2.5 px-1.5 flex flex-col items-center">
                      <span className="text-4xl font-extrabold text-orange-500 leading-none">
                        {String(timeLeft.hours).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] font-['Montserrat'] text-gray-400 font-bold uppercase mt-1">HRS</span>
                    </div>
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl py-2.5 px-1.5 flex flex-col items-center">
                      <span className="text-4xl font-extrabold text-orange-500 leading-none animate-pulse">
                        {String(timeLeft.minutes).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] font-['Montserrat'] text-gray-400 font-bold uppercase mt-1">MINS</span>
                    </div>
                  </div>
                </div>

                {/* Venue Box */}
                <div className="relative bg-stone-900 border-2 border-yellow-500/70 p-6 rounded-2xl space-y-4 font-['Montserrat'] text-center shadow-[6px_6px_0_rgba(0,0,0,1)] -rotate-1 w-full max-w-[340px]">
                  <div className="flex items-center justify-center gap-2 border-b border-gray-800 pb-3">
                    <MapPin className="w-6 h-6 text-yellow-400" />
                    <h3 className="font-['Oswald'] text-lg font-extrabold tracking-wider text-yellow-400 uppercase italic">
                      WAKTU & LOKASI
                    </h3>
                  </div>

                  <div>
                    <span className="text-[11px] uppercase font-bold text-gray-400 tracking-wider block mb-1">WAKTU ACARA</span>
                    <p className="font-extrabold text-base sm:text-lg text-white italic">Kamis, 10 Desember 2026</p>
                    <p className="text-sm text-yellow-400 font-bold">Open Gate: 19:30 WIB | Show: 20:00 WIB</p>
                  </div>

                  <div>
                    <span className="text-[11px] uppercase font-bold text-gray-400 tracking-wider block mb-1">LOKASI VENUE</span>
                    <p className="font-extrabold text-base sm:text-lg text-white italic">CGV Social Market (SoMa) Palembang</p>
                    <p className="text-sm text-gray-300 font-semibold">Teather 1 Audi</p>
                  </div>
                </div>

                {/* Map Button */}
                <div 
                  onClick={() => window.open('https://maps.app.goo.gl/X5qiB6ENhhwL8x457', '_blank')}
                  className="border-2 border-dashed border-white/60 bg-black/80 p-4 rounded-2xl flex items-center justify-center gap-2 font-['Montserrat'] text-sm font-extrabold uppercase tracking-wider hover:bg-white hover:text-black transition-all cursor-pointer shadow-[5px_5px_0_rgba(0,0,0,1)] rotate-1 w-full max-w-[340px]"
                >
                  <span>OPEN GOOGLE MAPS</span>
                  <MapPin className="w-5 h-5" />
                </div>

              </div>
            )}

          </div>

        </div>


        {/* ================= 4. STICKY BOTTOM NAV (z-[50]) ================= */}
        <div className="absolute bottom-4 left-4 right-4 z-[50] bg-black/90 backdrop-blur-xl rounded-2xl p-2 flex justify-between border-2 border-gray-800 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
          
          {/* Home Tab */}
          <button
            onClick={() => handleTabChange('home')}
            className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer ${
              activeTab === 'home'
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-extrabold shadow-[0_0_15px_rgba(255,165,0,0.6)] scale-105'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-['Montserrat'] font-extrabold tracking-wider uppercase mt-0.5">
              Home
            </span>
          </button>

          {/* Line Up Tab */}
          <button
            onClick={() => handleTabChange('lineup')}
            className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer ${
              activeTab === 'lineup'
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-extrabold shadow-[0_0_15px_rgba(255,165,0,0.6)] scale-105'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-[10px] font-['Montserrat'] font-extrabold tracking-wider uppercase mt-0.5">
              Line Up
            </span>
          </button>

          {/* Event Tab */}
          <button
            onClick={() => handleTabChange('event')}
            className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl transition-all duration-300 cursor-center ${
              activeTab === 'event'
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-extrabold shadow-[0_0_15px_rgba(255,165,0,0.6)] scale-105'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-[10px] font-['Montserrat'] font-extrabold tracking-wider uppercase mt-0.5">
              Event
            </span>
          </button>

        </div>

      </div>
    </div>
  );
}
