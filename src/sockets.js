//Exportamos la función de conexión
module.exports = function(io){
  
  let nicknames = [];

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
        updateNickNames();
      }
    });

    //Socket es conexión con un solo cliente
    socket.on("Mensaje Enviado", data => {
        io.sockets.emit("Nuevo Mensaje", {
          msg: data,
          nick: socket.nickname
        });
    });

    socket.on('disconnect', data => {
      if(!socket.nickname) return;
      nicknames.splice(nicknames.indexOf(socket.nickname), 1);
      updateNickNames();
    });

    function updateNickNames(){
      io.sockets.emit("usernames", nicknames);
    }

  });
}