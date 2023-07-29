from termcolor import colored

def print_colored_formatted_string(input_string):
    lines = input_string.strip().split("\n")
    for line in lines:
        if line.startswith("```") and line.endswith("```"):
            # Entire line between ``` should be in a separate color
            code_block = line.strip("```")
            print(colored(code_block, 'yellow'))
        else:
            # Regular lines should be printed in the default color
            print(colored(line, 'green'))


def pretty_print(input_string):
    # find all the occurance of ``` in the string and return it as array of numbers
    # arr = []
    # split into words based on space
    s = input_string.split("```")
    # if any word starts with ```, add to array
    # for i in range(len(s)):
    #     if s[i].startswith('```'):
    #         arr.append(i)
        # print(get_code_block(input_string))
    # print each element of the array in a different color
    for i, j in enumerate(s):
        # if i is even, print in green, else print in blue
        if i % 2 == 0:
            print(colored(j, 'green'))
        else:
            print(colored(j, 'blue'))
    # return s

def print_error(input_string):
    print(colored(input_string, 'red'))

def print_normal(input_string):
    print(colored(input_string, "yellow"))

if __name__ == "__main__":
    input_string = """
    The error message you received is a "ModuleNotFoundError" which means that the module named 'termcolor' could not be found.

    In your code, you are trying to import the 'colored' function from the 'termcolor' module using the line:

    ```python
    from termcolor import colored
    ```

    However, it seems that the 'termcolor' module is not installed on your system.

    To fix this error, you need to install the 'termcolor' module. You can do this by running the following command in 
    your terminal or command prompt:

    ```
    pip install termcolor
    ```

    Once the installation is complete, you should be able to run your code without any errors.
    """
    # get_code_block(input_string)
