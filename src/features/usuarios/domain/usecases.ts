import { Usuario } from './types'
import { api } from '@/lib/api'

// Obtener todos los usuarios
export async function fetchUsuarios(): Promise<Usuario[]> {
  return api<Usuario[]>('/usuarios')
}

// Obtener usuario actual
export async function fetchCurrentUser(): Promise<Usuario> {
  return api<Usuario>('/usuarios/me')
}

// Registrar nuevo usuario
export async function registerUsuario(usuario: Omit<Usuario, 'id'>): Promise<Usuario> {
  return api<Usuario>('/registro', 'POST', usuario)
}

// Login tradicional
export async function loginUsuario(email: string, contrasena: string): Promise<{usuario: Usuario, token: string}> {
  return api<{usuario: Usuario, token: string}>('/login', 'POST', { email, contrasena })
}

// Login con Google
export async function loginWithGoogle(idToken: string): Promise<{usuario: Usuario, token: string}> {
  return api<{usuario: Usuario, token: string}>('/google-login', 'POST', { idToken })
}

// Actualizar usuario
export async function updateUsuario(id: number, usuario: Partial<Usuario>): Promise<Usuario> {
  return api<Usuario>(`/usuarios/${id}`, 'PUT', usuario)
}

// Eliminar usuario
export async function deleteUsuario(id: number): Promise<void> {
  return api<void>(`/usuarios/${id}`, 'DELETE')
}

// Cerrar sesión
export async function logout(): Promise<void> {
  return api<void>('/logout', 'POST')
}
