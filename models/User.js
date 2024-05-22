//Importamos base de datos mongoose
import mongoose from 'mongoose';
//importamos la version 4 de uuid para generar id
import {v4 as uuidv4 } from 'uuid';
//importamos bcrypt para codificar los password
import bcrypt from 'bcrypt';
//Creamos el schema de nuestra base de datos
const  userSchema = new mongoose.Schema({
  //type el tipo de dato, y required: que si no esta ese dato no se puede guardar
  //para evitar ataques el id lo vamos a poner nosotros en vez de  automatico
  id : {type: String, default: uuidv4, required: true, unique: true},
  name : {type: String, required: true},
  email : {type: String, required: true, unique: true, lowercase: true, trim: true},//unico en minusculas y trim(sin espacios)
  password : {type: String, required: true, minlenght: 8},
  role : {type: String, enum: ["user", "admin"], default: "user"}
}, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
      delete ret._id;
      delete ret.password;
    },
    virtuals: true,//con esto incluimos los campos virtuales
  }
});
//con esto antes de que se salve en nuestra base de datos la encriptamos para q ue no se muestre en nuestra BD
userSchema.pre("save", async function (next) {
  //si el campo password ha sido modificado next
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);//generamos un token para que en nuestra base de datos no este la contraseña sino que haya un hash
  this.password = await bcrypt.hash(this.password, salt);
})
//con esto le decimos que campos estan indexados
userSchema.index({ id: 1, email: 1});
//Creamos el objeto User
const User = mongoose.model("User", userSchema);
//Exportamos el User
export default User;