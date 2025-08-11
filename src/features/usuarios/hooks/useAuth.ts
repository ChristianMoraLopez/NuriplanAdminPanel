'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginUsuario, fetchCurrentUser } from '../domain/usecases';
import { Usuario } from '../domain/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export function useAuth() {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (email: string, contrasena: string) => {
    setError(null);
    setLoading(true);
    try {
      console.log('useAuth: Attempting login with email:', email);
      const { usuario, token } = await loginUsuario(email, contrasena);
      localStorage.setItem('token', token);
      console.log('useAuth: Token stored:', token);

      const userData = await fetchCurrentUser();
      console.log('useAuth: Fetched user:', userData);
      if (userData.rol === 'admin') {
        setUser(userData);
        console.log('useAuth: Admin login successful, redirecting to /dashboard');
        router.push('/dashboard');
      } else {
        localStorage.removeItem('token');
        setError('Acceso denegado: Solo administradores pueden entrar');
        console.log('useAuth: Non-admin user, token removed');
      }
    } catch (err: any) {
      setError(err.message || 'Error durante el inicio de sesión');
      localStorage.removeItem('token');
      console.error('useAuth: Login failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      console.log('useAuth: Checking auth, token:', token ? 'present' : 'missing');
      if (!token) {
        console.log('useAuth: No token found, setting user to null');
        setUser(null);
        setLoading(false);
        if (!['/', '/login', '/registro'].includes(window.location.pathname)) {
          console.log('useAuth: Redirecting to / due to no token');
          router.push('/');
        }
        return;
      }

      const userData = await fetchCurrentUser();
      console.log('useAuth: Fetched user data:', userData);
      if (userData.rol !== 'admin') {
        console.log('useAuth: User is not admin, removing token');
        localStorage.removeItem('token');
        setUser(null);
        router.push('/');
      } else {
        console.log('useAuth: Admin user verified:', userData.nombre);
        setUser(userData);
      }
    } catch (err) {
      console.error('useAuth: Auth check failed:', err);
      localStorage.removeItem('token');
      setUser(null);
      if (!['/', '/login', '/registro'].includes(window.location.pathname)) {
        console.log('useAuth: Redirecting to / due to auth failure');
        router.push('/');
      }
    } finally {
      setLoading(false);
      console.log('useAuth: Auth check completed');
    }
  };

  const logout = () => {
    console.log('useAuth: Logging out');
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  useEffect(() => {
    console.log('useAuth: Running checkAuth on mount');
    checkAuth();
  }, []);

  useEffect(() => {
    console.log('useAuth: Auth state changed:', { user: user ? { id: user.usuarioId, nombre: user.nombre, rol: user.rol } : null, loading, error });
  }, [user, loading, error]);

  return { user, loading, error, login, logout, checkAuth };
}