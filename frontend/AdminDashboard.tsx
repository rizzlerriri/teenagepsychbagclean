import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Post {
    id: number;
    title: string;
    views: number;
    category: string;
}

export default function AdminDashboard() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const navigate = useNavigate();

    const fetchPosts = () => {
        fetch('/api/posts')
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(console.error);
    };

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
            return;
        }
        fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                if (!res.ok) throw new Error('Unauthenticated');
                fetchPosts();
            })
            .catch(() => navigate('/admin/login'));
    }, [navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', category);
        if (image) formData.append('image', image);

        const url = editingId ? `/api/posts/${editingId}` : '/api/posts';
        const method = editingId ? 'PUT' : 'POST';

        await fetch(url, {
            method,
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        });

        setTitle('');
        setContent('');
        setCategory('');
        setImage(null);
        setEditingId(null);
        fetchPosts();
    };

    const handleEdit = (post: any) => {
        setEditingId(post.id);
        setTitle(post.title);
        setContent(post.content);
        setCategory(post.category);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure?')) return;
        const token = localStorage.getItem('adminToken');
        await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        });
        fetchPosts();
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/');
    };

    return (
        <div className="w-full bg-[#fdfbf7] relative rounded-lg shadow-xl border-l-[12px] border-[#d3c5b5] min-h-[85vh] p-8 md:p-12 overflow-hidden flex flex-col md:flex-row gap-8">
            {/* Background grid lines */}
            <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#e5e5e5 1px, transparent 1px)', backgroundSize: '100% 2rem', marginTop: '3rem' }}></div>
            <div className="absolute top-0 bottom-0 left-12 w-[1px] bg-red-400/40 z-0 pointer-events-none"></div>

            <div className="flex-1 relative z-10">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="font-marker text-4xl">Director's Cut</h1>
                    <button onClick={handleLogout} className="font-handwriting text-2xl text-red-500 hover:text-red-700">Lock Door</button>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md border-2 border-black rotate-1">
                     <h2 className="font-marker text-3xl mb-4">{editingId ? 'Edit Entry' : 'New Entry'}</h2>
                     <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required className="w-full border-b-2 border-black font-handwriting text-2xl px-2 py-1 mb-4 outline-none bg-transparent" />
                     <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} required className="w-full border-b-2 border-black font-handwriting text-2xl px-2 py-1 mb-4 outline-none bg-transparent" />
                     <textarea placeholder="Pour your soul here..." value={content} onChange={e => setContent(e.target.value)} required className="w-full border-2 border-black font-handwriting text-2xl px-2 py-2 mb-4 h-48 outline-none bg-transparent" />
                     <div className="mb-4">
                         <label className="font-pen text-xl block mb-1">Attach photo (optional)</label>
                         <input type="file" onChange={e => setImage(e.target.files?.[0] || null)} className="font-handwriting" />
                     </div>
                     <button type="submit" className="bg-black text-white px-6 py-2 font-marker text-2xl hover:bg-gray-800">{editingId ? 'Update' : 'Post'}</button>
                     {editingId && <button type="button" onClick={() => { setEditingId(null); setTitle(''); setContent(''); setCategory(''); }} className="ml-4 text-red-500 font-marker text-xl">Cancel</button>}
                </form>
            </div>

            <div className="w-full md:w-1/3 relative z-10">
                {/* Background "corkboard" or dirty paper style */}
                <div className="absolute inset-0 bg-[#d8cfbc] shadow-inner border-[3px] border-[#8b7355] -rotate-1 rounded-sm -z-10"></div>
                
                <div className="p-6">
                    <div className="relative inline-block mb-8">
                        <div className="absolute -inset-2 bg-black/80 rotate-2"></div>
                        <h2 className="font-marker text-3xl text-white relative z-10 px-2 py-1 -rotate-1">Archive Stats</h2>
                    </div>
                    
                    <div className="flex flex-col gap-6 relative">
                        {posts.map((p, i) => {
                            const rotation = Math.random() * 6 - 3;
                            return (
                                <div 
                                    key={p.id} 
                                    className="bg-[#fff9e6] p-4 shadow-[3px_4px_8px_rgba(0,0,0,0.2)] border border-[#e5d9b8] relative group"
                                    style={{ rotate: rotation + 'deg', transformOrigin: 'top center' }}
                                >
                                    {/* Tape piece */}
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 bg-white/60 backdrop-blur-sm -rotate-2 shadow-sm z-10 border border-white/20"></div>
                                    
                                    <h3 className="font-marker text-2xl truncate text-black/90 mt-2">{p.title}</h3>
                                    <div className="mt-2 font-handwriting text-2xl text-black/70 flex justify-between items-end border-t border-black/10 pt-2">
                                        <div className="flex flex-col">
                                           <span>Folder: {p.category}</span>
                                           <span className="text-xl">👁 {p.views} views</span>
                                        </div>
                                        <div className="flex flex-col gap-2 items-end mt-2">
                                            <button 
                                                onClick={() => handleEdit(p)} 
                                                className="font-pen text-2xl text-black bg-[#f4f4f4] px-3 py-0.5 shadow-[1px_2px_3px_rgba(0,0,0,0.2)] border border-[#d1d1d1] -rotate-3 hover:scale-110 transition-transform relative before:absolute before:-inset-1 before:border-[1.5px] before:border-blue-400/50 before:rotate-1 before:pointer-events-none"
                                            >
                                                modify
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(p.id)} 
                                                className="font-pen text-2xl text-black bg-[#f4f4f4] px-3 py-0.5 shadow-[1px_2px_3px_rgba(0,0,0,0.2)] border border-[#d1d1d1] rotate-2 hover:scale-110 transition-transform relative before:absolute before:-inset-1 before:border-[1.5px] before:border-red-500/50 before:-rotate-2 before:pointer-events-none mt-1"
                                            >
                                                burn it
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        {posts.length === 0 && <p className="font-pen text-4xl text-black/50 text-center mt-10">It's empty in here...</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
