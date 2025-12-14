import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { sendMessageToGemini } from '../services/gemini';
import { ChatMessage } from '../types';
import { GenerateContentResponse } from '@google/genai';

export const ChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 'welcome',
            role: 'model',
            text: 'Hi! I\'m CampusMate AI. Ask me about exams, hostel rules, or upcoming hackathons!',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            text: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const stream = await sendMessageToGemini(userMsg.text);
            
            let fullResponseText = '';
            const botMsgId = (Date.now() + 1).toString();
            
            // Initial placeholder
            setMessages(prev => [...prev, {
                id: botMsgId,
                role: 'model',
                text: '',
                timestamp: new Date()
            }]);

            for await (const chunk of stream) {
                const c = chunk as GenerateContentResponse;
                const chunkText = c.text || '';
                fullResponseText += chunkText;
                
                setMessages(prev => prev.map(msg => 
                    msg.id === botMsgId ? { ...msg, text: fullResponseText } : msg
                ));
            }

        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: 'model',
                text: "Sorry, I'm having trouble connecting to the campus network. Please try again later.",
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
            {/* Chat Window */}
            <div 
                className={`
                    pointer-events-auto bg-white rounded-2xl shadow-2xl border border-gray-200 
                    w-80 sm:w-96 transition-all duration-300 ease-in-out transform origin-bottom-right overflow-hidden flex flex-col
                    ${isOpen ? 'scale-100 opacity-100 mb-4 h-[500px]' : 'scale-90 opacity-0 h-0 mb-0'}
                `}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-brand-600 to-brand-500 p-4 flex justify-between items-center text-white">
                    <div className="flex items-center space-x-2">
                        <Bot size={20} />
                        <span className="font-semibold">CampusMate AI</span>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition">
                        <X size={18} />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div 
                                className={`
                                    max-w-[80%] p-3 rounded-2xl text-sm shadow-sm
                                    ${msg.role === 'user' 
                                        ? 'bg-brand-600 text-white rounded-tr-none' 
                                        : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                                    }
                                `}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                             <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex space-x-1 items-center">
                                <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-3 bg-white border-t border-gray-100">
                    <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2">
                        <input 
                            type="text" 
                            className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                            placeholder="Ask about exams, hostel..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                        <button 
                            onClick={handleSend} 
                            disabled={isLoading || !input.trim()}
                            className="text-brand-600 hover:text-brand-800 disabled:opacity-50 transition"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Toggle Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="pointer-events-auto bg-brand-600 hover:bg-brand-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} className="group-hover:animate-pulse" />}
            </button>
        </div>
    );
};
