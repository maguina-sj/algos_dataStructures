# Given a pattern and a string s, find if s follows the same pattern.

# Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in s.

# Example 1:

# Input: pattern = "abba", s = "dog cat cat dog"
# Output: true
# Example 2:

# Input: pattern = "abba", s = "dog cat cat fish"
# Output: false
# Example 3:

# Input: pattern = "aaaa", s = "dog cat cat dog"
# Output: false

# Constraints:

# 1 <= pattern.length <= 300
# pattern contains only lower-case English letters.
# 1 <= s.length <= 3000
# s contains only lowercase English letters and spaces ' '.
# s does not contain any leading or trailing spaces.
# All the words in s are separated by a single space.

#THOUGHT PROCESS
# detect pattern
#loop through pattern
# ascii assignment of each pattern value (NO THIS IS NOT NEEDED)
#separate words by " "
  # assign first word to first pattern value
    #dictionary word - key, pattern_letter: value
  #loop through string 
  #check if next word is next value in pattern
#if not return false
#two for loops, one nested in the other (top - pattern, inside - words) (DIDN'T WORK)

def word_pattern(pattern, string) :
  string_list = string.split(" ")
  if (len(pattern) != len(string_list)):
    return False
  pattern_list = list(pattern)
  pattern_map = dict(zip(pattern_list, string_list))
  string_map = dict(zip(string_list, pattern_list))
  # print(pattern_map)
  # print(string_map)
  results = (list(zip(pattern_list, string_list)))
  for letter, word in results:
    if letter in pattern_map and pattern_map[letter] != word: 
      return False
    if word in string_map and string_map[word] != letter: 
      return False
  return True




print(word_pattern('abba', 'check test test check'))
  # map = {pattern_list: p for pattern_list, p in (zip(pattern_list, string_list))}
  # print(map)
  # res = [ord(ele) for sub in pattern for ele in sub]
  # print(str(res))

def optimized_word_pattern(pattern, string):
    words = string.split()
    if len(pattern) != len(words):
        return False

    pattern_to_word = {}
    word_to_pattern = {}

    for pattern_char, word in zip(pattern, words):
        if pattern_char not in pattern_to_word:
            pattern_to_word[pattern_char] = word
        if word not in word_to_pattern:
            word_to_pattern[word] = pattern_char

        if pattern_to_word[pattern_char] != word or word_to_pattern[word] != pattern_char:
            return False

    return True

print(optimized_word_pattern('abba', 'check test test check'))