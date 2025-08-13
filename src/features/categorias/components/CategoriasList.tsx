'use client';
import { useCategorias } from '../hooks/useCategorias';
import { CategoriaCard } from './CategoriasCard';
import Link from 'next/link';
import { Loader } from 'rsuite';
import { useState } from 'react';

export function CategoriasList() {
    const { categorias, loading, error, eliminarCategoria, recargarCategorias } = useCategorias();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isAddingCategoria, setIsAddingCategoria] = useState(false);

    const handleRecargar = async () => {
        setIsRefreshing(true);
        await recargarCategorias();
        setTimeout(() => setIsRefreshing(false), 500);
    };

    const handleNuevaCategoria = () => {
        setIsAddingCategoria(true);
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
                <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center space-y-4">
                    <Loader size="lg" />
                    <p className="text-gray-600 text-lg font-medium">Cargando categorías...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 flex justify-center items-center">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md w-full">
                    <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                            <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-red-800 font-semibold">Error al cargar</h3>
                            <p className="text-red-600 text-sm">{error}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 space-y-4 sm:space-y-0">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Categorías
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Gestiona todas tus categorías de ingredientes
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                            <button
                                onClick={handleRecargar}
                                disabled={isRefreshing}
                                className="flex items-center justify-center px-4 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
                            >
                                {isRefreshing ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Actualizando...
                                    </>
                                ) : (
                                    <>
                                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Actualizar
                                    </>
                                )}
                            </button>
                            <Link
                                href="/categorias/new"
                                onClick={handleNuevaCategoria}
                                className="flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg min-w-[160px]"
                            >
                                {isAddingCategoria ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Cargando...
                                    </>
                                ) : (
                                    <>
                                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Nueva Categoría
                                    </>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {categorias.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay categorías</h3>
                            <p className="text-gray-600 mb-6">Comienza agregando tu primera categoría para organizar tus ingredientes.</p>
                            <Link
                                href="/categorias/new"
                                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                            >
                                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Agregar Categoría
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {categorias.map((categoria) => (
                            <div
                                key={categoria.categoriaId}
                                className="transform transition-all duration-300 hover:scale-105"
                            >
                                <CategoriaCard
                                    categoria={categoria}
                                    onDelete={() => eliminarCategoria(categoria.categoriaId)}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .grid > div {
                    animation: fadeInUp 0.6s ease-out forwards;
                }
                
                .grid > div:nth-child(1) { animation-delay: 0ms; }
                .grid > div:nth-child(2) { animation-delay: 50ms; }
                .grid > div:nth-child(3) { animation-delay: 100ms; }
                .grid > div:nth-child(4) { animation-delay: 150ms; }
                .grid > div:nth-child(5) { animation-delay: 200ms; }
                .grid > div:nth-child(6) { animation-delay: 250ms; }
                .grid > div:nth-child(7) { animation-delay: 300ms; }
                .grid > div:nth-child(8) { animation-delay: 350ms; }
                .grid > div:nth-child(9) { animation-delay: 400ms; }
                .grid > div:nth-child(10) { animation-delay: 450ms; }
                .grid > div:nth-child(11) { animation-delay: 500ms; }
                .grid > div:nth-child(12) { animation-delay: 550ms; }
            `}</style>
        </div>
    );
}