// src/components/ChatInterface.tsx

import React, { useState, useEffect, useCallback, useRef, forwardRef, useImperativeHandle } from 'react';
import styles from '../Styles/ChatInterface.module.css';
import { sendMessage, getPastConversations, Message } from '../services/chatService';
import FormattedAIResponse from './FormattedAiResponse';

interface ChatInterfaceRef {
  addFeedbackMessage: (feedback: string) => void;
}

interface ChatInterfaceProps {}

const ChatInterface = forwardRef<ChatInterfaceRef, ChatInterfaceProps>((props, ref) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const token = localStorage.getItem('token');
  const username = token ? JSON.parse(atob(token.split('.')[1])).username : null;

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
      user_id: username || '',
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
            aiResponse: savedMessage,
            timestamp: new Date().toISOString()
          } : msg
        ));
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message');
      setMessages(prev => prev.map(msg => 
        msg._id === newUserMessage._id ? {
          ...msg,
          aiResponse: "Error: Failed to get response"
        } : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };
  
  const addFeedbackMessage = useCallback((feedback: string) => {
    console.log("addFeedbackMessage called with:", feedback);
    setMessages(prevMessages => {
      const newMessage: Message = {
        user_id: username || '',
        _id: Date.now().toString(),
        userMessage: "Code Execution Feedback",
        aiResponse: feedback,
        timestamp: new Date().toISOString()
      };
      const updatedMessages = [...prevMessages, newMessage];
      console.log("Updated messages:", updatedMessages);
      return updatedMessages;
    });
  }, [username]);

  useImperativeHandle(ref, () => ({
    addFeedbackMessage
  }), [addFeedbackMessage]);

  const getAIResponseText = (response: Message['aiResponse']): string => {
    if (typeof response === 'string') {
      return response;
    } else if (response && typeof response === 'object' && 'aiResponse' in response) {
      return response.aiResponse;
    }
    return 'No response available';
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesContainer}>
      {messages.map((msg) => (
  <div key={msg._id} className={styles.messageWrapper}>
    <div className={styles.userMessage}>
      <p className={styles.messageContent}>{msg.userMessage}</p>
      <div className={styles.timestamp}>{formatTimestamp(msg.timestamp)}</div>
    </div>
    {msg.aiResponse && (
      <div className={styles.aiMessage}>
        <FormattedAIResponse response={getAIResponseText(msg.aiResponse)} />
        <div className={styles.timestamp}>{formatTimestamp(msg.timestamp)}</div>
      </div>
    )}
  </div>
))}
        <div ref={messagesEndRef} />
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className={styles.inputField}
        />
        <button onClick={handleSendMessage} disabled={isLoading} className={styles.sendButton}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
});

export default ChatInterface;