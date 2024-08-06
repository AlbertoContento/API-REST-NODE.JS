// Importamos base de datos mongoose
import mongoose from 'mongoose';
// Importamos la versión 4 de uuid para generar id
import { v4 as uuidv4 } from 'uuid';
// Importamos bcrypt para codificar los passwords
import bcrypt from 'bcrypt';

// Creamos el schema de nuestra base de datos
const userSchema = new mongoose.Schema({
  // type el tipo de dato, y required: que si no está ese dato no se puede guardar
  // para evitar ataques, el id lo vamos a poner nosotros en vez de automático
  id: { type: String, default: uuidv4, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true }, // único en minúsculas y trim (sin espacios)
  password: { type: String, required: true, minlength: 8 }, // Corregido minlength
  role: { type: String, enum: ["user", "admin"], default: "user" },
}, {
  toJSON: {
    transform: function (doc, ret) {
      delete ret.__v;
      delete ret._id;
      delete ret.password;
    },
    virtuals: true, // con esto incluimos los campos virtuales
  }
});

// Con esto, antes de que se guarde en nuestra base de datos, la encriptamos para que no se muestre en nuestra BD
userSchema.pre("save", async function (next) {
  // Si el campo password no ha sido modificado, continuar
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10); // Generamos un salt para que en nuestra base de datos no esté la contraseña sino que haya un hash
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err); // Manejo de errores en la encriptación
  }
});

// Con esto le decimos qué campos están indexados
userSchema.index({ id: 1, email: 1 });

// Creamos el objeto User
const User = mongoose.model("User", userSchema);

// Exportamos el User
export default User;