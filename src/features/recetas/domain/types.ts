export interface Receta {
    recetaId: number;
    nombre: string;
    tipoComidaId: number;
    fit: boolean;
    instrucciones: string;
    tiempoPreparacion: number;
    ingredientes?: RecetaIngrediente[];
}

export interface RecetaIngrediente {
    recetaId: number;
    ingredienteId: number;
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