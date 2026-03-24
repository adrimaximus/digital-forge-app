
import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  originX: number;
  originY: number;
}

interface HeroCanvasProps {
  dimensions: {
    width: number;
    height: number;
  };
  mousePosition: {
    x: number;
    y: number;
  };
}

const HeroCanvas: React.FC<HeroCanvasProps> = ({ dimensions, mousePosition }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const pointsRef = useRef<Point[]>([]);

  // Initialize points
  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      const points: Point[] = [];
      const particleCount = Math.floor((dimensions.width * dimensions.height) / 10000);
      
      for (let i = 0; i < particleCount; i++) {
        points.push({
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          radius: Math.random() * 2 + 1,
          vx: Math.random() * 2 - 1,
          vy: Math.random() * 2 - 1,
          originX: Math.random() * dimensions.width,
          originY: Math.random() * dimensions.height,
        });
      }
      
      pointsRef.current = points;
      
      // Start animation
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) animate(ctx);
      }
    }
    
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [dimensions]);

  // Animation function
  const animate = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);
    
    // Update and draw points
    for (let i = 0; i < pointsRef.current.length; i++) {
      const point = pointsRef.current[i];
      
      // Move points
      point.x += point.vx;
      point.y += point.vy;
      
      // Boundary check
      if (point.x < 0 || point.x > dimensions.width) {
        point.vx = -point.vx;
      }
      if (point.y < 0 || point.y > dimensions.height) {
        point.vy = -point.vy;
      }
      
      // Draw point
      ctx.beginPath();
      ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#fdd100';
      ctx.fill();
      
      // Mouse interaction
      const dx = mousePosition.x - point.x;
      const dy = mousePosition.y - point.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // If mouse is close, create attraction
      if (distance < 120) {
        const angle = Math.atan2(dy, dx);
        const tx = mousePosition.x + Math.cos(angle) * 120;
        const ty = mousePosition.y + Math.sin(angle) * 120;
        const ax = (tx - point.x) * 0.03;
        const ay = (ty - point.y) * 0.03;
        
        point.vx += ax;
        point.vy += ay;
        
        // Draw connection to mouse
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(mousePosition.x, mousePosition.y);
        ctx.strokeStyle = `rgba(253, 209, 0, ${1 - distance / 120})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      
      // Cap velocity
      const speed = Math.sqrt(point.vx * point.vx + point.vy * point.vy);
      if (speed > 2) {
        point.vx = (point.vx / speed) * 2;
        point.vy = (point.vy / speed) * 2;
      }
      
      // Connect nearby points
      for (let j = i + 1; j < pointsRef.current.length; j++) {
        const point2 = pointsRef.current[j];
        const dx = point.x - point2.x;
        const dy = point.y - point2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(point2.x, point2.y);
          ctx.strokeStyle = `rgba(253, 209, 0, ${0.2 * (1 - distance / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    
    animationRef.current = requestAnimationFrame(() => animate(ctx));
  };

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="absolute inset-0 z-0"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default HeroCanvas;
