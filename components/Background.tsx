import React, { useEffect, useRef } from 'react';
import { Particle, ViewState } from '../types';

interface BackgroundProps {
  currentView?: ViewState;
}

const Background: React.FC<BackgroundProps> = ({ currentView }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const ripplesRef = useRef<{x: number, y: number, age: number, strength: number}[]>([]);
  // Use a ref for opacity to allow smooth interpolation across renders
  const lineOpacityRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: (Particle & { originalX: number; originalY: number; color: string })[] = [];
    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let time = 0;

    const colors = ['rgba(255, 255, 255, 0.6)', 'rgba(99, 102, 241, 0.6)', 'rgba(255, 255, 255, 0.3)']; 

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((width * height) / 7000); 
      
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          originalX: x,
          originalY: y,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          size: Math.random() * 1.5 + 0.5,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = (e: MouseEvent) => {
        // Only allow interaction on HOME page
        if (currentView !== ViewState.HOME) return;

        if (ripplesRef.current.length > 8) ripplesRef.current.shift();
        
        ripplesRef.current.push({
            x: e.clientX,
            y: e.clientY,
            age: 0,
            strength: 4.0 // Higher initial strength
        });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    handleResize();

    // -- ABSTRACT TOPOGRAPHY GENERATION --
    
    const getNoiseValue = (x: number, y: number, t: number) => {
        const scale = 550; // Larger scale for smoother base terrain
        
        let noise = (
            Math.sin((x + t * 1.5) / scale) * 1.0 + 
            Math.cos((y - t * 2.5) / (scale * 1.2)) * 0.8 + 
            Math.sin((x * 0.2 + y * 0.1 + t * 0.5) / 200) * 0.4 
        );

        // Mesmerizing Ripple Logic
        for (const r of ripplesRef.current) {
            const dx = x - r.x;
            const dy = y - r.y;
            const dist = Math.sqrt(dx*dx + dy*dy);

            // Smooth exponential decay based on age (Organic fade)
            const ageDecay = Math.exp(-r.age / 120); 
            // Distance decay
            const distDecay = Math.max(0, 1 - dist / 800);

            if (distDecay > 0) {
                 // Dampened Sine Wave: Amplitude * sin(frequency * dist - speed * time)
                 // This creates a propagating wave that gets smaller as it travels
                 const ripple = Math.sin(dist * 0.025 - r.age * 0.1);
                 
                 noise += ripple * r.strength * ageDecay * distDecay;
            }
        }
        
        return noise;
    };

    const cellSize = 22; 
    
    const drawTopography = (opacityMultiplier: number) => {
        if (opacityMultiplier <= 0.01) return; // Optimization: Don't draw if invisible

        const cols = Math.ceil(width / cellSize) + 1;
        const rows = Math.ceil(height / cellSize) + 1;
        
        const thresholds = [-0.6, -0.2, 0.2, 0.6, 1.0]; 

        ctx.lineWidth = 1;

        let currentRow = new Float32Array(cols);
        let nextRow = new Float32Array(cols);

        for (let x = 0; x < cols; x++) {
            currentRow[x] = getNoiseValue(x * cellSize, 0, time);
        }

        const lerp = (start: number, end: number, t: number) => start + (end - start) * t;
        const invLerp = (val1: number, val2: number, tVal: number) => {
            if (Math.abs(val2 - val1) < 1e-5) return 0.5;
            return (tVal - val1) / (val2 - val1);
        };

        for (let y = 0; y < rows - 1; y++) {
            for (let x = 0; x < cols; x++) {
                nextRow[x] = getNoiseValue(x * cellSize, (y + 1) * cellSize, time);
            }

            for (let i = 0; i < thresholds.length; i++) {
                const thresh = thresholds[i];
                
                // Base opacity * Fade transition * Threshold variation
                const baseOpacity = 0.03 + (i * 0.015);
                const finalOpacity = baseOpacity * opacityMultiplier;

                ctx.strokeStyle = `rgba(255, 255, 255, ${finalOpacity})`;
                
                ctx.beginPath();

                for (let x = 0; x < cols - 1; x++) {
                    const v0 = currentRow[x];
                    const v1 = currentRow[x + 1];
                    const v2 = nextRow[x + 1];
                    const v3 = nextRow[x];

                    let binaryIndex = 0;
                    if (v0 > thresh) binaryIndex |= 8;
                    if (v1 > thresh) binaryIndex |= 4;
                    if (v2 > thresh) binaryIndex |= 2;
                    if (v3 > thresh) binaryIndex |= 1;

                    if (binaryIndex === 0 || binaryIndex === 15) continue;

                    const x0 = x * cellSize;
                    const y0 = y * cellSize;

                    const pt0 = { x: lerp(x0, x0+cellSize, invLerp(v0, v1, thresh)), y: y0 };
                    const pt1 = { x: x0 + cellSize, y: lerp(y0, y0+cellSize, invLerp(v1, v2, thresh)) };
                    const pt2 = { x: lerp(x0 + cellSize, x0, invLerp(v2, v3, thresh)), y: y0 + cellSize };
                    const pt3 = { x: x0, y: lerp(y0 + cellSize, y0, invLerp(v3, v0, thresh)) };

                    const line = (pA: {x:number, y:number}, pB: {x:number, y:number}) => {
                        ctx.moveTo(pA.x, pA.y);
                        ctx.lineTo(pB.x, pB.y);
                    };

                    switch (binaryIndex) {
                        case 1: line(pt3, pt2); break;
                        case 2: line(pt1, pt2); break;
                        case 3: line(pt3, pt1); break;
                        case 4: line(pt0, pt1); break;
                        case 5: line(pt0, pt3); line(pt1, pt2); break; 
                        case 6: line(pt0, pt2); break;
                        case 7: line(pt3, pt0); break;
                        case 8: line(pt3, pt0); break;
                        case 9: line(pt0, pt2); break;
                        case 10: line(pt0, pt1); line(pt3, pt2); break; 
                        case 11: line(pt0, pt1); break;
                        case 12: line(pt3, pt1); break;
                        case 13: line(pt1, pt2); break;
                        case 14: line(pt3, pt2); break;
                    }
                }
                ctx.stroke();
            }
            currentRow.set(nextRow);
        }
    };

    const draw = () => {
      if (!ctx || !canvas) return;

      // Smooth transition logic for opacity based on view
      const targetOpacity = currentView === ViewState.HOME ? 1.0 : 0.0;
      // Linear interpolation for smooth fade in/out
      lineOpacityRef.current += (targetOpacity - lineOpacityRef.current) * 0.05;

      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, width, height);
      
      time += 0.02; // Slower time for more "mesmerizing" feel

      // Update Ripples
      ripplesRef.current = ripplesRef.current.filter(r => {
          r.age++;
          return r.age < 300; // Longer lifetime for smoother fade
      });

      // Only draw topography if there is some opacity
      drawTopography(lineOpacityRef.current);

      // Spotlight effect (Always active but subtle)
      if (mouseRef.current.x > -100) {
        const gradient = ctx.createRadialGradient(
            mouseRef.current.x, 
            mouseRef.current.y, 
            0, 
            mouseRef.current.x, 
            mouseRef.current.y, 
            500
        );
        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.06)'); 
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw Stars (Always active)
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const alpha = Math.abs(Math.sin(time * 0.5 + p.x)); 
        ctx.globalAlpha = alpha * 0.8 + 0.2;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color; 
        ctx.fill();
        
        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentView]); // Re-run effect dependencies when view changes to ensure ref is accessible

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 bg-[#030712]"
    />
  );
};

export default Background;