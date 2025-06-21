import * as vscode from 'vscode';
import { getSceneName, formatSelectedText } from './utils';

export function activate(context: vscode.ExtensionContext) {
    let disposableRunCommand = vscode.commands.registerCommand('extension.runManim', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const fileName = document.fileName;
            const lineNumber = editor.selection.active.line + 1;
            const sceneName = getSceneName(editor.selection.active.line, document.getText());

            const terminalCommand = `manimgl ${fileName} ${sceneName} -se ${lineNumber}`;
            let terminal = vscode.window.terminals.find(t => t.name === 'Manim Terminal');
            if (!terminal) {
                terminal = vscode.window.createTerminal('Manim Terminal');
            }
            terminal.show();
            terminal.sendText(terminalCommand);
        }
    });

    let disposableCopyCommand = vscode.commands.registerCommand('extension.copyCheckpointPaste', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selectedText = editor.document.getText(editor.selection);
            const formattedText = formatSelectedText(selectedText);
            await vscode.env.clipboard.writeText(formattedText);
            let terminal = vscode.window.terminals.find(t => t.name === 'Manim Terminal');
            if (!terminal) {
                terminal = vscode.window.createTerminal('Manim Terminal');
            }
            terminal.show();
            terminal.sendText('checkpoint_paste()');
        }
    });

    context.subscriptions.push(disposableRunCommand);
    context.subscriptions.push(disposableCopyCommand);
}

export function deactivate() {}