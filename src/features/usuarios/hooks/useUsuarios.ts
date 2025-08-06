'use client';
import { useEffect, useState } from "react";
import { Usuario } from "../domain/types";
import { fetchUsuarios, deleteUsuario } from "../domain/usecases";

export function useUsuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [iserror, setError] = useState<string | null>(null);

    const loadUsuarios = async () => {
        try {
            const data = await fetchUsuarios();
            console.log('Datos recibidos:', data); // Debug log
            if (Array.isArray(data)) {
                setUsuarios(data);
            } else {
                console.error('Datos no son un array:', data);
                setError('Formato de datos incorrecto');
            }
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
            setError(error instanceof Error ? error.message : 'Error desconocido');
        } finally {
            setLoading(false);
        }
    };

    const eliminarUsuario = async (id: number) => {
        try {
            await deleteUsuario(id);
            // Recargar la lista después de eliminar
            loadUsuarios();
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error al eliminar usuario');
        }
    };

    useEffect(() => {
        loadUsuarios();
    }, []);

    return { usuarios, loading, iserror, eliminarUsuario, recargarUsuarios: loadUsuarios };
}