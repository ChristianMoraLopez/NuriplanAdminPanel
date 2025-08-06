export interface Receta {
    id: number;
    nombre: string;
    descripcion: string;
    tiempoPreparacion: number;
    porciones: number;
    dificultad: string;
    tipoComidaId: number;
    metodoPreparacionId: number;
    usuarioId: number;
    ingredientes?: RecetaIngrediente[];
}

export interface RecetaIngrediente {
    recetaId: number;
    ingredienteId: number;
    cantidad: number;
    unidad: string;
}

export interface TipoComida {
    id: number;
    nombre: string;
}

export interface MetodoPreparacion {
    id: number;
    nombre: string;
}
