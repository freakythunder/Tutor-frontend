// src/components/ResizableOutput.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from '../Styles/ResizableOutput.module.css';

interface ResizableOutputProps {
  output: string;
  isLoading: boolean;
  onClose: () => void;
  containerWidth: number;
}

const ResizableOutput: React.FC<ResizableOutputProps> = ({ output, isLoading, onClose, containerWidth }) => {
  const [height, setHeight] = useState<number>(200);
  const resizeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const newHeight = containerRect.bottom - e.clientY;
        setHeight(Math.max(100, Math.min(newHeight, window.innerHeight - 100)));
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const resizeElement = resizeRef.current;
    if (resizeElement) {
      resizeElement.addEventListener('mousedown', handleMouseDown);
    }

    return () => {
      if (resizeElement) {
        resizeElement.removeEventListener('mousedown', handleMouseDown);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={styles.outputContainer} 
      style={{ height: `${height}px`, width: `${containerWidth}px` }}
    >
      <div ref={resizeRef} className={styles.resizeHandle}></div>
      <div className={styles.outputHeader}>
        <h3>Output</h3>
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
      </div>
      <div className={styles.outputContent}>
        {isLoading ? (
          <div className={styles.loader}>Running code...</div>
        ) : (
          <SyntaxHighlighter language="python" style={vscDarkPlus} wrapLines={true}>
            {output}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
};

export default ResizableOutput;