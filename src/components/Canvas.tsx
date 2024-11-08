"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Pos {
  x: number;
  y: number;
}

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isPainting, setIsPainting] = useState(false);
  const [pos, setPos] = useState<Pos | null>(null);

  const getPosition = (event: MouseEvent): Pos | undefined => {
    if (!canvasRef.current) return;

    const canvas: HTMLCanvasElement = canvasRef.current;
    return {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop,
    };
  };

  const drawLine = (prev: Pos, next: Pos) => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext("2d");

    if (context) {
      context.strokeStyle = "black";
      context.lineJoin = "round";
      context.lineWidth = 1;

      context.beginPath();
      context.moveTo(prev.x, prev.y);
      context.lineTo(next.x, next.y);
      context.closePath();

      context.stroke();
    }
  };

  const startPaint = useCallback((event: MouseEvent) => {
    const curPos = getPosition(event);
    if (curPos) {
      setIsPainting(true);
      setPos(curPos);
    }
  }, []);

  const paint = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (isPainting) {
        const newPos = getPosition(event);
        if (pos && newPos) {
          drawLine(pos, newPos);
          setPos(newPos);
        }
      }
    },
    [isPainting, pos]
  );

  const exitPaint = useCallback(() => {
    setIsPainting(false);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("mousedown", startPaint);
    canvas.addEventListener("mousemove", paint);
    canvas.addEventListener("mouseup", exitPaint);
    canvas.addEventListener("mouseleave", exitPaint);
    return () => {
      canvas.removeEventListener("mousedown", startPaint);
      canvas.removeEventListener("mousemove", paint);
      canvas.removeEventListener("mouseup", exitPaint);
      canvas.removeEventListener("mouseleave", exitPaint);
    };
  }, [startPaint, paint, exitPaint]);

  return (
    <div className="w-full h-96 border-gray-300 border-2 rounded-md">
      <canvas ref={canvasRef} id="canvas" className="w-full h-full" />
    </div>
  );
};

export default Canvas;
