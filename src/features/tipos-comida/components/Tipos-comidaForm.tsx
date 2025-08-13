'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { TipoComida } from '../domain/types';
import { createTipoComida, updateTipoComida } from '../domain/usecases';

interface TiposComidaFormProps {
  initialData?: TipoComida;
}

export function TiposComidaForm({ initialData }: TiposComidaFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Omit<TipoComida, 'tipoComidaId'>>({
    nombre: initialData?.nombre ?? '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre.trim()) {
      toast.error('El nombre es obligatorio');
      return;
    }

    setIsSubmitting(true);
    try {
      if (initialData?.tipoComidaId) {
        // Update existing type
        await updateTipoComida(initialData.tipoComidaId, formData);
        toast.success('Tipo de comida actualizado exitosamente');
      } else {
        // Create new type
        await createTipoComida(formData);
        toast.success('Tipo de comida creado exitosamente');
      }
      router.push('/tipos-comida'); // Redirect to list page after success
    } catch (err: any) {
      toast.error(`Error al procesar el tipo de comida: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre */}
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre del tipo de comida *
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ejemplo: Desayuno, Almuerzo, Cena"
          />
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => router.push('/tipos-comida')}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
            disabled={isSubmitting}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >

            {isSubmitting ? 'Guardando...' : initialData ? 'Actualizar Tipo de Comida' : 'Crear Tipo de Comida'}
          </button>
        </div>
      </form>
    </div>
  );
}