export default function paginate(model) {
  return async (req, res, next) => {
    // Obtiene el número de página de la query de la solicitud, si no está presente, usa la página 1 por defecto
    const page = parseInt(req.query.page) || 1;

    // Obtiene el tamaño de la página de la query de la solicitud, si no está presente, usa un tamaño de página de 10 por defecto
    const pageSize = parseInt(req.query.pageSize) || 10;

    // Calcula el número de registros a omitir según el número de página y el tamaño de la página
    const skip = (page - 1) * pageSize;

    // Inicializa un objeto para almacenar los resultados de la paginación
    const results = {};

    try {
      // Cuenta el número total de documentos en el modelo
      results.total = await model.countDocuments().exec();

      // Encuentra los documentos según el filtro en la solicitud, omite y limita los resultados según la paginación
      results.results = await model
        .find(req.filter)
        .skip(skip)
        .limit(pageSize)
        .exec();

      // Calcula el número total de páginas
      results.pages = Math.ceil(results.total / pageSize);

      // Establece el número de la página actual
      results.currentPage = page;

      // Añade los resultados de la paginación al objeto de la solicitud para que esté disponible en los siguientes middlewares o manejadores de rutas
      req.paginatedResults = results;

      // Llama a la siguiente función middleware en la pila
      next();
    } catch (err) {
      // En caso de error, responde con un código de estado 500 y un mensaje de error
      res.status(500).json({ message: err.message });
    }
  };
}
