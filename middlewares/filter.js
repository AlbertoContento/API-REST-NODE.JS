// MIDDLEWARE PARA FILTRAR PETICIONES
export default function buildFilter(req, res, next) {
  // Extrae los parámetros 'status', 'priority' y 'search' de la query de la solicitud
  const { status, priority, search } = req.query;

  // Inicializa un objeto de filtro vacío
  let filter = {};

  // Si el parámetro 'status' está presente en la query, lo añade al objeto de filtro
  if (status) {
    filter.status = status;
  }

  // Si el parámetro 'priority' está presente en la query, lo añade al objeto de filtro
  if (priority) {
    filter.priority = priority;
  }

  // Si el parámetro 'search' está presente en la query, añade un filtro de búsqueda al objeto de filtro
  if (search) {
    filter.$or = [//con $or es como or en moongoose
      // Busca en el campo 'title' utilizando una expresión regular que sea insensible a mayúsculas y minúsculas
      { title: { $regex: search, $options: "i" } },
      // Busca en el campo 'description' utilizando una expresión regular que sea insensible a mayúsculas y minúsculas
      { description: { $regex: search, $options: "i" } },
    ];
  }

  // Añade el objeto de filtro al objeto de la solicitud para que esté disponible en los siguientes middlewares o manejadores de rutas
  req.filter = filter;

  // Llama a la siguiente función middleware en la pila
  next();
}