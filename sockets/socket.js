const { io } = require("../index")

// Mensajes de Sockets 
io.on('connection', client => {
    console.log("cliente conectado");
    // client.on('event', data => { /* … */ });
    client.on('disconnect', () => { 
        console.log("cleinte desconectado");
     });

    client.on("mensaje", (payload) => {
        console.log("mensaje: ", payload);
        io.emit("mensaje", { admin: "Nuevo mensaje" });
    });
  });
