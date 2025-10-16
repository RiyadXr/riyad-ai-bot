import React, { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreview: string | null;
  onRemoveImage: () => void;
}

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 14l11 -11" /><path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" /></svg>
);
const PaperclipIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
);
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>;


const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, onImageChange, imagePreview, onRemoveImage }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((text.trim() || imagePreview) && !isLoading) {
      onSendMessage(text);
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [text]);

  return (
    <div className="px-6 pb-4">
      {imagePreview && (
        <div className="relative mb-2 w-fit rounded-lg border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-2">
            <img src={imagePreview} alt="Selected preview" className="max-h-32 rounded-lg" />
            <button 
                onClick={onRemoveImage} 
                className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white transition-transform hover:scale-110"
                aria-label="Remove image"
            >
                <CloseIcon />
            </button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex items-end space-x-2 rounded-lg bg-[var(--bg-tertiary)] p-2">
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept="image/*"
          onChange={onImageChange}
          disabled={isLoading}
        />
        <label
          htmlFor="file-upload"
          className={`inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors ${isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:text-[var(--text-primary)]'}`}
        >
          <PaperclipIcon />
        </label>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          disabled={isLoading}
          className="flex-1 resize-none appearance-none bg-transparent text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none max-h-48"
          rows={1}
        />
        <button
          type="submit"
          disabled={isLoading || (!text.trim() && !imagePreview)}
          className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent-gradient-from)] to-[var(--accent-gradient-to)] text-white transition-transform duration-200 hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          aria-label="Send message"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
