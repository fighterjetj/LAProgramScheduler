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
