import { useState, useEffect } from 'react';
import { Ingrediente, CategoriaIngrediente } from '@/features/ingredientes/domain/types';
import { fetchCategorias } from '@/features/ingredientes/domain/usecases';

interface IngredientesFormProps {
    ingrediente?: Partial<Ingrediente>;
    onSubmit: (ingrediente: Omit<Ingrediente, 'ingrediente_id'>) => Promise<void>;
}

export function IngredientesForm({ ingrediente = {}, onSubmit }: IngredientesFormProps) {
    const [formData, setFormData] = useState<Omit<Ingrediente, 'ingrediente_id'>>({
        nombre: ingrediente.nombre || '',
        calorias: ingrediente.calorias || '',
        fit: ingrediente.fit || false,
        categoriaId: ingrediente.categoriaId || 0,
        fotografia: ingrediente.fotografia || '',
        disponibleBogota: ingrediente.disponibleBogota || false,
        unidadMedida: ingrediente.unidadMedida || '',
        info_nutricional: ingrediente.info_nutricional || '',
    });
    const [categorias, setCategorias] = useState<CategoriaIngrediente[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const loadCategorias = async () => {
            setIsLoading(true);
            try {
                const data = await fetchCategorias();
                setCategorias(data);
            } catch (err) {
                setError('Error al cargar las categorías');
            } finally {
                setIsLoading(false);
            }
        };
        loadCategorias();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
        // Limpiar error cuando el usuario empiece a escribir
        if (error) setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.nombre || !formData.calorias || formData.categoriaId === 0 || !formData.unidadMedida) {
            setError('Por favor, completa todos los campos requeridos');
            return;
        }
        
        setIsSubmitting(true);
        try {
            await onSubmit({
                ...formData,
                calorias: formData.calorias || null,
                fotografia: formData.fotografia || null,
                info_nutricional: formData.info_nutricional || undefined,
            });
        } catch (err) {
            setError('Error al guardar el ingrediente');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        {ingrediente?.nombre ? 'Editar Ingrediente' : 'Nuevo Ingrediente'}
                    </h1>
                    <p className="mt-2 text-gray-600">
                        {ingrediente?.nombre ? 'Actualiza la información del ingrediente' : 'Agrega un nuevo ingrediente a tu inventario'}
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
                    {/* Error Alert */}
                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                            <svg className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h3 className="text-red-800 font-medium text-sm">Error</h3>
                                <p className="text-red-600 text-sm">{error}</p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Grid Layout para mejor organización */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Nombre */}
                            <div className="md:col-span-2">
                                <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Nombre del Ingrediente *
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                                        placeholder="Ej: Tomate cherry, Pollo, Arroz integral..."
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Calorías */}
                            <div>
                                <label htmlFor="calorias" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Calorías (por 100g) *
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        id="calorias"
                                        name="calorias"
                                        value={formData.calorias ?? ''}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                                        placeholder="250"
                                        min="0"
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 text-sm">kcal</span>
                                    </div>
                                </div>
                            </div>

                            {/* Unidad de Medida */}
                            <div>
                                <label htmlFor="unidadMedida" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Unidad de Medida *
                                </label>
                                <input
                                    type="text"
                                    id="unidadMedida"
                                    name="unidadMedida"
                                    value={formData.unidadMedida}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                                    placeholder="Ej: gramos, unidad, taza, cucharada..."
                                    required
                                />
                            </div>

                            {/* Categoría */}
                            <div className="md:col-span-2">
                                <label htmlFor="categoriaId" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Categoría *
                                </label>
                                <div className="relative">
                                    <select
                                        id="categoriaId"
                                        name="categoriaId"
                                        value={formData.categoriaId}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white appearance-none"
                                        required
                                        disabled={isLoading}
                                    >
                                        <option value={0}>
                                            {isLoading ? 'Cargando categorías...' : 'Selecciona una categoría'}
                                        </option>
                                        {categorias.map((categoria) => (
                                            <option key={categoria.id} value={categoria.id}>
                                                {categoria.nombre}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        {isLoading ? (
                                            <svg className="animate-spin h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : (
                                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Fotografía */}
                            <div className="md:col-span-2">
                                <label htmlFor="fotografia" className="block text-sm font-semibold text-gray-700 mb-2">
                                    URL de la Fotografía
                                </label>
                                <div className="relative">
                                    <input
                                        type="url"
                                        id="fotografia"
                                        name="fotografia"
                                        value={formData.fotografia ?? ''}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                                        placeholder="https://ejemplo.com/imagen.jpg"
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Información Nutricional */}
                            <div className="md:col-span-2">
                                <label htmlFor="info_nutricional" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Información Nutricional
                                </label>
                                <textarea
                                    id="info_nutricional"
                                    name="info_nutricional"
                                    value={formData.info_nutricional ?? ''}
                                    onChange={handleChange}
                                    rows={3}
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                                    placeholder="Describe la información nutricional adicional (proteínas, grasas, carbohidratos, vitaminas, etc.)"
                                />
                            </div>
                        </div>

                        {/* Checkboxes Section */}
                        <div className="border-t border-gray-200 pt-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Propiedades Adicionales</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Fit */}
                                <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                                    <input
                                        type="checkbox"
                                        id="fit"
                                        name="fit"
                                        checked={formData.fit}
                                        onChange={handleChange}
                                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <div>
                                        <label htmlFor="fit" className="text-sm font-medium text-gray-900 cursor-pointer">
                                            Apto para dieta
                                        </label>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Marca si este ingrediente es adecuado para dietas especiales
                                        </p>
                                    </div>
                                </div>

                                {/* Disponible Bogotá */}
                                <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                                    <input
                                        type="checkbox"
                                        id="disponibleBogota"
                                        name="disponibleBogota"
                                        checked={formData.disponibleBogota}
                                        onChange={handleChange}
                                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <div>
                                        <label htmlFor="disponibleBogota" className="text-sm font-medium text-gray-900 cursor-pointer">
                                            Disponible en Bogotá
                                        </label>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Marca si este ingrediente está disponible en Bogotá
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
                                disabled={isSubmitting}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Guardando...
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center">
                                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {ingrediente?.nombre ? 'Actualizar' : 'Guardar'} Ingrediente
                                    </div>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Preview de la imagen si hay URL */}
                {formData.fotografia && (
                    <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Vista previa de la imagen</h3>
                        <div className="flex justify-center">
                            <img
                                src={formData.fotografia}
                                alt="Vista previa"
                                className="max-w-xs max-h-48 object-cover rounded-lg shadow-md"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}