import React, { useEffect, useRef, useState } from 'react';

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  revealSpeed?: number;
  trigger?: boolean;
  delay?: number;
}

const ScrambleText: React.FC<ScrambleTextProps> = ({ 
  text, 
  className = "", 
  scrambleSpeed = 30,
  revealSpeed = 50,
  trigger = true,
  delay = 0
}) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const scramble = () => {
    let iteration = 0;
    
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setDisplayText(prev => 
        text.split("").map((letter, index) => {
          if (index < iteration) {
            return text[index];
          }
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1/3; // Adjust this to control how fast the real text is revealed
    }, scrambleSpeed);
  };

  useEffect(() => {
    if (trigger) {
      if (delay > 0) {
        timeoutRef.current = window.setTimeout(() => {
          scramble();
        }, delay);
      } else {
        scramble();
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, trigger, delay]);

  const handleMouseEnter = () => {
    scramble();
  };

  return (
    <span 
      className={`cursor-default ${className}`}
      onMouseEnter={handleMouseEnter}
    >
      {displayText}
    </span>
  );
};

export default ScrambleText;