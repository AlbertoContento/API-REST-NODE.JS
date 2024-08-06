import jwt from 'jsonwebtoken'; // Importamos el módulo jsonwebtoken para trabajar con JWT

// Exportamos la función de middleware de autenticación
export default function auth(req, res, next) {
  // Obtenemos el encabezado de autorización del request
  const authHeader = req.header("Authorization");
  
  // Si no se proporciona el encabezado de autorización, respondemos con un error 401 (No autorizado)
  if (!authHeader) {
    console.log('No se proporcionó el encabezado de autorización');
    return res.status(401).send('Acceso denegado. No se proporcionó un token');
  }

  // Extraemos el token del encabezado de autorización, eliminando el prefijo "Bearer "
  const token = authHeader.replace("Bearer ", "");
  
  // Si no hay token después de la extracción, respondemos con un error 401 (No autorizado)
  if (!token) {
    console.log('No se proporcionó un token después de reemplazar "Bearer "');
    return res.status(401).send('Acceso denegado. No se proporcionó un token');
  }
  
  console.log('Token recibido:', token);
  
  try {
    // Verificamos el token usando la clave secreta definida en las variables de entorno
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token verificado:', verified);
    
    // Si el token es válido, lo asignamos al objeto `req.user` para usarlo en las rutas siguientes
    req.user = verified;
    
    // Llamamos al siguiente middleware o ruta
    next();
  } catch (error) {
    // Si hay un error en la verificación del token, respondemos con un error 400 (Solicitud incorrecta)
    console.log('Error al verificar el token:', error);
    res.status(400).send('Token inválido');
  }
}
