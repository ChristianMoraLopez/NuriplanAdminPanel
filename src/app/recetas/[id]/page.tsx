'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader } from 'rsuite';
import Link from 'next/link';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { fetchReceta, deleteReceta } from '@/features/recetas/domain/usecases';
import { Receta, RecetaIngrediente } from '@/features/recetas/domain/types';

export default function RecetaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [receta, setReceta] = useState<Receta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const recetaId = params.id as string;

  useEffect(() => {
    const loadReceta = async () => {
      try {
        setLoading(true);
        const data = await fetchReceta(Number(recetaId));
        setReceta(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (recetaId) {
      loadReceta();
    }
  }, [recetaId]);

  const handleDelete = async () => {
    if (!receta || !window.confirm('¿Estás seguro de que quieres eliminar esta receta?')) {
      return;
    }

    try {
      await deleteReceta(receta.recetaId);
      router.push('/recetas');
    } catch (err) {
      alert('Error al eliminar la receta');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader size="lg" content="Cargando receta..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
        <Link href="/recetas" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          Volver a Recetas
        </Link>
      </div>
    );
  }

  if (!receta) {
    return (
      <div className="p-4">
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Receta no encontrada</p>
          <Link href="/recetas" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Volver a Recetas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="p-4 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{receta.nombre}</h1>
            <div className="flex space-x-2">
              <Link
                href={`/recetas/${receta.recetaId}/edit`}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Editar
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Eliminar
              </button>
              <Link
                href="/recetas"
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Volver
              </Link>
            </div>
          </div>
        </div>

        {/* Detalles de la receta */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Información General</h3>
              <div className="space-y-2">
                <p><span className="font-medium">ID:</span> {receta.recetaId}</p>
                <p><span className="font-medium">Tipo de Comida ID:</span> {receta.tipoComidaId}</p>
                <p><span className="font-medium">Tiempo de Preparación:</span> {receta.tiempoPreparacion} minutos</p>
                <p className="flex items-center">
                  <span className="font-medium mr-2">Fit:</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    receta.fit 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {receta.fit ? 'Sí' : 'No'}
                  </span>
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Ingredientes</h3>
              {receta.ingredientes && receta.ingredientes.length > 0 ? (
                <ul className="list-disc pl-5 space-y-2">
                  {receta.ingredientes.map((ingrediente) => (
                    <li key={`${ingrediente.recetaId}-${ingrediente.ingrediente_id}`}>
                      {ingrediente.nombreIngrediente || 'Ingrediente desconocido'} -{' '}
                      {ingrediente.cantidad != null ? ingrediente.cantidad : 'N/A'}{' '}
                      {ingrediente.unidad || ''}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No hay ingredientes disponibles</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Instrucciones</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="whitespace-pre-line">{receta.instrucciones}</p>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}