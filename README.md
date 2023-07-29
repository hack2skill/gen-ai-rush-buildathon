# AutoDebug
Team Name: Oblivious

Problem Statement: Debugging code and finding solutions for errors is a time-consuming and tedious task. Everyone who has ever coded has found themselves copying and pasting their errors on search engines or forums like Stack Overflow. This adds unnecessary delays to the coding process, hindering the creativity and flow of developers.

Team Leader Email: jatindehmiwal@gmail.com

## A Brief of the Prototype
AutoDebug is an intelligent debugging tool that aims to streamline the debugging process for developers. It integrates with Visual Studio Code and other popular IDEs or can be directly used over CLI/terminal, to provide a seamless debugging experience. The tool uses large language models to analyze and understand the error messages generated during code execution and provides and **implements** the solutions.

Key features of AutoDebug:
- Quick integration with Visual Studio Code/ CLI / terminal
- Auto implementation of solutions
- Real-time debugging assistance without leaving the development environment
- Reduce time spent on searching for solutions online

## Tech Stack

List of technologies used to build the AutoDebug prototype:

- Python (for core functionality)
- npm / Visual Studio Code (for extension development)
- OpenAI API (for language model and natural language processing)

## Step-by-Step Code Execution Instructions

To clone and run the AutoDebug prototype, follow these instructions:

1. Clone the repository:
   ```bash
   git clone https://github.com/oblivious-team/AutoDebug.git
   ```
2. Navigate to the AutoDebug directory:
   ```
   cd AutoDebug
   ```
3. Add your OpenAI keys to `config.json`.

4. Add the current folder to the PATH variable:
   - Open the Start menu and search for "Environment Variables," then select "Edit the system environment variables."
   - Click the "Environment Variables" button.
   - Find the "Path" variable in the System Variables section and click "Edit."
   - Click "New" and add the directory path of the autodebug folder (e.g., `C:\path\to\directory\containing\autodebug`).

5. Installing the VS Code Extension:
   - Open Visual Studio Code.
   - Press `Ctrl+Shift+X` (or `Cmd+Shift+X` on macOS) to open the Extensions view.
   - Click on the three dots "..." menu on the top-right corner of the Extensions view and select "Install from VSIX...".
   - Browse to the location where the `.vsix` file is located and select it.
   - Visual Studio Code will install the extension, and you can start using it.

## Usage
1. Run your Python program.
2. When you encounter an error:
   - Press `Ctrl+Shift+P` and type "AutoDebug: start in VS Code."
   - OR type `autodebug` in the terminal.


## What I Learned
While developing the AutoDebug prototype, the team learned how to develop and integrate solutions centred around LLMs, creating extensions for IDEs like Visual Studio Code and packaging code into executables.
We also learnt how to engineer prompts using templates to get more reliable results for our queries and to make the output format more presentable. 
