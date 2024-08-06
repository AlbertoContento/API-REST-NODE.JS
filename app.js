import 'dotenv/config'; // Importamos las variables de entorno desde el archivo .env
import express from 'express'; // Importamos el módulo express para manejar el servidor web
import morgan from 'morgan'; // Importamos morgan para el registro de solicitudes HTTP
import mongoose from 'mongoose'; // Importamos mongoose para manejar la base de datos MongoDB
import usersRoutes from './routes/usersRoutes.js'; // Importamos las rutas para manejar usuarios
import ticketRoutes from './routes/ticketRoutes.js'; // Importamos las rutas para manejar tickets

const app = express(); // Creamos una instancia de la aplicación Express

// Determinamos la URL de la base de datos dependiendo del entorno
const DB_URL = process.env.NODE_ENV === 'test'
  ? 'mongodb://localhost:27017/ticketing-db-test' // URL para la base de datos de prueba
  : process.env.DB_URL || 'mongodb://localhost:27017/ticketing-db'; // URL para la base de datos principal

// Conectamos a la base de datos MongoDB usando mongoose
mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Connected to DB: ${DB_URL}`)) // Si la conexión es exitosa, mostramos un mensaje
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err); // Si ocurre un error, lo mostramos en consola
    process.exit(1); // Terminamos el proceso con un código de error 1
  });

app.use(morgan("dev")); // Usamos morgan para registrar las solicitudes HTTP en modo de desarrollo
app.use(express.json()); // Usamos express.json() para parsear los cuerpos de las solicitudes en formato JSON

// Ruta de prueba para verificar que el servidor está funcionando
app.get('/ping', (req, res) => {
  res.status(200).send("pong"); // Responde con "pong" cuando se accede a /ping
});

// Configuramos las rutas para los usuarios y tickets
app.use("/api/users", usersRoutes); // Las rutas para manejar usuarios se gestionan en /api/users
app.use("/api/tickets", ticketRoutes); // Las rutas para manejar tickets se gestionan en /api/tickets

// Middleware para manejar errores de sintaxis en el JSON del cuerpo de la solicitud
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Error de sintaxis en JSON:', err); // Mostramos el error de sintaxis en la consola
    return res.status(400).send({ status: 400, message: 'JSON inválido' }); // Respondemos con un mensaje de error 400
  }
  next(); // Pasamos el control al siguiente middleware si el error no es un error de sintaxis
});

export default app; // Exportamos la instancia de la aplicación para usarla en otros archivos
