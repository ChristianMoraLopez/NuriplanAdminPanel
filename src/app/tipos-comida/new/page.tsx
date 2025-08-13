'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/usuarios/hooks/useAuth';
import { TiposComidaForm } from '@/features/tipos-comida/components/Tipos-comidaForm';

export default function NewTipoComidaPage() {
  const router = useRouter();
  const { user, loading, checkAuth } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      console.log('NewTipoComidaPage: No user, redirecting to login');
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex items-center justify-center min-h-screen">
        <div>Cargando...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Redirect is handled by useEffect
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Nuevo Tipo de Comida
      </h1>
      <TiposComidaForm />
    </div>
  );
}