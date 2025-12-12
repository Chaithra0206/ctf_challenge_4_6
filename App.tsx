import React, { useState, useEffect, useRef } from 'react';
import { CLOCK_OFFSETS, SYSTEM_ERRORS } from './clock';

const SECRET_KEY = String.fromCharCode(...CLOCK_OFFSETS);

const App: React.FC = () => {
  const [logs, setLogs] = useState<string[]>(["SYSTEM BOOT SEQUENCE INITIATED...", "CHECKING BIOS... OK", "LOADING KERNEL... FAIL"]);
  const [userInput, setUserInput] = useState('');
  const [isSystemRestored, setIsSystemRestored] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);


  useEffect(() => {
    if (isSystemRestored) return;

    const interval = setInterval(() => {
      setLogs(prev => {
    
        const newLogs = [...prev];
        if (newLogs.length > 50) newLogs.shift();

       
        if (Math.random() > 0.8) {
          const randomOffset = CLOCK_OFFSETS[Math.floor(Math.random() * CLOCK_OFFSETS.length)];
          newLogs.push(`[WARN] SYSTEM CLOCK ERROR — OFFSET REQUIRED: ${randomOffset}`);
        } else {
          
          const randomErr = SYSTEM_ERRORS[Math.floor(Math.random() * SYSTEM_ERRORS.length)];
          const timestamp = Math.floor(Date.now() / 1000).toString(16).toUpperCase();
          newLogs.push(`[${timestamp}] ${randomErr}`);
        }
        return newLogs;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [isSystemRestored]);

  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (isSystemRestored) return;

    if (e.key === 'Backspace') {
      setUserInput(prev => prev.slice(0, -1));
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      setUserInput(prev => prev + e.key);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSystemRestored]);

  
  useEffect(() => {
    if (userInput.endsWith(SECRET_KEY)) {
      setIsSystemRestored(true);
      setLogs([
        "----------------------------------------",
        "!!! OFFSET MATCH CONFIRMED !!!",
        "!!! SYSTEM CLOCK SYNCHRONIZED !!!",
        "----------------------------------------",
        "RESTORING ROOT ACCESS...",
        "ACCESS GRANTED.",
        `WELCOME BACK, ADMIN.`,
        "----------------------------------------"
      ]);
      setUserInput("");
    }
  }, [userInput]);

  return (
    <div className="min-h-screen w-full bg-black text-[#33ff00] p-4 md:p-12 crt flex flex-col font-vt323 text-lg md:text-2xl leading-none">
      
     
      <div className="mb-4 border-b border-[#33ff00]/50 pb-2 flex justify-between items-end uppercase">
        <div>
           <h1 className="text-3xl md:text-5xl text-glow">TERMINAL_V1.0.4</h1>
           <span className="text-sm md:text-lg opacity-70">STATUS: {isSystemRestored ? "ONLINE" : "CRITICAL_FAILURE"}</span>
        </div>
        <div className="text-right text-xs md:text-sm opacity-50">
          MEM: 64KB<br/>
          CPU: OVERLOAD
        </div>
      </div>

  
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 overflow-y-auto pb-20">
          {logs.map((log, index) => (
             <div key={index} className="mb-1 break-words">
               <span className="opacity-50 mr-2">&gt;</span>
               {log}
             </div>
          ))}
          
         
          {!isSystemRestored && (
            <div className="mt-4 flex items-center text-glow">
              <span className="mr-2">ROOT@SYSTEM:~$</span>
              <span>{userInput}</span>
              <span className="w-3 h-6 bg-[#33ff00] ml-1 cursor-blink block"></span>
            </div>
          )}
          
          <div ref={bottomRef} />
        </div>
      </div>

      
      
    </div>
  );
};

export default App;
