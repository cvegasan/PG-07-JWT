
import { usersModel } from '../models/users.models.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const registerUser = async (req, res) => {
  try {
    const { email, password, rol, lenguage } = req.body;
    if (!email || !password || !rol || !lenguage) {
      throw { message: 'Los campos Email, password, role y language son obligatorios.' };
    }

    const verifyEmail = await usersModel.verifyUserEmail(email);
    if (verifyEmail) {
      throw { message: 'Email no encontrado.' };
    }

    const result = await usersModel.createUser({
      email,
      password: bcrypt.hashSync(password, 10),
      rol,
      lenguage,
    });

    console.log('Registro Usuario: ', result);

    res.status(201).json({ message: 'Usuario registrado con éxito.' });

  } catch (error) {
    console.log('Error al registrar usuario: ', error.message);
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email } = req.body;
    const token = jwt.sign({ email }, process.env.JWT_PASSWORD);

    console.log('Token Obtenido en Login: ', token);

    res.json({ token });

  } catch (error) {
    console.log('Error Login: ', error.message);
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await usersModel.getUser(email);

    console.log('Función Get User: ', user);

    res.json([user]);

  } catch (error) {
    console.log('Error en la función get User: ', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const usersController = {
  registerUser,
  login,
  getUser,
};
