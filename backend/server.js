// import { config } from 'dotenv';
import dotenv from "dotenv"; // Usar import en lugar de require
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/users.route.js';

// Obtener el puerto desde el archivo .env o usar un valor por defecto
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();


app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(routes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});