import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export default function DiaryCover() {
  const navigate = useNavigate();
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

  const handleNextPage = () => {
    navigate('/nav');
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Trigger on downward or rightward scroll
      if (e.deltaY > 50 || e.deltaX > 50) {
        handleNextPage();
      }
    };
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      
      // Swipe up or swipe left
      if (touchStartY.current - touchEndY > 50 || touchStartX.current - touchEndX > 50) {
         handleNextPage();
      }
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [navigate]);

  return (
    <div 
      className="w-full bg-[#fdfbf7] relative rounded-r-3xl rounded-l-lg shadow-xl border-l-[12px] border-[#d3c5b5] min-h-[85vh] flex flex-col items-center justify-center cursor-pointer group overflow-hidden"
      onClick={handleNextPage}
    >
      {/* Background grid lines */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#e5e5e5 1px, transparent 1px)', backgroundSize: '100% 2rem', marginTop: '3rem' }}></div>
      <div className="absolute top-0 bottom-0 left-12 w-[1px] bg-red-400/40 z-0 pointer-events-none"></div>
      {/* Tape marks */}
      <div className="absolute top-8 right-12 w-28 h-10 bg-white/40 backdrop-blur-sm -rotate-6 shadow-sm z-10 border border-white/20" />
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-40 h-10 bg-white/40 backdrop-blur-sm rotate-2 shadow-sm z-10 border border-white/20" />

      {/* Retro Doodles */}
      <svg className="absolute top-10 left-10 w-40 h-40 opacity-70 stroke-purple-600 fill-none pointer-events-none -rotate-12" viewBox="0 0 100 100">
         <path d="M 10 50 Q 30 20, 50 50 T 90 50" strokeWidth="4" strokeLinecap="round" />
         <path d="M 20 60 L 40 40 L 60 80 L 80 40" strokeWidth="3" strokeLinejoin="round" />
      </svg>

      <svg className="absolute bottom-20 right-10 w-32 h-32 opacity-70 stroke-yellow-500 fill-none pointer-events-none rotate-12" viewBox="0 0 100 100">
         <polygon points="50,10 61,35 88,35 66,54 75,80 50,65 25,80 34,54 12,35 39,35" strokeWidth="3" strokeLinejoin="round" />
      </svg>
      
      <svg className="absolute top-1/2 left-4 w-20 h-20 opacity-60 stroke-[#ff4757] fill-none pointer-events-none" viewBox="0 0 100 100">
         <path d="M 50 20 C 80 20, 80 50, 50 80 C 20 50, 20 20, 50 20" strokeWidth="4" strokeDasharray="6,4" />
      </svg>

      {/* Diary Cover Content */}
      <div className="relative text-center p-8 z-20 w-full max-w-4xl mx-auto flex flex-col items-center">
        
        <h1 className="font-marker flex flex-wrap justify-center gap-2 mb-6 select-none max-w-full">
          {["T","e","e","n","a","g","e"].map((letter, i) => {
             const bgColors = ['bg-[#f4f4f4]', 'bg-[#ffed4a]', 'bg-[#ff7675]', 'bg-[#74b9ff]', 'bg-[#f4f4f4]', 'bg-[#55efc4]', 'bg-[#f4f4f4]'];
             const cutRotation = Math.random() * 20 - 10;
             return (
               <motion.span 
                 key={'teen'+i} 
                 className={`border-[1.5px] border-gray-400 ${bgColors[i]} text-black text-6xl md:text-8xl px-2 md:px-4 py-1 shadow-[4px_6px_8px_rgba(0,0,0,0.3)] transition-transform`}
                 style={{ rotate: cutRotation + 'deg', top: Math.random() * 10 - 5 + 'px', position: 'relative' }}
               >
                 {letter}
               </motion.span>
             )
          })}
        </h1>

        <div className="w-full flex justify-center gap-4 flex-wrap select-none mb-10">
          <div className="flex gap-2">
            {["p","s","y","c","h"].map((letter, i) => {
               const bgColors = ['bg-[#f4f4f4]', 'bg-[#fdcb6e]', 'bg-[#f4f4f4]', 'bg-[#ff9ff3]', 'bg-[#f4f4f4]'];
               const cutRotation = Math.random() * 20 - 10;
               return (
                 <motion.span 
                   key={'psych'+i} 
                   className={`border-2 border-gray-500 ${bgColors[i]} text-black text-6xl md:text-8xl px-2 md:px-4 py-1 shadow-[4px_6px_8px_rgba(0,0,0,0.3)]`}
                   style={{ rotate: cutRotation + 'deg', top: Math.random() * 10 - 5 + 'px', position: 'relative' }}
                 >
                   {letter}
                 </motion.span>
               )
            })}
          </div>
          <div className="flex gap-2">
            {["B","a","g"].map((letter, i) => {
               const cutRotation = Math.random() * 20 - 10;
               return (
                 <motion.span 
                   key={'bag'+i} 
                   className={`border-[1.5px] border-dashed border-gray-600 bg-white text-black text-6xl md:text-8xl px-2 md:px-4 py-1 shadow-[4px_6px_8px_rgba(0,0,0,0.3)]`}
                   style={{ rotate: cutRotation + 'deg', top: Math.random() * 10 - 5 + 'px', position: 'relative' }}
                 >
                   {letter}
                 </motion.span>
               )
            })}
          </div>
        </div>

        <h2 className="font-handwriting text-4xl md:text-5xl mt-6 text-[#1e272e] rotate-[-2deg] bg-white/40 px-6 py-2 border-2 border-dashed border-[#1e272e]/30 shadow-sm backdrop-blur-sm max-w-2xl">
          a psych nerd who's a teenage dirtbag
        </h2>

        <motion.div 
          className="text-[#2c2c2c] font-pen text-3xl md:text-4xl mt-16 opacity-70 bg-yellow-200/50 px-4 py-1 rotate-3"
          animate={{ x: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
           swipe or scroll to open... <span className="inline-block translate-y-1">➡</span>
        </motion.div>
      </div>
    </div>
  );
}
