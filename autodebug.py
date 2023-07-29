import subprocess
from last_command import get_last_command
from llm import get_resolution
from colorsme import pretty_print, print_error, print_normal
import re

def extract_package_name(input_string):
    # Define the regular expression pattern to match "pip install X"
    pattern = r'pip\s+install\s+(\S+)'

    # Find all occurrences of the pattern in the input string
    matches = re.findall(pattern, input_string)

    if matches:
        # If there are matches, return the first occurrence of X (the package name)
        return matches[0]
    else:
        # If there are no matches, return None
        return None
    
def extract_python_code(input_string):
    # Python code block starts with ```python and ends with ```
    pattern = r'```python(.*)```'
    matches = re.findall(pattern, input_string, re.DOTALL)
    if matches:
        return matches[0]
    else:
        return None
    
def get_output(last_command):
    # command = get_last_command()
    # print(command)
    process = subprocess.run(
        last_command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True
    )
    stdout = process.stdout.decode("ascii")
    stderr = process.stderr.decode("ascii")

    if process.returncode != 0:
        print_normal("\nOutput:")
        print_normal(stdout)
        print_error("Error:")
        print_error(stderr)
        pretty_print("Getting resolution...\n\n")
        return stderr
    else:
        output = stdout
        # print("last program output:",stdout)
    return stdout

def get_program(filename):
    # Given a filename, read the file and return it as a string
    with open(filename, "r") as f:
        program = f.read()
    return program

def install(pkg):
    print_normal("Installing "+ str(pkg))
    process = subprocess.run(
        f"pip install {pkg}", stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True
    )
    stdout = process.stdout.decode("ascii")
    stderr = process.stderr.decode("ascii")
    if process.returncode != 0:
        print_error("Error installing")
        print_error(pkg)
        print_error(stderr)
    else:
        print_normal("Successfully installed")
        pretty_print(pkg)

def exec(py_code):
    # save string to a file called temp.py
    with open("temp.py", "w") as f:
        f.write(py_code)
    # run the file
    process = subprocess.run(
        f"python temp.py", stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True
    )
    stdout = process.stdout.decode("ascii")
    stderr = process.stderr.decode("ascii")
    if process.returncode != 0:
        print_error("Error running code")
        print_error(stderr)
        return False
    else:
        print_normal("Successfully ran code")
        pretty_print(stdout)
        return True



if __name__ == "__main__":
    last_command, error_message, return_code = get_last_command()

    if return_code == 0 and last_command:
        print_normal("Debugging Program:")
        print_normal(last_command)
        if 'python' not in last_command.split(' ')[0]:
            print_error("Last program was not a python program")
    else:
        print_error("Failed to retrieve the last command.")
        if error_message:
            print_error("Error Message:", error_message)

    output = get_output(last_command)
    if "error" in output.lower():
        context = get_program(last_command.split(' ')[1])
        # print("Context:", context)
        # pretty_print(get_resolution(context, output))
        # print(extract_package_name())
        res = get_resolution(context, output)
        pretty_print(res)   
        pkg = extract_package_name(res)
        if pkg:
            # Prompt user to type y/N to install the package
            print_normal("Would you like to install the package?")
            print_normal("Type y/N and press enter to continue")
            choice = input()
            if choice.lower() == "y":
                install(pkg)
        py_code = extract_python_code(res)
        if py_code:
            print_normal("Would you like to run the code?")
            print_normal("Type y/N and press enter to continue")
            choice = input()
            if choice.lower() == "y":
                print_normal("Running code...")
                # print_normal(py_code)
                if exec(py_code):
                    # Save the code to original file
                    # Ask user if they want to save the code to the original file
                    print_normal("Would you like to save the code to the original file?")
                    print_normal("Type y/N and press enter to continue")
                    choice = input()
                    if choice.lower() == "y":
                        with open(last_command.split(' ')[1], "w") as f:
                            f.write(py_code)
                        pretty_print("Saved code to original file")
    else:
        pretty_print(output)
        pretty_print("No errors detected")

