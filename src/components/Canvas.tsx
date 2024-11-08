"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { HiOutlineTrash } from "react-icons/hi";
import ColorButton from "./ColorButton";
import PenWidthButton from "./PenWidthButton";

interface Pos {
  x: number;
  y: number;
}

interface Option {
  lineWidth: number;
  strokeStyle: string;
}

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isPainting, setIsPainting] = useState(false);
  const [pos, setPos] = useState<Pos | null>(null);
  const [option, setOption] = useState<Option>({
    lineWidth: 1,
    strokeStyle: "black",
  });

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
      context.strokeStyle = option.strokeStyle;
      context.lineJoin = "round";
      context.lineWidth = option.lineWidth;

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

  const clear = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
  };

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
    <div className="flex flex-col gap-2">
      <div className="w-full h-92 border-gray-300 border-2 rounded-md">
        <canvas ref={canvasRef} id="canvas" className="w-full h-full" />
      </div>
      <div className="flex gap-2">
        <button
          onClick={clear}
          className="w-8 h-8 flex justify-center items-center rounded-md bg-gray-800 text-white"
        >
          <HiOutlineTrash />
        </button>
        <PenWidthButton
          onClick={(v) => setOption({ ...option, lineWidth: v })}
        />
        <ColorButton
          onClick={(v) => setOption({ ...option, strokeStyle: v })}
        />
      </div>
    </div>
  );
};

export default Canvas;
