import { useState, useRef } from "react";
import { FaTrash } from "react-icons/fa";

interface SwipeToDeleteProps {
  children: React.ReactNode;
  onDelete: () => void;
}

const SwipeToDelete = ({ children, onDelete }: SwipeToDeleteProps) => {
  const [translateX, setTranslateX] = useState<number>(0);
  const [startX, setStartX] = useState<number>(0);
  const [isSwiping, setIsSwiping] = useState<boolean>(false);
  const [isFixed, setIsFixed] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;

    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    if (isFixed) {
      if (diff < 0) {
        setTranslateX(Math.max(100 + diff, 0));
      }
    } else {
      if (diff > 0) {
        setTranslateX(Math.min(diff, 100));
      }
    }
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);

    if (isFixed) {
      if (translateX < 60) {
        setIsFixed(false);
        setTranslateX(0);
      } else {
        setTranslateX(100);
      }
    } else {
      if (translateX >= 60) {
        setIsFixed(true);
        setTranslateX(100);
      } else {
        setTranslateX(0);
      }
    }
  };

  const handleDelete = () => {
    onDelete();
    setIsFixed(false);
    setTranslateX(0);
  };

  const deleteOpacity = Math.min(translateX / 100, 1);

  return (
    <div className="mt-3 relative w-full overflow-hidden">
      <div 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-0 transition-opacity duration-300"
        style={{ opacity: deleteOpacity }}
      >
        <button
          onClick={handleDelete}
          className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-red-600 active:scale-95 transition-all duration-200"
        >
          <FaTrash className="text-[#fff8]" />
        </button>
      </div>

      <div
        ref={containerRef}
        className="relative z-10 transition-transform duration-300 ease-out"
        style={{
          transform: `translateX(-${translateX}px)`,
          touchAction: 'pan-y'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </div>
  );
};

export default SwipeToDelete;