import 'dotenv/config'; // Importamos el módulo dotenv para cargar variables de entorno desde el archivo .env
import app from './app.js'; // Importamos la instancia de la aplicación Express desde el archivo app.js

const port = process.env.PORT || 3000; // Definimos el puerto en el que el servidor escuchará. Se usa el valor del puerto especificado en las variables de entorno o el puerto 3000 por defecto

// Iniciamos el servidor en el puerto especificado
const server = app.listen(port, () => {
  // Cuando el servidor se inicia correctamente, se ejecuta esta función
  console.log(`Environment: ${process.env.NODE_ENV}`); // Mostramos el entorno en el que se está ejecutando la aplicación (desarrollo, prueba, producción, etc.)
  console.log(`Server is running on port http://localhost:${port}`); // Mostramos la URL en la que el servidor está corriendo
});

export default server; // Exportamos la instancia del servidor para que pueda ser utilizada en otros archivos, si es necesario
