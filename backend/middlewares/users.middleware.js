
import { usersModel } from '../models/users.models.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

export const verifyCredentials = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw { message: 'Email and password required.' };
    }

    const user = await usersModel.getUser(email);
    if (!user) {
      throw { message: `This email is not registered ${email}.` };
    }

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      throw { message: 'Incorrect password.' };
    }

    next();
  } catch (error) {
    console.log('Error Login: ', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw { message: 'Error al obtener Token.' };
    }
   
    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      throw { message: 'Formato token incorrecto.' };
    }

    const payload = jwt.verify(token, process.env.JWT_PASSWORD);
    if (!payload) {
      throw { message: 'Token inválido.' };
    }

    req.body.email = payload.email;

    next();
  } catch (error) {
    console.log('Error verificar Token: ', error.message);
    res.status(401).json({ message: error.message });
  }
};
