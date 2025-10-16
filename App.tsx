import React, { useState, useEffect, useCallback } from 'react';
import { Message, Role } from './types';
import { createChatSession } from './services/geminiService';
import ChatHistory from './components/ChatHistory';
import ChatInput from './components/ChatInput';
import Sidebar from './components/Sidebar';
import ChatHeader from './components/ChatHeader';
import QuickSuggestions from './components/QuickSuggestions';
import DeveloperInfoModal from './components/DeveloperInfoModal';
import type { Chat } from '@google/genai';

const THEMES = ['default', 'light', 'ocean', 'anime'];

const DEV_INFO_RESPONSE = `I was created by Rakibul Islam Riyad. Here's a bit about him:

**Rakibul Islam Riyad**
*Founder of Rivista Labs & Textile Engineering Student at NITER*

He is passionate about technology, creativity, and innovation, exploring app and AI development to build tools that are both user-friendly and solve real-world problems.

**You can connect with him here:**
- **Email:** hdriyad78@gmail.com
- **Facebook:** https://www.facebook.com/rakibul.islam.riyad.xr7
- **Website:** https://rivista.netlify.app/

You can also click the 'i' button in the top corner for more info!`;


const fileToBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = error => reject(error);
});


function App() {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [themeIndex, setThemeIndex] = useState<number>(0);
  const [isDevInfoVisible, setIsDevInfoVisible] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<{file: File, previewUrl: string} | null>(null);


  const getCurrentTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const cycleTheme = () => {
    setThemeIndex((prevIndex) => (prevIndex + 1) % THEMES.length);
  };

  useEffect(() => {
    if (THEMES[themeIndex] === 'anime') {
      document.body.classList.add('theme-anime-bg');
    } else {
      document.body.classList.remove('theme-anime-bg');
    }
    return () => {
       document.body.classList.remove('theme-anime-bg');
    };
  }, [themeIndex]);


  const initializeChat = useCallback(() => {
    try {
      const chatSession = createChatSession();
      setChat(chatSession);
       setMessages([
          {
            role: Role.MODEL,
            parts: [{ text: "Hello! I'm RIYAD AI Bot 2.0. How can I help you today? You can also upload an image." }],
            timestamp: getCurrentTime(),
          },
        ]);
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Failed to initialize chat session.';
      setError(errorMsg);
      console.error(e);
    }
  }, []);

  useEffect(() => {
    initializeChat();
  }, [initializeChat]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        // You could add validation for file size or type here
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImage({ file, previewUrl: reader.result as string });
        };
        reader.readAsDataURL(file);
      }
    };

    const removeImage = () => {
      setSelectedImage(null);
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    };

  const handleSendMessage = async (inputText: string) => {
    if ((!inputText.trim() && !selectedImage) || isLoading || !chat) return;
    
    const userMessage: Message = {
      role: Role.USER,
      parts: [{ text: inputText }],
      timestamp: getCurrentTime(),
      imagePreview: selectedImage?.previewUrl
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    const imageFileToSend = selectedImage?.file;
    removeImage(); // Clear the image from UI immediately

    // Keyword detection
    const lowerCaseInput = inputText.toLowerCase();
    const keywords = ['riyad', 'rakibul', 'rakibul islam', 'rakibul islam riyad'];
    const hasKeyword = keywords.some(keyword => lowerCaseInput.includes(keyword));

    if (hasKeyword) {
        // Bypass AI and provide developer info directly
        setTimeout(() => {
             setMessages(prev => [
                ...prev,
                {
                    role: Role.MODEL,
                    parts: [{ text: DEV_INFO_RESPONSE }],
                    timestamp: getCurrentTime()
                }
            ]);
        }, 500); // Small delay to simulate "thinking"
        return;
    }


    setIsLoading(true);
    setError(null);
    try {
        const messageParts: any[] = [];
        
        if (imageFileToSend) {
            const base64Data = await fileToBase64(imageFileToSend);
            messageParts.push({
                inlineData: {
                    data: base64Data,
                    mimeType: imageFileToSend.type,
                },
            });
        }
        
        // Always add text part, even if empty, as some models require it.
        messageParts.push({ text: inputText });

      const stream = await chat.sendMessageStream({ message: { parts: messageParts } });
      
      let fullResponse = "";
      let firstChunk = true;
      for await (const chunk of stream) {
        fullResponse += chunk.text;
        if (firstChunk) {
            setMessages(prev => [
              ...prev,
              { role: Role.MODEL, parts: [{ text: fullResponse }], timestamp: getCurrentTime() }
            ]);
            firstChunk = false;
        } else {
            setMessages(prev => {
              const newMessages = [...prev];
              if (newMessages.length > 0 && newMessages[newMessages.length - 1].role === Role.MODEL) {
                  newMessages[newMessages.length - 1].parts[0].text = fullResponse;
              }
              return newMessages;
            });
        }
      }

    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(errorMsg);
      setMessages(prev => [
          ...prev,
          {
              role: Role.MODEL,
              parts: [{ text: `Sorry, I ran into an issue: ${errorMsg}` }],
              timestamp: getCurrentTime()
          }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isDevInfoVisible && <DeveloperInfoModal onClose={() => setIsDevInfoVisible(false)} />}
      <div className={`theme-${THEMES[themeIndex]} flex h-screen w-full overflow-hidden bg-[var(--bg-primary)]`}>
        <Sidebar 
          messageCount={messages.length} 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="flex flex-1 flex-col">
          <ChatHeader 
            isOnline={!!chat && !error} 
            onCycleTheme={cycleTheme} 
            onShowDevInfo={() => setIsDevInfoVisible(true)}
            onToggleSidebar={() => setIsSidebarOpen(true)}
          />
          <main className="flex flex-1 flex-col overflow-hidden">
              <QuickSuggestions onSendSuggestion={handleSendMessage} />
              <ChatHistory messages={messages} isLoading={isLoading} />
              {error && (
                  <div className="bg-red-900/50 p-3 mx-6 mb-2 rounded text-center text-red-300">
                      <p>Error: {error}</p>
                  </div>
              )}
              <ChatInput 
                onSendMessage={handleSendMessage} 
                isLoading={isLoading || !chat} 
                onImageChange={handleImageChange}
                imagePreview={selectedImage?.previewUrl || null}
                onRemoveImage={removeImage}
              />
          </main>
        </div>
      </div>
    </>
  );
}

export default App;