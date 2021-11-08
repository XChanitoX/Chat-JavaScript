//Exportamos la función de conexión
module.exports = function(io){
  //Cuando un usuario se conecte
  //io es para todos los usuarios
  io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado");

    //Socket es conexión con un solo cliente
    socket.on("Mensaje Enviado", function(data){
        io.sockets.emit("Nuevo Mensaje", data);
    });
  });
}