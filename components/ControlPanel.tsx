import React from 'react';
import { LibraryState } from '../types';
import { Ghost, Scroll, BookOpen } from 'lucide-react';

interface GrimoireProps {
  libraryState: LibraryState;
  secretKey: string;
  collectedChars: (string | null)[];
  hint: string;
}

export const ControlPanel: React.FC<GrimoireProps> = ({ libraryState, secretKey, collectedChars, hint }) => {
  
  const isUnlocked = libraryState === LibraryState.UNLOCKED;

  return (
    <div className="w-full max-w-2xl bg-stone-900/90 border-2 border-stone-700 p-6 rounded-lg shadow-2xl relative overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-20 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className={`text-amber-600 ${isUnlocked ? 'animate-pulse' : ''}`} size={24} />
          <h2 className="font-cinzel text-2xl text-amber-500 tracking-widest font-bold">
            Liber Spiritus
          </h2>
          <BookOpen className={`text-amber-600 ${isUnlocked ? 'animate-pulse' : ''}`} size={24} style={{ transform: 'scaleX(-1)' }} />
        </div>

        <div className="w-full bg-stone-950/50 p-6 rounded border border-stone-800 shadow-inner flex flex-wrap justify-center gap-4 min-h-[100px] items-center">
          {secretKey.split('').map((char, index) => {
            const collected = collectedChars[index];
            return (
              <div 
                key={index} 
                className={`
                  w-12 h-16 border-b-2 flex items-center justify-center text-3xl font-cinzel transition-all duration-700
                  ${collected 
                    ? 'border-amber-500 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]' 
                    : 'border-stone-700 text-stone-700'
                  }
                `}
              >
                {collected ? collected : '?'}
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-stone-500 font-serif italic text-sm flex items-center gap-2">
           <Ghost size={14} />
           <span>{isUnlocked ? "The veil has lifted." : hint}</span>
           <Ghost size={14} />
        </div>
      </div>
    </div>
  );
};
