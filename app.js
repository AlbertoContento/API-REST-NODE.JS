//importamos la libreria instalada dotenv
import 'dotenv/config';
//importamos express de la biblioteca express
import express from 'express';
//importamos libreria morgan
import morgan from 'morgan';
//Creamos la app
const app = express();
//MIDELWARE para logearse
app.use(morgan("dev"));//le decimos donde queremos que se ejecute(dev)
//MIDELWARE para que los datos del usuario se conviertan en datos que el servidor pueda leer
app.use(express.json());
//Creamos nuestra primera ruta y los verbos utilizados son 4 get(leer datos), post(enviar datos), put(actualizar datos) y delete(borrar)
app.get('/', (req, res) => {
  res.send("Hello World");
});
//exportamos la app
export default app;