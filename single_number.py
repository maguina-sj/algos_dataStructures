# Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

# You must implement a solution with a linear runtime complexity and use only constant extra space.

# Example 1:
# Input: nums = [2,2,1]
# Output: 1

# Example 2:
# Input: nums = [4,1,2,1,2]
# Output: 4

# Example 3:
# Input: nums = [1]
# Output: 1

# Constraints:

# 1 <= nums.length <= 3 * 104
# -3 * 104 <= nums[i] <= 3 * 104
# Each element in the array appears twice except for one element which appears only once.


# THOUGHT PROCESS
# iterate through list of numbers
#counter is hard-coded to 2
  # count each num occurrence
#for the one num that breaks the counter rule, return that number

#if each number occurs exactly 2 times, and one just one time, could that be tracked with a dictionary?
  # [2, 1, 2, 4, 3, 4, 3]
  # like {2:2, 1:1, 3:2, 4:2}

#or what if we looped twice through the list
  # track one index then loop through list comparing each subsequent index to the first tracked index 

# def single_number(nums):
#   number = nums[0]
#   for i in nums: 
#     print('first tracked number', nums[i])
#     for j in nums:
#       print('second tracked number', nums[j])
#       if nums[i] != nums[j]:
#         temp = nums[i]
#   return temp
# # ^ NOPE DOESN'T WORK

# print(single_number([1,2,2,4,4,3,3]))

# def single_number(nums):
#   hash = set(nums)
#   # for i in nums:
#   #   hash.add(nums[i])
#   return hash

# print(single_number([1,2,2,4,4,3,3]))
  

def singleNumber(nums):
  result = 0
  for i in nums: 
    print('current index', i)
    result = i ^ result
    print('bit operator aftermath', result)
  return result

print(singleNumber([2,3,4,7,2,4,3]))