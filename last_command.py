import subprocess
import os

def get_last_command():
    # try:
    if os.name == 'nt':  # Check if the OS is Windows
        command = "doskey /history"
    else:
        command = "history"
    process = subprocess.Popen(
        command,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        # universal_newlines=True
        # ,shell=True  # Use shell=True for Windows compatibility
    )
    stdout, stderr = process.communicate()
    return_code = process.returncode

    if return_code == 0:
        
        lines = stdout.strip().splitlines()
        # print(lines)
        if len(lines)>2:
            last_command = lines[len(lines) - 2]
        else:
            last_command = None
        
        return str(last_command).strip("b'").strip("'"), None, return_code
    else:
        return None, "Error retrieving command history.", return_code
    # except Exception as e:
    #     return None, str(e), -1

if __name__ == "__main__":
    last_command, error_message, return_code = get_last_command()

    if return_code == 0 and last_command:
        print("Last Command:", last_command)
    else:
        print("Failed to retrieve the last command.")
        if error_message:
            print("Error Message:", error_message)
