'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RecetasForm } from '@/features/recetas/components/RecetasForm'; // Adjust path as needed
import { FormData, Receta, RecetaIngrediente, SelectedIngredient } from '@/features/recetas/domain/types';
import { createReceta, createRecetaIngrediente } from '@/features/recetas/domain/usecases';

export default function NewRecetaPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    tipoComidaId: 1,
    fit: false,
    instrucciones: '',
    tiempoPreparacion: 0,
    disponibleBogota: true,
    metodoId: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData, selectedIngredients: SelectedIngredient[]) => {
    if (!formData.nombre.trim()) {
      toast.error('El nombre es obligatorio');
      return;
    }

    try {
      setIsSubmitting(true);

      // Create the recipe
      const recetaPayload: Omit<Receta, 'recetaId'> = {
        nombre: formData.nombre,
        tipoComidaId: formData.tipoComidaId,
        fit: formData.fit,
        instrucciones: formData.instrucciones,
        tiempoPreparacion: formData.tiempoPreparacion,
        disponibleBogota: formData.disponibleBogota,
        metodoId: formData.metodoId,
      };

      const newReceta = await createReceta(recetaPayload);

      // Create ingredient associations
      await Promise.all(
        selectedIngredients.map(async (ing) => {
          const recetaIngrediente: Omit<RecetaIngrediente, 'nombreIngrediente'> = {
            recetaId: newReceta.recetaId,
            ingrediente_id: ing.ingrediente_id,
            cantidad: ing.cantidad,
            unidad: ing.unidad,
          };
          return createRecetaIngrediente(recetaIngrediente);
        })
      );

      toast.success('Receta creada exitosamente');
      router.push(`/recetas/${newReceta.recetaId}`);
    } catch (err: any) {
      toast.error(`Error al crear la receta: ${err.message}`);
    } finally {
      setIsSubmitting(false);
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
          <RecetasForm
            initialData={formData}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
        <ToastContainer />
      </div>
    </ErrorBoundary>
  );
}