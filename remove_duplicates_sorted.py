# Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums.

# Consider the number of unique elements of nums to be k, to get accepted, you need to do the following things:

# Change the array nums such that the first k elements of nums contain the unique elements in the order they were present in nums initially. The remaining elements of nums are not important as well as the size of nums.
# Return k.

# EXAMPLE
# [0,0,0,1,2,3,4,4,4,5]
# -> [0,1,2,3,4,5,_,_,_,_]
# k = 6

def removeDuplicates(nums):
  counter = 0
  pointer = nums[0]
  new_nums = []
  for i in range(1, len(nums)):
    if nums[i] != nums[i-1]:
      