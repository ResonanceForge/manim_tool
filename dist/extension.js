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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const utils_1 = require("./utils");
function activate(context) {
    let disposableRunCommand = vscode.commands.registerCommand('extension.runManim', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const fileName = document.fileName;
            const lineNumber = editor.selection.active.line + 1;
            const sceneName = (0, utils_1.getSceneName)(editor.selection.active.line, document.getText());
            const terminalCommand = `manimgl ${fileName} ${sceneName} -se ${lineNumber}`;
            let terminal = vscode.window.terminals.find(t => t.name === 'Manim Terminal');
            if (!terminal) {
                terminal = vscode.window.createTerminal('Manim Terminal');
            }
            terminal.show();
            terminal.sendText(terminalCommand);
        }
    });
    let disposableCopyCommand = vscode.commands.registerCommand('extension.copyCheckpointPaste', () => __awaiter(this, void 0, void 0, function* () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selectedText = editor.document.getText(editor.selection);
            const formattedText = (0, utils_1.formatSelectedText)(selectedText);
            yield vscode.env.clipboard.writeText(formattedText);
            let terminal = vscode.window.terminals.find(t => t.name === 'Manim Terminal');
            if (!terminal) {
                terminal = vscode.window.createTerminal('Manim Terminal');
            }
            terminal.show();
            terminal.sendText('checkpoint_paste()');
        }
    }));
    context.subscriptions.push(disposableRunCommand);
    context.subscriptions.push(disposableCopyCommand);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
