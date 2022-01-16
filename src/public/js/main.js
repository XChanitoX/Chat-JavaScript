//Conexion de los websockets JQuery
$(function() {
  //Mantiene la conexión en tiempo real con el servidor
  const socket = io();

  //Obteniendo los elementos del DOM desde la interfaz
  const $messageForm = $("#message-form");
  const $messageBox = $("#message");
  const $chat = $("#chat");

  //Obteniendo los elementos del DOM desde el NickName form
  const $nickForm = $("#nickForm");
  const $nickError = $("#nickError");
  const $nickname = $("#nickname");

  const $users = $("#usernames");

  // Cuando ocurra algún evento en nickForm
  $nickForm.submit(e => {
      e.preventDefault();
      socket.emit('new user', $nickname.val(), data => {
          if(data){
              $('#nickWrap').hide();
              $("#contentWrap").show();
          } else{
              $nickError.html(`
                <div class="alert alert-danger">
                    That username already exists.
                </div>        
            `);
          }
          $nickname.val('');
      });
  });

  // Eventos
  $messageForm.submit((e) => {
    e.preventDefault();
    socket.emit("Mensaje Enviado", $messageBox.val());
    $messageBox.val("");
  });

  //Agregamos los mensajes visualmente al chat
  socket.on("Nuevo Mensaje", function (data) {
    $chat.append(data + "<br/>");
  });
})