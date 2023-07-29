import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.runCommand', () => {
    // Get the currently active terminal
    const terminal = vscode.window.activeTerminal;

    if (!terminal) {
      // If there is no active terminal, create a new one
      vscode.window.createTerminal().show();
    }

    // Get the command to execute (you can customize this command)
    const commandToExecute = 'autodebug';

    // Run the command in the terminal
    if (terminal) {
      terminal.sendText(commandToExecute, true);
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
