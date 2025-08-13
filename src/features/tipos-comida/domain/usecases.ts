import { api } from '@/lib/api';
import { TipoComida } from './types';

export async function fetchTiposComida(): Promise<TipoComida[]> {
  return api<TipoComida[]>('/tipos_comida');
}

export async function fetchTipoComida(id: number): Promise<TipoComida> {
  return api<TipoComida>(`/tipos_comida/${id}`);
}

export async function createTipoComida(tipoComida: Omit<TipoComida, 'tipoComidaId'>): Promise<TipoComida> {
  return api<TipoComida>('/tipos_comida', 'POST', tipoComida);
}

export async function updateTipoComida(id: number, tipoComida: Partial<TipoComida>): Promise<TipoComida> {
  return api<TipoComida>(`/tipos_comida/${id}`, 'PUT', tipoComida);
}

export async function deleteTipoComida(id: number): Promise<void> {
  return api<void>(`/tipos_comida/${id}`, 'DELETE');
}