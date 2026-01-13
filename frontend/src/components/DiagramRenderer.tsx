
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ZoomIn, ZoomOut, Maximize, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DiagramRendererProps {
    svgContent: string | null;
    isLoading: boolean;
}

export const DiagramRenderer = ({ svgContent, isLoading }: DiagramRendererProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    // Reset zoom on new content
    useEffect(() => {
        if (svgContent) {
            setScale(1);
            setPosition({ x: 0, y: 0 });
        }
    }, [svgContent]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleWheel = (e: React.WheelEvent) => {
        e.stopPropagation();
        // Simple wheel zoom
        if (e.deltaY < 0) {
            setScale(s => Math.min(s * 1.1, 5));
        } else {
            setScale(s => Math.max(s * 0.9, 0.1));
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#1e1e1e] relative overflow-hidden text-white">
            {/* Toolbar */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10 bg-neutral-800/80 p-2 rounded-lg backdrop-blur-sm border border-neutral-700">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setScale(s => Math.min(s + 0.1, 5))}
                    className="h-8 w-8 p-0"
                >
                    <ZoomIn className="w-4 h-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setScale(s => Math.max(s - 0.1, 0.1))}
                    className="h-8 w-8 p-0"
                >
                    <ZoomOut className="w-4 h-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => { setScale(1); setPosition({ x: 0, y: 0 }); }}
                    className="h-8 w-8 p-0"
                >
                    <Maximize className="w-4 h-4" />
                </Button>
            </div>

            {isLoading && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-3">
                        <RefreshCw className="w-8 h-8 animate-spin text-indigo-500" />
                        <span className="text-sm font-medium">Rendering Diagram...</span>
                    </div>
                </div>
            )}

            {/* Canvas */}
            <div
                className="flex-1 w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
            >
                {svgContent ? (
                    <div
                        style={{
                            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                            transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                        }}
                        className="origin-center"
                        dangerouslySetInnerHTML={{ __html: svgContent }}
                    />
                ) : (
                    <div className="text-neutral-500 select-none">
                        {isLoading ? '' : 'No diagram content to display'}
                    </div>
                )}
            </div>
        </div>
    );
};
