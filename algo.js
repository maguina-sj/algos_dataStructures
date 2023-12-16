// given an array of integers add all the positive numbers into one sum
myArray = [5,-3,10,17,2,-4,7,-1]
// arr[0] = 5 arr[1]= -3

function positiveSums(arr) {
  var sum = 0
  //for loop through my list
  for(var index = 0; index <= arr.length-1; index++) {
    //check if its positive or negative
    if(arr[index] > 0) {
      //add all the positives
      sum += arr[index]  //sum = sum + arr[index]
    }
  }
  return sum
  //return the sum
}

console.log(positiveSums(myArray))

// iterate and print array - iterate through the array printing each value

anotherArray = [1,true, "hello"]

function printValues(arr) {
  //for loop to iterate
  for (var i =0; i < arr.length; i++) {
    //print everything in the array (console.log)
    console.log(arr[i])
  }
  return "here is my value to the rest of the document" //return won't print anything, though the value exists, we 
  //need to console.log the function on the outside to see it in our terminal
}

printValues(anotherArray)
