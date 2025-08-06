import { IngredientesList } from "@/features/ingredientes/components/IngredientesList";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function IngredientesPage() {
    return (
        <ErrorBoundary>
            <IngredientesList />
        </ErrorBoundary>
    );
}
