'use client';
import { usePathname } from 'next/navigation';
import { Sidebarnav } from '@/components/ui/sidebar-nav';
import './globals.css';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import { useAuth } from '@/features/usuarios/hooks/useAuth';
import { useEffect, useState } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  // Asegurar que el componente está montado en el cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  // Mostrar loading mientras se monta el componente o se está cargando el usuario
  if (!mounted || loading) {
    return (
      <html lang="es">
        <body className="flex h-screen bg-screen-100">
          <div className="flex-1 flex items-center justify-center">
            <div>Cargando...</div>
          </div>
        </body>
      </html>
    );
  }

  // Definir rutas públicas donde no debe aparecer el sidebar
  const publicRoutes = ['/', '/login', '/registro'];
  const isPublicRoute = publicRoutes.includes(pathname);
  
  // Mostrar sidebar solo si el usuario está autenticado y no está en una ruta pública
  const shouldShowSidebar = user && !isPublicRoute;

  console.log('Layout Debug:', {
    pathname,
    user: !!user,
    loading,
    isPublicRoute,
    shouldShowSidebar
  });

  return (
    <html lang="es">
      <body className="flex h-screen bg-screen-100">
        <SidebarProvider>
          {shouldShowSidebar && (
            <Sidebar>
              <Sidebarnav />
            </Sidebar>
          )}
          <main className={`flex-1 p-6 overflow-auto ${shouldShowSidebar ? '' : 'w-full'}`}>
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}