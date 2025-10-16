import React, { useEffect } from 'react';

interface DeveloperInfoModalProps {
  onClose: () => void;
}

// Scoped Icons
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;
const EmailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const FacebookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>;
const WebsiteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;


const DeveloperInfoModal: React.FC<DeveloperInfoModalProps> = ({ onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

  return (
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="relative w-full max-w-lg rounded-lg bg-[var(--bg-secondary)] p-8 shadow-2xl animate-fade-in-up"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            aria-label="Close developer information"
        >
          <CloseIcon />
        </button>

        <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">Rakibul Islam Riyad</h2>
            <p className="text-sm text-[var(--text-accent)]">Founder of Rivista Labs</p>
        </div>
        
        <div className="mt-6 border-t border-[var(--border-primary)] pt-6 text-left">
            <p className="text-[var(--text-secondary)] leading-relaxed text-base">
                Hi, I'm Rakibul Islam Riyad, a Textile Engineering student at NITER and the founder of Rivista Labs. I’m passionate about technology, creativity, and innovation. Alongside my studies, I explore app and AI development, focusing on building tools that combine problem-solving with simple, user-friendly design. One of my recent creations is Riyad AI Bot, a personal AI assistant designed to help users with writing, learning, and everyday tasks. Outside of tech, I love drawing and writing, which help me blend both artistic and analytical perspectives in my work.
            </p>
        </div>

        <div className="mt-6 border-t border-[var(--border-primary)] pt-6 flex justify-center items-center space-x-6">
            <a href="mailto:hdriyad78@gmail.com" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] transition-transform hover:text-[var(--text-accent)] hover:scale-110" aria-label="Email Developer"><EmailIcon /></a>
            <a href="https://www.facebook.com/rakibul.islam.riyad.xr7" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] transition-transform hover:text-[var(--text-accent)] hover:scale-110" aria-label="Developer's Facebook"><FacebookIcon /></a>
            <a href="https://rivista.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] transition-transform hover:text-[var(--text-accent)] hover:scale-110" aria-label="Developer's Website"><WebsiteIcon /></a>
        </div>

        <div className="mt-8 text-center text-xs text-[var(--text-secondary)]">
            <p>RIYAD AI Bot | Version 2.0.2</p>
        </div>
      </div>
    </div>
  );
};

export default DeveloperInfoModal;