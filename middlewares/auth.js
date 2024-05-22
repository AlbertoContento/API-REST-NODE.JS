//MIDDLEWARE DE AUTENTICACION 
//imprtamos 
import jwt from 'jsonwebtoken';
//exportamos la funcion auth
export default function auth(req, res, next) {//next es una funcion de callback que permite pasar la ejecucion al siguiente middlware
  const token = req.header('Authorization');//guardamos del header -->authorization
  //si el token no existe sale del middlewaers y mandamos mensaje de error
  if (!token) return res.status(401).send('Access denied. No token provided');
  try {//virificamos el token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {//si esta mal mandamos este error
    res.status(400).send('Invalid token');
  }
}