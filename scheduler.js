// 2D Array of strings - each subarray corresponds to a person
// Data incoming with columns: Name, 1st Preference, 2nd Preference, ...
// The dimensions would be the number of people and the number of times
function SCHEDULE(input) {
  // Reformat input to match spreadsheet
  const names = input.map(row => row[0]);
  const data = input.map(row => row.slice(1).reverse());

  const numPeople = data.length;
  const numTimes = data[0].length;
  let finalSchedule = Array.from({ length: numPeople }, () => "No time available");
  // Making an array with each index corresponding to the number of times each person is available

  let times = Array.from({ length: numTimes+1 }, () => []);
  // Iterating over the data array and counting how many times work for each person
  for (let i = 0; i < numPeople; i++) {
    let countValidTimes = 0;
    for (let j = 0; j < numTimes; j++) {
      if (data[i][j] !== "N/A") {
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
    while (data[firstPerson][firstTime] === "N/A") {
      firstTime++;
    }
    
    // Scheduling that person and then removing that time from everyone else
    finalSchedule[firstPerson] = data[firstPerson][firstTime];
    removeTime(data, data[firstPerson][firstTime], times);
  }
  
  // map name of people back to class
  finalSchedule = finalSchedule.map((time, index) => [names[index], time]);
  return finalSchedule

}

function removeTime(data, time, times) {
  // Iterating over every person
  for (let i = 0; i < data.length; i++) {
    let numValidTimes = 0;
    let removedTime = false;
    // Iterating over the person's times
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] === time) {
        data[i][j] = "N/A";
        removedTime = true;
      } else if (data[i][j] !== "N/A") {
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

