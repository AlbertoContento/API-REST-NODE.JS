//importamos la libreria instalada dotenv
import 'dotenv/config';
//importamos express de la biblioteca express
import express from 'express';
//importamos libreria morgan
import morgan from 'morgan';
//importamos mongoose para conectarnos a nuestra BD
import mongoose from 'mongoose';
//importamos la routes
import usersRoutes from './routes/usersRoutes';
//Creamos la app
const app = express();
//Le pasamos la url para que se conecte si estamos en test a ticketing-db-test y si no que mire si hay una BD en las variables de entorno y sino que se conecte a la local ticketing-db
const DB_URL = process.env.NODE_ENV === 'test'
  ? 'mongodb://localhost:27017/ticketing-db-test'
  : process.env.DB_URL || "mongodb://localhost:27017/ticketing-db";
//conectamos la base de datos a nuestra url mediante una promesa
mongoose
  .connect(DB_URL)
  .then(() => console.log(`Connected to BD: ${DB_URL}`))
  .catch((err) => console.error("FAiled to connect to MongoDB", err));
//MIDELWARE para logearse
app.use(morgan("dev"));//le decimos donde queremos que se ejecute(dev)
//MIDELWARE para que los datos del usuario se conviertan en datos que el servidor pueda leer
app.use(express.json());
//Creamos nuestra primera ruta y los verbos utilizados son 4 get(leer datos), post(enviar datos), put(actualizar datos) y delete(borrar)
app.get('/ping', (req, res) => {
  res.send("pong");
});
//IMPORTAMOS LAS ROUTAS para login y signup
app.use("/api/users", usersRoutes);
//exportamos la app
export default app;