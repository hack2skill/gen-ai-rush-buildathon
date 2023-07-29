import subprocess
from last_command import get_last_command
from llm import get_resolution

def get_output(last_command):
    # command = get_last_command()
    # print(command)
    process = subprocess.run(
        last_command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True
    )
    stdout = process.stdout.decode("ascii")
    stderr = process.stderr.decode("ascii")

    if process.returncode != 0:
        print("Output:", stdout)
        print("Error:", stderr)
        return stderr
    else:
        output = stdout
        # print("last program output:",stdout)
    return stdout

def get_program():
    pass

if __name__ == "__main__":
    last_command, error_message, return_code = get_last_command()

    if return_code == 0 and last_command:
        print("Last Command:", last_command)
        if 'python' not in last_command.split(' ')[0]:
            print("Last program was not a python program")
    else:
        print("Failed to retrieve the last command.")
        if error_message:
            print("Error Message:", error_message)

    output = get_output(last_command)
    if "error" in output.lower():
        get_resolution(output)
    else:
        print(output, "No errors detected")

