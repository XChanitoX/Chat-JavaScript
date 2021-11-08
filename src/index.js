//Importamos los módulos
const express = require('express');
//const socketio = require('socket.io');//Funcionalidades en tiempo real
const http = require('http');//Creación del servidor
const path = require('path');//Para localizar los archivos en app.use

//Creamos el servidor utilizando express
const app = express();
//Creamos el servidor con http para poder mandarselo a Socket.io
const server = http.createServer(app);
//Creamos el const io que es la conexión
const io = require("socket.io")(server);

//settings
//Si el servidor le da un puerto que lo tome, en caso contrario en el puerto 3000
app.set("port", process.env.PORT || 3000);

//Aquí recibimos la función del archivo sockets.js y le pasamos como parámetro la conexión io
require('./sockets')(io);

//Usamos path join para que no haya problemas entre Linux y Windows con el path, al momento de utilizar los /, \
//Envía la carpeta public al navegador cada vez que un usuario entra
app.use(express.static(path.join(__dirname, "public")));

//Iniciando el servidor
server.listen(app.get("port"), () => {
    console.log("Server on port ", app.get("port"));
});

