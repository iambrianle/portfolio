import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Cpu, Wifi, Battery, Shield } from 'lucide-react';

const BOOT_SEQUENCE = [
  { text: "> INITIATING SYSTEM KERNEL...", delay: 200 },
  { text: "> LOADING NEURAL MODULES...", delay: 600 },
  { text: "> CONNECTING TO MAIN NET...", delay: 1100 },
  { text: "> VERIFYING INTEGRITY... OK", delay: 1600 },
  { text: "> ACCESS GRANTED: GUEST_USER", delay: 2100 },
  { text: "> DEPLOYING PORTFOLIO INTERFACE V2.0", delay: 2600 },
  { text: "> SYSTEM READY.", delay: 3000, color: "text-theme-accent" }
];

const TerminalHero: React.FC = () => {
  const [lines, setLines] = useState<any[]>([]);
  const [active, setActive] = useState(true);

  useEffect(() => {
    let timeouts: number[] = [];
    
    BOOT_SEQUENCE.forEach((line, index) => {
        const timeout = window.setTimeout(() => {
            setLines(prev => [...prev, line]);
        }, line.delay);
        timeouts.push(timeout);
    });

    return () => {
        timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-80 p-6 font-mono text-xs border-l border-white/10 bg-theme-bg/30 backdrop-blur-sm select-none">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
             <div className="flex items-center gap-2 text-theme-muted">
                 <Terminal size={14} />
                 <span className="uppercase tracking-widest">Sys_Log</span>
             </div>
             <div className="flex gap-1">
                 <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
                 <div className="w-2 h-2 rounded-full bg-yellow-500/20"></div>
                 <div className="w-2 h-2 rounded-full bg-green-500/50 animate-pulse"></div>
             </div>
        </div>

        {/* Content */}
        <div className="space-y-2 font-light h-48 overflow-hidden relative">
            {lines.map((line, i) => (
                <div key={i} className={`${line.color || 'text-theme-muted'} animate-in slide-in-from-left-2 fade-in duration-300`}>
                    {line.text}
                </div>
            ))}
            <div className="animate-pulse text-theme-accent">_</div>
        </div>

        {/* Status Grid */}
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/5">
             <div className="space-y-1">
                 <div className="flex items-center gap-2 text-theme-muted/50">
                     <Cpu size={12} />
                     <span>CPU</span>
                 </div>
                 <div className="text-white">12%</div>
                 <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full w-[12%] bg-theme-accent"></div>
                 </div>
             </div>
             <div className="space-y-1">
                 <div className="flex items-center gap-2 text-theme-muted/50">
                     <Wifi size={12} />
                     <span>NET</span>
                 </div>
                 <div className="text-white">500Mb</div>
                 <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full w-[85%] bg-theme-secondary"></div>
                 </div>
             </div>
        </div>
        
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-theme-accent/30"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-theme-accent/30"></div>
    </div>
  );
};

export default TerminalHero;