const fs = require('fs');

console.log('Starting simple async-promise example');

const readFileAsArray = function(file){
    return new Promise((resolve, reject) =>{
        fs.readFile(file, (err, data) => {
            if(err){
                return reject(err);
            }
    
            const lines = data.toString().trim().split('\n');
            resolve(lines);
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
