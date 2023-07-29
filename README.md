# AutoDebug

## Installation
1. Add your OpenAI keys to `config.json`.

2. Add the current folder to the PATH variable:
   - Open the Start menu and search for "Environment Variables," then select "Edit the system environment variables."
   - Click the "Environment Variables" button.
   - In the System Variables section, find the "Path" variable and click "Edit."
   - Click "New" and add the directory path of the autodebug folder (e.g., `C:\path\to\directory\containing\autodebug`).

3. Installing the VS Code Extension:
   a. Open Visual Studio Code.
   b. Press `Ctrl+Shift+X` (or `Cmd+Shift+X` on macOS) to open the Extensions view.
   c. Click on the three dots "..." menu on the top-right corner of the Extensions view and select "Install from VSIX...".
   d. Browse to the location where the `.vsix` file is located and select it.
   e. Visual Studio Code will then install the extension, and you can start using it.

## Usage
1. Run your Python program.
2. When you encounter an error:
   - Press `Ctrl+Shift+P` and type "AutoDebug: start in VS Code."
   - OR type `autodebug` in the terminal.
