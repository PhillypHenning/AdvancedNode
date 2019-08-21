const EventEmitter = require('events');
const readline = require('readline');

const client = new EventEmitter();
const server = require('./server')(client);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let command, args;
rl.on('line', (input) =>{
    [command, ...args] = input.split(' ');
    client.emit('command', command, args);
});

server.on('response', (response) =>{
    process.stdout.write('\u001B[2J\u001B[0;0f');
    process.stdout.write(response);
    process.stdout.write('\n\> ');
})