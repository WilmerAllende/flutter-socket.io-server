const { io } = require("../index");
const Band = require("../models/band");
const Bands = require("../models/bands");

const bands = new Bands();

bands.addBand( new Band("Quuen"));
bands.addBand( new Band("Bon jovi"));
bands.addBand( new Band("Heore del silencio"));
bands.addBand( new Band("Metalica"));

console.log(bands);

// Mensajes de Sockets 
io.on('connection', client => {
    console.log("cliente conectado");
    client.emit("active-bands", bands.getBands());
    // client.on('event', data => { /* … */ });
    client.on('disconnect', () => { 
        console.log("cleinte desconectado");
     });

    client.on("mensaje", (payload) => {
        console.log("mensaje: ", payload);
        io.emit("mensaje", { admin: "Nuevo mensaje" });
    });

    client.on("emitir-mensaje", ( payload) => {
        console.log("emitir-mensaje: ", payload);
        //io.emit("emitir-mensaje",payload); // emitir a todos
        client.broadcast.emit("emitir-mensaje",payload); // emitir a todos menos el que lo emitio
    });

    client.on("vote-band", (payload) => {
        bands.voteBand(payload.id);
        io.emit("active-bands", bands.getBands());
    });

    client.on("add-band", (payload) => {
        bands.addBand(new Band(payload.name));
        io.emit("active-bands", bands.getBands());
    });

    client.on("delete-band", (payload) => {
        console.log(payload);
        bands.deleteBand(payload.id);
        io.emit("active-bands", bands.getBands());
    });





  });
