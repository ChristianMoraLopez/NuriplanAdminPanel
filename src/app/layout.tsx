'use client';
import { usePathname } from 'next/navigation';
import { Sidebarnav } from '@/components/ui/sidebar-nav';
import './globals.css';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import { useAuth } from '@/features/usuarios/hooks/useAuth';
import { useEffect, useState } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading, checkAuth } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log('RootLayout: Component mounted, checking auth...');
    checkAuth(); // Ensure auth is checked on mount
  }, []);

  if (!mounted || loading) {
    console.log('RootLayout: Showing loading state', { mounted, loading });
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

  const publicRoutes = ['/', '/login', '/registro'];
  const isPublicRoute = publicRoutes.includes(pathname);
  const shouldShowSidebar = user && !isPublicRoute;

  console.log('RootLayout Debug:', {
    pathname,
    user: user ? { id: user.usuarioId, nombre: user.nombre, rol: user.rol } : null,
    loading,
    isPublicRoute,
    shouldShowSidebar,
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