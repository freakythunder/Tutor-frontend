import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import styles from '../Styles/ChatInterface.module.css';
import { sendMessage, getPastConversations, Message } from '../services/chatService';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    loadPastConversations();
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const loadPastConversations = async () => {
    try {
      const response = await getPastConversations();
      if (response.success && Array.isArray(response.data.chats)) {
        setMessages(response.data.chats);
      } else {
        console.error('Invalid response format:', response);
        setMessages([]);
        setError('Invalid response format from server');
      }
    } catch (err) {
      console.error('Error loading conversations:', err);
      setMessages([]);
      setError('Failed to load past conversations');
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
  
    setIsLoading(true);
    setError(null);
  
    const newUserMessage: Message = {
      _id: Date.now().toString(),
      userMessage: inputMessage,
      aiResponse: "",
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
  
    try {
      const response = await sendMessage(inputMessage);
      if (response.success && response.data.savedMessage) {
        const savedMessage = response.data.savedMessage;
        setMessages(prev => prev.map(msg => 
          msg._id === newUserMessage._id ? {
            ...msg,
            aiResponse: savedMessage.aiResponse,
            timestamp: savedMessage.timestamp
          } : msg
        ));
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message');
      setMessages(prev => prev.map(msg => 
        msg._id === newUserMessage._id ? {...msg, aiResponse: "Error: Failed to get response"} : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesContainer} ref={messagesContainerRef}>
        {messages.map((msg) => (
          <div key={msg._id} className={styles.messageWrapper}>
            <div className={styles.userMessage}>
              <div className={styles.messageHeader}>You</div>
              <p className={styles.messageContent}>{msg.userMessage}</p>
              <div className={styles.timestamp}>
                {formatTimestamp(msg.timestamp)}
              </div>
            </div>
            {msg.aiResponse && (
              <div className={styles.aiMessage}>
                <div className={styles.messageHeader}>AI Assistant</div>
                <p className={styles.messageContent}>{msg.aiResponse}</p>
                <div className={styles.timestamp}>
                  {formatTimestamp(msg.timestamp)}
                </div>
              </div>
            )}
          </div>
        ))}
        {isLoading && <div className={styles.loadingIndicator}>AI is thinking...</div>}
        {error && <div className={styles.errorMessage}>{error}</div>}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.inputContainer}>
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className={styles.messageInput}
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className={styles.sendButton}
          disabled={isLoading}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;