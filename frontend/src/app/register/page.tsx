
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/lib/api';
import Link from 'next/link';
import { PageLayout } from '@/components/PageLayout';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        if (user) {
            router.push('/dashboard');
        }
    }, [user, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await api.post('/auth/register', formData);
            // After register, redirect to login
            router.push('/login?registered=true');
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to register');
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageLayout>
            <div className="flex-1 flex items-center justify-center p-4 min-h-[calc(100vh-140px)]">
                <div className="w-full max-w-md space-y-8 p-8 border border-neutral-800 rounded-xl bg-neutral-950/80 backdrop-blur-sm shadow-2xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white">Create an account</h2>
                        <p className="mt-2 text-sm text-neutral-400">
                            Start creating amazing diagrams with DrawMind
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 mt-8 ">
                        <Input
                            // label="Username"
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                            placeholder="Choose a username"
                        />

                        <Input
                            // label="Email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            placeholder="Enter your email"
                        />

                        <Input
                            // label="Password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            placeholder="Create a password"
                        />

                        {error && (
                            <div className="text-sm text-red-500 bg-red-500/10 p-3 rounded-md">
                                {error}
                            </div>
                        )}

                        <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300" isLoading={loading}>
                            Create Account
                        </Button>
                    </form>

                    <p className="text-center text-sm text-neutral-400">
                        Already have an account?{' '}
                        <Link href="/login" className="font-medium text-white hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </PageLayout>
    );
}
