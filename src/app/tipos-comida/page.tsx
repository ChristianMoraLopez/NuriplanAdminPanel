import { TiposComidaList } from "@/features/tipos-comida/components/Tipos-comidaList";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function IngredientesPage() {
    return (
        <ErrorBoundary>
            <TiposComidaList    />
        </ErrorBoundary>
    );
}
