import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: "Hi! I'm your portfolio assistant. Ask me about my skills or experience.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    const responseText = await sendMessageToGemini(userMsg.text);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-3rem)] md:w-96 h-[450px] bg-theme-surface/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300 origin-bottom-right">
          
          {/* Header */}
          <div className="bg-theme-bg/80 p-4 flex justify-between items-center border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-theme-accent animate-pulse"></div>
              <h3 className="font-sans font-medium text-sm text-theme-text">AI Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-theme-muted hover:text-white transition bg-white/5 p-1 rounded-full hover:bg-white/10">
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar bg-theme-bg/30">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-theme-accent text-white rounded-br-none'
                      : 'bg-theme-surface border border-white/5 text-gray-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-theme-surface border border-white/5 p-4 rounded-2xl rounded-bl-none flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-theme-muted rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-theme-muted rounded-full animate-bounce delay-150"></span>
                  <span className="w-1.5 h-1.5 bg-theme-muted rounded-full animate-bounce delay-300"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-theme-bg/80 border-t border-white/5">
            <div className="relative">
                <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a message..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-4 pr-12 text-sm text-white focus:outline-none focus:border-theme-accent/50 focus:bg-white/10 transition-all placeholder-theme-muted"
                />
                <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-theme-accent hover:bg-theme-accent/90 disabled:bg-gray-700 disabled:text-gray-500 rounded-full text-white transition shadow-lg"
                >
                <Send size={14} />
                </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center justify-center w-14 h-14 bg-theme-surface border border-white/10 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 hover:border-theme-accent/50 hover:shadow-theme-accent/20"
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <MessageCircle size={24} className="text-white group-hover:text-theme-accent transition-colors" />
        )}
      </button>
    </div>
  );
};

export default AIChat;