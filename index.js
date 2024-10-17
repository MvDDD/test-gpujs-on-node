let { GPU } = require("gpu.js");

let gpu = new GPU();

let k = gpu.createKernel(function(data) {
    let val = data[this.thread.x]; // Get the value for this thread
    let depth = 0; // Initialize depth
    let result = 0; // Variable to accumulate results

    // Simulate recursion iteratively up to a maximum depth of 3
    let maxDepth = 16;
    let numBranches = 1; // Start with 1 branch

    for (let i = 0; i < maxDepth - depth; i++) { // Loop to calculate 2^(3-depth)
        numBranches *= 2; // Double the number of branches
    }

    for (let i = 0; i < numBranches; i++) { // Loop for the number of branches
        let currentDepth = depth;
        let currentVal = val;

        // Traverse down to depth 3
        while (currentDepth < maxDepth) {
            currentVal += 1; // Increment value for the next depth
            currentDepth++; // Increment depth
        }
        
        // At depth 3, accumulate result
        result += currentVal + 1;
    }

    return result - 1; // Return the accumulated result
}).setOutput([2000]);

// Generate random input data and run the kernel
console.log(k(Array(2000).fill(0)));
