// src/components/FormattedAiResponse.tsx

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import styles from '../Styles/ChatInterface.module.css';
import { ComponentPropsWithoutRef } from 'react';

interface FormattedAIResponseProps {
  response: string | { 
    user_id: string | null; 
    userMessage: string; 
    aiResponse: string; 
    timestamp: string; 
  };
}

const FormattedAIResponse: React.FC<FormattedAIResponseProps> = ({ response }) => {
  const responseText = typeof response === 'string' ? response : response.aiResponse;

  return (
    <div className={styles.aiResponseContainer}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children, ...props }: ComponentPropsWithoutRef<'code'> & { inline?: boolean }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={vscDarkPlus as any}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          h3: ({ ...props }) => <h3 className={styles.aiResponseHeader} {...props} />,
          p: ({ ...props }) => <p className={styles.aiResponseText} {...props} />,
          ul: ({ ...props }) => <ul className={styles.bulletPoints} {...props} />,
          li: ({ ...props }) => <li className={styles.bulletPoint} {...props} />,
        }}
      >
        {responseText}
      </ReactMarkdown>
    </div>
  );
};

export default FormattedAIResponse;