import express from 'express'; // Importamos el módulo express
import bcrypt from 'bcrypt'; // Importamos bcrypt para manejar la encriptación de contraseñas
import jwt from 'jsonwebtoken'; // Importamos jsonwebtoken para generar y verificar tokens
import User from '../models/user.js'; // Importamos el modelo User

const router = express.Router(); // Creamos una instancia de Router de Express

// Ruta POST para registrar un nuevo usuario
router.post('/signup', async (req, res) => {
  try {
    // Verificamos si el usuario ya está registrado buscando por su email
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    // Si el usuario no existe, creamos un nuevo usuario con los datos del request
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role || 'user', // Si no se proporciona un rol, se asigna 'user' por defecto
    });

    // Guardamos el nuevo usuario en la base de datos
    await user.save();

    // Generamos un token JWT para el usuario
    const token = jwt.sign(
      {
        _id: user._id, // ID del usuario
        role: user.role, // Rol del usuario
      },
      process.env.JWT_SECRET, // Clave secreta para firmar el token (debe estar en las variables de entorno)
      {
        expiresIn: '1h', // El token expirará en 1 hora
      }
    );

    // Respondemos con el nuevo usuario y el token en los headers
    res.status(201).header('Authorization', token).json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    // Si ocurre un error, respondemos con un mensaje de error 500 (Error del servidor)
    res.status(500).send("Something went wrong: " + error.message);
  }
});

// Ruta POST para iniciar sesión-->POST API/USERS/LOGIN
router.post('/login', async (req, res) => {
  try {
    // Buscamos el usuario por su email
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or Password.");

    // Comparamos la contraseña proporcionada con la almacenada en la base de datos
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Invalid email or Password.");

    // Generamos un token JWT para el usuario
    const token = jwt.sign(
      {
        _id: user._id, // ID del usuario
        role: user.role, // Rol del usuario
      },
      process.env.JWT_SECRET, // Clave secreta para firmar el token (debe estar en las variables de entorno)
      {
        expiresIn: '1h', // El token expirará en 1 hora
      }
    );

    // Respondemos con el token en los headers
    res.status(200).header('Authorization', token).json({ token });
  } catch (error) {
    // Si ocurre un error, respondemos con un mensaje de error 500 (Error del servidor)
    res.status(500).send("Something went wrong: " + error.message);
  }
});

export default router; // Exportamos el router para usarlo en otros archivos
