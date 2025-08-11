export interface CategoriaIngrediente {
  id: number;
  nombre: string;
}

export interface Receta {
  recetaId: number;
  nombre: string;
  tipoComidaId: number;
  fit: boolean;
  instrucciones: string;
  tiempoPreparacion: number;
  disponibleBogota: boolean;
  metodoId: number | null;
  ingredientes?: RecetaIngrediente[];
}

export interface RecetaIngrediente {
  recetaId: number;
  ingrediente_id: number; // Changed from id
  nombreIngrediente: string | null;
  cantidad: number | null;
  unidad: string | null;
}

export interface TipoComida {
  tipoComidaId: number;
  nombre: string;
}

export interface MetodoPreparacion {
  metodoId: number;
  nombre: string;
}

export interface FormData {
  nombre: string;
  tipoComidaId: number;
  fit: boolean;
  instrucciones: string;
  tiempoPreparacion: number;
  disponibleBogota: boolean;
  metodoId: number | null;
}

export interface SelectedIngredient {
  ingrediente_id: number; // Changed from id
  cantidad: number;
  unidad: string;
  nombre: string;
}

export interface NewIngredientData {
  nombre: string;
  categoriaId: number;
  calorias: string | null;
  fit: boolean;
  disponibleBogota: boolean;
  fotografia: string | null;
  unidadMedida: string;
  info_nutricional?: string;
}

export interface RecetasFormProps {
  initialData?: Partial<FormData>;
  onSubmit: (formData: FormData, selectedIngredients: SelectedIngredient[]) => Promise<void>;
  isSubmitting?: boolean;
}