
'use client';

export interface LocalDiagram {
    id: number;
    title: string;
    createdAt: string;
    lastModified?: string;
    svgContent?: string;
    plantumlCode?: string;
}

const LOCAL_STORAGE_KEY = 'drawmind_diagrams';

export const getLocalDiagrams = (): LocalDiagram[] => {
    if (typeof window === 'undefined') return [];
    const startData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!startData) return [];
    try {
        return JSON.parse(startData);
    } catch (e) {
        console.error('Failed to parse local diagrams', e);
        return [];
    }
};

export const saveLocalDiagram = (diagram: LocalDiagram) => {
    const current = getLocalDiagrams();
    // Check if already exists, update if so
    const index = current.findIndex((d) => d.id === diagram.id);
    if (index >= 0) {
        current[index] = { ...current[index], ...diagram, lastModified: new Date().toISOString() };
    } else {
        current.unshift(diagram); // Add to top
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(current));
};

export const removeLocalDiagram = (id: number) => {
    const current = getLocalDiagrams();
    const filtered = current.filter((d) => d.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
};
