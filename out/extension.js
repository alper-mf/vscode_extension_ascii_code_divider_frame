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
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
function generateAsciiFrame(comment) {
    const width = comment.length + 6;
    const frameTop = "╔" + "═".repeat(width) + "╗";
    const frameMiddle = "║   " + comment + "   ║";
    const frameBottom = "╚" + "═".repeat(width) + "╝";
    const asciiFrame = `${frameTop}\n${frameMiddle}\n${frameBottom}`;
    return asciiFrame;
}
function activate(context) {
    let disposable = vscode.commands.registerCommand("extension.createAsciiFrameCodeDivider", () => {
        vscode.window
            .showInputBox({ prompt: "Enter your comment for the ASCII frame" })
            .then((comment) => {
            if (comment) {
                const editor = vscode.window.activeTextEditor;
                if (editor) {
                    const asciiFrame = generateAsciiFrame(comment);
                    editor.edit((editBuilder) => {
                        const currentPosition = editor.selection.active;
                        editBuilder.insert(currentPosition, asciiFrame);
                    });
                }
            }
            else {
                vscode.window.showWarningMessage("No input provided.");
            }
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map