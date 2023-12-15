const express = require("express");
const path = require("path");
require("dotenv").config();

// appp de express
const app = express();

// node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require("./sockets/socket");






//nodemon index
// npm run start:dev

//path publico
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

server.listen( process.env.PORT, (err) => {
    if( err ) throw new Error(err);
    console.log("servidor corriendo en puerto ",  process.env.PORT);
});