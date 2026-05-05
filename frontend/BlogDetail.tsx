import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Eye } from 'lucide-react';

interface Post {
    id: number;
    title: string;
    content: string;
    image: string | null;
    category: string;
    views: number;
    createdAt: string;
}

export default function BlogDetail() {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        fetch(`/api/posts/${id}`)
            .then(res => res.json())
            .then(data => setPost(data))
            .catch(console.error);
    }, [id]);

    if (!post) {
        return <div className="text-center mt-20 font-handwriting text-4xl">Loading entry...</div>;
    }

    return (
        <div className="w-full bg-[#fdfbf7] relative rounded-lg shadow-xl border-l-[12px] border-[#d3c5b5] min-h-[85vh] p-8 md:p-16 overflow-hidden">
            {/* Background grid lines */}
            <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#e5e5e5 1px, transparent 1px)', backgroundSize: '100% 2rem', marginTop: '3rem' }}></div>
            <div className="absolute top-0 bottom-0 left-12 w-[1px] bg-red-400/40 z-0 pointer-events-none"></div>

            <Link to="/blogs" className="absolute top-8 left-8 font-marker text-2xl text-black/60 hover:text-black z-20">← Back</Link>

            <div className="relative z-10 pl-6 md:pl-16 max-w-4xl mx-auto mt-8">
                <div className="flex justify-between items-end border-b-2 border-black/80 pb-4 mb-8">
                    <h1 className="font-pen text-6xl md:text-8xl w-3/4 leading-none">{post.title}</h1>
                    <div className="font-handwriting text-2xl text-black/50 text-right">
                        <div>{new Date(post.createdAt).toLocaleDateString()}</div>
                        <div className="flex items-center justify-end gap-1"><Eye className="w-4 h-4" /> {post.views}</div>
                    </div>
                </div>

                {post.image && (
                     <div className="my-10 relative transform rotate-1 w-full max-w-xl mx-auto p-4 bg-white shadow-lg border border-gray-200">
                         <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 backdrop-blur-md shadow-sm z-20 rotate-[-2deg]"></div>
                         <img src={post.image} alt={post.title} className="w-full h-auto filter sepia-[0.2]" />
                     </div>
                )}

                <div className="font-handwriting text-3xl leading-[2.5rem] text-[#2c2c2c] whitespace-pre-wrap">
                    {post.content}
                </div>

                <div className="mt-20 font-marker text-red-500 text-3xl transform -rotate-3 decoration-wavy underline">
                    {post.category}
                </div>
            </div>
        </div>
    );
}
