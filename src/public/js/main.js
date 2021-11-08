//Conexion de los websockets JQuery
$(function() {
    //Mantiene la conexión en tiempo real con el servidor
    const socket = io();

    //Obteniendo los elementos del DOM desde la interfaz
    const $messageForm = $("#message-form");
    const $messageBox = $("#message");
    const $chat = $("#chat");

    // Eventos
    $messageForm.submit(e => {
        e.preventDefault();
        socket.emit("Mensaje Enviado", $messageBox.val());
        $messageBox.val('');
    });

    //Agregamos los mensajes visualmente al chat
    socket.on("Nuevo Mensaje", function(data) {
        $chat.append(data + "<br/>");
    });

})