import React, { useState, useRef } from 'react';
import IDE from './IDE';
import ChatInterface from './ChatInterface';
import styles from '../Styles/ResizableContainer.module.css';

const ResizableContainer: React.FC = () => {
  const [leftWidth, setLeftWidth] = useState(60); // 60% for IDE
  const containerRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current || !containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const newLeftWidth = (e.clientX / containerWidth) * 100; // Calculate width dynamically

    if (newLeftWidth > 20 && newLeftWidth < 80) {
      setLeftWidth(newLeftWidth); // Adjust IDE width dynamically
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDown = () => {
    isResizing.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      {/* IDE on the left */}
      <div className={styles.leftPane} style={{ width: `${leftWidth}%` }}>
        <IDE />
      </div>
      
      {/* Divider between IDE and Chat Interface */}
      <div className={styles.resizer} onMouseDown={handleMouseDown} />

      {/* Chat Interface on the right */}
      <div className={styles.rightPane} style={{ width: `${100 - leftWidth}%` }}>
        <ChatInterface />
      </div>
    </div>
  );
};

export default ResizableContainer;
