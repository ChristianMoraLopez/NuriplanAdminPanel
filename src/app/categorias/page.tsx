import { CategoriasList } from "@/features/categorias/components/CategoriasList";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function IngredientesPage() {
    return (
        <ErrorBoundary>
            <CategoriasList />
        </ErrorBoundary>
    );
}
