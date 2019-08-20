const EventEmitter = require('events');
const fs = require('fs');

class WithLog extends EventEmitter {
    execute(taskFunc){
        console.log('Before execution');
        this.emit('begin');
        taskFunc();
        this.emit('end');
        console.log('After execution');
    }
}

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
            this.emit('end');
        });
    }
}

const withLog = new WithLog();
withLog.on('begin', () => console.log('About to execute'));
withLog.on('end', () => console.log('Done with execute'));

console.log('\n\nCalling using functional call');
withLog.execute(() => console.log(`*** Executing task ***`));

console.log('\n\nCalling using mocked async call');
withLog.execute(() =>{
    setTimeout(()=>console.log('*** Executing task ***'), 5000)
});

// Doing this in a more asyncronous way...
console.log('\n\nCalling async call');
const withTime = new WithTime();
withTime.on('begin', ()=>console.log('About to execute'));
withTime.on('end', ()=>console.log('Done with execute'));

withTime.execute(fs.readFile, __filename);