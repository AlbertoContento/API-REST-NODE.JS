//Guardamos las routes de los Users
//importamos el framework express y bcrypt y jwt y el modelo usuario
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
//Accedemos a express.Router()
const router = express.Router();
//POST API/USERS/SIGNUP
router.post('/signup', async (req, res) => {
  //comprobamos que el usuario no este resgistrado
  let user;
  user = await User.findOne({ email: req.body.email});//buscamos el email en nuestra BD
  //si el user esta registrado ->error y mensaje
  if (user) return res.status(400).send('User already registered.');
  //Si no existe cojemos los datos de registro y creamos un usuario nuevo
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });
  //manejamos los errores
  try {
    await user.save();//guardamos los datos del user
    //creamos el token
    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      //le pasamos la palabra clave 
      }, 
      process.env.JWT_SECRET, 
      {
        expiresIn: '1h',//el token para que el usuario realice peticiones al servidor sera de 1 hora
      });
    //cuando todo este correcto le mandamos la respuesta que contiene authorization, el token y le mandame mensaje con los datos almacenados en la BD
    res
      .status(201)
      .header('Authorization', token)
      .json({
        user: {
          user: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
  } catch (error) {
    res.status(500).send('Something went wrong');//500 error de servidor
  }
});
//POST API/USERS/LOGIN
router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email});//buscamos el email en BD
  //Si el email no existe 
  if (!user) return res.status(400).send("Invalid email or Password.");
  //VAlidamos la contraseña
  const validPassword = await bcrypt.compare(req.body.password, user.password);//aqui comparamos la contraseña guardada en BD y la contraseña que nos introduce el user
  //si la contraseña no es valida
  if (!validPassword) return res.status(400).send("Invalid email or Password");
  //creamos el token
  const token = jwt.sign({
    _id: user._id,
    role: user.role,
    //le pasamos la palabra clave 
  }, process.env.JWT_SECRET, {
    expiresIn: '1h',//el token para que el usuario realice peticiones al servidor sera de 1 hora
  });
  //Cuando el user este bien logeado le devolvemos el token
  res.status(200).header("Authorization", token).json({token: token});
});
//exportamos el objeto router
export default router;