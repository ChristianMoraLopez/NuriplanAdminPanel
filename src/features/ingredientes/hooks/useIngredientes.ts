'use client';
import { useState, useEffect } from 'react';
import { Ingrediente } from '../domain/types';
import { fetchIngredientes, deleteIngrediente } from '../domain/usecases';

export function useIngredientes() {
    const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadIngredientes = async () => {
        try {
            const data = await fetchIngredientes();
            setIngredientes(data);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error desconocido');
        } finally {
            setLoading(false);
        }
    };

    const eliminarIngrediente = async (id: number) => {
        try {
            await deleteIngrediente(id);
            await loadIngredientes();
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error al eliminar ingrediente');
        }
    };

    useEffect(() => {
        loadIngredientes();
    }, []);

    return { ingredientes, loading, error, eliminarIngrediente, recargarIngredientes: loadIngredientes };
}
