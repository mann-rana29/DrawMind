
'use client';

import { use, useEffect, useState } from "react";
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar/Navbar';
import { ChatInterface } from '@/components/ChatInterface';
import { DiagramRenderer } from '@/components/DiagramRenderer';
import { getLocalDiagrams, saveLocalDiagram, LocalDiagram } from '@/lib/store';
import api from '@/lib/api';

// NextJS 16 params usage: params is a promise
// But standard client component `useParams` hook handles it automatically.
// The file is 'page.tsx', so it receives `params` prop. 
// "In Next.js 13+ with App Router, params is a prop, but for client components we use useParams()"
// Actually `useParams` from `next/navigation` is the way.

interface Message {
    role: 'user' | 'assistant';
    content: string; // The user message or "Diagram Updated"
}

export default function DiagramPage() {
    const { id } = useParams();
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    const [diagram, setDiagram] = useState<LocalDiagram | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
            return;
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (id) {
            const diagramId = parseInt(Array.isArray(id) ? id[0] : id);
            const localData = getLocalDiagrams().find(d => d.id === diagramId);
            if (localData) {
                setDiagram(localData);
                // Initial message history? 
                // We can't fetch it easily without recreating context, but we can start fresh or 
                // if we just created it, maybe we want to show the initial prompt?
                // Let's rely on the user seeing the diagram.
            } else {
                // Diagram not found in local store
                router.push('/dashboard');
            }
        }
    }, [id, router]);

    const handleSendMessage = async (text: string) => {
        if (!diagram) return;

        setLoading(true);
        // Optimistic UI
        setMessages(prev => [...prev, { role: 'user', content: text }]);

        try {
            const res = await api.post(`/diagrams/${diagram.id}/chat`, {
                message: text
            });
            // Response: { data: { svg_content, message, ... } }
            const { svg_content, message } = res.data.data;

            const updatedDiagram = {
                ...diagram,
                svgContent: svg_content,
            };
            saveLocalDiagram(updatedDiagram);
            setDiagram(updatedDiagram);

            setMessages(prev => [...prev, { role: 'assistant', content: message || "Diagram updated" }]);

        } catch (error) {
            console.error("Chat error", error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Failed to update diagram. Please try again." }]);
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || !user) return <div className="bg-black text-white h-screen flex items-center justify-center">Loading...</div>;
    if (!diagram) return <div className="bg-black text-white h-screen flex items-center justify-center">Diagram not found</div>;

    return (
        <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
            <Navbar />

            <main className="flex-1 flex flex-col md:flex-row overflow-hidden border-t border-neutral-800">
                {/* Left Panel: Chat - Resizable or fixed width? Fixed for MVP */}
                <div className="w-full md:w-[400px] shrink-0 h-[40%] md:h-full border-b md:border-b-0 md:border-r border-neutral-800 flex flex-col">
                    <ChatInterface
                        onSendMessage={handleSendMessage}
                        messages={messages}
                        isLoading={loading}
                    />
                </div>

                {/* Right Panel: Diagram */}
                <div className="flex-1 h-[60%] md:h-full relative bg-neutral-900/50">
                    <DiagramRenderer
                        svgContent={diagram.svgContent || null}
                        isLoading={loading}
                    />
                </div>
            </main>
        </div>
    );
}
