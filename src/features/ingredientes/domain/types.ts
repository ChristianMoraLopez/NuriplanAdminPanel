export interface Ingrediente {
    id: number;
    nombre: string;
    categoriaId: number;
    unidadMedida: string;
    info_nutricional?: string;
}

export interface CategoriaIngrediente {
    id: number;
    nombre: string;
}
