
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Loader2, Bot, User as UserIcon } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface ChatInterfaceProps {
    onSendMessage: (message: string) => Promise<void>;
    messages: Message[];
    isLoading: boolean;
}

export const ChatInterface = ({ onSendMessage, messages: initialMessages, isLoading }: ChatInterfaceProps) => {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [initialMessages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const msg = input;
        setInput('');
        await onSendMessage(msg);
    };

    return (
        <div className="flex flex-col h-full bg-neutral-900 border-r border-neutral-800">
            <div className="p-4 border-b border-neutral-800">
                <h2 className="font-semibold text-white flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    Designer Chat
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {initialMessages.length === 0 && (
                    <div className="text-center text-neutral-500 py-8 text-sm">
                        Describe changes to update the diagram.<br />
                        e.g. "Add a user field to the User class"
                    </div>
                )}

                {initialMessages.map((msg, i) => (
                    <div
                        key={i}
                        className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                            }`}
                    >
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-indigo-600' : 'bg-neutral-700'
                                }`}
                        >
                            {msg.role === 'user' ? <UserIcon size={14} /> : <Bot size={14} />}
                        </div>
                        <div
                            className={`max-w-[85%] rounded-lg p-3 text-sm leading-relaxed ${msg.role === 'user'
                                ? 'bg-indigo-600/20 text-indigo-100 border border-indigo-500/30'
                                : 'bg-neutral-800 text-neutral-200 border border-neutral-700'
                                }`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-neutral-800 bg-neutral-900">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your instruction..."
                        className="bg-neutral-950 border-neutral-800 text-white focus-visible:ring-indigo-500"
                        disabled={isLoading}
                    />
                    <Button
                        type="submit"
                        size="default"
                        disabled={isLoading || !input.trim()}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white shrink-0"
                    >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </Button>
                </form>
            </div>
        </div>
    );
};
