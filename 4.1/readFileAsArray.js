const fs = require('fs');

console.log('Starting simple async-promise example');

// This code can support promises and callbacks (recommended)
const readFileAsArray = function(file, cb = () => {}){
    return new Promise((resolve, reject) =>{
        fs.readFile(file, (err, data) => {
            if(err){
                reject(err);
                return cb(err);
            }
    
            const lines = data.toString().trim().split('\n');
            resolve(lines);
            return cb(null, lines);
        });
    })
}

// example call - promise
readFileAsArray('./numbers')
    .then(lines => {
        const numbers = lines.map(Number);
        const oddNumbers = numbers.filter(number => number %2 === 1);
        console.log(`promise: odd numbers count: ${oddNumbers.length}, odd numbers: ${oddNumbers}, full range: ${numbers}`);
    })
    .catch(console.error);

// example call - callback
readFileAsArray('./numbers', (err, lines) =>{
    const numbers = lines.map(Number);
    const oddNumbers = numbers.filter(number => number %2 === 1);
    console.log(`callback: odd numbers count: ${oddNumbers.length}, odd numbers: ${oddNumbers}, full range: ${numbers}`);
});

// async functions need to be wrapped in a try-catch block.
// example call - async 
async function countOdd(){
    try{
        const lines = await readFileAsArray('./numbers');
        const numbers = lines.map(Number);
        const oddNumbers = numbers.filter(number => number %2 === 1);
        console.log(`async: odd numbers count: ${oddNumbers.length}, odd numbers: ${oddNumbers}, full range: ${numbers}`);
    }
    catch(err){
        console.log(err);
    }
}

// calling async function
countOdd()
