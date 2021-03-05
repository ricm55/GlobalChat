const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const route = require('./routes/web');
const  compression= require('compression');
const helmet = require('helmet');

app.use(express.static('public'));
app.set('view engine', 'ejs');

//Set route
app.use('/',route);
app.use(compression()); //compress all routes
app.use(helmet()); //basic protection for the app

//chat events
io.on('connection', (socket) => {
   require('./public/js/server')(socket,io);
});

//Listen on the port
http.listen(3000, function() {
    console.log('listening on *:3000');
});