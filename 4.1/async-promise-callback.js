const fs = require('fs');

console.log('Starting simple async-promise example');

// Add in an empty callback to support the promise
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

// Example call
readFileAsArray('./numbers')
    .then(lines => {
        const numbers = lines.map(Number);
        const oddNumbers = numbers.filter(number => number %2 === 1);
        console.log(`odd numbers count: ${oddNumbers.length}, odd numbers: ${oddNumbers}, full range: ${numbers}`);
    })
    .catch(console.error);
