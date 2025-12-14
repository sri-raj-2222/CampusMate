import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles } from 'lucide-react';
import { sendMessageToGemini } from '../services/gemini';
import { ChatMessage } from '../types';
import { GenerateContentResponse } from '@google/genai';

export const DashboardChat: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 'welcome',
            role: 'model',
            text: 'Hi! I\'m CampusMate AI. How can I help you today?',
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
    }, [messages]);

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
                text: "Sorry, I'm having trouble connecting to the network.",
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[500px] overflow-hidden">
             <div className="bg-gradient-to-r from-brand-600 to-brand-500 p-4 flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg text-white">
                    <Sparkles size={20} />
                </div>
                <div>
                    <h2 className="font-bold text-white">CampusMate AI</h2>
                    <p className="text-xs text-brand-100">Ask about exams, rules, and more</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {messages.map((msg) => (
                     <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'model' && (
                            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-2 flex-shrink-0">
                                <Bot size={16} className="text-brand-600" />
                            </div>
                        )}
                        <div 
                            className={`
                                max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed
                                ${msg.role === 'user' 
                                    ? 'bg-brand-600 text-white rounded-tr-none' 
                                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                                }
                            `}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                         <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-2 flex-shrink-0">
                            <Bot size={16} className="text-brand-600" />
                        </div>
                         <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 flex space-x-1 items-center">
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

             <div className="p-3 bg-white border-t border-slate-100">
                <div className="flex items-center space-x-2">
                    <input 
                        type="text" 
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-500 transition-all"
                        placeholder="Type your question..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button 
                        onClick={handleSend} 
                        disabled={isLoading || !input.trim()}
                        className="bg-brand-600 text-white p-2.5 rounded-xl hover:bg-brand-700 disabled:opacity-50 transition"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};