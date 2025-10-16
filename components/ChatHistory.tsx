import React, { useRef, useEffect } from 'react';
import { Message } from '../types';
import ChatMessage from './ChatMessage';

interface ChatHistoryProps {
  messages: Message[];
  isLoading: boolean;
}

const TypingIndicator = () => (
    <div className="flex justify-start items-start">
        <div className="max-w-xl rounded-lg px-4 py-5 shadow-md bg-[var(--bg-tertiary)]">
            <div className="flex items-center justify-start gap-2">
                <div className="h-2 w-2 animate-bounce rounded-full bg-[var(--text-secondary)] [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-[var(--text-secondary)] [animation-delay:-0.15s]"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-[var(--text-secondary)]"></div>
            </div>
        </div>
    </div>
);

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-6">
      {messages.map((msg, index) => (
        <ChatMessage key={index} message={msg} />
      ))}
      {isLoading && messages[messages.length-1]?.role === 'user' && (
        <TypingIndicator />
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatHistory;