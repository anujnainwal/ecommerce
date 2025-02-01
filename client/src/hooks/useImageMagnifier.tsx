import { useState, useRef } from "react";

export const useImageMagnifier = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = event.pageX - left - window.scrollX;
    const y = event.pageY - top - window.scrollY;

    if (x >= 0 && x <= width && y >= 0 && y <= height) {
      setPosition({ x, y });
    } else {
      setIsHovering(false);
    }
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return {
    isHovering,
    position,
    containerRef,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  };
};
