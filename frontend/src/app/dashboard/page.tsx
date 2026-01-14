
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getLocalDiagrams, LocalDiagram, saveLocalDiagram, migrateLegacyData } from '@/lib/store';
import api from '@/lib/api';
import Link from 'next/link';
import { Plus, MessageSquare, Clock } from 'lucide-react';
import { PageLayout } from '@/components/PageLayout';

export default function DashboardPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [diagrams, setDiagrams] = useState<LocalDiagram[]>([]);
    const [prompt, setPrompt] = useState('');
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        // Load diagrams
        if (user?.id) {
            // Attempt migration of old data first
            migrateLegacyData(user.id);
            setDiagrams(getLocalDiagrams(user.id));
        }
    }, [user]);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setCreating(true);
        try {
            const res = await api.post('/chat', { message: prompt });
            // Response data: { data: { diagram_id, svg_content, diagram_title, ... } }
            const { diagram_id, svg_content, diagram_title, src } = res.data.data;

            const newDiagram: LocalDiagram = {
                id: diagram_id,
                title: diagram_title || prompt,
                createdAt: new Date().toISOString(),
                svgContent: svg_content,
            };

            if (user?.id) {
                saveLocalDiagram(user.id, newDiagram);
            }
            router.push(`/diagram/${diagram_id}`);
        } catch (error) {
            console.error('Failed to create diagram', error);
            alert('Failed to create diagram. Please try again.');
            setCreating(false);
        }
    };

    if (authLoading || !user) {
        return <PageLayout><div className="flex items-center justify-center h-[50vh] text-white">Loading...</div></PageLayout>;
    }

    return (
        <PageLayout>
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto space-y-12">

                    {/* Create Section */}
                    <section className="space-y-4 text-center">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            What do you want to build?
                        </h1>
                        <p className="text-neutral-400">Describe your system, flow, or architecture.</p>

                        <form onSubmit={handleCreate} className="flex gap-2 max-w-xl mx-auto">
                            <Input
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="e.g. A library management system class diagram"
                                className="h-12 w-[200px] sm:w-[450px] bg-neutral-900 border-neutral-700 text-white"
                            />
                            <Button type="submit" size="lg" isLoading={creating} className="shrink-0 h-12 bg-cyan-500 hover:bg-cyan-600 text-white border-2 border-cyan-400/20 font-semibold shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-300">
                                Generate <Plus className="ml-2 w-4 h-4" />
                            </Button>
                        </form>
                    </section>

                    {/* List Section */}
                    <section>
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
                            <Clock className="w-5 h-5" /> Recent Diagrams
                        </h2>

                        {diagrams.length === 0 ? (
                            <div className="text-center py-12 border border-dashed border-neutral-800 rounded-lg text-neutral-500">
                                No diagrams yet. Create your first one above!
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {diagrams.map((d) => (
                                    <Link
                                        key={d.id}
                                        href={`/diagram/${d.id}`}
                                        className="group block p-5 border border-neutral-800 bg-neutral-900/50 rounded-lg hover:border-neutral-600 transition-colors"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="bg-neutral-800 p-2 rounded-md group-hover:bg-neutral-700 transition-colors">
                                                {/* Placeholder preview or icon */}
                                                <MessageSquare className="w-5 h-5 text-gray-300" />
                                            </div>
                                            <span className="text-xs text-neutral-500">
                                                {new Date(d.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <h3 className="font-medium text-lg leading-tight mb-2 truncate text-white" title={d.title}>
                                            {d.title}
                                        </h3>
                                        <p className="text-sm text-neutral-400 truncate">
                                            {d.svgContent ? 'Contains visual data' : 'Click to resume context'}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </section>

                </div>
            </main>
        </PageLayout>
    );
}
