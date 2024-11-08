import { useEffect, useState } from "react";

import { HiPencil } from "react-icons/hi";

interface IPenWidthButton {
  disabled: boolean;
  onClick: (v: number) => void;
}

const PenWidthButton = ({ disabled, onClick }: IPenWidthButton) => {
  const [showOption, setShowOption] = useState(false);

  const handleClick = (v: number) => {
    onClick(v);
    setShowOption(false);
  };

  useEffect(() => {
    if (disabled) {
      setShowOption(false);
    }
  }, [disabled]);

  return (
    <div className="relative">
      <button
        disabled={disabled}
        onClick={() => setShowOption(!showOption)}
        className="canvas-option-btn"
      >
        <HiPencil />
      </button>
      {showOption && (
        <div className="flex flex-col bg-gray-800 rounded-md absolute bottom-8">
          <button onClick={() => handleClick(6)} className="canvas-option-btn">
            <div className="w-3 h-3 rounded-full bg-white" />
          </button>

          <button onClick={() => handleClick(4)} className="canvas-option-btn">
            <div className="w-2 h-2 rounded-full bg-white" />
          </button>
          <button onClick={() => handleClick(2)} className="canvas-option-btn">
            <div className="w-1 h-1 rounded-full bg-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PenWidthButton;
