import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('adminToken', data.token);
                navigate('/admin');
            } else {
                setError(data.message);
            }
        } catch (e) {
            setError('Something broke');
        }
    };

    return (
        <div className="w-full bg-[#fdfbf7] relative rounded-lg shadow-xl border-l-[12px] border-[#d3c5b5] min-h-[85vh] p-8 md:p-12 overflow-hidden flex flex-col items-center justify-center">
            {/* Background grid lines */}
            <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#e5e5e5 1px, transparent 1px)', backgroundSize: '100% 2rem', marginTop: '3rem' }}></div>
            <div className="absolute top-0 bottom-0 left-12 w-[1px] bg-red-400/40 z-0 pointer-events-none"></div>

            <h1 className="font-pen text-6xl text-black mb-12 transform -rotate-2 relative z-10">Authorized Personnel Only</h1>
            
            <form onSubmit={handleLogin} className="bg-white p-8 max-w-sm w-full transform rotate-1 shadow-[10px_10px_0_rgba(255,0,0,0.8)] border-4 border-black relative z-10">
               <div className="mb-6">
                   <label className="block font-marker text-2xl mb-2">Username</label>
                   <input 
                      type="text" 
                      value={username} onChange={e => setUsername(e.target.value)}
                      className="w-full border-b-4 border-black font-handwriting text-2xl px-2 py-1 outline-none bg-transparent focus:border-red-500 transition-colors"
                   />
               </div>
               <div className="mb-8">
                   <label className="block font-marker text-2xl mb-2">Password</label>
                   <input 
                      type="password" 
                      value={password} onChange={e => setPassword(e.target.value)}
                      className="w-full border-b-4 border-black font-handwriting text-2xl px-2 py-1 outline-none bg-transparent focus:border-red-500 transition-colors"
                   />
               </div>
               {error && <div className="text-red-500 font-handwriting text-2xl mb-4">{error}</div>}
               
               <button type="submit" className="w-full bg-black text-white font-marker text-3xl py-2 hover:bg-red-600 transition-colors">
                   Unlock
               </button>
            </form>
        </div>
    );
}
