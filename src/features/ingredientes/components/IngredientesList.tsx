'use client';
import { useIngredientes } from '../hooks/useIngredientes';
import { IngredienteCard } from './IngredienteCard';
import Link from 'next/link';
import { Loader } from 'rsuite';

export function IngredientesList() {
    const { ingredientes, loading, error, eliminarIngrediente, recargarIngredientes } = useIngredientes();

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">
            <Loader size="lg" content="Cargando..." />
        </div>
    }

    if (error) return <div className="text-red-500 p-4">{error}</div>;

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Ingredientes</h1>
                <div className="space-x-2">
                    <button 
                        onClick={recargarIngredientes}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Actualizar
                    </button>
                    <Link 
                        href="/ingredientes/new" 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Nuevo Ingrediente
                    </Link>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ingredientes.map(ingrediente => (
                    <IngredienteCard 
                        key={ingrediente.id}
                        ingrediente={ingrediente}
                        onDelete={() => eliminarIngrediente(ingrediente.id)}
                    />
                ))}
            </div>
        </div>
    );
}
