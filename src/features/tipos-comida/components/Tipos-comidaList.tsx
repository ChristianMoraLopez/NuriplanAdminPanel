'use client';
import { useEffect, useState } from 'react';
import { Loader } from 'rsuite';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { TiposComidaCard } from './Tipos-comidaCard';
import { fetchTiposComida, deleteTipoComida } from '../domain/usecases';
import { TipoComida } from '../domain/types';

export function TiposComidaList() {
  const [tiposComida, setTiposComida] = useState<TipoComida[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTiposComida = async () => {
    try {
      setLoading(true);
      const data = await fetchTiposComida();
      setTiposComida(data);
    } catch (err: any) {
      setError(err.message);
      toast.error(`Error al cargar tipos de comida: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTipoComida(id);
      setTiposComida((prev) => prev.filter((tipo) => tipo.tipoComidaId !== id));
      toast.success('Tipo de comida eliminado exitosamente');
    } catch (err: any) {
      toast.error(`Error al eliminar tipo de comida: ${err.message}`);
    }
  };

  useEffect(() => {
    loadTiposComida();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader size="lg" content="Cargando..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Error: {error}
      </div>
    );
  }

  if (!tiposComida || !Array.isArray(tiposComida)) {
    return (
      <div className="text-gray-500 p-4">
        No se pudieron cargar los tipos de comida
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tipos de Comida</h1>
        <div className="space-x-2">
          <button
            onClick={loadTiposComida}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Actualizar
          </button>
          <Link
            href="/tipos-comida/new"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Nuevo Tipo de Comida
          </Link>
        </div>
      </div>

      {tiposComida.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No hay tipos de comida disponibles</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tiposComida.map((tipo, index) => {
            const uniqueKey = tipo?.tipoComidaId?.toString() || `tipo-${index}`;
            return (
              <TiposComidaCard
                key={uniqueKey}
                tipoComida={tipo}
                onDelete={() => handleDelete(tipo.tipoComidaId)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}