import { RecetasList } from "@/features/recetas/components/RecetasList";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function RecetasPage() {
    return (
        <ErrorBoundary>
            <RecetasList />
        </ErrorBoundary>
    );
}
