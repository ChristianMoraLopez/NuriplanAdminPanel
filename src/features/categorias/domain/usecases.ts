import { api } from '@/lib/api';
import { CategoriaIngrediente } from '@/features/ingredientes/domain/types';

export async function fetchCategorias(): Promise<CategoriaIngrediente[]> {
  return api<CategoriaIngrediente[]>('/categorias');
}

export async function fetchCategoria(id: number): Promise<CategoriaIngrediente> {
  return api<CategoriaIngrediente>(`/categorias/${id}`);
}

export async function createCategoria(categoria: Omit<CategoriaIngrediente, 'categoriaId'>): Promise<CategoriaIngrediente> {
  return api<CategoriaIngrediente>('/categorias', 'POST', categoria);
}

export async function updateCategoria(id: number, categoria: Partial<CategoriaIngrediente>): Promise<CategoriaIngrediente> {
  return api<CategoriaIngrediente>(`/categorias/${id}`, 'PUT', categoria);
}

export async function deleteCategoria(id: number): Promise<void> {
  return api<void>(`/categorias/${id}`, 'DELETE');
}