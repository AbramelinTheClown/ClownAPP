import React, { useEffect, useRef } from 'react';

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);  // Properly type the ref as possibly null
  // List of emojis to stream
  const emojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣',
    '😊', '😇', '😉', '😎', '😍', '😘', '😗', '😙',
    '😚', '🙂', '🤗', '🤩', '🤔', '😐', '😑', '😶'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;  // canvasRef.current can be null
    if (!canvas) return;  // If canvas is null, exit early
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;  // If ctx is null, exit early

    // Set canvas dimensions to match the window size
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const fontSize = 20;
    const columns = Math.floor(width / fontSize);
    // Create an array of drops – one per column
    const drops = Array(columns).fill(1);

    // Draw the animated emoji stream
    function draw() {
      // Translucent background to create a trailing effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      // Set emoji color (you can change to any color, or even use gradient)
      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Pick a random emoji from the array
        const text = emojis[Math.floor(Math.random() * emojis.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(text, x, y);

        // Reset drop randomly to create variation
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      requestAnimationFrame(draw);
    }

    draw();

    // Update canvas dimensions on resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="matrix-canvas" />;
};

export default MatrixBackground;
