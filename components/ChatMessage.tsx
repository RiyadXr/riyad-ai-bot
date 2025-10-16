import React from 'react';
import { Message, Role } from '../types';

// Icons for user and model
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--text-secondary)]" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
    </svg>
);

const ModelIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" strokeWidth="1.5" stroke="none" fill="currentColor"><path d="M12,2A2,2 0 0,1 14,4C14,4.5 13.78,4.95 13.43,5.29L14.12,6.5L15.5,6L16.25,7.5L15.25,8.25L16,9.5L17.5,9L18.25,10.5L17.25,11.25L18,12.5L19.5,12L20.25,13.5L19.25,14.25L20,15.5L21.5,15L22,16.21C21.5,16.76 21,17 21,17V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V17C3,17 2.5,16.76 2,16.21L2.5,15L4,15.5L4.75,14.25L3.75,13.5L4.5,12L3,12.5L3.75,11.25L2.75,10.5L3.5,9L2,9.5L2.75,8.25L1.75,7.5L2.5,6L4,6.5L4.57,5.29C4.22,4.95 4,4.5 4,4A2,2 0 0,1 6,2H12M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z" /></svg>
);


interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === Role.USER;
  const text = message.parts.map(part => part.text).join('');

  return (
    <div className={`flex items-start gap-4 animate-fade-in-up ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${isUser ? 'bg-[var(--bg-secondary)]' : 'bg-gradient-to-br from-[var(--accent-gradient-from)] to-[var(--accent-gradient-to)]'}`}>
        {isUser ? <UserIcon /> : <ModelIcon />}
      </div>
      <div className={`max-w-xl rounded-lg px-4 py-3 shadow-md ${isUser ? 'bg-[var(--accent-gradient-from)]/90 text-white' : 'bg-[var(--bg-tertiary)] text-[var(--text-primary)]'}`}>
        {message.imagePreview && (
          <img 
            src={message.imagePreview} 
            alt="User upload" 
            className="mb-2 max-h-64 w-full rounded-md object-contain" 
          />
        )}
        <p className="whitespace-pre-wrap">{text}</p>
        <span className={`mt-1 block text-xs ${isUser ? 'text-white/70' : 'text-[var(--text-secondary)]'}`}>
          {message.timestamp}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
