import subprocess
from last_command import get_last_command
from llm import get_resolution
from colorsme import pretty_print, print_error, print_normal

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
        pretty_print(get_resolution(context, output))
    else:
        pretty_print(output)
        pretty_print("No errors detected")

