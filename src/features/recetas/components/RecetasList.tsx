'use client';
import { useRecetas } from '../hooks/useRecetas';
import { Loader } from 'rsuite';
import Link from 'next/link';
import { RecetasCard } from './RecetasCard';
export function RecetasList() {
    const { recetas, loading, error, eliminarReceta, recargarRecetas } = useRecetas();

    if (loading) return <div className="flex justify-center items-center min-h-screen">
        <Loader size="lg" content="Cargando..." />
    </div>;

    if (error) return <div className="text-red-500 p-4">{error}</div>;

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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recetas.map(receta => (
                    <RecetasCard 
                        key={receta.id}
                        receta={receta}
                        onDelete={() => eliminarReceta(receta.id)}
                    />
                ))}
            </div>
        </div>
    );
}
