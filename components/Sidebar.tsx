import React from 'react';

// --- Icon Components (scoped for this component) ---
const RobotIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 24 24" strokeWidth="1.5" stroke="none" fill="currentColor"><path d="M12,2A2,2 0 0,1 14,4C14,4.5 13.78,4.95 13.43,5.29L14.12,6.5L15.5,6L16.25,7.5L15.25,8.25L16,9.5L17.5,9L18.25,10.5L17.25,11.25L18,12.5L19.5,12L20.25,13.5L19.25,14.25L20,15.5L21.5,15L22,16.21C21.5,16.76 21,17 21,17V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V17C3,17 2.5,16.76 2,16.21L2.5,15L4,15.5L4.75,14.25L3.75,13.5L4.5,12L3,12.5L3.75,11.25L2.75,10.5L3.5,9L2,9.5L2.75,8.25L1.75,7.5L2.5,6L4,6.5L4.57,5.29C4.22,4.95 4,4.5 4,4A2,2 0 0,1 6,2H12M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z" /></svg>;
const NaturalConversationsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const ConversationMemoryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const VisualUnderstandingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const ComplexReasoningIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
const AdaptiveUiIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
const PersonalizedKnowledgeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h4a2 2 0 012 2v1m-4 0h4" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;

const SidebarItem: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
    <div className="flex items-center space-x-3 text-[var(--text-secondary)]">
      <div className='text-[var(--text-accent)] w-5 h-5'>{icon}</div>
      <span className='text-[var(--text-primary)]'>{label}</span>
    </div>
  );

interface SidebarProps {
  messageCount: number;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ messageCount, isOpen, onClose }) => (
  <>
    <div 
        className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
    ></div>
    <aside className={`w-80 flex-shrink-0 bg-[var(--bg-secondary)] p-6 flex flex-col space-y-8 absolute inset-y-0 left-0 z-40 transform md:relative md:translate-x-0 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button onClick={onClose} className="md:hidden absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            <CloseIcon />
        </button>
        <div className="flex flex-col items-center text-center space-y-2 pt-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--accent-gradient-from)] to-[var(--accent-gradient-to)] flex items-center justify-center">
                <RobotIcon />
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">RIYAD AI Bot</h2>
            <p className="text-sm text-[var(--text-secondary)]">Version 2.0.2</p>
        </div>
        
        <div className="flex-grow overflow-y-auto">
            <h3 className="text-[var(--text-accent)] font-semibold mb-4">Capabilities</h3>
            <div className="space-y-4">
                <SidebarItem icon={<NaturalConversationsIcon />} label="Natural Conversations" />
                <SidebarItem icon={<ConversationMemoryIcon />} label="Contextual Memory" />
                <SidebarItem icon={<VisualUnderstandingIcon />} label="Visual Understanding" />
                <SidebarItem icon={<ComplexReasoningIcon />} label="Complex Reasoning" />
                <SidebarItem icon={<AdaptiveUiIcon />} label="Adaptive UI" />
                <SidebarItem icon={<PersonalizedKnowledgeIcon />} label="Personalized Knowledge" />
            </div>
        </div>

        <div className="bg-[var(--accent-gradient-from)]/20 rounded-lg p-4 text-center">
            <h4 className="font-semibold text-[var(--text-accent)]">Conversation Stats</h4>
            <p className="text-5xl font-bold text-[var(--text-primary)] my-2">{messageCount}</p>
            <p className="text-sm text-[var(--text-secondary)]">Messages Exchanged</p>
        </div>
    </aside>
  </>
);

export default Sidebar;