
'use client';

export interface LocalDiagram {
    id: number;
    title: string;
    createdAt: string;
    lastModified?: string;
    svgContent?: string;
    plantumlCode?: string;
}

const getStorageKey = (userId: number | string) => `drawmind_diagrams_${userId}`;

export const getLocalDiagrams = (userId: number | string): LocalDiagram[] => {
    if (typeof window === 'undefined' || !userId) return [];
    const startData = localStorage.getItem(getStorageKey(userId));
    if (!startData) return [];
    try {
        return JSON.parse(startData);
    } catch (e) {
        console.error('Failed to parse local diagrams', e);
        return [];
    }
};

export const saveLocalDiagram = (userId: number | string, diagram: LocalDiagram) => {
    if (!userId) return;
    const current = getLocalDiagrams(userId);
    // Check if already exists, update if so
    const index = current.findIndex((d) => d.id === diagram.id);
    if (index >= 0) {
        current[index] = { ...current[index], ...diagram, lastModified: new Date().toISOString() };
    } else {
        current.unshift(diagram); // Add to top
    }
    localStorage.setItem(getStorageKey(userId), JSON.stringify(current));
};

export const removeLocalDiagram = (userId: number | string, id: number) => {
    if (!userId) return;
    const current = getLocalDiagrams(userId);
    const filtered = current.filter((d) => d.id !== id);
    localStorage.setItem(getStorageKey(userId), JSON.stringify(filtered));
};
