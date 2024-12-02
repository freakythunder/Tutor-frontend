import React, { useState, useRef, useEffect, useCallback, useLayoutEffect , MutableRefObject } from 'react';
import ReactDOM from 'react-dom';
import IDE from './IDE';
import ResizableOutput from './Output';
import styles from '../Styles/HorizontalSplitter.module.css';
import ChatInterface , {ChatInterfaceRef} from './ChatInterface';

interface HorizontalSplitterProps {
  chatInterfaceRef: MutableRefObject<ChatInterfaceRef | null>; // Correct type for ref
}

const HorizontalSplitter: React.FC<HorizontalSplitterProps> = ({ chatInterfaceRef }) => {
  const [outputHeightPercent, setOutputHeightPercent] = useState(30); // Output height in %
  const [ideHeightPercent, setIdeHeightPercent] = useState(60); // IDE height in % (initially 90%)
  const [output, setOutput] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const splitterRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);

  


  // Handle sending "Done with the Challenge" message
  const handleSendChallengeMessage = () => {
    if (chatInterfaceRef.current) {
      chatInterfaceRef.current.addMessage("Done with the Challenge");
      console.log("sent message from hori");
    }
  };

  const handleSendHelpMessage = () => {
    if (chatInterfaceRef.current) {
      chatInterfaceRef.current.addMessage("Need Help");
      console.log("sent message from hori");
    }
  };

  // Function to calculate the container height in pixels
  const calculateContainerHeight = () => containerRef.current?.clientHeight || window.innerHeight;

  // Update heights based on output height percentage
  useEffect(() => {
    const containerHeight = calculateContainerHeight();
    setIdeHeightPercent(90 - outputHeightPercent); // Ensure IDE takes 90% minus the output space
  }, [outputHeightPercent]);

  // Callback to handle code output and open the output pane
  const handleRunCode = useCallback((output: string) => {
    setOutput(output);
    setOutputHeightPercent(30); // Set initial output height to 10%
  }, []);

  // Close output and reset IDE to full height
  const handleCloseOutput = () => {
    setOutputHeightPercent(0);
    setIdeHeightPercent(90); // IDE takes up full height (90%)
  };

  // Handle dynamic resizing of output and IDE
  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizing.current) return;

    const containerHeight = calculateContainerHeight();
    const newOutputHeightPercent = ((containerHeight - event.clientY) / containerHeight) * 100;

    if (newOutputHeightPercent >= 5 && newOutputHeightPercent <= 60) { // Set bounds in percentage (5%-40%)
      setOutputHeightPercent(newOutputHeightPercent);
      setIdeHeightPercent(90 - newOutputHeightPercent);
    }
  };

  const handleMouseDown = () => {
    isResizing.current = true;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    if (splitterRef.current) {
      splitterRef.current.addEventListener('mousedown', handleMouseDown);
    }
    return () => {
      splitterRef.current?.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);



  return (
    <div ref={containerRef} className={styles.splitterContainer} style={{ position: 'relative', height: '100%' }}>
      {/* IDE Section */}
      <div
        className={styles.ideSection}
        style={{ height: `${ideHeightPercent}%`, overflow: 'hidden' }}
      >
        <IDE height={ideHeightPercent} onRun={handleRunCode} />
      </div>

      {/* Splitter Section */}
      <div ref={splitterRef} className={styles.splitter}></div>

      {/* Output Section */}
      <div
        className={styles.outputSection}
        style={{
          height: outputHeightPercent ? `${outputHeightPercent}%` : '0',
          display: outputHeightPercent ? 'block' : 'none',
        }}
      >
        <ResizableOutput
          output={output}
          isLoading={false}
          onClose={handleCloseOutput}
          containerWidth={containerRef.current?.clientWidth || 0}
          height={outputHeightPercent}
        />
      </div>
      <div className={styles.buttonContainer} style={{ position: 'absolute', bottom: 0, width: '100%', padding: '10px' }}>
        <button onClick={() => { console.log('Challenge button clicked'); handleSendChallengeMessage(); }} className={styles.challengeButton}>
          Done with the Challenge
        </button>
        <button onClick={handleSendHelpMessage} className={styles.helpButton}>
          Need Help
        </button>
      </div>

      
      
    </div>
  );
};

export default HorizontalSplitter;
