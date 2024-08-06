//Guardamos las routes de los tickets
//importamos express y ticket.js
import express from 'express';
import Ticket from '../models/Ticket.js';
import auth from '../middlewares/auth.js';
import admin from '../middlewares/admin.js';
//Accedemos a express.Router()
const router = express.Router();
//Creamos un get que nos devuelve todos los tickets del sistema-->GET/api/ticket
router.get('/', async (req, res) => {
  try {//busca todos los tickets y los muestra
    const tickets = await Ticket.find({});
    res.status(200).json({ tickets: tickets});
  } catch (err) {
    res.status(500).send({ message: "Server Error" + err.message });
  }
});

//Creamos un post para crear una nueva ruta-->POST /api/ticket
router.post('/', auth, async (req, res) => {
  //Creamos un nuevo ticket
  const ticket = new Ticket({
    user: req.user._id,
    status: req.body.status,
    priority: req.body.priority,
    title: req.body.title,
    description: req.body.description,
  });
  try {//guardamos con mongoose el ticket
    const newTicket = await ticket.save();
    res.status(201).json({ ticket: newTicket });
  } catch (err) {
    res.status(500).json({ message: "Server Error" + err.message });
  }
});

//Creamos un get que nos devuelve el ticket segun el id.(: indica que es dinamico, puede cambiar)--> GET api/tickets/:id
router.get('/:id', async (req, res) => {
  try {//buacamos ticket por parametro id
    const ticket = await Ticket.findOne({ id: req.params.id });
    if (!ticket) {//si no encuentra el ticket
      return res.status(404).json({ message: "Ticket not found"});
    }
    res.status(200).json({ ticket: ticket});
  } catch (err) {
    res.status(500).json({ message: "Server Error" + err.message });
  }
});
//Creamos un put a un id para actualizar un ticket en cuestion-->PUT /api/tickets/:id
router.put('/:id', auth, async (req, res) => {
  const updates = req.body;//guardamos el cuerpo de la peticion
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json({ ticket: ticket });
  } catch (err) {
    res.status(500).json({ message: "Server Error" + err.message });
  }
});
//Creamos un delete que por el id nos permitira borrar ticket del sistema-->DELETE /api/tickets/:id
router.delete('/:id', [auth,admin], async (req, res) => {
try {
  const ticket = await Ticket.findByIdAndDelete(req.params.id);
  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found"});
  }
  res.status(200).json({ ticket: ticket});
} catch (err) {
  res.status(500).json({ message: "Server Error" + err.message })
}
});
export default router;