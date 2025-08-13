'use client';
import { CategoriaIngrediente } from '@/features/ingredientes/domain/types';
import Link from 'next/link';

interface CategoriaCardProps {
    categoria: CategoriaIngrediente;
    onDelete: () => Promise<void>;
}

export function CategoriaCard({ categoria, onDelete }: CategoriaCardProps) {
    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (window.confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
            try {
                await onDelete();
            } catch (err) {
                console.error('Error al eliminar categoría:', err);
            }
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow">
            <h2 className="text-lg font-semibold truncate">{categoria.nombre || 'Sin nombre'}</h2>
            <p className="text-gray-600 text-sm">ID: {categoria.categoriaId}</p>
     
            <div className="mt-4 flex justify-between items-center">
                <Link
                    href={`/categorias/${categoria.categoriaId}`}
                    className="text-blue-500 hover:text-blue-700 text-sm px-2 py-1 rounded hover:bg-blue-50"
                    title="Editar categoría"
                >
                    ✏️ Editar
                </Link>
                <button
                    onClick={handleDelete}
                    className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded hover:bg-red-50"
                    title="Eliminar categoría"
                >
                    🗑️ Eliminar
                </button>
            </div>
        </div>
    );
}