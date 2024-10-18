let { GPU } = require("gpu.js");

let gpu = new GPU();

let k = gpu.createKernel(function() {
    // Function to generate a pseudo-random number using a seed
    function rnd(seed) {
        // Random number generation algorithm using integer operations
        seed = Math.abs(seed * 823576189) % 2147483647; // Ensure seed is positive and within int range

        seed ^= (seed << 15) & 0xFFFFFFFF; // Use bitwise AND to keep within bounds
        seed ^= (seed << 3) & 0xFFFFFFFF;  // Use bitwise AND to keep within bounds
        seed ^= (seed >> 3); // Right shift is fine for signed integers
        seed ^= (seed >> 5); // Right shift is fine for signed integers
        
        return seed % 100000; // Return a pseudo-random number (e.g., in a specific range)
    }
    
    // Generate a pseudo-random value based on the thread's x-coordinate
    let val = rnd(this.thread.x); 

    return val; // Return the random value
}).setOutput([200000]); // Set the output size to 200,000


// Generate random input data and run the kernel
console.log(k());
