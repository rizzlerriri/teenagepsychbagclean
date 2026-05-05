import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import React, { useState } from 'react';

export default function NavigationPage() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) navigate(`/blogs?q=${encodeURIComponent(search)}`);
  };

  return (
    <div className="w-full bg-[#fdfbf7] relative rounded-lg shadow-xl border-l-[12px] border-[#d3c5b5] min-h-[85vh] p-8 md:p-12 overflow-hidden">
      {/* Background grid lines */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#e5e5e5 1px, transparent 1px)', backgroundSize: '100% 2rem', marginTop: '3rem' }}></div>
      <div className="absolute top-0 bottom-0 left-12 w-[1px] bg-red-400/40 z-0 pointer-events-none"></div>

      <div className="relative z-10 pl-8 md:pl-20 mt-4 h-full flex flex-col justify-between">
         {/* Search section */}
         <div className="flex justify-end mb-12">
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute -inset-1 bg-[#ff9ff3]/50 rotate-3 rounded-sm blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <input 
                type="text" 
                placeholder="search the stash..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="font-handwriting text-3xl px-4 py-2 bg-[#f4f4f4] border-[3px] border-black/80 rounded-sm relative z-10 focus:outline-none w-72 md:w-80 -rotate-2 placeholder:text-black/40 shadow-[4px_4px_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_rgba(0,0,0,1)] transition-all"
              />
              <button type="submit" className="absolute right-3 top-3.5 z-20 hover:scale-125 transition-transform text-black">
                 <Search strokeWidth={3} className="w-8 h-8 rotate-12" />
              </button>
            </form>
         </div>

         {/* Navigation List */}
         <nav className="flex flex-col gap-10 md:gap-14 mt-8 w-full max-w-2xl mx-auto flex-1 justify-center pb-20">
           {[
             { name: "Back Home", path: "/", color: "text-[#e84118]", rotate: -2, offset: "md:ml-12" },
             { name: "About Me", path: "/about", color: "text-[#273c75]", rotate: 3, offset: "md:ml-0" },
             { name: "Brain Dumps", path: "/blogs", color: "text-[#8c7ae6]", rotate: -1, offset: "md:ml-16" },
             { name: "Folders", path: "/categories", color: "text-[#44bd32]", rotate: 2, offset: "md:ml-4" }
           ].map((item, i) => (
             <motion.div 
               key={item.name}
               whileHover={{ x: 30, scale: 1.05 }}
               className={`relative group w-fit ${item.offset}`}
               style={{ rotate: item.rotate + 'deg' }}
             >
                <Link to={item.path} className={`font-marker text-5xl md:text-7xl ${item.color} uppercase tracking-tighter mix-blend-multiply flex items-center gap-4 drop-shadow-[2px_2px_0_rgba(255,255,255,0.7)]`}>
                  {item.name}
                </Link>
                <div className={`scribble-underline w-[110%] h-6 absolute -bottom-2 -left-2 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-multiply`}></div>
                
                {/* Random doodles per item */}
                {i === 1 && <svg className="absolute -right-20 -top-4 w-14 h-14 stroke-[#eccc68] fill-none opacity-0 group-hover:opacity-100 transition-all rotate-45 scale-75 group-hover:scale-100" viewBox="0 0 100 100"><path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" strokeWidth={5} strokeLinejoin="round"/></svg>}
                {i === 2 && <svg className="absolute -left-20 bottom-0 w-16 h-16 stroke-[#fd79a8] fill-none opacity-0 group-hover:opacity-100 transition-all -rotate-12 scale-75 group-hover:scale-100" viewBox="0 0 100 100"><path d="M20 50 C 20 20, 80 20, 80 50 C 80 80, 20 80, 20 50" strokeWidth={4} strokeDasharray="8 4" /></svg>}
                {i === 3 && <svg className="absolute -right-24 bottom-0 w-20 h-10 stroke-[#00b894] fill-none opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100" viewBox="0 0 100 100"><path d="M10 50 Q 30 10, 50 50 T 90 50" strokeWidth={5} strokeLinecap="round"/></svg>}

             </motion.div>
           ))}
         </nav>
      </div>
      
      {/* Tape */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-40 h-8 bg-white/60 backdrop-blur-md rotate-3 shadow-md z-10 border border-white/30"></div>
      <div className="absolute bottom-16 right-8 w-24 h-8 bg-[#ffed4a]/50 backdrop-blur-md -rotate-[15deg] shadow-md z-10 border border-[#ffed4a]/30"></div>
    </div>
  );
}
