
def summary_ranges(nums):
  list_ranges = []
  start = nums[0]
  for i in range(1, len(nums)):
    print(i)
    print(nums[i])
    sum_range = ''
    next_val = nums[i] + 1
    if next_val == nums[i+1]:
      break
    if nums[i+1] == nums[i] + 1:
      start = nums[i]
    else:
      end = nums[i]
    sum_range = f'{start}->{end}'
    list_ranges.append(sum_range)
  return list_ranges

print(summary_ranges([0,1,2,4,5,7]))