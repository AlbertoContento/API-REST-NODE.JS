//Importamos base de datos mongoose
import mongoose from 'mongoose';
//importamos la version 4 de uuid para generar id
import { v4 as uuidv4 } from 'uuid';
//Creamos el schema de nuestra base de datos
const  ticketSchema = new mongoose.Schema({
  //type el tipo de dato, y required: que si no esta ese dato no se puede guardar
  //para evitar ataques el id lo vamos a poner nosotros en vez de  automatico
  id : {type: String, default: uuidv4, required: true, unique: true},
  user : {type : String, required: true},
  createdAt: {type: Date, default: Date.now},
  status: { type: String, enum: ['open', 'in-progress', 'closed'], default: 'open'},
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low'},
  title: { type: String, required: true}
}, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;//Estos dos campos no queremos devolverlos
      delete ret._id;
    },
    virtuals: true,//con esto incluimos los campos virtuales
  }
});
//con esto le decimos que campos estan indexados
ticketSchema.index({ id: 1, user: 1});
//Creamos el objeto User
const Ticket = mongoose.model("Ticket", ticketSchema);
//Exportamos el User
export default Ticket;