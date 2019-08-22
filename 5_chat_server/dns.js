const dns = require('dns');

dns.lookup('pluralsight.com', (err, address) => {
    console.log(`Using lookup: ${address}`);
})

dns.resolve4('pluralsight.com', (err, address) => {
    console.log(`Using resolve4: ${address}`);
});

dns.resolve('pluralsight.com', 'A', (err, address) => {
    console.log(`Using A: ${address}`);
});

dns.resolveMx('pluralsight.com', (err, address) => {
    console.log(`Using MX: ${address.forEach((data)=>{console.log(data)})}`);
});

dns.reverse('35.161.75.227', (err, name) => {
    console.log(`Using reverse: ${name}`);
});