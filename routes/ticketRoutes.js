import express from 'express'; // Importamos el módulo express
import Ticket from '../models/ticket.js'; // Importamos el modelo Ticket
import auth from '../middlewares/auth.js'; // Importamos el middleware de autenticación
import admin from '../middlewares/admin.js'; // Importamos el middleware de autorización de administrador

const router = express.Router(); // Creamos una instancia de Router de Express

// Ruta GET para obtener todos los tickets
router.get('/', async (req, res) => {
  try {
    // Buscamos todos los tickets en la base de datos
    const tickets = await Ticket.find({});
    // Respondemos con los tickets encontrados
    res.status(200).json({ tickets });
  } catch (err) {
    // Si ocurre un error, respondemos con un mensaje de error 500 (Error del servidor)
    res.status(500).send({ message: "Error del servidor: " + err.message });
  }
});

// Ruta POST para crear un nuevo ticket-->POST/api/tickets
router.post('/', auth, async (req, res) => {
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

// Ruta GET para obtener un ticket específico por su ID--> GET api/tickets/:id
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

// Ruta PUT para actualizar un ticket específico por su ID-->PUT /api/tickets/:id
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

// Ruta DELETE para eliminar un ticket específico por su ID-->DELETE /api/tickets/:id
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
