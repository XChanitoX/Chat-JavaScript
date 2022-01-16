//Exportamos la función de conexión
module.exports = function(io){
  
  let nicknames = [
    'chanito',
    'eden'
  ];

  //Cuando un usuario se conecte
  //io es para todos los usuarios
  io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado");

    socket.on("new user", (data, cb) =>{
      console.log(data);
      if(nicknames.indexOf(data) != -1){
        cb(false);
      } else{
        cb(true);
        socket.nickname = data;
        nicknames.push(socket.nickname);
      }
    });

    //Socket es conexión con un solo cliente
    socket.on("Mensaje Enviado", function(data){
        io.sockets.emit("Nuevo Mensaje", data);
    });
  });
}