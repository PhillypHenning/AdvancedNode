const dgram = require('dgram');

const server = dgram.createSocket('udp4');
const PORT = 3333;
const HOST = '127.0.0.1';


// Server
server.on('listening', () => console.log(`UDP Server is listening`));

server.on('message', (msg, rinfo) => {
    console.log(`${rinfo.address}:${rinfo.port} - ${msg}`);
});

server.bind(PORT, HOST);

// Client
const client = dgram.createSocket('udp4');

const msg = Buffer.from('Phil rocks');

client.send(msg, 0, msg.length, PORT, HOST, (err) => {
    if (err) throw err;

    console.log('UDP message sent')
    client.close();
});
