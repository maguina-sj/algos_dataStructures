// Have the function MissingDigit(str) take the str parameter, which will be a simple mathematical formula with three numbers, a single operator (+,-,*,o/) and an equal sign (=) and return the digit that completes the equation. In one of the numbers in the equation, there will be an x character, and your program should determine what digit is missing. For example, if str is '3x + 12 = 46' then your program should output 4. The x character can appear in any of the three numbers and all three numbers will be greater than or equal to 0 and less than or equal to 1000000

// Example: 
// Input: "4 - 2 = x"
// Output: 2

//Input: "1x0 * 12 = 1200"
//Output: 0

// console.log(eval(2 + 3))
function MissingDigit(str) {
  var x = 0;

  var temp = str.replace("x", x)

  var arr = temp.split(" = ");

  while (eval(arr[0]) !== eval(arr[1])) {
    x++;

    temp = str.replace("x", x)
    
    arr = temp.split(" = ")
  }

  return x;
}

console.log(MissingDigit("4 + 2 = x"))