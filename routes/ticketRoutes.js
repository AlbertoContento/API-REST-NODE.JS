import express from 'express'; // Importamos el módulo express
import Ticket from '../models/ticket.js'; // Importamos el modelo Ticket
import ticketSchema from '../validations/ticketValidation.js';
import auth from '../middlewares/auth.js'; // Importamos el middleware de autenticación
import admin from '../middlewares/admin.js'; // Importamos el middleware de autorización de administrador
import buildFilter from '../middlewares/filter.js';//importamos el middelware de filter
import paginate from "../middlewares/paginate.js";//Importamos el middleware de paginacion

const router = express.Router(); // Creamos una instancia de Router de Express

// Ruta GET para obtener todos los tickets
//GET /api/tickets/
//GET /api/tickets?pageSize=10&page=1
//GET /api/tickets?status=open/priority=high
//GET /api/tickets?search=bug
//Public
router.get('/', buildFilter, paginate(Ticket), async (req, res) => {
  res.status(200).json(req.paginatedResults);
});

//Create a Ticket
//POST /api/tickets/
//Private (only logged in users can create tickets)
//Ticket Schema: user, title, description priority, status
router.post('/', auth, async (req, res) => {
  const { error } = ticketSchema.validateAsync(req.body); 
  // Se realiza la validación de forma asíncrona de los datos del cuerpo de la solicitud (req.body) 
  // usando el esquema de validación 'ticketSchema'. 
  // Si la validación falla, se genera un objeto 'error' que contiene detalles sobre el problema.
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
    // Si hay un error en la validación, se devuelve una respuesta con un estado HTTP 400 (Bad Request).
    // En el cuerpo de la respuesta, se envía un objeto JSON con un mensaje que describe el primer 
    // detalle del error ('error.details[0].message').
  }
  
  // Creamos un nuevo ticket con los datos del request
  const ticket = new Ticket({
    user: req.user._id, // Asignamos el ID del usuario que está autenticado
    status: req.body.status,
    priority: req.body.priority,
    title: req.body.title,
    description: req.body.description,
  });

  try {
    // Guardamos el nuevo ticket en la base de datos
    const newTicket = await ticket.save();
    // Respondemos con el ticket recién creado
    res.status(201).json({ ticket: newTicket });
  } catch (err) {
    // Si ocurre un error, respondemos con un mensaje de error 500 (Error del servidor)
    res.status(500).json({ message: "Error del servidor: " + err.message });
  }
});

//Get a ticket by id
//GEt /api/ticket/:id
//Public
router.get('/:id', async (req, res) => {
  try {
    // Buscamos el ticket en la base de datos por su ID
    const ticket = await Ticket.findOne({ id: req.params.id });
    if (!ticket) {
      // Si no se encuentra el ticket, respondemos con un error 404 (No encontrado)
      return res.status(404).json({ message: "Ticket no encontrado" });
    }
    // Respondemos con el ticket encontrado
    res.status(200).json({ ticket });
  } catch (err) {
    // Si ocurre un error, respondemos con un mensaje de error 500 (Error del servidor)
    res.status(500).json({ message: "Error del servidor: " + err.message });
  }
});

//PUT /api/tickets/:id
//update a ticket by uid
//private(only logged in users can update tickets)
//Ticket Schema: user, title, description, priority, status
router.put('/:id', auth, async (req, res) => {
  // Obtenemos las actualizaciones del request
  const updates = req.body;
  try {
    // Buscamos el ticket por su ID y actualizamos con los datos proporcionados
    const ticket = await Ticket.findOneAndUpdate({ id: req.params.id }, updates, { new: true });
    if (!ticket) {
      // Si no se encuentra el ticket, respondemos con un error 404 (No encontrado)
      return res.status(404).json({ message: "Ticket no encontrado" });
    }
    // Respondemos con el ticket actualizado
    res.status(200).json({ ticket });
  } catch (err) {
    // Si ocurre un error, respondemos con un mensaje de error 500 (Error del servidor)
    res.status(500).json({ message: "Error del servidor: " + err.message });
  }
});

//Delete a ticket by uid
//DELETE /api/tickets/:id
//Private (only ADMIN users, can delete tickets)
router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    // Buscamos el ticket por su ID y lo eliminamos
    const ticket = await Ticket.findOneAndDelete({ id: req.params.id });
    if (!ticket) {
      // Si no se encuentra el ticket, respondemos con un error 404 (No encontrado)
      return res.status(404).json({ message: "Ticket no encontrado" });
    }
    // Respondemos con el ticket eliminado
    res.status(200).json({ ticket });
  } catch (err) {
    // Si ocurre un error, respondemos con un mensaje de error 500 (Error del servidor)
    res.status(500).json({ message: "Error del servidor: " + err.message });
  }
});

export default router; // Exportamos el router para usarlo en otros archivos
