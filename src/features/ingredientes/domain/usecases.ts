import { api } from '@/lib/api'
import { Ingrediente, CategoriaIngrediente } from './types'

export async function fetchIngredientes(): Promise<Ingrediente[]> {
    return api<Ingrediente[]>('/ingredientes')
}

export async function fetchCategorias(): Promise<CategoriaIngrediente[]> {
    return api<CategoriaIngrediente[]>('/categorias')
}

export async function createIngrediente(ingrediente: Omit<Ingrediente, 'id'>): Promise<Ingrediente> {
    return api<Ingrediente>('/ingredientes', 'POST', ingrediente)
}

export async function updateIngrediente(id: number, ingrediente: Partial<Ingrediente>): Promise<Ingrediente> {
    return api<Ingrediente>(`/ingredientes/${id}`, 'PUT', ingrediente)
}

export async function deleteIngrediente(id: number): Promise<void> {
    return api<void>(`/ingredientes/${id}`, 'DELETE')
}
