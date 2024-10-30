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
    const newLeftWidth = (e.clientX / containerWidth) * 100;

    if (newLeftWidth > 20 && newLeftWidth < 80) {
      setLeftWidth(newLeftWidth);
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
      <div className={styles.leftPane} style={{ width: `${leftWidth}%` }}>
        <IDE />
      </div>
      <div className={styles.resizer} onMouseDown={handleMouseDown} />
      <div className={styles.rightPane} style={{ width: `${100 - leftWidth}%` }}>
        <ChatInterface />
      </div>
    </div>
  );
};

export default ResizableContainer;