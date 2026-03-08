import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Play, Pause, ChevronLeft, ChevronRight, Music, Calendar, Clock } from 'lucide-react';

// --- Configuration ---
const START_DATE = new Date('2025-08-03T00:00:00');

const MEMORIES = [
  {
    url: '/public/foto1.jpeg',
    text: 'Te amo, Te amo e Te amo, não importa o que aconteça, saiba que vou sempre te amar!',
  },
  {
    url: '/public/foto2.jpeg',
    text: 'Cada detalhe seu é como o mar, imenso e intenso e me desperta a vontade de me entregar mais e mais.',
  },
  {
    url: '/public/foto3.jpeg',
    text: 'Saiba que tudo na minha vida hoje envolve você, não existe mais o thiago sem você na minha vida, obrigado por me completar.',
  },
  {
    url: '/public/foto4.jpeg',
    text: 'JA te agradeci por me dar a chance de viver cada dia ao lado da mulher incrivel que você é, mas sempre que puder quero reforçar para você saber que falo serio, então obrigado amor',
  },
  {
    url: '/public/foto5.jpeg',
    text: 'Te amo mais que tudo nesse mundo, espero que consiga transmitir um pouco do meu amor com esse presente minha mulher maravilha!',
  }
];

// Placeholder music - you can replace this with your own URL
const MUSIC_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

export default function App() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - START_DATE.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % MEMORIES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + MEMORIES.length) % MEMORIES.length);
  };

  const startSurprise = () => {
    setHasStarted(true);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Erro ao tocar música:", e));
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Erro ao tocar música:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-pink-500/30">
      {/* Entry Overlay for Autoplay */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div 
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md"
            >
              <Heart className="w-16 h-16 text-pink-500 fill-current mx-auto mb-8 animate-pulse" />
              <h2 className="font-serif text-3xl mb-4">Uma surpresa para você...</h2>
              <p className="text-white/60 mb-8 leading-relaxed">
                Preparei algo especial para celebrar o nosso tempo juntos. Clique no botão abaixo para começar.
              </p>
              <button 
                onClick={startSurprise}
                className="px-8 py-4 rounded-full bg-pink-500 text-white font-semibold hover:bg-pink-600 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-pink-500/20"
              >
                Abrir Surpresa
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Atmosphere */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
      </div>

      {/* Header with Timer */}
      <header className="relative z-10 pt-12 pb-8 px-6 text-center border-b border-white/5">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-4 text-pink-400">
            <Heart className="w-5 h-5 fill-current animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[0.3em]">Nossa Jornada</span>
            <Heart className="w-5 h-5 fill-current animate-pulse" />
          </div>
          
          <h1 className="font-serif text-4xl md:text-6xl mb-8 tracking-tight">
            A todo esse tempo meu coração é seu
          </h1>

          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { label: 'Dias', value: timeLeft.days },
              { label: 'Horas', value: timeLeft.hours },
              { label: 'Minutos', value: timeLeft.minutes },
              { label: 'Segundos', value: timeLeft.seconds },
            ].map((item) => (
              <div key={item.label} className="glass-panel rounded-2xl p-4 flex flex-col items-center">
                <span className="text-2xl md:text-4xl font-mono font-light mb-1">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </header>

      {/* Main Content: Slideshow */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-16 pb-32">
        <div className="relative aspect-[3/4] md:aspect-[16/10] rounded-3xl overflow-hidden glass-panel group shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0"
            >
              <img 
                src={MEMORIES[currentIndex].url} 
                alt="Nossa memória" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-serif text-xl md:text-3xl text-white/90 leading-relaxed max-w-3xl italic"
                >
                  "{MEMORIES[currentIndex].text}"
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Progress Dots */}
          <div className="absolute top-6 right-8 flex gap-2">
            {MEMORIES.map((_, idx) => (
              <div 
                key={idx}
                className={`h-1 rounded-full transition-all duration-500 ${
                  idx === currentIndex ? 'w-8 bg-pink-500' : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Music Player Footer */}
      <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20">
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="glass-panel px-6 py-4 rounded-full flex items-center gap-6 shadow-xl border border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full bg-pink-500/20 text-pink-400 ${isPlaying ? 'animate-spin-slow' : ''}`}>
              <Music className="w-5 h-5" />
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-semibold tracking-wide uppercase text-white/80">Nossa Música</p>
              <p className="text-[10px] text-white/40 font-mono">Tocando agora...</p>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-white/10" />

          <button 
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
          </button>

          {/* Hidden Audio Player */}
          <audio 
            ref={audioRef} 
            src="/music/musica.mp3" 
            loop 
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        </motion.div>
      </footer>

      {/* Floating Hearts Decoration */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              x: Math.random() * 100 + '%', 
              y: '110%' 
            }}
            animate={{ 
              opacity: [0, 0.3, 0], 
              y: '-10%',
              x: (Math.random() * 100) + '%'
            }}
            transition={{ 
              duration: 10 + Math.random() * 10, 
              repeat: Infinity, 
              delay: i * 2,
              ease: "linear"
            }}
            className="absolute text-pink-500/20"
          >
            <Heart className="w-8 h-8 fill-current" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
