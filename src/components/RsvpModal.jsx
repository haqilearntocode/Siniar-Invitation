import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export default function RsvpModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState('1');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-sm bg-neutral-900 border-2 border-yellow-500/50 rounded-2xl p-6 shadow-2xl relative text-white">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-neutral-400 hover:text-white p-1 rounded-full hover:bg-neutral-800 transition"
        >
          ✕
        </button>

        {!submitted ? (
          <>
            <div className="text-center mb-5">
              <span className="font-['Oswald'] text-xs text-yellow-400 tracking-widest uppercase">
                KKP Network Presents
              </span>
              <h2 className="font-['Bangers'] text-3xl tracking-wide text-orange-400 mt-1">
                REGISTRASI RSVP
              </h2>
              <p className="text-xs text-neutral-300 font-['Montserrat'] mt-1">
                Amankan tempatmu di SINIAR SHOW 10/12/2026!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-['Montserrat']">
              <div>
                <label className="block text-xs text-neutral-300 font-semibold mb-1">
                  Nama Lengkap
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Masukkan nama kamu"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-yellow-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-semibold mb-1">
                  Email / WhatsApp
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. 08123456789 atau email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-yellow-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-semibold mb-1">
                  Jumlah Kehadiran
                </label>
                <select 
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-400 transition"
                >
                  <option value="1">1 Orang</option>
                  <option value="2">2 Orang (+1 Partner)</option>
                  <option value="3">3+ Rombongan VIP</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 hover:from-yellow-400 hover:to-red-500 text-black font-['Bebas_Neue'] text-xl tracking-wider uppercase rounded-xl font-bold shadow-lg transform active:scale-95 transition-all mt-2"
              >
                KONFIRMASI KEHADIRAN 🚀
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-yellow-500/20 text-yellow-400 border border-yellow-500 rounded-full flex items-center justify-center mx-auto text-3xl">
              ✓
            </div>
            <h3 className="font-['Bangers'] text-3xl text-yellow-400 tracking-wide">
              RSVP TERKONFIRMASI!
            </h3>
            <p className="text-sm text-neutral-300 font-['Montserrat'] leading-relaxed">
              Terima kasih <strong className="text-white">{name}</strong>! Tiket akses digital SINIAR SHOW kamu sudah terdaftar untuk <strong className="text-yellow-400">10 Desember 2026</strong>.
            </p>
            <button 
              onClick={() => { setSubmitted(false); onClose(); }}
              className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg font-['Montserrat'] text-xs font-semibold tracking-wider uppercase transition"
            >
              Tutup
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
