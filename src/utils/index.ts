import * as vscode from 'vscode';

// This file contains utility functions that assist with the main functionality of the extension.

export function getCurrentSceneName(document: vscode.TextDocument, position: vscode.Position): string {
    const line = document.lineAt(position.line).text;
    const sceneMatch = line.match(/class\s+(\w+)\s+\(/);
    return sceneMatch ? sceneMatch[1] : '';
}

export function formatSelectedTextForClipboard(editor: vscode.TextEditor): string {
    const selectedText = editor.document.getText(editor.selection);
    return selectedText.replace(/^\s+/gm, ''); // Remove leading indentation
}

export function executeTerminalCommand(command: string): void {
    const terminal = vscode.window.activeTerminal;
    if (terminal) {
        terminal.sendText(command);
    } else {
        vscode.window.showErrorMessage('No active terminal found.');
    }
}

export function getSceneName(line: number, documentText: string): string {
    const lines = documentText.split('\n');
    for (let i = line; i >= 0; i--) {
        const match = lines[i].match(/class\s+(\w+)\s*\(/);
        if (match) {
            return match[1];
        }
    }
    return '';
}

export function formatSelectedText(text: string): string {
    return text.replace(/^\s+/gm, ''); // Remove leading indentation
}

export function getSelectedText(editor: vscode.TextEditor): string {
    const selection = editor.selection;
    return editor.document.getText(selection);
}