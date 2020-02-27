function solution (input) {
  numbersList = []
  input = input.split('').filter(char =>  //Spilt string into characters
    !isNaN(char) && char != ' ' //Keep character if it's a digit
  )
  
  if(input.length < 1){
    //No numbers in the input string
    throw new Error('No numbers to create AND-Siblings with.');
  }

  //Set off the recursive 'findSiblings' method and return the results
  return("Output: " + findSiblings(input, 0)); 
}

function findSiblings(number, swapLevel){
  //Loop through the number a digit at a time, from the swapLevel to the
  //end of the number, using index to track it's progress.
  //The swapLevel tracks which digit will be swapped, starting at 0.

  for(var index = swapLevel; index < number.length; index++) {
    if(swapLevel >= number.length - 1){ 
      //If we have reached the end of the number, add it to the list
      numbersList.push(number.map(number => +number).join(''))
    }
    else{
      //Otherwise, swap the digit at the swapLevel with the digit at the index
      number = swap(number, swapLevel, index);

      //Increase the swapLevel and run the method recursively.
      //This ensures that all permutations are found.
      findSiblings(number, swapLevel + 1)

      //Swap the digits back to their original position so that the next iteration
      //starts with the same number, but a different index - making the sequence predictable.
      number = swap(number, swapLevel, index);
    }
    
  }
  return numbersList;
}

function swap(number, position1, position2){
  //Helper function to swap two positions in the number array
  
  buffer = number[position1]
  number[position1] = number[position2]
  number[position2] = buffer

  return number;
} 

// Inputs
console.log(solution('326')); // expected ouput 632,623,362,326,263,236
console.log(solution('A 3B2 C6D')); // expected ouput 632,623,362,326,263,236
console.log(solution('1234')) // expected output: 1234,1243,1324,1342,1432,1423,2134,2143,2314,2341,2431,2413,3214,3241,3124,3142,3412,3421,4231,4213,4321,4312,4132,4123