import { useState } from "react";
import { HiPencil } from "react-icons/hi";

interface IPenWidthButton {
  onClick: (v: number) => void;
}

const PenWidthButton = ({ onClick }: IPenWidthButton) => {
  const [showOption, setShowOption] = useState(false);

  const handleClick = (v: number) => {
    onClick(v);
    setShowOption(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowOption(!showOption)}
        className="w-8 h-8 flex justify-center items-center rounded-md bg-gray-800 text-white"
      >
        <HiPencil />
      </button>
      {showOption && (
        <div className="flex flex-col bg-gray-800 rounded-md absolute bottom-8">
          <button
            onClick={() => handleClick(6)}
            className="w-8 h-8 flex justify-center items-center rounded-md"
          >
            <div className="w-3 h-3 rounded-full bg-white" />
          </button>

          <button
            onClick={() => handleClick(4)}
            className="w-8 h-8 flex justify-center items-center rounded-md"
          >
            <div className="w-2 h-2 rounded-full bg-white" />
          </button>
          <button
            onClick={() => handleClick(2)}
            className="w-8 h-8 flex justify-center items-center rounded-md"
          >
            <div className="w-1 h-1 rounded-full bg-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PenWidthButton;
