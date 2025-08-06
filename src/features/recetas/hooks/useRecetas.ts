'use client';
import { useState, useEffect } from 'react';
import { Receta } from '../domain/types';
import { fetchRecetas, deleteReceta } from '../domain/usecases';

export function useRecetas() {
    const [recetas, setRecetas] = useState<Receta[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadRecetas = async () => {
        try {
            const data = await fetchRecetas();
            setRecetas(data);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error desconocido');
        } finally {
            setLoading(false);
        }
    };

    const eliminarReceta = async (id: number) => {
        try {
            await deleteReceta(id);
            await loadRecetas();
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error al eliminar receta');
        }
    };

    useEffect(() => {
        loadRecetas();
    }, []);

    return { recetas, loading, error, eliminarReceta, recargarRecetas: loadRecetas };
}
