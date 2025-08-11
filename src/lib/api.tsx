import { Usuario } from '@/features/usuarios/domain/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://nutriplanbackend.fly.dev'

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

type ApiSuccess<T> = {
  data: T
  message?: string
}

type ApiError = {
  message: string
  error?: string
}

type ApiLoginResponse = {
  token: string
  usuario: Usuario
}

export async function api<T = any>(
  path: string,
  method: RequestMethod = 'GET',
  body?: any,
  token?: string
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  const authToken = token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null)
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`API Error: ${res.status} - ${errText}`)
  }

  const data = await res.json()
  console.log('API Response:', data)

  if (Array.isArray(data)) {
    return data as T
  }

  if (data.data !== undefined) {
    return data.data as T
  }

  return data as T
}