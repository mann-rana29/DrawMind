
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/lib/api';
import Link from 'next/link';
import { PageLayout } from '@/components/PageLayout';

export default function LoginPage() {
    const { login, user } = useAuth();
    const router = useRouter(); // We need useRouter here
    // Redirect if already logged in - moved inside component body logic or useEffect

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        username: '',
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
            const res = await api.post('/auth/login', formData);
            login(res.data.access_token);
        } catch (err: any) {
            console.error('Login error:', err);
            let errorMessage = 'Failed to login';

            if (err.response?.data?.detail) {
                const detail = err.response.data.detail;
                if (typeof detail === 'string') {
                    errorMessage = detail;
                } else if (Array.isArray(detail)) {
                    errorMessage = detail.map((e: any) => e.msg || JSON.stringify(e)).join(', ');
                } else if (typeof detail === 'object') {
                    errorMessage = JSON.stringify(detail);
                }
            } else if (err.message) {
                errorMessage = err.message;
            }

            setError(errorMessage);
            setLoading(false);
        }
    };

    return (
        <PageLayout>
            <div className="flex-1 flex items-center justify-center p-4 min-h-[calc(100vh-140px)]">
                <div className="w-full max-w-md space-y-8 p-8 border border-neutral-800 rounded-xl bg-neutral-950/80 backdrop-blur-sm shadow-2xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white">Welcome back</h2>
                        <p className="mt-2 text-sm text-neutral-400">
                            Login to your account to continue
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                        <Input
                            // label="Username"
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                            placeholder="Enter your username"
                        />

                        <Input
                            // label="Password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            placeholder="Enter your password"
                        />

                        {error && (
                            <div className="text-sm text-red-500 bg-red-500/10 p-3 rounded-md">
                                {error}
                            </div>
                        )}

                        <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300" isLoading={loading}>
                            Sign In
                        </Button>
                    </form>

                    <p className="text-center text-sm text-neutral-400">
                        Don't have an account?{' '}
                        <Link href="/register" className="font-medium text-white hover:underline">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </PageLayout>
    );
}
