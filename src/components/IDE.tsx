import React, { useState } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import styles from '../Styles/IDE.module.css';
import { executeCode } from '../services/codeService';

interface IDEProps {
  height: number; 
  onRun: (output: string) => void;
}

const IDE: React.FC<IDEProps> = ({ height, onRun }) => {
  const [code, setCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCodeChange = (value: string | undefined) => {
    setCode(value || '');
  };

  const handleRunCode = async () => {
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
      />
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.runButton} onClick={handleRunCode}>
          {isLoading ? 'Running...' : 'Run'}
        </button>
      </div>
    </div>
  );
};

export default IDE;
