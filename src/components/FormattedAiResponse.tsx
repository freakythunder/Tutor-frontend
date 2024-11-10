// src/components/FormattedAiResponse.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import styles from '../Styles/ChatInterface.module.css';
import { ComponentPropsWithoutRef } from 'react';
import { Message } from '../services/chatService';

// Define a more flexible response type
interface FormattedAIResponseProps {
  response: {
    user_id?: string;
    userMessage?: string;
    aiResponse: string | {
      user_id?: string;
      userMessage?: string;
      aiResponse?: string;
      timestamp?: string;
    };
    timestamp: string;
  };
}

const FormattedAIResponse: React.FC<FormattedAIResponseProps> = ({ response }) => {
  // Helper function to extract markdown content
  const extractMarkdownContent = (): string => {
    const aiResponse = response.aiResponse;
    
    // If aiResponse is a string, return it directly
    if (typeof aiResponse === 'string') {
      return aiResponse.trim();
    }
    
    // If aiResponse is an object, return its aiResponse or userMessage
    if (typeof aiResponse === 'object') {
      return (aiResponse.aiResponse || aiResponse.userMessage || '').trim();
    }
    
    return '';
  };

  // Extract markdown content
  const markdownContent = extractMarkdownContent();

  // Render nothing if no content
  if (!markdownContent) return null;

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
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};

export default FormattedAIResponse;