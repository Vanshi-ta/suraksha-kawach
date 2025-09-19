import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, User as UserIcon } from './Icons';
import { CHATBOT_DATA } from '../constants';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}

const ChatbotWidget: React.FC = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [currentPromptIds, setCurrentPromptIds] = useState<string[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const promptsContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);
    
    useEffect(() => {
        if (promptsContainerRef.current) {
            promptsContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
    }, [currentPromptIds]);

    useEffect(() => {
        if (isOpen) {
             if (messages.length === 0) {
                setIsTyping(true);
                setTimeout(() => {
                    setMessages([{ id: Date.now(), text: t(CHATBOT_DATA.initial.answer), sender: 'bot' }]);
                    setCurrentPromptIds(CHATBOT_DATA.initial.followUpIds || []);
                    setIsTyping(false);
                }, 500);
            }
        } else {
            // Reset chat when closed
            setTimeout(() => {
                setMessages([]);
                setCurrentPromptIds([]);
            }, 300); 
        }
    }, [isOpen, messages.length, t]);


    const handlePromptClick = (promptId: string) => {
        const prompt = CHATBOT_DATA[promptId];
        if (!prompt) return;

        setCurrentPromptIds([]);

        const userMessage: Message = {
            id: Date.now(),
            text: t(prompt.question),
            sender: 'user',
        };
        setMessages(prev => [...prev, userMessage]);

        setIsTyping(true);
        setTimeout(() => {
            const botResponse: Message = {
                id: Date.now() + 1,
                text: t(prompt.answer),
                sender: 'bot',
            };
            setMessages(prev => [...prev, botResponse]);
            
            setCurrentPromptIds(prompt.followUpIds || CHATBOT_DATA.initial.followUpIds || []);
            
            setIsTyping(false);
        }, 700); 
    };

    return (
        <>
            {/* Chatbox Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="fixed bottom-28 right-4 sm:right-6 w-[calc(100%-2rem)] max-w-[350px] h-[400px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-200 dark:border-gray-700"
                    >
                        {/* Header */}
                        <header className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 flex items-center gap-2">
                               <Bot className="w-6 h-6"/> {t('chatbot.header')}
                            </h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                                aria-label="Close chat"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </header>

                        {/* Messages Body */}
                        <div className="flex-1 p-4 overflow-y-auto">
                            <div className="space-y-4">
                                {messages.map(msg => (
                                    <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        {msg.sender === 'bot' && (
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-DEFAULT text-white flex items-center justify-center">
                                                <Bot className="w-5 h-5" />
                                            </div>
                                        )}
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className={`max-w-[75%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-primary-DEFAULT text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-bl-none'}`}
                                        >
                                            {msg.text}
                                        </motion.div>
                                        {msg.sender === 'user' && (
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 flex items-center justify-center">
                                                <UserIcon className="w-5 h-5" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex items-end gap-2 justify-start">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-DEFAULT text-white flex items-center justify-center">
                                            <Bot className="w-5 h-5" />
                                        </div>
                                        <div className="max-w-[75%] p-3 rounded-2xl bg-gray-200 dark:bg-gray-600 rounded-bl-none">
                                            <div className="flex items-center gap-1">
                                                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {/* Prompt Buttons Footer */}
                        <div className="p-2 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50">
                            <div ref={promptsContainerRef} className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                {currentPromptIds.map(promptId => {
                                    const promptData = CHATBOT_DATA[promptId];
                                    if (!promptData) return null;
                                    return (
                                        <button
                                            key={promptId}
                                            onClick={() => handlePromptClick(promptId)}
                                            className="flex-shrink-0 text-sm bg-white dark:bg-gray-700 text-primary-DEFAULT dark:text-blue-300 font-semibold py-2 px-3 rounded-full border-2 border-primary-DEFAULT/50 hover:bg-primary-DEFAULT/10 dark:hover:bg-blue-900/40 transition-colors"
                                        >
                                            {t(promptData.question)}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Action Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-4 sm:right-6 w-16 h-16 bg-primary-DEFAULT text-white rounded-full shadow-2xl flex items-center justify-center z-40"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isOpen ? "Close chat" : "Open chat assistant"}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isOpen ? 'close' : 'open'}
                        initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isOpen ? (
                                <div className="w-full h-full bg-gray-600 rounded-full flex items-center justify-center">
                                    <X className="h-8 w-8 text-white" />
                                </div>
                            ) : (
                                <img src="https://img.freepik.com/premium-vector/chat-bot-icon-design-robot-say-hi-virtual-smart-assistant-bot-icon-chatbot-symbol-concept-voice_418020-456.jpg" alt="Chatbot Icon" className="w-full h-full object-cover rounded-full" />
                            )}
                    </motion.div>
                </AnimatePresence>
            </motion.button>
        </>
    );
};

export default ChatbotWidget;
