'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Receta } from '@/features/recetas/domain/types';

interface RecetasCardProps {
  receta: Receta;
  onDelete: () => void;
}

export function RecetasCard({ receta, onDelete }: RecetasCardProps) {
  const router = useRouter();

  // Verificar que receta existe
  if (!receta) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <p className="text-gray-500">Receta no disponible</p>
      </div>
    );
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar que se active el click de la tarjeta
    if (window.confirm('¿Estás seguro de que quieres eliminar esta receta?')) {
      onDelete();
    }
  };

  const handleCardClick = () => {
    router.push(`/recetas/${receta.recetaId}`);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar que se active el click de la tarjeta
    router.push(`/recetas/${receta.recetaId}/edit`);
  };

  const getTipoComidaText = (tipoId: number) => {
    const tipos = {
      1: 'Desayuno',
      2: 'Almuerzo',
      3: 'Cena',
      4: 'Snack'
    };
    return tipos[tipoId as keyof typeof tipos] || `Tipo ${tipoId}`;
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
      onClick={handleCardClick}
    >
      {/* Header con título y acciones */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold truncate flex-1 mr-2">
          {receta.nombre || 'Sin nombre'}
        </h3>
        <div className="flex space-x-1 flex-shrink-0">
          <button
            onClick={handleEditClick}
            className="text-blue-500 hover:text-blue-700 text-sm px-2 py-1 rounded hover:bg-blue-50"
            title="Editar receta"
          >
            ✏️
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded hover:bg-red-50"
            title="Eliminar receta"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
          {getTipoComidaText(receta.tipoComidaId)}
        </span>
        {receta.fit && (
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
            Fit
          </span>
        )}
      </div>

      {/* Instrucciones preview */}
      {receta.instrucciones && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {receta.instrucciones.length > 100 
            ? `${receta.instrucciones.substring(0, 100)}...`
            : receta.instrucciones
          }
        </p>
      )}

      {/* Footer con tiempo */}
      <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t border-gray-100">
        <span className="flex items-center">
          ⏱️ {receta.tiempoPreparacion || 0} min
        </span>
        <span className="text-gray-400">
          ID: {receta.recetaId}
        </span>
      </div>
    </div>
  );
}