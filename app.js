const express = require('express');
const app = express();
const http = require('http').Server(app);
//const https = require('https');
const io = require('socket.io')(http);
const route = require('./routes/web');
const  compression= require('compression');
const helmet = require('helmet');
const fs = require('fs');
//const router = express.Router();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/', route);

//Set route
//app.use('/',route);
/*
app.get('*', function(req,res){
    res.send('wawa');
});*/
app.use(compression()); //compress all routes
app.use(helmet()); //basic protection for the app

//chat events
io.on('connection', (socket) => {
   require('./public/js/server')(socket,io);
});

/*
var https_server = https.createServer({
	key: fs.readFileSync('myKey.key'),
	cert: fs.readFileSync('cert.crt')
},app).listen(3000);
*/


//Listen on the port
http.listen(3000, function() {
    console.log('listening on *:3000');
});

