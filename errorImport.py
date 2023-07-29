import wikipedia
def calculate_average(numbers):
    total = sum(numbers)
    average = total / len(numbers)
    return average

# Test case with logic error
numbers_list = [10, 20, 30, 40, 50, '60']
print(calculate_average(numbers_list))
