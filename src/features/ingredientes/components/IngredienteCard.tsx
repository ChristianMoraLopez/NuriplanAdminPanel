'use client';
import { Ingrediente } from "../domain/types";
import Link from "next/link";

interface IngredienteCardProps {
    ingrediente: Ingrediente;
    onDelete: () => Promise<void>;
}

export function IngredienteCard({ ingrediente, onDelete }: IngredienteCardProps) {
    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent any parent click events
        if (window.confirm('¿Estás seguro de que quieres eliminar este ingrediente?')) {
            try {
                await onDelete();
            } catch (err) {
                console.error('Error al eliminar ingrediente:', err);
            }
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow">
            <h2 className="text-lg font-semibold truncate">{ingrediente.nombre || 'Sin nombre'}</h2>
            <p className="text-gray-600 text-sm">Calorías: {ingrediente.calorias ?? 'No especificado'}</p>
            <p className="text-gray-600 text-sm">Categoría ID: {ingrediente.categoriaId}</p>
            <p className="text-gray-600 text-sm">Apto para dieta: {ingrediente.fit ? 'Sí' : 'No'}</p>
            <p className="text-gray-600 text-sm">Disponible en Bogotá: {ingrediente.disponibleBogota ? 'Sí' : 'No'}</p>
            <p className="text-gray-600 text-sm">Unidad de Medida: {ingrediente.unidadMedida || 'No especificado'}</p>
            <p className="text-gray-600 text-sm">Info Nutricional: {ingrediente.info_nutricional ?? 'No especificado'}</p>
            {ingrediente.fotografia && (
                <p className="text-gray-600 text-sm">
                    Fotografía: <a href={ingrediente.fotografia} target="_blank" className="text-blue-500 hover:underline">Ver imagen</a>
                </p>
            )}
            <div className="mt-4 flex justify-between items-center">
                <Link
                    href={`/ingredientes/${ingrediente.ingrediente_id}`}
                    className="text-blue-500 hover:text-blue-700 text-sm px-2 py-1 rounded hover:bg-blue-50"
                    title="Editar ingrediente"
                >
                    ✏️ Editar
                </Link>
                <button
                    onClick={handleDelete}
                    className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded hover:bg-red-50"
                    title="Eliminar ingrediente"
                >
                    🗑️ Eliminar
                </button>
            </div>
        </div>
    );
}