import { ErrorBoundary } from "@/components/ErrorBoundary";
import { UsuariosList } from "@/features/usuarios/components/UsuariosList";

export default function UsuariosPage() {
    return (
        <ErrorBoundary>
            <UsuariosList />
        </ErrorBoundary>
    );
}