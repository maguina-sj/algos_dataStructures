
function wordPattern(pattern, string) {
  let words = string.split(" ")
  if (pattern.length !== words.length) {
    return false
  }

  const patternToWord = {}
  const wordToPattern = {}

  for (let i = 0; i < pattern.length; i++) {
    const patternChar = pattern[i]
    const word = words[i]

    if (!patternToWord.hasOwnProperty(patternChar)) {
      patternToWord[patternChar] = word;
    }
    if (!wordToPattern.hasOwnProperty(word)) {
      wordToPattern[word] = patternChar;
    }

    if (patternToWord[patternChar] !== word || wordToPattern[word] !== patternChar) {
      return false;
    }
  }
return true;
}




console.log(wordPattern("abba", "cat dog dog cat"))