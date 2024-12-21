// src/components/FormattedAiResponse.tsx

import React, { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from '@/app/Styles/ChatInterface.module.css';
import { ComponentPropsWithoutRef } from 'react';

interface FormattedAIResponseProps {
  response: {
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
  const [ReactMarkdown, setReactMarkdown] = useState<any>(null); // Use any for dynamic import
  const [remarkGfm, setRemarkGfm] = useState<any>(null); // State for remark-gfm

  useEffect(() => {
    const loadMarkdown = async () => {
      const { default: markdown } = await import('react-markdown');
      setReactMarkdown(() => markdown); // Set the imported module
    };

    const loadRemarkGfm = async () => {
      const { default: gfm } = await import('remark-gfm');
      setRemarkGfm(() => gfm); // Set the imported module
    };

    loadMarkdown();
    loadRemarkGfm();
  }, []);
  
  const extractMarkdownContent = (): string => {
    const aiResponse = response.aiResponse;
    if (typeof aiResponse === 'string') return aiResponse.trim();
    if (typeof aiResponse === 'object') return (aiResponse.aiResponse || '').trim();
    return '';
  };

  const markdownContent = extractMarkdownContent();
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
                className={styles.codeBlock}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={inline ? styles.inlineCode : ''} {...props}>
                {children}
              </code>
            );
          },
          h3: ({ ...props }) => <h3 className={styles.aiResponseHeader} {...props} />,
          p: ({ node, children, ...props }: { node: unknown; children: React.ReactNode }) => { // Explicitly typing 'node' as 'any'
            const content = String(children).toLowerCase();
            const isChallenge = content.includes("try this challenge") || content.includes("challenge:");
            return (
              <p className={isChallenge ? styles.challengePrompt : styles.aiResponseText} {...props}>
                {children}
              </p>
            );
          },
          ul: ({ ...props }) => <ul className={styles.bulletPoints} {...props} />,
          li: ({ ...props }) => <li className={styles.bulletPoint} {...props} />,
          
          blockquote: ({ node, ...props }: { node: unknown }) => ( // Explicitly typing 'node' as 'any'
            <div className={styles.hint} {...props} />
          ),
          
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};
FormattedAIResponse.displayName = "FormattedAIResponse"; 
export default FormattedAIResponse;
