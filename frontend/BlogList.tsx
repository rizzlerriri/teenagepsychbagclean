import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';

interface Post {
    id: number;
    title: string;
    content: string;
    category: string;
    createdAt: string;
}

export default function BlogList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const category = searchParams.get('cat') || '';

    useEffect(() => {
        fetch('/api/posts')
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(console.error);
    }, []);

    const filtered = posts.filter(p => {
        if (query && !p.title.toLowerCase().includes(query.toLowerCase()) && !p.content.toLowerCase().includes(query.toLowerCase())) return false;
        if (category && p.category !== category) return false;
        return true;
    });

    // We'll generate random rotations and colors for the sticky notes
    const colors = ['bg-[#fef08a]', 'bg-[#bfdbfe]', 'bg-[#bbf7d0]', 'bg-[#fbcfe8]', 'bg-[#fed7aa]'];

    return (
        <div className="w-full bg-[#fdfbf7] relative rounded-lg shadow-xl border-l-[12px] border-[#d3c5b5] min-h-[85vh] p-8 md:p-12 overflow-hidden">
            {/* Background grid lines */}
            <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#e5e5e5 1px, transparent 1px)', backgroundSize: '100% 2rem', marginTop: '3rem' }}></div>
            <div className="absolute top-0 bottom-0 left-12 w-[1px] bg-red-400/40 z-0 pointer-events-none"></div>

            <Link to="/nav" className="absolute top-8 left-8 font-marker text-2xl text-black/60 hover:text-red-500 z-20">← Back</Link>
            
            <h1 className="font-pen text-6xl md:text-8xl text-black text-center mb-16 mt-8 relative z-10">
                {category ? `${category} notes` : query ? `Search: ${query}` : "All Thoughts"}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 relative z-10 px-4 md:px-8">
                {filtered.map((post, i) => {
                    const color = colors[i % colors.length];
                    const rotation = Math.random() * 10 - 5;
                    return (
                        <motion.div 
                            key={post.id}
                            whileHover={{ scale: 1.05, y: -10, zIndex: 10, rotate: rotation > 0 ? rotation + 2 : rotation - 2 }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            style={{ rotate: rotation }}
                            className={`p-6 shadow-[5px_10px_15px_rgba(0,0,0,0.3)] cursor-pointer
                                ${color} transform relative`}
                        >
                            <Link to={`/blogs/${post.id}`} className="block h-full">
                                {/* Thumbtack */}
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-red-600 shadow-md border-2 border-red-800 flex items-center justify-center">
                                     <div className="w-2 h-2 rounded-full bg-white/40"></div>
                                </div>
                                
                                <h2 className="font-marker text-2xl mb-4 leading-tight">{post.title}</h2>
                                <p className="font-handwriting text-2xl mb-4 line-clamp-4 text-black/70">
                                    {post.content.replace(/<[^>]+>/g, '')}
                                </p>
                                <div className="flex justify-between items-center mt-auto border-t border-black/10 pt-2">
                                    <span className="font-pen text-xl text-black/60">{new Date(post.createdAt).toLocaleDateString()}</span>
                                    <span className="font-pen text-xl bg-black/5 px-2 rounded">{post.category}</span>
                                </div>
                            </Link>
                        </motion.div>
                    )
                })}
                {filtered.length === 0 && (
                     <div className="col-span-full text-center text-black/50 font-handwriting text-4xl mt-12 relative z-10">
                         Nothing here. Try another drawer.
                     </div>
                )}
            </div>
        </div>
    );
}
