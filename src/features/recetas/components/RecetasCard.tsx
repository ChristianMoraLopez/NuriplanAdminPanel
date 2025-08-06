import { Receta } from "../domain/types";
import Link from "next/link";

interface RecetasCardProps {
    receta: Receta;
    onDelete: () => Promise<void>;
}

export function RecetasCard({ receta, onDelete }: RecetasCardProps) {
    return (
        <div className="border p-4 rounded shadow bg-white">
            <h2 className="text-lg font-semibold">{receta.nombre}</h2>
            <p className="text-gray-600 text-sm mt-2">{receta.descripcion}</p>
            
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-500">
                <div>
                    <span className="font-medium">Tiempo:</span> {receta.tiempoPreparacion} min
                </div>
                <div>
                    <span className="font-medium">Porciones:</span> {receta.porciones}
                </div>
                <div>
                    <span className="font-medium">Dificultad:</span> {receta.dificultad}
                </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
                <Link 
                    href={`/recetas/${receta.id}`} 
                    className="text-blue-500 hover:underline text-sm"
                >
                    Editar
                </Link>
                <button
                    onClick={onDelete}
                    className="text-red-500 hover:text-red-700 text-sm"
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
}
