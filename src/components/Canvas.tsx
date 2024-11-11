"use client";

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

import { AiFillPicture } from "react-icons/ai";
import { BiSolidEraser } from "react-icons/bi";
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
  mode: "draw" | "eraser";
}

const Canvas = ({
  updateMode,
  picture,
}: {
  updateMode: boolean;
  picture: string | null;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isPainting, setIsPainting] = useState(false);
  const [pos, setPos] = useState<Pos | null>(null);
  const [pic, setPic] = useState<string | null>(null);
  const [option, setOption] = useState<Option>({
    lineWidth: 1,
    strokeStyle: "black",
    mode: "draw",
  });

  useEffect(() => {
    setPic(picture);
  }, [picture]);

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

  /** 전체 삭제 */
  const clear = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
  };

  /** 지우개 핸들러 */
  const handleEraser = () => {
    if (option.mode === "eraser") {
      setOption({
        lineWidth: 1,
        strokeStyle: "#000000",
        mode: "draw",
      });
    } else {
      setOption({
        lineWidth: 20,
        strokeStyle: "#f6f6f6",
        mode: "eraser",
      });
    }
  };

  /** 파일 업로드 핸들러 */
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024;

    const target = e.currentTarget;
    const files = (target.files as FileList)[0];

    if (!files) return;

    // 파일 용량 체크
    if (files.size > FILE_SIZE_MAX_LIMIT) {
      target.value = "";
      alert("업로드 가능한 최대 용량은 5MB입니다. ");
      return;
    }
    const url = URL.createObjectURL(files);
    setPic(url);
  };

  /** 캔버스 크기 set */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;
  }, []);

  /** 이미지 삽입 후 캔버스에 로드 */
  useEffect(() => {
    if (!pic) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    const imgEl = new Image();
    imgEl.src = pic;
    imgEl.style.objectFit = "cover";
    imgEl.onload = () => {
      context?.drawImage(imgEl, 0, 0, canvas.width, canvas.height);
    };
  }, [pic]);

  /** 이벤트 등록 */
  useEffect(() => {
    if (!updateMode) return;
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
  }, [startPaint, paint, exitPaint, updateMode]);

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full h-[300px] border-gray-300 border-2 rounded-md">
        <canvas ref={canvasRef} id="canvas" className="w-full h-full" />
      </div>
      {updateMode && (
        <div className="flex gap-2">
          <button type="button" onClick={clear} className="canvas-option-btn">
            <HiOutlineTrash />
          </button>
          <PenWidthButton
            disabled={option.mode === "eraser"}
            onClick={(v) => setOption({ ...option, lineWidth: v })}
          />
          <ColorButton
            disabled={option.mode === "eraser"}
            onClick={(v) => setOption({ ...option, strokeStyle: v })}
          />
          <button
            type="button"
            onClick={handleEraser}
            className={`canvas-option-btn ${
              option.mode === "eraser" ? " text-yellow-300" : ""
            }`}
          >
            <BiSolidEraser />
          </button>
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={handleFile}
            accept="image/png, image/jpeg"
          />
          <label htmlFor="file" className={`canvas-option-btn`}>
            <AiFillPicture />
          </label>
        </div>
      )}
    </div>
  );
};

export default Canvas;
