'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/usuarios/hooks/useAuth';
import { CategoriasForm } from '@/features/categorias/components/CategoriasForm';
import { CategoriaIngrediente } from '@/features/ingredientes/domain/types';
import { createCategoria } from '@/features/categorias/domain/usecases'; // Adjust path as needed

export default function NewCategoriaPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      console.log('NewCategoriaPage: No user, redirecting to login');
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleSubmit = async (categoria: Omit<CategoriaIngrediente, 'categoriaId'>) => {
    try {
      await createCategoria(categoria);
      router.push('/categorias'); // Redirect to categories list after successful creation
    } catch (err) {
      console.error('Error al crear categoría:', err);
      throw err; // Let CategoriasForm handle the error display
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex items-center justify-center min-h-screen">
        <div>Cargando...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Nueva Categoría
      </h1>
      <CategoriasForm onSubmit={handleSubmit} />
    </div>
  );
}