'use client';
import { useState, useEffect } from 'react';
import { CategoriaIngrediente } from '@/features/ingredientes/domain/types';
import { fetchCategorias, deleteCategoria } from '../domain/usecases';

export function useCategorias() {
    const [categorias, setCategorias] = useState<CategoriaIngrediente[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadCategorias = async () => {
        try {
            const data = await fetchCategorias();
            setCategorias(data);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error desconocido');
        } finally {
            setLoading(false);
        }
    };

    const eliminarCategoria = async (id: number) => {
        try {
            await deleteCategoria(id);
            await loadCategorias();
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error al eliminar ingrediente');
        }
    };

    useEffect(() => {
        loadCategorias();
    }, []);

    return { categorias, loading, error, eliminarCategoria, recargarCategorias: loadCategorias };
}
