// features/tipos-comida/components/TiposComidaCard.tsx


'use client';
import { useRouter } from 'next/navigation';
import { TipoComida } from '../domain/types';

interface TiposComidaCardProps {
  tipoComida: TipoComida;
  onDelete: () => void;
}

export function TiposComidaCard({ tipoComida, onDelete }: TiposComidaCardProps) {
  const router = useRouter();

  // Verificar que tipoComida existe
  if (!tipoComida) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <p className="text-gray-500">Tipo de comida no disponible</p>
      </div>
    );
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('¿Estás seguro de que quieres eliminar este tipo de comida?')) {
      onDelete();
    }
  };

  const handleCardClick = () => {
    router.push(`/tipos-comida/${tipoComida.tipoComidaId}`);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/tipos-comida/${tipoComida.tipoComidaId}/edit`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
      onClick={handleCardClick}
    >
      {/* Header con título y acciones */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold truncate flex-1 mr-2">
          {tipoComida.nombre || 'Sin nombre'}
        </h3>
        <div className="flex space-x-1 flex-shrink-0">
          <button
            onClick={handleEditClick}
            className="text-blue-500 hover:text-blue-700 text-sm px-2 py-1 rounded hover:bg-blue-50"
            title="Editar tipo de comida"
          >
            ✏️
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded hover:bg-red-50"
            title="Eliminar tipo de comida"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Footer con ID */}
      <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
        <span>ID: {tipoComida.tipoComidaId}</span>
      </div>
    </div>
  );
}