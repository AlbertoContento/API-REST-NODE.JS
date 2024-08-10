import Joi from "joi"; // Importamos Joi, una biblioteca para la validación de esquemas de objetos.

const ticketSchema = Joi.object({
    user: Joi.string().required(), // Definimos que el campo "user" debe ser una cadena de texto y es obligatorio.
    title: Joi.string().min(3).required(), // Definimos que el campo "title" debe ser una cadena de texto, con un mínimo de 3 caracteres, y es obligatorio.
    description: Joi.string().min(5).required(), // Definimos que el campo "description" debe ser una cadena de texto, con un mínimo de 5 caracteres, y es obligatorio.
    priority: Joi.string().valid("low", "medium", "high").required(), // Definimos que el campo "priority" debe ser una cadena de texto, con los valores permitidos "low", "medium" o "high", y es obligatorio.
    status: Joi.string().valid("open", "in-progress", "closed"), // Definimos que el campo "status" debe ser una cadena de texto, con los valores permitidos "open", "in-progress" o "closed".
});

export default ticketSchema; // Exportamos el esquema de validación para poder usarlo en otros archivos.
