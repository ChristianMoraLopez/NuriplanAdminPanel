'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface FormData {
  nombre: string;
  tipoComidaId: number;
  fit: boolean;
  instrucciones: string;
  tiempoPreparacion: number;
}

export default function NewRecetaPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    tipoComidaId: 1,
    fit: false,
    instrucciones: '',
    tiempoPreparacion: 0
  });
  const [saving, setSaving] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked
        : type === 'number' 
          ? Number(value)
          : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nombre.trim()) {
      alert('El nombre es obligatorio');
      return;
    }

    try {
      setSaving(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/recetas', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const newReceta = await response.json();
        router.push(`/recetas/${newReceta.recetaId || newReceta.id}`);
      } else {
        const errorData = await response.text();
        throw new Error(`Error ${response.status}: ${errorData}`);
      }
    } catch (err: any) {
      alert(`Error al crear la receta: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="p-4 max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Nueva Receta</h1>
          <p className="text-gray-600 mt-2">Crea una nueva receta para tu colección</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de la receta *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa el nombre de la receta"
              />
            </div>

            {/* Tipo de Comida ID */}
            <div>
              <label htmlFor="tipoComidaId" className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Comida ID
              </label>
              <input
                type="number"
                id="tipoComidaId"
                name="tipoComidaId"
                value={formData.tipoComidaId}
                onChange={handleInputChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                ID del tipo de comida (1 = Desayuno, 2 = Almuerzo, etc.)
              </p>
            </div>

            {/* Tiempo de Preparación */}
            <div>
              <label htmlFor="tiempoPreparacion" className="block text-sm font-medium text-gray-700 mb-2">
                Tiempo de Preparación (minutos)
              </label>
              <input
                type="number"
                id="tiempoPreparacion"
                name="tiempoPreparacion"
                value={formData.tiempoPreparacion}
                onChange={handleInputChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tiempo en minutos"
              />
            </div>

            {/* Fit */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="fit"
                name="fit"
                checked={formData.fit}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="fit" className="ml-2 block text-sm text-gray-700">
                ¿Es una receta fit/saludable?
              </label>
            </div>

            {/* Instrucciones */}
            <div>
              <label htmlFor="instrucciones" className="block text-sm font-medium text-gray-700 mb-2">
                Instrucciones
              </label>
              <textarea
                id="instrucciones"
                name="instrucciones"
                value={formData.instrucciones}
                onChange={handleInputChange}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe paso a paso cómo preparar la receta..."
              />
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => router.push('/recetas')}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                disabled={saving}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {saving ? 'Creando...' : 'Crear Receta'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ErrorBoundary>
  );
}