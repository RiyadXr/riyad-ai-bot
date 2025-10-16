import React, { useState, useEffect, useCallback } from 'react';

interface QuickSuggestionsProps {
  onSendSuggestion: (suggestion: string) => void;
}

const ALL_SUGGESTIONS = [
  "What's new in tech?",
  "Explain quantum computing simply",
  "Write a poem about the ocean",
  "Give me a fun fact",
  "Plan a 3-day trip to Tokyo",
  "What's the difference between AI, ML, and DL?",
  "Compose a short story in the style of Edgar Allan Poe",
  "Suggest a recipe for a healthy vegan dinner",
  "How does a blockchain work?",
  "Help me write a professional email",
  "What are some good exercises for back pain?",
  "Summarize the plot of 'Dune'",
];

const shuffleArray = (array: string[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Icons
const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;
const RefreshIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M20 4s-1.5-2-5-2-6 3-6 6-1 5 1 5" /></svg>;


const QuickSuggestions: React.FC<QuickSuggestionsProps> = ({ onSendSuggestion }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const refreshSuggestions = useCallback(() => {
    const shuffled = shuffleArray(ALL_SUGGESTIONS);
    setSuggestions(shuffled.slice(0, 4));
  }, []);

  useEffect(() => {
    refreshSuggestions();
  }, [refreshSuggestions]);

  return (
    <div className="px-6 pt-4">
      <div className="rounded-lg border border-[var(--border-primary)] bg-[var(--bg-secondary)]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between p-3 text-left text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
          aria-expanded={isOpen}
        >
          <span>Quick Suggestions</span>
          <ChevronIcon isOpen={isOpen} />
        </button>
        <div 
          className="grid transition-all duration-300 ease-in-out"
          style={{
            gridTemplateRows: isOpen ? '1fr' : '0fr',
          }}
        >
            <div className="overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 p-3 border-t border-[var(--border-primary)]">
                    {suggestions.map((suggestion, index) => (
                    <button
                        key={index}
                        onClick={() => onSendSuggestion(suggestion)}
                        className="rounded-md border border-[var(--border-primary)] bg-[var(--bg-tertiary)]/50 px-3 py-2 text-left text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
                    >
                        {suggestion}
                    </button>
                    ))}
                </div>
                 <div className="px-3 pb-3">
                    <button onClick={refreshSuggestions} className="flex w-full items-center justify-center space-x-2 rounded-md border border-transparent bg-transparent py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]">
                        <RefreshIcon />
                        <span>New Suggestions</span>
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default QuickSuggestions;