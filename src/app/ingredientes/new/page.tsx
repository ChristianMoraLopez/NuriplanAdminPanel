'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IngredientesForm } from '@/features/ingredientes/components/IngredientesForm';
import { createIngrediente } from '@/features/ingredientes/domain/usecases';
import { Ingrediente } from '@/features/ingredientes/domain/types';

export default function NewIngredientePage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (ingrediente: Omit<Ingrediente, 'ingrediente_id'>) => {
        try {
            await createIngrediente(ingrediente);
            router.push('/ingredientes');
        } catch (err) {
            setError('Error al crear el ingrediente. Por favor, intenta de nuevo.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-gray-900 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Nuevo Ingrediente
            </h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <IngredientesForm onSubmit={handleSubmit} />
        </div>
    );
}