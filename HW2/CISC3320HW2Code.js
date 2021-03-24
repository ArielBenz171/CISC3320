// The constants: pid values, the data structure, & difference of the pid values
const MIN_PID = 300;
const MAX_PID = 5000;
let pidArray = [];
const pidAmount = (MAX_PID - MIN_PID);

function allocate_map(){
  // If statement check if the pidAmount is null
  if(pidAmount == null){
    alert("Initilization failure; pid amount is null");
    return -1;
  }
  // A for loop initializing the data structures
  for(let i = 0; i < pidAmount; i++){
    pidArray[i] = 0;
  }

  alert("Initilization successful");
  return 1;
}

function allocate_pid(){
  // Defines pidVal as 0, this will be used to check which pidVal is be allocated
  let pidVal = 0;
  // If statement checking if pidAmount is null
  if(pidAmount == null){
    alert("Allocation failure; pid amount is null");
    return -1;
  }
  // A for loop that checks for an unallocated pid and allocates if needed
  // pidVal is set to whatever i is to check if there's no allocation
  for(let i = 0; i < pidAmount; i++){
    pidVal = i;
    
    if(pidArray[i] == 0){
      pidArray[i] = 1;
      break;
    }
  }
  // An if statement checking if the pidVal is equal to the total pids
  // This is true if all of the pids are allocated
  if(pidVal === pidAmount - 1){
    alert("Allocation failure; all pids are allocated");
    return -1;
  }

  alert("PID Allocated:", pidVal + 300);
  return pidVal;
}

function release_pid(pidNum){
  // If statement checking if either the values are null or
  // the pidNum isn't within the range of the pid values.
  if(pidAmount == null){
    alert("Release failure; pidAmount is null");
  }
  else if(pidNum == null){
    alert("Release failure; pidNum is null");
  }
  else if(pidNum < MIN_PID){
    alert("Release failure; pidNum is too small");
  }
  else if(pidNum > MAX_PID){
    alert("Release failure, pidNum is too big")
  }
  else{
    pidArray[pidNum - MIN_PID] = 0;
    alert("PID Released:", pidNum)
  }
}
/* There is no sleep function in Javascript to I just found
the closet thing to sleep online and it uses this */
function sleep(ms) {
  //
  return new Promise(resolve => setTimeout(resolve, ms));
}
/* This is an async function which allows it to have the ability
to pause within if needed */
async function threadManager() {
  // Creating a random variable from 0-10
  let rand = Math.random()*10;
  // Allocates a pid and saves it's value
  let pidVal = allocate_pid();
  // Sleep for a random amount of time by calling the sleep function
  await sleep(rand);
  // Prints out a statement of how long the pid slept for
  console.log((pidVal + 300), "slept for", rand, "milliseconds")
  // Releases the pid
  release_pid(pidVal + 300);
}

// Allocates the pidArray
allocate_map();
// Asks to open 10 threads
for(let i = 0; i < 10; i++){
  threadManager();
}
// I tested it for 100 and it works
