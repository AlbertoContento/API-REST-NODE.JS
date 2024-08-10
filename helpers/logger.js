import winston from 'winston';

const logger = winston.createLogger({
    // Configuramos el nivel de log global
    level: 'info',  // Configura el nivel más bajo a 'info' para capturar todos los mensajes de 'info' y 'error'

    // Definimos el formato de los logs
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple()  // Utiliza simple format para los mensajes en consola
    ),
    level: 'error',
    // Definimos el formato de los logs
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple()  // Utiliza simple format para los mensajes en consola
    ),
    // Configuramos los transportes
    transports: [
        // Guardar los logs de nivel "error" en un archivo llamado "error.log"
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        // Guardar los logs de nivel "info" en un archivo llamado "info.log"
        new winston.transports.File({ filename: 'info.log', level: 'info' }),
        // Imprimir los logs en la consola
        new winston.transports.Console()
    ]
});

export default logger;