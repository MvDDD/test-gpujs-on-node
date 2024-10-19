let { GPU } = require("gpu.js");

let gpu = new GPU();

let k = gpu.createKernel(function() {
    let val = this.thread.x; 

    return val; // Return the random value
}).setOutput([200000]); // Set the output size to 200,000


// Generate random input data and run the kernel
console.log(k());
