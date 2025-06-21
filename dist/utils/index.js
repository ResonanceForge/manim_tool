"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSelectedText = exports.formatSelectedText = exports.getSceneName = exports.executeTerminalCommand = exports.formatSelectedTextForClipboard = exports.getCurrentSceneName = void 0;
const vscode = __importStar(require("vscode"));
// This file contains utility functions that assist with the main functionality of the extension.
function getCurrentSceneName(document, position) {
    const line = document.lineAt(position.line).text;
    const sceneMatch = line.match(/class\s+(\w+)\s+\(/);
    return sceneMatch ? sceneMatch[1] : '';
}
exports.getCurrentSceneName = getCurrentSceneName;
function formatSelectedTextForClipboard(editor) {
    const selectedText = editor.document.getText(editor.selection);
    return selectedText.replace(/^\s+/gm, ''); // Remove leading indentation
}
exports.formatSelectedTextForClipboard = formatSelectedTextForClipboard;
function executeTerminalCommand(command) {
    const terminal = vscode.window.activeTerminal;
    if (terminal) {
        terminal.sendText(command);
    }
    else {
        vscode.window.showErrorMessage('No active terminal found.');
    }
}
exports.executeTerminalCommand = executeTerminalCommand;
function getSceneName(line, documentText) {
    const lines = documentText.split('\n');
    for (let i = line; i >= 0; i--) {
        const match = lines[i].match(/class\s+(\w+)\s*\(/);
        if (match) {
            return match[1];
        }
    }
    return '';
}
exports.getSceneName = getSceneName;
function formatSelectedText(text) {
    return text.replace(/^\s+/gm, ''); // Remove leading indentation
}
exports.formatSelectedText = formatSelectedText;
function getSelectedText(editor) {
    const selection = editor.selection;
    return editor.document.getText(selection);
}
exports.getSelectedText = getSelectedText;
