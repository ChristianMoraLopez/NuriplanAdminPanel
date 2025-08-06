import { Usuario } from "../domain/types";
import Link from "next/link";

interface UsuariosCardProps {
    usuario: Usuario;
    onDelete: () => Promise<void>;
}

export function UsuariosCard({ usuario, onDelete }: UsuariosCardProps) {
    return (
        <div className="border p-4 rounded shadow bg-white">
            <h2 className="text-lg font-semibold">{usuario.nombre}</h2>
            <p className="text-gray-600">{usuario.email}</p>
            <div className="mt-4 flex justify-between items-center">
                <Link 
                    href={`/usuarios/${usuario.usuarioId}`} 
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