import { Link } from 'react-router-dom';

export default function AboutMe() {
  return (
    <div className="w-full bg-[#fdfbf7] relative rounded-lg shadow-xl border-l-[12px] border-[#d3c5b5] min-h-[85vh] p-8 md:p-12 overflow-hidden flex flex-col md:flex-row gap-12 items-center md:items-start pt-24">
      <Link to="/nav" className="absolute top-8 left-8 font-marker text-2xl hover:text-red-500 z-20">← Back</Link>
      
      {/* Background grid lines */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#e5e5e5 1px, transparent 1px)', backgroundSize: '100% 2rem', marginTop: '3rem' }}></div>
      <div className="absolute top-0 bottom-0 left-12 w-[1px] bg-red-400/40 z-0 pointer-events-none"></div>

      {/* Polaroid */}
      <div className="relative z-10 w-64 md:w-80 shrink-0 transform -rotate-3 ml-12">
        <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-20 h-6 bg-yellow-100/50 backdrop-blur-md shadow-sm z-20 rotate-[-4deg]"></div>
        <div className="bg-white p-4 pb-16 shadow-[2px_4px_12px_rgba(0,0,0,0.2)]">
          <div className="bg-gray-200 aspect-square w-full filter sepia brightness-90 relative overflow-hidden flex items-center justify-center">
             <span className="font-handwriting text-3xl opacity-50">Photo missing...</span>
          </div>
          <p className="absolute bottom-4 left-0 w-full text-center font-handwriting text-2xl text-black/80 rotate-2">me &lt;3</p>
        </div>
      </div>

      <div className="relative z-10 flex-1 px-4 mt-8 md:mt-0 max-w-xl">
        <h1 className="font-pen text-6xl md:text-8xl mb-8 -rotate-2">Who am I?</h1>
        <div className="font-handwriting text-3xl leading-relaxed text-[#2c2c2c] space-y-6">
          <p>
            Hey there. This is my psych bag. It's a collection of everything going on in my head right now.
          </p>
          <p>
             I write about art, music, weird things I find on the internet, and whatever feelings are too loud to ignore.
          </p>
          <p>
            You might find it messy. That's the point.
          </p>
          
          <div className="mt-12 text-right text-4xl text-red-500 font-marker transform -rotate-6">
            xoxo !
          </div>
        </div>
      </div>
    </div>
  );
}
