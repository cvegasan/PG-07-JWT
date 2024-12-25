# Desafío 07 - Autenticación y autorización JWT

## :computer: Para interactuar con el servidor server.js ejecutar:

 ## Server (Backend)
npm i -y  
npm install express  
npm install pg cors  
npm install pg-format (Manejo sentencias SQL)  
npm install dotenv (Manejo de variables de entorno)  
npm install -D nodemon (Habilitar actualizacion Hot Reloading)  
npm install jwt-simple bcrypt body-parser

node server.js para iniciar el servidor

## Configuracion (Archivo .env)
PG_HOST=localhost  
PG_USER=postgres  
PG_PASSWORD=########  
PG_PORT=5432  
PG_DATABASE=joyas  
JWT_PASSWORD=NadieTeDaraLaClave (Clave para JWT)

PORT=5510

## Ejemplos
1. Permitir el registro de nuevos usuarios a través de una ruta POST /usuarios  
POST http://localhost:5510/usuarios   [SEND]  

2. Ofrecer la ruta POST /login que reciba las credenciales de un usuario y devuelva un token  
POST http://localhost:5510/login      [SEND]  

3. Disponibilizar una ruta GET /usuarios para devolver los datos de un usuario en caso de que esté autenticado
GET http://localhost:5510/usuarios    [SEND]
