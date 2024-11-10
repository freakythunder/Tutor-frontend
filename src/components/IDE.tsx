import React, { useState, useRef } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import styles from '../Styles/IDE.module.css';
import ResizableOutput from './ResizableOutput';
import { executeCode } from '../services/codeService';
interface IDEProps {
  onFeedbackReceived: (feedback: string) => void;
}
const IDE: React.FC<IDEProps> = ({ onFeedbackReceived }) => {
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [showOutput, setShowOutput] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const ideRef = useRef<HTMLDivElement>(null);

  const handleCodeChange = (value: string | undefined) => {
    setCode(value || '');
  };

  const handleRunCode = async () => {
    setIsLoading(true);
    try {
      const result = await executeCode(code);
      if (result.success) {
        setOutput(result.data.output);
        setShowOutput(true);
        // Send feedback to ChatInterface
        console.log("Feedback received:");
        onFeedbackReceived(result.data.feedback);
      }
    } catch (error) {
      setOutput('Error while executing code.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditorWillMount = (monaco: Monaco) => {
    monaco.languages.registerCompletionItemProvider('python', {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };
  
        return {
          suggestions: [
            {
              label: 'def',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: 'def ${1:function_name}(${2:parameters}):\n\t${0}',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Define a new function',
              range: range,
            },
            {
              label: 'for',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: 'for ${1:item} in ${2:iterable}:\n\t${0}',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'For loop',
              range: range,
            },
            {
              label: 'if',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: 'if ${1:condition}:\n\t${0}',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'If statement',
              range: range,
            },
          ]
        };
      }
    });
  };
  

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    // You can add more customizations here if needed
  };

  return (
    <div className={styles.ideContainer} ref={ideRef}>
      <div className={styles.editorContainer}>
        <Editor
          height="100%"
          defaultLanguage="javascript"
          value={code}
          onChange={handleCodeChange}
          theme="vs-dark"
          beforeMount={handleEditorWillMount}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            cursorStyle: 'line',
            automaticLayout: true,
            bracketPairColorization: { enabled: true },
            renderLineHighlight: 'all',
            formatOnType: true,
            formatOnPaste: true,
            tabSize: 4,
            insertSpaces: true,
            wordWrap: 'on',
          }}
        />
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.runButton} onClick={handleRunCode} disabled={isLoading}>
          {isLoading ? 'Running...' : 'Run'}
        </button>
      </div>
      {showOutput && (
        <ResizableOutput
          output={output}
          isLoading={isLoading}
          onClose={() => setShowOutput(false)}
          containerWidth={ideRef.current?.clientWidth || 0}
        />
      )}
    </div>
  );
};

export default IDE;