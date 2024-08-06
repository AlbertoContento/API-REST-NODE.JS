// Importamos la librería instalada dotenv
import 'dotenv/config';
// Importamos express de la biblioteca express
import express from 'express';
// Importamos librería morgan
import morgan from 'morgan';
// Importamos mongoose para conectarnos a nuestra BD
import mongoose from 'mongoose';
// Importamos las routes
import usersRoutes from './routes/usersRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';

// Creamos la app
const app = express();

// URL para conexión a la base de datos
const DB_URL = process.env.NODE_ENV === 'test'
  ? 'mongodb://localhost:27017/ticketing-db-test'
  : process.env.DB_URL || "mongodb://localhost:27017/ticketing-db";

// Conectamos la base de datos a nuestra URL mediante una promesa
mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Connected to BD: ${DB_URL}`))
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Termina el proceso si la conexión falla
  });

// Middleware para loguearse
app.use(morgan("dev")); // Le decimos donde queremos que se ejecute (dev)

// Middleware para que los datos del usuario se conviertan en datos que el servidor pueda leer
app.use(express.json());

// Creamos nuestra primera ruta y los verbos utilizados son 4: get (leer datos), post (enviar datos), put (actualizar datos) y delete (borrar)
app.get('/ping', (req, res) => {
  res.status(200).send("pong");
});

// IMPORTAMOS LAS ROUTAS para login y signup
app.use("/api/users", usersRoutes);
// IMPORTAMOS LAS ROUTAS para ticket
app.use("/api/tickets", ticketRoutes);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Error de sintaxis en JSON:', err);
    return res.status(400).send({ status: 400, message: 'JSON inválido' });
  }
  next();
});

// Exportamos la app
export default app;
