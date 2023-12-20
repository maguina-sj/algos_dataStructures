function isStringPalindrome(str) {
  console.log(`string as is ${str}`)
  let string = str.replace(/[^A-Z0-9]/ig,"")
  string = string.toLowerCase();
  console.log(`string lowercased ${string}`)
  let reversedString = ""
  for (let i = string.length-1; i >= 0; i--) {
    console.log(string[i])
    reversedString += string[i];
  }
  console.log(reversedString)
  if (string == reversedString) {
    return true
  }
  else{
    return false;
  }
  
}

console.log(isStringPalindrome("Radar"));