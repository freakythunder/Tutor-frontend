import React, { useState, useRef, useCallback } from 'react';
import IDE from './IDE';
import ChatInterface from './ChatInterface';
import styles from '../Styles/ResizableContainer.module.css';

interface ChatInterfaceRef {
  addFeedbackMessage: (feedback: string) => void;
}

const ResizableContainer: React.FC = () => {
  const [leftWidth, setLeftWidth] = useState(60);
  const containerRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);
  const chatInterfaceRef = useRef<ChatInterfaceRef>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing.current || !containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const newLeftWidth = (e.clientX / containerWidth) * 100;

    if (newLeftWidth > 20 && newLeftWidth < 80) {
      setLeftWidth(newLeftWidth);
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    isResizing.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = useCallback(() => {
    isResizing.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove, handleMouseUp]);

  const handleFeedbackReceived = useCallback((feedback: string) => {
    if (chatInterfaceRef.current) {
      chatInterfaceRef.current.addFeedbackMessage(feedback);
    }
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.leftPane} style={{ width: `${leftWidth}%` }}>
        <IDE onFeedbackReceived={handleFeedbackReceived} />
      </div>
      <div className={styles.resizer} onMouseDown={handleMouseDown} />
      <div className={styles.rightPane} style={{ width: `${100 - leftWidth}%` }}>
        <ChatInterface ref={chatInterfaceRef} />
      </div>
    </div>
  );
};

export default ResizableContainer;