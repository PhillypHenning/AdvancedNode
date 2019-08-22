process.stdout.write(`\u001B[2J\u001B[0;0F'`);

const server = require('net').createServer()
let counter = 0;
let sockets = {};

function timeStamp(){
    const now = new Date();
    return  `${now.getHours()}:${now.getMinutes()}`;
}

// socket is a duplex which allows both read and write functions to be performed through the stream. 
server.on('connection', socket => {
    socket.id = counter++;
    console.log(`Client connected, clientid: [${socket.id}]`);
    socket.write('Welcome new client!\nPlease type your name\n');

    // socket events emit a 'data' event whenever the client enters data
    socket.on('data', data => {
        if (!sockets[socket.id]) {
            socket.name = data.toString().trim();
            sockets[socket.id] = socket;
            socket.write(`Welcome ${socket.name}\n`);
            return
        }

        Object.entries(sockets).forEach(([key, cs]) => {
            if (socket.id === key) return;
            cs.write(`[${timeStamp()}] ${socket.name}: ${data}`);
        });
    });


    // You can permanently set the encoding by using the setEncoding method 
    //socket.setEncoding('utf8');

    // socket events emit an 'end' event whenever the client disconnects from the server
    socket.on('end', () => {
        console.log(`Client [${socket.id}] disconnected`);
        delete sockets[socket.id]
        Object.entries(sockets).forEach(([key, cs]) => {
            cs.write(`client [${socket.name}] disconnected...`);
        });
    });
});

server.listen(8000, () => console.log('Server bound'));