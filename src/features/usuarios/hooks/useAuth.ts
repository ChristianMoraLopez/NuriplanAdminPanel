// src/hooks/useAuth.ts
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { loginUsuario, fetchCurrentUser } from '../domain/usecases'
import { Usuario } from '../domain/types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

export function useAuth() {
  const [user, setUser] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const login = async (email: string, contrasena: string) => {
    setError(null)
    setLoading(true)
    try {
      const { usuario, token } = await loginUsuario(email, contrasena)
      localStorage.setItem('token', token)
      
      // Verify user role
      const userData = await fetchCurrentUser()
      if (userData.rol === 'admin') {
        setUser(userData)
        router.push('/dashboard')
      } else {
        localStorage.removeItem('token')
        setError('Acceso denegado: Solo administradores pueden entrar')
      }
    } catch (err: any) {
      setError(err.message || 'Error durante el inicio de sesión')
      localStorage.removeItem('token')
    } finally {
      setLoading(false)
    }
  }

  const checkAuth = async () => {
    setLoading(true) // Asegurar que loading está en true al inicio
    
    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        console.log('No token found, redirecting to home')
        setUser(null)
        setLoading(false)
        router.push('/')
        return
      }

      console.log('Token found, verifying user...')
      const userData = await fetchCurrentUser()
      
      if (userData.rol !== 'admin') {
        console.log('User is not admin, removing token')
        localStorage.removeItem('token')
        setUser(null)
        router.push('/')
      } else {
        console.log('Admin user verified:', userData.nombre)
        setUser(userData)
      }
    } catch (err) {
      console.log('Auth check failed:', err)
      localStorage.removeItem('token')
      setUser(null)
      router.push('/')
    } finally {
      console.log('Auth check completed')
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    router.push('/')
  }

  useEffect(() => {
    // Solo ejecutar checkAuth una vez al montar el componente
    checkAuth()
  }, []) // Remover router de las dependencias para evitar loops

  // Debug info
  useEffect(() => {
    console.log('Auth state:', { user: !!user, loading, error })
  }, [user, loading, error])

  return { user, loading, error, login, logout, checkAuth }
}