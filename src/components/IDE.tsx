import React, { useState, useRef } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import styles from '../Styles/IDE.module.css';
import { executeCode } from '../services/codeService';

interface IDEProps {
  height: number;
  onRun: (output: string) => void;
}

const IDE: React.FC<IDEProps> = ({ height, onRun }) => {
  const placeholderText = 
  `
  // This is the code editor where you will practice writing code. 
  //Just follow the instructions in the section to the left. 
  //Once you are ready, click on "Let's begin" to the bottom right. 
  `
 
  const [code, setCode] = useState<string>(placeholderText);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPlaceholderActive, setIsPlaceholderActive] = useState<boolean>(true);
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;

    editor.onDidFocusEditorWidget(() => {
      if (isPlaceholderActive) {
        setCode(''); // Clear placeholder only on focus
      }
    });
  };

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined && value !== placeholderText) {
      setCode(value);
      setIsPlaceholderActive(false);
    }
  };


  const handleRunCode = async () => {
    if (isPlaceholderActive) return; // Prevent running placeholder text
    setIsLoading(true);
    try {
      const result = await executeCode(code);
      const output = result.success ? result.data.output : 'Error while executing code.';
      onRun(output); // Trigger output update immediately
    } catch {
      onRun('Error while executing code.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.ideContainer}>
      <div className={styles.buttonContainer}>
        <button className={styles.runButton} onClick={handleRunCode} disabled={isPlaceholderActive || isLoading}>
          {isLoading ? 'Running...' : 'Run'}
        </button>
      </div>
      <div className={styles.editorContainer}>
        <Editor
          defaultLanguage="python"
          value={code}
          onChange={handleCodeChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
};

export default IDE;
