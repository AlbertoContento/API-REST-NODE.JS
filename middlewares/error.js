import logger from '../helpers/logger.js'; // Asegúrate de que la ruta sea correcta

export default function error(err, req, res, next) {
    // Utilizamos el logger para registrar el mensaje del error
    logger.error(`Error: ${err.message}`, { metadata: err });

    // Enviamos una respuesta con el código de estado 500 (Internal Server Error) y un mensaje al cliente
    res.status(500).send("Something failed.");
}
