'use client';

import { useUsuarios } from "../hooks/useUsuarios";
import { UsuariosCard } from "./UsuariosCard";
import Link from "next/link";
import { Loader } from 'rsuite';

export function UsuariosList() {
    const { usuarios, loading, iserror, eliminarUsuario, recargarUsuarios } = useUsuarios();

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">
            <Loader size="lg" content="Cargando..." />
        </div>
    }

    if (iserror) {
        return <div className="text-red-500 p-4">{iserror}</div>;
    }

    const handleDelete = async (id: number) => {
        if (confirm('¿Estás seguro de eliminar este usuario?')) {
            await eliminarUsuario(id);
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Usuarios</h1>
                <div className="space-x-2">
                    <button 
                        onClick={() => recargarUsuarios()} 
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Actualizar
                    </button>
                    <Link href="/usuarios/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Crear Usuario
                    </Link>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {usuarios.map(usuario => (
                    <UsuariosCard 
                        key={usuario.usuarioId} 
                        usuario={usuario}
                        onDelete={() => handleDelete(usuario.usuarioId)}
                    />
                ))}
            </div>
        </div>
    );
}
