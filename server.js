//importamos la libreria instalada dotenv
import 'dotenv/config';
//importamos la app
import app from './app.js';
//Creamos un puerto y como no sabemos el puerto que vamos a utilizar vamos a hacer que si la variable de entorno PORT tiene algo que use ese puerto y si no que use el 3000
const port = process.env.PORT || 3000;

//Iniciamos la escucha del servidor
const server = app.listen(port, () => {
  console.log(`Environment: ${process.env.NODE_ENV}`);//para que esto funcione tenemos que instalar cross-env
  console.log(`Server is running on port http://localhost:${port}`)
});
//vamos a exportar el server para cuando hagamos test
export default server;