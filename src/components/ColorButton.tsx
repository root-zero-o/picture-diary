import { useState } from "react";
import { BiSolidPalette } from "react-icons/bi";

interface IColorButton {
  onClick: (v: string) => void;
}

const ColorButton = ({ onClick }: IColorButton) => {
  const [showOption, setShowOption] = useState(false);

  const colors = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#14b8a6",
    "#3b82f6",
    "#a855f7",
    "#ec4899",
    "#6b7280",
    "#000000",
  ];

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
                key={v}
                onClick={() => handleClick(v)}
                className="w-8 h-8 flex justify-center items-center rounded-md hover:bg-gray-600"
              >
                <div className={`w-4 h-4 rounded-full bg-[${v}]`} />
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default ColorButton;
