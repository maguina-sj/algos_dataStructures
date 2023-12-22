# Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.

# Each letter in magazine can only be used once in ransomNote.

# Example 1:

# Input: ransomNote = "a", magazine = "b"
# Output: false
# Example 2:

# Input: ransomNote = "aa", magazine = "ab"
# Output: false
# Example 3:

# Input: ransomNote = "aa", magazine = "aab"
# Output: true

# Constraints:

# 1 <= ransomNote.length, magazine.length <= 105
# ransomNote and magazine consist of lowercase English letters.

# THOUGHT PROCESS
# iterate through ransom note and check if each letter is in magazine
# if it is in the magazine, then eliminate that letter from magazine
#if ransom notes letters are all available in magazine return True

def ransom_note(note, magazine):
  string = ''
  for i in range(len(note)):
    temp = note[i]
    if temp in magazine:
      print('note letter in temp', temp)
      string += temp
      magazine = magazine.replace(temp, '', 1)
      print('magazine after replace', magazine)
    else:
      return False
  if string == note:
    print(string)
    print(note)
    return True
  else:
    return False
  
print(ransom_note('ab', 'abab'))