
import React from 'react';
import Navbar from '@/components/Navbar/Navbar';

interface PageLayoutProps {
    children: React.ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
    return (
        <div className="overflow-auto text-white min-h-screen bg-black relative selection:bg-cyan-500/30">
            {/* Gradient Background - Guaranteed Visibility via Inline Style */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at bottom right, #0cd6faff 0%, transparent 40%)`,
                    opacity: 0.25
                }}
            />

            {/* Grid Background with Fade Mask */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="relative w-full h-full flex flex-col z-10 pt-6 xl:px-50">
                <Navbar />
                <div className="flex-1 w-full">
                    {children}
                </div>
            </div>
        </div>
    );
};
