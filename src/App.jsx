import { useState, useEffect, useRef } from 'react';
import { Home, Users, Calendar, Check, Music, Play, Pause, MapPin, Sparkles, Radio, Mic, Star, Eye, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';

import siniarbg from './assets/Element/Latar Belakang Siniar fix.PNG';
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
  const [showPosterModal, setShowPosterModal] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
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

  // Generate Preview Image (Tahap 1)
  const handleGenerateImage = async (e) => {
    e.stopPropagation();
    if (!coverRef.current) return;
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(coverRef.current, { 
        backgroundColor: '#000000', 
        scale: 2, 
        useCORS: true, 
        logging: false 
      });
      setGeneratedImage(canvas.toDataURL('image/png'));
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal memproses e-flyer.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Final Share (Tahap 2)
  const handleFinalShare = async () => {
    try {
      const res = await fetch(generatedImage);
      const blob = await res.blob();
      const file = new File([blob], 'Undangan-Siniar.png', { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'Undangan Siniar SHOW' });
      } else {
        const link = document.createElement('a');
        link.href = generatedImage;
        link.download = 'Undangan-Siniar.png';
        link.click();
      }
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  // Form & RSVP state
  const [formData, setFormData] = useState({ name: '', attendance: '1' });
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  // Handle RSVP Submission
  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    confetti({
      particleCount: 170,
      spread: 90,
      origin: { y: 0.6 }
    });
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
              <h1 className="text-3xl sm:text-4xl font-extrabold italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 tracking-tight drop-shadow-[3px_3px_0_rgba(0,0,0,1)] -rotate-1">
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
                onClick={handleGenerateImage}
                className="w-full py-3 px-6 bg-transparent border-2 border-yellow-400 text-yellow-400 font-['Bebas_Neue'] text-xl tracking-widest uppercase font-extrabold rounded-2xl shadow-[6px_6px_0_rgba(0,0,0,1)] active:scale-95 transition-all flex items-center justify-center gap-2 rotate-1"
              >
                <Share2 className="w-5 h-5" />
                <span>{isGenerating ? 'Memproses...' : 'SHARE KE IG'}</span>
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
              <div className="w-full min-h-[70vh] flex flex-col items-center justify-center text-center animate-fadeIn py-6">
                
                {/* Small Header on Torn White Paper */}
                <div className="mb-2 flex flex-col items-center">
                  <div className="bg-white text-black font-extrabold italic px-4 py-1.5 border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] -rotate-2 inline-block rounded-xs">
                    <span className="text-xs font-['Oswald'] tracking-[0.25em] uppercase font-bold">
                      KKP NETWORK PRESENTS
                    </span>
                  </div>
                </div>

                {/* Official "Siniar SHOW" Logo */}
                <img 
                  src={siniarLogo} 
                  alt="Siniar Show Logo" 
                  className="w-80 sm:w-96 max-w-[90%] drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] -rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-300 mb-3"
                />

                {/* Live Podcast Badge - Matching Theme Colors */}
                <div className="mb-2 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-yellow-400 text-black border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] -rotate-1">
                  <span className="w-2 h-2 rounded-full bg-black animate-ping"></span>
                  <span className="font-['Oswald'] text-xs uppercase tracking-widest font-bold">
                    Live Podcast 2026
                  </span>
                </div>

                {/* Date & Year Container */}
                <div className="flex flex-row items-center justify-center gap-5 mt-3">
                  {/* 10/12 Badge */}
                  <div className="px-4 py-1.5 bg-white text-black font-['Bebas_Neue'] text-3xl tracking-widest rounded-[45%_55%_60%_40%/50%_45%_55%_50%] border-3 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] -rotate-6">
                    10/12
                  </div>

                  {/* 2026 Badge */}
                  <div className="px-4 py-1.5 bg-white text-black font-['Bebas_Neue'] text-3xl tracking-widest rounded-[55%_45%_40%_60%/45%_55%_45%_55%] border-3 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] rotate-6">
                    2026
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
              <div className="w-full min-h-[70vh] flex flex-col items-center justify-center animate-fadeIn space-y-4 py-2">
                
                {/* Countdown Card */}
                <div className="relative bg-black/90 p-4 rounded-2xl border-2 border-white/30 text-center shadow-[5px_5px_0_rgba(0,0,0,1)] rotate-1 w-full max-w-xs">
                  <span className="block font-['Oswald'] text-xs tracking-[0.25em] text-yellow-400 uppercase font-bold mb-2">
                    DIGITAL COUNTDOWN
                  </span>
                  <div className="grid grid-cols-3 gap-2 font-['Bebas_Neue']">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl py-2 px-1 flex flex-col items-center">
                      <span className="text-3xl font-extrabold text-orange-500 leading-none">
                        {String(timeLeft.days).padStart(2, '0')}
                      </span>
                      <span className="text-[9px] font-['Montserrat'] text-gray-400 font-bold uppercase mt-1">DAYS</span>
                    </div>
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl py-2 px-1 flex flex-col items-center">
                      <span className="text-3xl font-extrabold text-orange-500 leading-none">
                        {String(timeLeft.hours).padStart(2, '0')}
                      </span>
                      <span className="text-[9px] font-['Montserrat'] text-gray-400 font-bold uppercase mt-1">HRS</span>
                    </div>
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl py-2 px-1 flex flex-col items-center">
                      <span className="text-3xl font-extrabold text-orange-500 leading-none animate-pulse">
                        {String(timeLeft.minutes).padStart(2, '0')}
                      </span>
                      <span className="text-[9px] font-['Montserrat'] text-gray-400 font-bold uppercase mt-1">MINS</span>
                    </div>
                  </div>
                </div>

                {/* Venue Box */}
                <div className="relative bg-stone-900 border-2 border-yellow-500/70 p-5 rounded-2xl space-y-3 font-['Montserrat'] text-center shadow-[5px_5px_0_rgba(0,0,0,1)] -rotate-1 w-full max-w-xs">
                  <div className="flex items-center justify-center gap-2 border-b border-gray-800 pb-2">
                    <MapPin className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-['Oswald'] text-base font-extrabold tracking-wider text-yellow-400 uppercase italic">
                      WAKTU & LOKASI
                    </h3>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">WAKTU ACARA</span>
                    <p className="font-extrabold text-sm sm:text-base text-white italic">Kamis, 10 Desember 2026</p>
                    <p className="text-xs text-yellow-400 font-bold">Open Gate: 19:30 WIB | Show: 20:00 WIB</p>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">LOKASI VENUE</span>
                    <p className="font-extrabold text-sm sm:text-base text-white italic">CGV Palembang</p>
                    <p className="text-xs text-gray-300 font-semibold">Social Market</p>
                  </div>
                </div>

                {/* Map Button */}
                <div 
                  onClick={() => window.open('https://maps.google.com', '_blank')}
                  className="border-2 border-dashed border-white/60 bg-black/80 p-3.5 rounded-2xl flex items-center justify-center gap-2 font-['Montserrat'] text-xs font-extrabold uppercase tracking-wider hover:bg-white hover:text-black transition-all cursor-pointer shadow-[4px_4px_0_rgba(0,0,0,1)] rotate-1 w-full max-w-xs"
                >
                  <span>OPEN GOOGLE MAPS</span>
                  <MapPin className="w-4 h-4" />
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

      {generatedImage && (
        <div className="fixed inset-0 z-[9999] bg-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-sm">
          <p className="text-white mb-4 font-bold tracking-widest">PREVIEW E-FLYER</p>
          <img src={generatedImage} alt="Preview" className="w-[80%] max-w-sm rounded-xl border border-yellow-500/50 shadow-[6px_6px_0_rgba(0,0,0,1)] mb-6" />
          <div className="flex gap-4">
            <button onClick={() => setGeneratedImage(null)} className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-bold border-2 border-black">
              Batal
            </button>
            <button onClick={handleFinalShare} className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black rounded-xl font-bold border-2 border-black flex items-center gap-2">
              Bagikan / Simpan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
