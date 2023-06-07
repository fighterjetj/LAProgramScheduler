function removeTime(input, time, times) {
  // Iterating over every person
  for (let i = 0; i < input.length; i++) {
    let numValidTimes = 0;
    let removedTime = false;
    // Iterating over the person's times
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === time) {
        input[i][j] = "N/A";
        removedTime = true;
      } else if (input[i][j] !== "N/A") {
        numValidTimes++;
      }
    }
    if (removedTime) {
      // Removing i from times[numValidTimes+1]
      let index = times[numValidTimes + 1].indexOf(i);
      times[numValidTimes + 1].splice(index, 1);
      // Adding i to times[numValidTimes]
      times[numValidTimes].push(i);
    }
  }
}

function SCHEDULE(input) {
  const numPeople = input.length;
  const numTimes = input[0].length;
  let finalSchedule = Array.from({ length: numPeople }, () => "No time available");
  // Making an array with each index corresponding to the number of times each person is available

  let times = Array.from({ length: numTimes+1 }, () => []);
  // Iterating over the input array and counting how many times work for each person
  for (let i = 0; i < numPeople; i++) {
    let countValidTimes = 0;
    for (let j = 0; j < numTimes; j++) {
      if (input[i][j] !== "N/A") {
        countValidTimes++;
      }
    }
    times[countValidTimes].push(i);
  }
  // We now have the array times, with each index in the array corresponding to the number of times each person is available to in that subarray
  // We can now iterate over the times array and schedule people
  // We can start with the people who have the least amount of times available, schedule them, and then remove those times from the other people
  // We can then repeat this process until everyone is scheduled
  // We can also keep track of the people who have been scheduled in a separate array
  while (times[0].length < numPeople) {
    // Getting the first person with the fewest number of times that work for them
    let firstWithPeople = 1;
    while (times[firstWithPeople].length === 0) {
      firstWithPeople++;
    }
    let firstPerson = times[firstWithPeople][0];
    // Getting the first non-N/A time for the first person
    let firstTime = 0;
    while (input[firstPerson][firstTime] === "N/A") {
      firstTime++;
    }
    // Scheduling that person and then removing that time from everyone else
    finalSchedule[firstPerson] = input[firstPerson][firstTime];
    removeTime(input, input[firstPerson][firstTime], times);
  }
  return finalSchedule;
}

function genInput(times, numPeople){
    let input = [];
    for(let i = 0; i < numPeople; i++){
      let person = [];
      for(let j = 0; j < 3; j++){
        person.push(times[Math.floor(Math.random() * times.length)]);
      }
      // Replace repeats with N/A
      for(let j = 0; j < person.length-1; j++){
        for(let k = j+1; k < person.length; k++){
          if(person[j] === person[k]){
            person[k] = 'N/A';
          }
        }
      }
      input.push(person);
    }
    return input;
}

times = ["12:30", "1:00", "1:30", "2:00", "2:30", "3:00"];
numPeople = 5;
let input = genInput(times, numPeople);
console.log(input);
console.log(SCHEDULE(input));