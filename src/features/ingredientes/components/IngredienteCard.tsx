import { Ingrediente } from "../domain/types";
import Link from "next/link";

interface IngredienteCardProps {
    ingrediente: Ingrediente;
    onDelete: () => Promise<void>;
}

export function IngredienteCard({ ingrediente, onDelete }: IngredienteCardProps) {
    return (
        <div className="border p-4 rounded shadow bg-white">
            <h2 className="text-lg font-semibold">{ingrediente.nombre}</h2>
            <p className="text-gray-600">Unidad: {ingrediente.unidadMedida}</p>
            <div className="mt-4 flex justify-between items-center">
                <Link 
                    href={`/ingredientes/${ingrediente.id}`} 
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
