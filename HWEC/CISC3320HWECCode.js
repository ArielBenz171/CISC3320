const cyl = [4078, 153, 2819, 3294, 1433, 211, 1594, 2004, 2335, 2007, 771, 1043, 3950, 2784, 1881, 2931, 3599, 1245, 4086, 520, 3901, 2866, 947, 3794, 2353, 3970, 3948, 1815, 4621, 372, 2684, 3088, 827, 3126, 2083, 584, 4420, 1294, 917, 2881, 3659, 2868, 100, 1581, 4581, 1664, 1001, 1213, 3439, 4706];
const head = 100;
const maxCyl = 4999;
// Check which way the direction is going
const dir = prompt("Will the direction of the head going towards the max cylinder value, answer true or false");

//Circular SCAN
function CSCAN(){
  // Track the value of cylinder steps moved
  let steps = 0
  // Take the cyl values into a seperate array so we can play with them
  let arr = cyl;
  // Add the head value to the array
  arr.unshift(head);
  // Sort the values by increasing order
  arr.sort(function(a, b){return a-b});
  // Find the index of where the head is within the array
  let headIndex = arr.indexOf(head);
  // Check if the direction it is going is to the max cylinder
  if(dir == "true"){
    // Since we are going to the max cylinder, we can add to steps the difference of maxCyl and head
    steps = (maxCyl - head);
    // If the head is in the front of the array
    if(headIndex === 0){
      // There's no need to go any further so stop.
      steps += 0;
    }
    else{
      // Otherwise, we add the value from 0 to the value right before the head to the total
      steps += arr[headIndex-1];
    }
  }
  // Checking if the direction is going towards 0
  else if(dir == "false"){
    // We can call head, the value between 0 and head.
    steps = head;
    // If the head is the last value in the array
    if(headIndex === arr.length - 1){
      // There's no need to go backwards.
      steps += 0;
    }
    else{
      // Otherwise, we look for all value between the max cylinder and the value right after the head
      steps += maxCyl - arr[headIndex+1];
    }
  }
  else{
    // Error message
    console.log("Didn't input true or false")
  }
  return "Number of SCAN cylinders used = " + steps;
}

// LOOK algorithm
function LOOK(){
  // Take the cyl values into a seperate array so we can play with them
  let arr = cyl;
  // Add the head value to the array
  arr.unshift(head);
  // Sort the values by increasing order
  arr.sort(function(a, b){return a-b});
  // Find the index of where the head is within the array
  let headIndex = arr.indexOf(head);
  // If there is a shorter distance to 0.
  if(dir == "true"){
    // Steps is equal to the head minus the max cylinder value used
    steps = (Math.max(...arr) - head)
    // If the head is at 0
    if(headIndex === 0){
      // No need to go back.
      steps += 0;
    }
    else{
      // Otherwise we add the value from the max cylinder to the smallest value used
      steps += (Math.max(...cyl) - arr[0]);
    }
  }
  // Otherwise, the distance to the total cylinder value is shorter 
  else if(dir == "false"){
    // We add head to steps
    steps = head;
    if(headIndex === arr.length - 1){
      // No need to go forward
      steps += 0;
    }
    else{
      // Otherwise, check for highest value of array
      steps += arr[arr.length-1];
    }
  }
  else{
    // Error message
    console.log("Didn't input true or false")
  }
  return "Number of LOOK cylinders used = " + steps;
}

//Circular LOOK
function CLOOK(){
  // Track the value of cylinder steps moved
  let steps = 0
  // Take the cyl values into a seperate array so we can play with them
  let arr = cyl;
  // Add the head value to the array
  arr.unshift(head);
  // Sort the values by increasing order
  arr.sort(function(a, b){return a-b});
  // Find the index of where the head is within the array
  let headIndex = arr.indexOf(head);
  // Check if the direction it is going is to the max cylinder
  if(dir == "true"){
    // Since we are going to the max cylinder, we can add to steps the difference of maxCyl and head
    steps = (Math.max(...cyl) - head);
    // If the head is in the front of the array
    if(headIndex === 0){
      // There's no need to go any further so stop.
      steps += 0;
    }
    else{
      // Otherwise, we add the value from 0 to the value right before the head to the total
      steps += arr[headIndex-1];
    }
  }
  // Checking if the direction is going towards 0
  else if(dir == "false"){
    // We can call head, the value between 0 and head.
    steps = head;
    // If the head is the last value in the array
    if(headIndex === arr.length - 1){
      // There's no need to go backwards.
      steps += 0;
    }
    else{
      // Otherwise, we look for all value between the max cylinder and the value right after the head
      steps += Math.max(...cyl) - arr[headIndex+1];
    }
  }
  else{
    // Error message
    console.log("Didn't input true or false")
  }
  return "Number of CLLOK cylinders used = " + steps;
}

// First come, first served
function FCFS(){
  // First value is the head subtracted by thefirst value of the array
  let steps = Math.abs(head - cyl[0]);
  // A loop to determine total steps
  for(let i = 0; i < cyl.length - 1; i++){
    // For every i, add to steps the absolute value of the current cylinder value subtracted by the next cylinder value
    steps += Math.abs(cyl[i] - cyl[i+1]);
  }
  return "Number of FCFS cylinders used = " + steps;
}

// Shortest seek time first
function SSTF() {
  // Track the value of cylinder steps moved
  let steps = 0
  // Track the value of the cylinder ahead of head
  let over = 0;
  // Track the value of the cylinder before head
  let under = 0;
  // Take the cyl values into a seperate array so we can play with them
  let arr = cyl;
  // Add the head value to the array
  arr.unshift(head);
  // Sort the values by increasing order
  arr.sort(function(a, b){return a-b});
  // Find the index of where the head is within the array
  let headIndex = arr.indexOf(head);
  // Create a while loop to determine the value of cylinders used
  while(arr.length > 1){
    // If the head is at the start or end of the array, we need to make a special case.
    if(headIndex === 0 || headIndex === (arr.length - 1)){
      // If the head is at 0, there's no need to compare both sides.
      if(headIndex === 0){
        // Add to steps the difference between the head and it's nearest cylinder
        steps += (arr[1] - arr[0]);
        // Remove the first value from the array
        arr.shift();
      }
        // If the head is at the end of the array, there's no need to compare.
      else{
        // Add to steps the difference between the head and it's nearest cylinder
        steps += (arr[arr.length-1] - arr[arr.length - 2]);
        // Subtract one from the head value
        headIndex--;
        // Remove the last value in the array
        arr.pop();
      }
    }
      // If the head is not on the edge of the array, we will need to compare both sides and determine which way is shorter
    else{
      // Find the difference between the head and the cylinder ahead of it
      over = arr[headIndex+1] - arr[headIndex];
      // Find the difference between the head and the cylinder behind it
      under = arr[headIndex] - arr[headIndex-1];
      // If the cylinder behind head is a shorter distance
      if(over >= under){
        // We add the value of under to steps
        steps += under;
        // Move the head to the cylinder before our current head
        headIndex--;
        // Remove our previous head
        arr.splice(headIndex++,1);
      }
      // Otherwise the cylinder ahead of head is a shorter distance
      else{
        // We add the value of over to steps
        steps += over;
        // Move the head to the cylinder ahead of our current head
        headIndex++;
        // Remove our previous head
        arr.splice(headIndex--,1);
      }
    }
  }
  return "Number of SSTF cylinder used = " + steps;
}

// Elevator algorithm
function SCAN(){
  // Take the cyl values into a seperate array so we can play with them
  let arr = cyl;
  // Add the head value to the array
  arr.unshift(head);
  // Sort the values by increasing order
  arr.sort(function(a, b){return a-b});
  // Find the index of where the head is within the array
  let headIndex = arr.indexOf(head);
  // If there is a shorter distance to 0.
  if(dir == "true"){
    // Steps is equal to the head minus the max cylinder value used
    steps = (maxCyl - head)
    // If the head is at 0
    if(headIndex === 0){
      // No need to go back.
      steps += 0;
    }
    else{
      // Otherwise we add the value from the max cylinder to the smallest value used
      steps += (maxCyl - arr[0]);
    }
  }
  // Otherwise, the distance to the total cylinder value is shorter 
  else if(dir == "false"){
    // We add head to steps
    steps = head;
    if(headIndex === arr.length - 1){
      // No need to go forward
      steps += 0;
    }
    else{
      // Otherwise, check for highest value of array
      steps += arr[arr.length-1];
    }
  }
  else{
    // Error message
    console.log("Didn't input true or false")
  }
  return "Number of SCAN cylinders used = " + steps;
}
