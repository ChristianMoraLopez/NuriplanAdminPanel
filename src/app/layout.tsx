'use client';
import { usePathname, useRouter } from 'next/navigation';
import { Sidebarnav } from '@/components/ui/sidebar-nav';
import './globals.css';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import { useAuth } from '@/features/usuarios/hooks/useAuth';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, checkAuth, error: authError } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [authInitialized, setAuthInitialized] = useState(false);

  // Efecto para montar el componente
  useEffect(() => {
    setMounted(true);
  }, []);

  // Efecto para inicializar la autenticación solo una vez
  useEffect(() => {
    const initAuth = async () => {
      if (!mounted || authInitialized) return;
      
      console.log('RootLayout: Initializing auth...');
      
      try {
        await checkAuth();
        console.log('RootLayout: Auth initialized successfully');
      } catch (err: any) {
        console.error('RootLayout: Auth initialization failed', err);
        // Solo mostrar error si estamos en una ruta protegida
        const publicRoutes = ['/', '/login'];
        if (!publicRoutes.includes(pathname)) {
          toast.error(`Error de autenticación: ${err.message || 'No se pudo verificar la sesión'}`);
        }
      } finally {
        setAuthInitialized(true);
      }
    };

    initAuth();
  }, [mounted, authInitialized, pathname]);

  // Efecto para manejar cambios de ruta y redirecciones
  useEffect(() => {
    if (!authInitialized || loading) return;

    const publicRoutes = ['/', '/login'];
    const isPublicRoute = publicRoutes.includes(pathname);

    console.log('RootLayout: Checking redirections', {
      user: !!user,
      pathname,
      isPublicRoute,
      loading,
      authInitialized
    });

    // Si no hay usuario y estamos en una ruta protegida, redirigir al login
    if (!user && !isPublicRoute) {
      console.log('RootLayout: No user found, redirecting to login');
      router.push('/login');
      return;
    }

    // Si hay usuario y estamos en rutas públicas, redirigir al dashboard
    if (user && isPublicRoute) {
      console.log('RootLayout: User logged in, redirecting to dashboard');
      router.push('/dashboard');
      return;
    }
  }, [user, pathname, loading, authInitialized, router]);

  // Mostrar loading solo durante la inicialización
  if (!mounted || !authInitialized) {
    console.log('RootLayout: Showing initial loading state', { 
      mounted, 
      authInitialized,
      loading,
      hasUser: !!user
    });
    
    return (
      <html lang="es">
        <body className="flex h-screen bg-screen-100">
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <div>Inicializando...</div>
            </div>
          </div>
        </body>
      </html>
    );
  }

  const publicRoutes = ['/', '/login'];
  const isPublicRoute = publicRoutes.includes(pathname);
  const shouldShowSidebar = user && !isPublicRoute && !loading;

  console.log('RootLayout Render:', {
    pathname,
    user: user ? { id: user.usuarioId, nombre: user.nombre, rol: user.rol } : null,
    loading,
    authInitialized,
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