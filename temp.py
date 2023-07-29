
def calculate_average(numbers):
    # Convert all elements to integers
    numbers = [int(num) for num in numbers]
    total = sum(numbers)
    average = total / len(numbers)
    return average

# Test case with fixed code
numbers_list = [10, 20, 30, 40, 50, '60']
print(calculate_average(numbers_list))
