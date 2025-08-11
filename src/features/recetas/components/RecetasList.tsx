'use client';
import { useRecetas } from '../hooks/useRecetas';
import { Loader } from 'rsuite';
import Link from 'next/link';
import { RecetasCard } from './RecetasCard';

export function RecetasList() {
    const { recetas, loading, error, eliminarReceta, recargarRecetas } = useRecetas();

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <Loader size="lg" content="Cargando..." />
        </div>
    );

    if (error) return (
        <div className="text-red-500 p-4">
            Error: {error}
        </div>
    );

    // Verificar que recetas existe y es un array
    if (!recetas || !Array.isArray(recetas)) {
        return (
            <div className="text-gray-500 p-4">
                No se pudieron cargar las recetas
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Recetas</h1>
                <div className="space-x-2">
                    <button
                        onClick={recargarRecetas}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Actualizar
                    </button>
                    <Link
                        href="/recetas/new"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Nueva Receta
                    </Link>
                </div>
            </div>
           
            {recetas.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">No hay recetas disponibles</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recetas.map((receta, index) => {
                        // Usar múltiples fallbacks para la key
                        const uniqueKey = receta?.recetaId?.toString() || `receta-${index}`;
                        
                        return (
                            <RecetasCard
                                key={uniqueKey}
                                receta={receta}
                                onDelete={() => eliminarReceta(receta?.recetaId)}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}