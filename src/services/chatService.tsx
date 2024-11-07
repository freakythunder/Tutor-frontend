// src/services/chatService.ts
import api from './api';

// src/services/chatService.tsx

// src/services/chatService.tsx

export interface Message {
  user_id: string;
  _id: string;
  userMessage: string;
  aiResponse: string | {
    user_id: string | null;
    userMessage: string;
    aiResponse: string;
    timestamp: string;
  };
  timestamp: string;
}

interface SingleMessageResponse {
  success: boolean;
  data: {
    response: string;
    savedMessage: {
      user_id: string | null; // Add this line
      userMessage: string;
      aiResponse: string;
      timestamp: string;
    };
  };
  message: string;
}

interface PastConversationsResponse {
  success: boolean;
  data: {
    chats: Message[];
  };
  message: string;
}

export const sendMessage = async (message: string): Promise<SingleMessageResponse> => {
  try {
    const response = await api.post('/chat/send', { message });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const getPastConversations = async (): Promise<PastConversationsResponse> => {
  try {
    const response = await api.get('/chat/past');
    return response.data;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
};