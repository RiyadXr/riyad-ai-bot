import React from 'react';

// --- Icon Components (scoped for this component) ---
const PaletteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>;
const InfoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>;

interface ChatHeaderProps {
    isOnline: boolean;
    onCycleTheme: () => void;
    onShowDevInfo: () => void;
    onToggleSidebar: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ isOnline, onCycleTheme, onShowDevInfo, onToggleSidebar }) => (
  <header className="flex-shrink-0 bg-gradient-to-r from-[var(--accent-gradient-from)] to-[var(--accent-gradient-to)] shadow-md p-4 flex justify-between items-center md:rounded-tl-lg">
    <div className="flex items-center space-x-4">
        <button onClick={onToggleSidebar} className="md:hidden text-white" aria-label="Open menu">
            <MenuIcon />
        </button>
        <h1 className="text-xl font-bold text-white">Conversation with RIYAD AI</h1>
    </div>
    <div className="flex items-center space-x-2 md:space-x-4">
      <span className="hidden sm:flex items-center space-x-2 rounded-full bg-black/20 px-3 py-1 text-sm text-white">
        <span className={`h-2 w-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-500'}`}></span>
        <span>{isOnline ? 'Online' : 'Offline'}</span>
      </span>
      <button onClick={onCycleTheme} className="h-10 w-10 rounded-full bg-black/20 flex items-center justify-center text-white hover:bg-black/30 transition" aria-label="Change theme">
        <PaletteIcon />
      </button>
      <button onClick={onShowDevInfo} className="h-10 w-10 rounded-full bg-black/20 flex items-center justify-center text-white hover:bg-black/30 transition" aria-label="Show developer information">
        <InfoIcon />
      </button>
    </div>
  </header>
);

export default ChatHeader;