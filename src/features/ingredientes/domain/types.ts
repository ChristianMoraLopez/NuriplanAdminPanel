export interface Ingrediente {
  ingrediente_id: number; // Changed from id
  nombre: string;
  categoriaId: number;
  fit: boolean;
  disponibleBogota: boolean;
  fotografia: string | null;
  unidadMedida: string;
  info_nutricional?: string;
  calorias?: string | null;
}

export interface CategoriaIngrediente {
  categoriaId: number;
  nombre: string;
}