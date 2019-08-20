const EventEmitter = require('events');
const fs = require('fs');

class WithTime extends EventEmitter{
    execute(asyncFunc, ...args) {
        console.time('Execute');
        this.emit('begin');
        asyncFunc(...args, (err, data) => {
            if (err) {
                return this.emit('error', err);
            }
            this.emit('data', data);
            console.timeEnd('Execute');
            return this.emit('end');
        });
    }
}

const withTime = new WithTime();
withTime.on('data', (data) =>{
    console.log(`Content length: ${data.length}`);
});
// Multiple listeners can be set up on a single emit. The call stack will depend on where the listener is placed in the file. (Example the one above first, the one below second.)
withTime.on('data', (data) =>{
    console.log(`Characters: ${data.toString.length}`);
})
// We can have a certain listener be called first by using prependListener function
withTime.prependListener('data', (data) => console.log('Prepended listener on "data" was called first'));
withTime.on('error', console.error);
// This EventListener will only ever be called once. This is so that we can control our processes if multiple uncaught exceptions happen at once and we don't want the clean up to be ran multiple times.
withTime.once('uncaughtException', (err) => {
    console.log(err);
    // Clean up
    process.exit(1);
});
// Finally we can remove a listener using the "removeListener" event listener function.
// withTime.removeListener (example)

withTime.execute(fs.readFile, '');
withTime.execute(fs.readFile, __filename);