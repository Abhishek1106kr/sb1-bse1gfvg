import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface SOSButtonProps {
  onActivate: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SOSButton: React.FC<SOSButtonProps> = ({ 
  onActivate, 
  size = 'lg',
  className = ''
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  
  const sizeClasses = {
    sm: 'h-16 w-16 text-sm',
    md: 'h-24 w-24 text-base',
    lg: 'h-32 w-32 text-xl'
  };
  
  const handleMouseDown = () => {
    setIsPressed(true);
    const timer = setTimeout(() => {
      onActivate();
      setIsPressed(false);
    }, 2000); // 2 seconds long press
    setLongPressTimer(timer);
  };
  
  const handleMouseUp = () => {
    setIsPressed(false);
    if (longPressTimer) {
      clearTimeout(longPressTimer);
    }
  };
  
  return (
    <button
      className={`relative rounded-full bg-red-600 text-white font-bold shadow-lg 
        flex items-center justify-center transform transition-all duration-300
        ${isPressed ? 'scale-95 bg-red-700' : 'hover:bg-red-500'} 
        ${sizeClasses[size]} ${className}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="flex flex-col items-center justify-center">
        <AlertCircle className={`${size === 'lg' ? 'h-12 w-12' : size === 'md' ? 'h-8 w-8' : 'h-6 w-6'} mb-1`} />
        <span>SOS</span>
        {isPressed && (
          <div className="absolute bottom-2 text-xs">
            Hold for 2s
          </div>
        )}
      </div>
      {isPressed && (
        <div className="absolute inset-0 rounded-full border-4 border-white animate-ping opacity-75"></div>
      )}
    </button>
  );
};

export default SOSButton;