import React from 'react';
import styles from '../Styles/ChatInterface.module.css';

const ChatInterface: React.FC = () => {
  return (
    <div className={styles.chatContainer}>
      <h2>Chat Interface</h2>
      <div className={styles.messagesContainer}>
        {/* Add chat messages or functionality here */}
      </div>
      <textarea className={styles.messageInput} placeholder="Type your message..." />
    </div>
  );
};

export default ChatInterface;
