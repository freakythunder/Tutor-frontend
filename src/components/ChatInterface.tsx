// src/components/ChatInterface.tsx
import React, { useState, useEffect, useCallback, useRef, forwardRef, useImperativeHandle } from 'react';
import styles from '../Styles/ChatInterface.module.css';
import { sendMessage, getPastConversations, Message } from '../services/chatService';
import FormattedAIResponse from './FormattedAiResponse';
import { useAuth } from '../context/AuthContext';


interface ChatInterfaceRef {
  addFeedbackMessage: (feedback: string) => void;
}

interface ChatInterfaceProps {}

const ChatInterface = forwardRef<ChatInterfaceRef, ChatInterfaceProps>((props, ref) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { welcomeMessage, clearWelcomeMessage } = useAuth();
  const token = localStorage.getItem('token');
  const username = token ? JSON.parse(atob(token.split('.')[1])).username : null;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    loadPastConversationsAndWelcomeMessage();
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const loadPastConversationsAndWelcomeMessage = async () => {
    try {
      const response = await getPastConversations();
      
      let chats: Message[] = [];
      if (response.success) {
  
        if (Array.isArray(response.data)) {
          chats = response.data;
        } 
        else if (response.data && 'chats' in response.data) {
          chats = (response.data as { chats?: Message[] }).chats || [];
        }
        
        const validatedChats = chats.map(chat => ({
          _id: chat._id || Date.now().toString(),
          user_id: chat.user_id || chat.userId || '',
          userMessage: chat.userMessage || '',
          aiResponse: chat.aiResponse || '',
          timestamp: chat.timestamp || new Date().toISOString()
        }));
  
        const sortedChats = validatedChats.sort((a, b) => 
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
  
        setMessages(sortedChats);
        
        if (welcomeMessage) {
          const welcomeMsg: Message = {
            _id: Date.now().toString(),
            user_id: 'AI',
            userMessage: '',
            aiResponse: welcomeMessage,
            timestamp: new Date().toISOString()
          };

          // Add welcome message and clear it from context
          setMessages(prev => [...prev, welcomeMsg]);
          clearWelcomeMessage();
        }


      } else {
        console.error('Invalid response format:', response);
        setError(response.message || 'Failed to load conversations');
      }
    } catch (err) {
      console.error('Error loading conversations:', err);
      setError('Failed to load past conversations');
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;
  
    setIsLoading(true);
    setError(null);
    
    const newUserMessage: Message = {
      _id: Date.now().toString(),
      user_id: username || '',
      userMessage: message,
      aiResponse: "",
      timestamp: new Date().toISOString()
    };
  
    // Immediately add the user message to the state
    setMessages(prev => [...prev, newUserMessage]);
  
    try {
      const response = await sendMessage(message);
      
      if (response.success) {
        // Update the message with the AI response from the correct path
        setMessages(prev => prev.map(msg => 
          msg._id === newUserMessage._id ? {
            ...msg,
            aiResponse: response.data.aiResponse || "No response", // Changed from savedMessage
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
  
  // Modify the getAIResponseMessage to handle string responses
  const getAIResponseMessage = (response: Message['aiResponse']): {
    user_id?: string;
    userMessage?: string;
    aiResponse: string;
    timestamp: string;
  } => {
    // If response is already a string, return it directly
    if (typeof response === 'string') {
      return {
        user_id: 'AI',
        userMessage: '',
        aiResponse: response,
        timestamp: new Date().toISOString()
      };
    }
  
    // If it's an object, try to extract aiResponse or userMessage
    if (typeof response === 'object') {
      return {
        user_id: response.user_id || 'AI',
        userMessage: response.userMessage || '',
        aiResponse: response.aiResponse || '',
        timestamp: response.timestamp || new Date().toISOString()
      };
    }
  
    // Fallback to empty string
    return {
      user_id: 'AI',
      userMessage: '',
      aiResponse: '',
      timestamp: new Date().toISOString()
    };
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
    setMessages(prevMessages => {
      const newMessage: Message = {
        _id: Date.now().toString(),
        user_id: username || 'AI',
        userMessage: "",
        aiResponse: feedback,
        timestamp: new Date().toISOString()
      };
      return [...prevMessages, newMessage];
    });
  }, [username]);

  useImperativeHandle(ref, () => ({
    addFeedbackMessage
  }), [addFeedbackMessage]);



  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesContainer}>
        {messages.map((msg) => (
          <div key={msg._id} className={styles.messageWrapper}>
        {msg.userMessage && (
            <div className={styles.userMessage}>
                <p className={styles.messageContent}>{msg.userMessage}</p>
                <div className={styles.timestamp}>{formatTimestamp(msg.timestamp)}</div>
            </div>
        )}
            {msg.aiResponse && (
              <div className={styles.aiMessage}>
                <FormattedAIResponse response={getAIResponseMessage(msg.aiResponse)} />
                <div className={styles.timestamp}>{formatTimestamp(msg.timestamp)}</div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <div className={styles.buttonContainer}>
        <button 
          onClick={() => handleSendMessage("Done with the Challenge")}
          disabled={isLoading}
          className={styles.challengeButton}
        >
          Done with the Challenge
        </button>
        <button 
          onClick={() => handleSendMessage("Need Help")}
          disabled={isLoading}
          className={styles.helpButton}
        >
          Need Help
        </button>
      </div>
    </div>
  );
});

export default ChatInterface;