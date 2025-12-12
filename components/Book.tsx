import React from 'react';
import { BookData } from '../types';
import { Sparkles } from 'lucide-react';

interface BookProps {
  data: BookData;
  isHaunted: boolean; 
  isCollected: boolean; 
  onClick: (id: number) => void;
}

export const Book: React.FC<BookProps> = ({ data, isHaunted, isCollected, onClick }) => {
  
  
  const floatDelay = `${(data.id * 0.2) % 4}s`;

  return (
    <div 
      className={`relative flex items-end justify-center group perspective-800 ${isCollected ? 'opacity-0 pointer-events-none transition-opacity duration-1000' : 'opacity-100'}`}
      style={{ width: '3rem', height: '11rem' }} 
    >
      <div
        className={`
          book-spine relative ${data.width} ${data.height} ${data.color} 
          rounded-sm border-l border-white/10 shadow-lg cursor-pointer
          flex flex-col items-center justify-between py-2
          ${isHaunted ? 'animate-glow z-10' : 'animate-float'}
        `}
        style={{
          animationDelay: isHaunted ? '0s' : floatDelay,
          backgroundImage: data.texture,
          transform: isHaunted ? 'translateY(-10px) scale(1.05)' : undefined
        }}
        onClick={() => onClick(data.id)}
        data-code={data.ascii} 
        title={isHaunted ? "Something stirs..." : ""}
      >
       
        <div className="w-full h-1 bg-yellow-600/30 mb-1" />
        <div className="w-full h-1 bg-yellow-600/30" />
        
        
        <div className="flex-1 flex items-center justify-center py-2 overflow-hidden">
           <span className="text-[10px] text-yellow-100/40 font-cinzel writing-vertical-rl rotate-180 tracking-widest whitespace-nowrap">
             {data.title}
           </span>
        </div>

        
        <div className="text-[8px] text-white/20 font-mono mb-1">{data.id}</div>
       
        {isHaunted && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-yellow-400 animate-bounce">
            <Sparkles size={16} />
          </div>
        )}
      </div>

     
      <div className="absolute bottom-0 w-8 h-1 bg-black/50 blur-sm rounded-full transform scale-x-75" />
    </div>
  );
};
