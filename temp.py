
def calculate_average(numbers):
    total = sum(numbers)
    average = total / len(numbers)
    return average

# Test case without the string element
numbers_list = [10, 20, 30, 40, 50]
print(calculate_average(numbers_list))
