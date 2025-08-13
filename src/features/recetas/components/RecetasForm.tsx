'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchTiposComida, fetchMetodosPreparacion, fetchIngredientes, fetchCategorias, createIngrediente } from '@/features/recetas/domain/usecases';
import { Receta, TipoComida, MetodoPreparacion, FormData, SelectedIngredient, NewIngredientData } from '@/features/recetas/domain/types';
import { Ingrediente, CategoriaIngrediente } from '@/features/ingredientes/domain/types';
import { RecetasFormProps } from '@/features/recetas/domain/types';

export function RecetasForm({ initialData, onSubmit, isSubmitting }: RecetasFormProps) {
  const [formData, setFormData] = useState<FormData>({
    nombre: initialData?.nombre ?? '',
    tipoComidaId: initialData?.tipoComidaId ?? 1,
    fit: initialData?.fit ?? false,
    instrucciones: initialData?.instrucciones ?? '',
    tiempoPreparacion: initialData?.tiempoPreparacion ?? 0,
    disponibleBogota: initialData?.disponibleBogota ?? true,
    metodoId: initialData?.metodoId ?? null,
  });
  const [selectedIngredients, setSelectedIngredients] = useState<SelectedIngredient[]>([]);
  const [currentIngredientId, setCurrentIngredientId] = useState<number>(0);
  const [currentCantidad, setCurrentCantidad] = useState<number>(0);
  const [currentUnidad, setCurrentUnidad] = useState<string>('');
  const [tiposComida, setTiposComida] = useState<TipoComida[]>([]);
  const [metodos, setMetodos] = useState<MetodoPreparacion[]>([]);
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [categorias, setCategorias] = useState<CategoriaIngrediente[]>([]);
  const [loadingLists, setLoadingLists] = useState(true);
  const [showNewIngredientModal, setShowNewIngredientModal] = useState(false);
  const [newIngredientData, setNewIngredientData] = useState<NewIngredientData>({
    nombre: '',
    categoriaId: 0,
    unidadMedida: '',
    info_nutricional: '',
    calorias: null,
    fit: false,
    disponibleBogota: true,
    fotografia: null,
  });

  useEffect(() => {
    const loadLists = async () => {
      try {
        setLoadingLists(true);
        const [tipos, metodosList, ingreds, cats] = await Promise.all([
          fetchTiposComida(),
          fetchMetodosPreparacion(),
          fetchIngredientes(),
          fetchCategorias(),
        ]);
        setTiposComida(tipos);
        setMetodos(metodosList);
        setIngredientes(ingreds);
        setCategorias(cats);
        if (cats.length > 0 && newIngredientData.categoriaId === 0) {
          setNewIngredientData(prev => ({ ...prev, categoriaId: cats[0].categoriaId }));
        }
      } catch (err) {
        toast.error('Error al cargar listas');
      } finally {
        setLoadingLists(false);
      }
    };

    loadLists();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked
        : type === 'number' 
          ? Number(value)
          : value || null,
    }));
  };

  const handleAddIngredient = () => {
    if (currentIngredientId === 0 || currentCantidad <= 0 || !currentUnidad.trim()) {
      toast.error('Completa los campos del ingrediente');
      return;
    }

    const selectedIng = ingredientes.find(ing => ing.ingrediente_id === currentIngredientId);
    if (selectedIng) {
      setSelectedIngredients(prev => [
        ...prev,
        {
          ingrediente_id: currentIngredientId,
          cantidad: currentCantidad,
          unidad: currentUnidad,
          nombre: selectedIng.nombre,
        },
      ]);
      setCurrentIngredientId(0);
      setCurrentCantidad(0);
      setCurrentUnidad('');
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setSelectedIngredients(prev => prev.filter((_, i) => i !== index));
  };

  const handleNewIngredientChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setNewIngredientData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked
        : type === 'number' 
          ? Number(value)
          : value || null,
    }));
  };

  const handleCreateNewIngredient = async () => {
    if (!newIngredientData.nombre.trim()) {
      toast.error('El nombre del ingrediente es obligatorio');
      return;
    }
    if (newIngredientData.categoriaId === 0) {
      toast.error('Selecciona una categoría para el ingrediente');
      return;
    }
    if (!newIngredientData.unidadMedida.trim()) {
      toast.error('La unidad de medida es obligatoria');
      return;
    }

    const ingredientPayload: Omit<Ingrediente, 'ingrediente_id'> = {
      nombre: newIngredientData.nombre,
      categoriaId: newIngredientData.categoriaId,
      unidadMedida: newIngredientData.unidadMedida,
      fit: newIngredientData.fit,
      disponibleBogota: newIngredientData.disponibleBogota,
      fotografia: newIngredientData.fotografia,
      info_nutricional: newIngredientData.info_nutricional,
      calorias: newIngredientData.calorias,
    };

    try {
      const newIng = await createIngrediente(ingredientPayload);
      setIngredientes(prev => [...prev, newIng]);
      setShowNewIngredientModal(false);
      setNewIngredientData({
        nombre: '',
        categoriaId: categorias.length > 0 ? categorias[0].categoriaId : 0,
        unidadMedida: '',
        info_nutricional: '',
        calorias: null,
        fit: false,
        disponibleBogota: true,
        fotografia: null,
      });
      toast.success('Ingrediente creado exitosamente');
    } catch (err) {
      toast.error('Error al crear ingrediente');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre.trim()) {
      toast.error('El nombre es obligatorio');
      return;
    }
    try {
      await onSubmit(formData, selectedIngredients);
      toast.success('Receta guardada exitosamente');
    } catch (err: any) {
      toast.error(`Error al procesar la receta: ${err.message}`);
    }
  };

  if (loadingLists) {
    return <div>Cargando listas...</div>;
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre */}
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre de la receta *
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingresa el nombre de la receta"
          />
        </div>

        {/* Tipo de Comida */}
        <div>
          <label htmlFor="tipoComidaId" className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Comida
          </label>
          <select
            id="tipoComidaId"
            name="tipoComidaId"
            value={formData.tipoComidaId}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {tiposComida.map(tipo => (
              <option key={tipo.tipoComidaId} value={tipo.tipoComidaId}>
                {tipo.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Método de Preparación */}
        <div>
          <label htmlFor="metodoId" className="block text-sm font-medium text-gray-700 mb-2">
            Método de Preparación
          </label>
          <select
            id="metodoId"
            name="metodoId"
            value={formData.metodoId || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecciona un método</option>
            {metodos.map(metodo => (
              <option key={metodo.metodoId} value={metodo.metodoId}>
                {metodo.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Tiempo de Preparación */}
        <div>
          <label htmlFor="tiempoPreparacion" className="block text-sm font-medium text-gray-700 mb-2">
            Tiempo de Preparación (minutos)
          </label>
          <input
            type="number"
            id="tiempoPreparacion"
            name="tiempoPreparacion"
            value={formData.tiempoPreparacion}
            onChange={handleInputChange}
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tiempo en minutos"
          />
        </div>

        {/* Fit */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="fit"
            name="fit"
            checked={formData.fit}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="fit" className="ml-2 block text-sm text-gray-700">
            ¿Es una receta fit/saludable?
          </label>
        </div>

        {/* Disponible en Bogotá */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="disponibleBogota"
            name="disponibleBogota"
            checked={formData.disponibleBogota}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="disponibleBogota" className="ml-2 block text-sm text-gray-700">
            ¿Disponible en Bogotá?
          </label>
        </div>

        {/* Instrucciones */}
        <div>
          <label htmlFor="instrucciones" className="block text-sm font-medium text-gray-700 mb-2">
            Instrucciones
          </label>
          <textarea
            id="instrucciones"
            name="instrucciones"
            value={formData.instrucciones}
            onChange={handleInputChange}
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe paso a paso cómo preparar la receta..."
          />
        </div>

        {/* Ingredientes */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Ingredientes</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="currentIngredientId" className="block text-sm font-medium text-gray-700 mb-2">
                  Ingrediente
                </label>
                <select
                  id="currentIngredientId"
                  value={currentIngredientId}
                  onChange={(e) => setCurrentIngredientId(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="0">Selecciona un ingrediente</option>
                  {ingredientes.map(ing => (
                    <option key={ing.ingrediente_id} value={ing.ingrediente_id}>
                      {ing.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="currentCantidad" className="block text-sm font-medium text-gray-700 mb-2">
                  Cantidad
                </label>
                <input
                  type="number"
                  id="currentCantidad"
                  value={currentCantidad}
                  onChange={(e) => setCurrentCantidad(Number(e.target.value))}
                  min="0"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="currentUnidad" className="block text-sm font-medium text-gray-700 mb-2">
                  Unidad
                </label>
                <input
                  type="text"
                  id="currentUnidad"
                  value={currentUnidad}
                  onChange={(e) => setCurrentUnidad(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleAddIngredient}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Agregar Ingrediente
            </button>
            <button
              type="button"
              onClick={() => setShowNewIngredientModal(true)}
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Agregar Nuevo Ingrediente
            </button>

            {/* Lista de ingredientes seleccionados */}
            {selectedIngredients.length > 0 && (
              <ul className="mt-4 space-y-2">
                {selectedIngredients.map((ing, index) => (
                  <li key={index} className="flex justify-between items-center border p-2 rounded">
                    <span>{ing.nombre} - {ing.cantidad} {ing.unidad}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Modal para nuevo ingrediente */}
        {showNewIngredientModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Nuevo Ingrediente</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="newNombre" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="newNombre"
                    name="nombre"
                    value={newIngredientData.nombre}
                    onChange={handleNewIngredientChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="newCategoriaId" className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría *
                  </label>
                  <select
                    id="newCategoriaId"
                    name="categoriaId"
                    value={newIngredientData.categoriaId}
                    onChange={handleNewIngredientChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="0">Selecciona una categoría</option>
                    {categorias.map(cat => (
                      <option key={cat.categoriaId} value={cat.categoriaId}>
                        {cat.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="newUnidadMedida" className="block text-sm font-medium text-gray-700 mb-2">
                    Unidad de Medida *
                  </label>
                  <input
                    type="text"
                    id="newUnidadMedida"
                    name="unidadMedida"
                    value={newIngredientData.unidadMedida}
                    onChange={handleNewIngredientChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Ej: gramos, mililitros, unidad"
                  />
                </div>
                <div>
                  <label htmlFor="newCalorias" className="block text-sm font-medium text-gray-700 mb-2">
                    Calorías
                  </label>
                  <input
                    type="text"
                    id="newCalorias"
                    name="calorias"
                    value={newIngredientData.calorias || ''}
                    onChange={handleNewIngredientChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="newFit"
                    name="fit"
                    checked={newIngredientData.fit}
                    onChange={handleNewIngredientChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="newFit" className="ml-2 block text-sm text-gray-700">
                    Fit
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="newDisponibleBogota"
                    name="disponibleBogota"
                    checked={newIngredientData.disponibleBogota}
                    onChange={handleNewIngredientChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="newDisponibleBogota" className="ml-2 block text-sm text-gray-700">
                    Disponible en Bogotá
                  </label>
                </div>
                <div>
                  <label htmlFor="newFotografia" className="block text-sm font-medium text-gray-700 mb-2">
                    Fotografía (URL)
                  </label>
                  <input
                    type="text"
                    id="newFotografia"
                    name="fotografia"
                    value={newIngredientData.fotografia || ''}
                    onChange={handleNewIngredientChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowNewIngredientModal(false)}
                    className="px-4 py-2 border text-gray-700 rounded"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleCreateNewIngredient}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Crear
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Botones */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
            disabled={isSubmitting}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Guardando...' : 'Guardar Receta'}
          </button>
        </div>
      </form>
    </div>
  );
}