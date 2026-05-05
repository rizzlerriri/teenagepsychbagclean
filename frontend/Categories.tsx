import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Categories() {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        fetch('/api/posts')
            .then(res => res.json())
            .then(data => {
                const cats = Array.from(new Set(data.map((p: any) => p.category))) as string[];
                setCategories(cats);
            })
            .catch(console.error);
    }, []);

    const colors = ['bg-[#fca5a5]', 'bg-[#93c5fd]', 'bg-[#86efac]', 'bg-[#fcd34d]', 'bg-[#d8b4fe]'];

    return (
        <div className="w-full bg-[#fdfbf7] relative rounded-lg shadow-xl border-l-[12px] border-[#d3c5b5] min-h-[85vh] p-8 md:p-12 overflow-hidden">
            {/* Background grid lines */}
            <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#e5e5e5 1px, transparent 1px)', backgroundSize: '100% 2rem', marginTop: '3rem' }}></div>
            <div className="absolute top-0 bottom-0 left-12 w-[1px] bg-red-400/40 z-0 pointer-events-none"></div>

            <Link to="/nav" className="absolute top-8 left-8 font-marker text-2xl hover:text-red-500 z-20">← Back</Link>
            
            <h1 className="font-pen text-6xl md:text-8xl text-center mb-16 mt-8 relative z-10">Folders</h1>

            <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto relative z-10">
                {categories.length === 0 ? (
                     <div className="text-3xl font-handwriting opacity-50">No organized chaos yet.</div>
                ) : categories.map((cat, i) => (
                    <motion.div
                        key={cat}
                        whileHover={{ y: -10, rotate: 0 }}
                        className="relative group cursor-pointer"
                        style={{ rotate: Math.random() * 8 - 4 }}
                    >
                        <Link to={`/blogs?cat=${encodeURIComponent(cat)}`} className="block">
                            {/* Manilla folder look */}
                            <div className="w-48 h-32 relative flex items-end justify-center pb-6">
                                {/* Back tab */}
                                <div className={`absolute top-0 left-0 w-24 h-8 ${colors[i % colors.length]} rounded-t-lg brightness-90`}></div>
                                {/* Front file */}
                                <div className={`absolute bottom-0 left-0 w-full h-28 ${colors[i % colors.length]} rounded-b-lg rounded-tr-lg shadow-md border border-black/10`}></div>
                                {/* Label */}
                                <div className="absolute top-3 left-4 bg-white/80 px-2 py-1 rotate-[-2deg] border border-black/20 shadow-sm z-10">
                                   <span className="font-pen text-2xl text-black">{cat}</span>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
