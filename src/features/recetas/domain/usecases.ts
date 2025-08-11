import { api } from '@/lib/api';
import { Receta, TipoComida, MetodoPreparacion, RecetaIngrediente } from './types';
import { Ingrediente, CategoriaIngrediente } from "@/features/ingredientes/domain/types";

export async function fetchRecetas(): Promise<Receta[]> {
    const recetas = await api<Receta[]>('/recetas');
    return Promise.all(
        recetas.map(async (receta) => {
            const ingredientes = await api<RecetaIngrediente[]>(`/receta_ingredientes/receta/${receta.recetaId}`);
            return { ...receta, ingredientes };
        })
    );
}

export async function fetchReceta(id: number): Promise<Receta> {
    const receta = await api<Receta>(`/recetas/${id}`);
    const ingredientes = await api<RecetaIngrediente[]>(`/receta_ingredientes/receta/${id}`);
    return { ...receta, ingredientes };
}

export async function createReceta(receta: Omit<Receta, 'recetaId'>): Promise<Receta> {
    return api<Receta>('/recetas', 'POST', receta);
}

export async function updateReceta(id: number, receta: Partial<Receta>): Promise<Receta> {
    return api<Receta>(`/recetas/${id}`, 'PUT', receta);
}

export async function deleteReceta(id: number): Promise<void> {
    return api<void>(`/recetas/${id}`, 'DELETE');
}

export async function fetchTiposComida(): Promise<TipoComida[]> {
    return api<TipoComida[]>('/tipos_comida');
}

export async function fetchMetodosPreparacion(): Promise<MetodoPreparacion[]> {
    return api<MetodoPreparacion[]>('/metodos');
}

export async function fetchIngredientes(): Promise<Ingrediente[]> {
    return api<Ingrediente[]>('/ingredientes');
}

export async function fetchCategorias(): Promise<CategoriaIngrediente[]> {
    return api<CategoriaIngrediente[]>('/categorias');
}

export async function createIngrediente(ingrediente: Omit<Ingrediente, 'ingrediente_id'>): Promise<Ingrediente> {
    return api<Ingrediente>('/ingredientes', 'POST', ingrediente);
}

export async function createRecetaIngrediente(recetaIngrediente: Omit<RecetaIngrediente, 'nombreIngrediente'>): Promise<RecetaIngrediente> {
    return api<RecetaIngrediente>('/receta_ingredientes', 'POST', recetaIngrediente);
}