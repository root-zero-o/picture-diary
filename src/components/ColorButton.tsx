import { useMemo, useState } from "react";

import { BiSolidPalette } from "react-icons/bi";

interface IColorButton {
  onClick: (v: string) => void;
}

const ColorButton = ({ onClick }: IColorButton) => {
  const [showOption, setShowOption] = useState(false);

  const colors = useMemo(
    () => [
      {
        color: "#ef4444",
        bg: "bg-[#ef4444]",
      },
      {
        color: "#f97316",
        bg: "bg-[#f97316]",
      },
      {
        color: "#eab308",
        bg: "bg-[#eab308]",
      },
      {
        color: "#22c55e",
        bg: "bg-[#22c55e]",
      },
      {
        color: "#14b8a6",
        bg: "bg-[#14b8a6]",
      },
      {
        color: "#3b82f6",
        bg: "bg-[#3b82f6]",
      },
      {
        color: "#a855f7",
        bg: "bg-[#a855f7]",
      },
      {
        color: "#ec4899",
        bg: "bg-[#ec4899]",
      },
      {
        color: "#6b7280",
        bg: "bg-[#6b7280]",
      },
      {
        color: "#000000",
        bg: "bg-[#000000]",
      },
    ],
    []
  );

  const handleClick = (v: string) => {
    onClick(v);
    setShowOption(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowOption(!showOption)}
        className="w-8 h-8 flex justify-center items-center rounded-md bg-gray-800 text-white"
      >
        <BiSolidPalette />
      </button>
      <div className="flex w-40 flex-wrap bg-gray-800 rounded-md absolute bottom-8">
        {showOption &&
          colors.map((v) => {
            return (
              <button
                key={v.color}
                onClick={() => handleClick(v.color)}
                className="w-8 h-8 flex justify-center items-center rounded-md hover:bg-gray-600"
              >
                <div className={`w-4 h-4 rounded-full ${v.bg}`} />
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default ColorButton;
