import React, { useState, useEffect } from 'react';
import { QubitData } from '../types';
import { Scan, Lock, Unlock, CheckCircle } from 'lucide-react';

interface QubitProps {
  data: QubitData;
  isLockerUnlocked: boolean;
  isCaptured: boolean;
  onMeasure: (id: number) => void;
}

export const Qubit: React.FC<QubitProps> = ({ data, isLockerUnlocked, isCaptured, onMeasure }) => {
  const [isMeasured, setIsMeasured] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

 
  const handleMeasure = () => {
    if (isLockerUnlocked || isCaptured) return;
    
    setIsMeasured(true);
    
   
    onMeasure(data.id);

     setTimeout(() => {
      setIsMeasured(false);
    }, 3000);
  };

 
  const isActive = isMeasured || isCaptured;
  const isStable = isCaptured || isLockerUnlocked;

  const ringStyle = {
    borderColor: isStable ? '#22c55e' : (isHovered ? '#fff' : data.colorStart),
    boxShadow: isStable 
      ? `0 0 20px #22c55e, inset 0 0 10px #22c55e`
      : `0 0 10px ${data.colorStart}, inset 0 0 5px ${data.colorStart}`,
    transition: 'all 0.5s ease',
  };

  const coreStyle = {
    backgroundColor: isStable ? '#fff' : data.colorEnd,
    boxShadow: `0 0 ${isStable ? '30px' : '15px'} ${data.colorEnd}`,
  };

  return (
    <div 
      className="relative w-24 h-24 m-4 perspective-1000 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleMeasure}
      data-phase={data.ascii}
      title={`Qubit[${data.id}]`}
    >
     
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-slate-500 font-mono opacity-50 group-hover:opacity-100 transition-opacity">
        q[{data.id}]
      </div>

      <div className={`relative w-full h-full preserve-3d transition-transform duration-700 ${isActive ? 'scale-110' : ''}`}>
      
        <div 
          className={`absolute inset-0 rounded-full border-2 border-dashed opacity-80 ${!isActive && !isLockerUnlocked ? 'animate-spin-3d' : ''}`}
          style={{ 
            ...ringStyle, 
            animationDuration: `${data.spinSpeed}s`,
            transform: isActive ? `rotateX(0deg) rotateY(0deg)` : undefined
          }}
        />

        <div 
          className={`absolute inset-2 rounded-full border-2 border-dotted opacity-60 ${!isActive && !isLockerUnlocked ? 'animate-spin-3d-reverse' : ''}`}
          style={{ 
            ...ringStyle, 
            animationDuration: `${data.spinSpeed * 1.5}s`,
            transform: isActive ? `rotateX(90deg)` : undefined
          }}
        />

        <div 
          className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300"
          style={coreStyle}
        >
          {isActive && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center animate-pulse">
               <span className="text-xl font-bold text-green-400 drop-shadow-md bg-black/50 p-1 rounded">
                 {data.ascii}
               </span>
            </div>
          )}
        </div>

        {!isActive && !isLockerUnlocked && (
          <div className="absolute w-full h-full animate-orbit pointer-events-none">
            <div className="absolute top-0 left-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_5px_#fff]" />
          </div>
        )}
      </div>

     
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 whitespace-nowrap">
        {isCaptured ? <CheckCircle size={10} /> : (isMeasured ? <Unlock size={10} /> : <Scan size={10} />)}
        {isCaptured ? 'STABILIZED' : (isMeasured ? 'COLLAPSING...' : 'SUPERPOSITION')}
      </div>
    </div>
  );
};
