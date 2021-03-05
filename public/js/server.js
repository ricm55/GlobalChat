
module.exports = (socket,io) => {

    console.log('user connected');
    socket.on('disconnect',  () => {
        console.log('A user disconnected');
        io.emit('message', 'User diconnect');
    });

    socket.on('newUser',(username) => {
        io.emit('message', username + ' connected');
    });
    socket.on('message', (dataMsg) => {
        socket.broadcast.emit('message', dataMsg.username + ': ' +  dataMsg.message);
    });

    socket.on('isTyping', (dataTyping) => {
        socket.broadcast.emit('isTyping', {'username':dataTyping.username, 'typing':dataTyping.typing});
    });

}
