import React, { useEffect, useRef, useState } from 'react';

interface TrailParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}

const COLORS = ['#6366f1', '#a855f7', '#06b6d4', '#ffffff']; // Indigo, Purple, Cyan, White

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Refs for persistent data across renders/effect re-runs
  const particles = useRef<TrailParticle[]>([]);
  const mousePos = useRef({ x: -100, y: -100 });
  const lastMousePos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 }); // Fix: Store follower position in ref
  const hoveringRef = useRef(false); // Fix: Store hover state in ref for animation loop

  // Sync ref with state
  useEffect(() => {
    hoveringRef.current = hovering;
  }, [hovering]);

  useEffect(() => {
    const checkDevice = () => {
      setIsActive(window.matchMedia("(pointer: fine)").matches);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    let animationFrameId: number;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (cursor) {
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Initialize follower position instantly if off-screen to prevent fly-in
      if (followerPos.current.x === -100 && followerPos.current.y === -100) {
        followerPos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseDown = () => {
      setClicking(true);
      // Explosive Burst
      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 * i) / 12;
        const speed = Math.random() * 2 + 1;
        particles.current.push({
          x: mousePos.current.x,
          y: mousePos.current.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: Math.random() * 2 + 1
        });
      }
    };

    const onMouseUp = () => setClicking(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-hover') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);

    const loop = () => {
      // Smooth Follower Physics
      // Using ref values ensures position persists even if component updates
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * 0.15;
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * 0.15;

      if (follower) {
        follower.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`;
      }

      // Trail Generation logic
      const dist = Math.hypot(mousePos.current.x - lastMousePos.current.x, mousePos.current.y - lastMousePos.current.y);
      if (dist > 2) {
         // Only spawn if moving
         particles.current.push({
             x: mousePos.current.x + (Math.random() - 0.5) * 5,
             y: mousePos.current.y + (Math.random() - 0.5) * 5,
             vx: 0,
             vy: 0,
             life: 0.6, // Short life for trail
             color: hoveringRef.current ? '#6366f1' : 'rgba(255, 255, 255, 0.3)', // Use ref to read fresh state without restarting loop
             size: Math.random() * 1.5
         });
      }
      lastMousePos.current = { ...mousePos.current };

      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = particles.current.length - 1; i >= 0; i--) {
          const p = particles.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.03;

          if (p.life <= 0) {
            particles.current.splice(i, 1);
          } else {
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
          }
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive]); // Removed 'hovering' from dependencies to prevent loop restart

  return (
    <div className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
      
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Main Cursor Dot */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full z-[100] transition-colors duration-200 ${hovering ? 'bg-theme-accent' : 'bg-white mix-blend-difference'}`}
      />

      {/* Follower Ring */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 -ml-5 -mt-5 w-10 h-10 border rounded-full z-[99] transition-all duration-300 ease-out
          ${hovering ? 'scale-125 border-theme-accent border-2 bg-theme-accent/10' : 'scale-100 border-white/40 mix-blend-difference'}
          ${clicking ? 'scale-75' : ''}
        `}
      />
    </div>
  );
};

export default CustomCursor;