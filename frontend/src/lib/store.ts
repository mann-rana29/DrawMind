
'use client';

export interface LocalDiagram {
    id: number;
    title: string;
    createdAt: string;
    lastModified?: string;
    svgContent?: string;
    plantumlCode?: string;
}

const LEGACY_STORAGE_KEY = 'drawmind_diagrams';
const getStorageKey = (userId: number | string) => `drawmind_diagrams_${userId}`;

export const migrateLegacyData = (userId: number | string) => {
    if (typeof window === 'undefined' || !userId) return;

    const legacyData = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!legacyData) return;

    try {
        const parsedLegacy = JSON.parse(legacyData);
        if (Array.isArray(parsedLegacy) && parsedLegacy.length > 0) {
            const currentData = getLocalDiagrams(userId);

            // Merge: Add legacy items that don't exist in current (by ID)
            const combined = [...currentData];
            parsedLegacy.forEach(legacyItem => {
                if (!currentData.some(d => d.id === legacyItem.id)) {
                    combined.push(legacyItem);
                }
            });

            // Save merged data
            localStorage.setItem(getStorageKey(userId), JSON.stringify(combined));

            // Clear legacy to prevent re-migration or duplication for other users (first come first served for legacy)
            localStorage.removeItem(LEGACY_STORAGE_KEY);
            console.log(`Migrated ${parsedLegacy.length} diagrams from legacy storage to user ${userId}`);
        }
    } catch (e) {
        console.error('Failed to migrate legacy data', e);
    }
};

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
