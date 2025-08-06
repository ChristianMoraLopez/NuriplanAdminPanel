import { api } from '@/lib/api'
import { Receta, TipoComida, MetodoPreparacion, RecetaIngrediente } from './types'

export async function fetchRecetas(): Promise<Receta[]> {
    return api<Receta[]>('/recetas')
}

export async function fetchReceta(id: number): Promise<Receta> {
    return api<Receta>(`/recetas/${id}`)
}

export async function createReceta(receta: Omit<Receta, 'id'>): Promise<Receta> {
    return api<Receta>('/recetas', 'POST', receta)
}

export async function updateReceta(id: number, receta: Partial<Receta>): Promise<Receta> {
    return api<Receta>(`/recetas/${id}`, 'PUT', receta)
}

export async function deleteReceta(id: number): Promise<void> {
    return api<void>(`/recetas/${id}`, 'DELETE')
}

export async function fetchTiposComida(): Promise<TipoComida[]> {
    return api<TipoComida[]>('/tipos_comida')
}

export async function fetchMetodosPreparacion(): Promise<MetodoPreparacion[]> {
    return api<MetodoPreparacion[]>('/metodos')
}
