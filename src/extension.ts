import * as vscode from "vscode";

function generateAsciiFrame(comment: string): string {
  const width: number = comment.length + 6;
  const frameTop: string = "╔" + "═".repeat(width) + "╗";
  const frameMiddle: string = "║   " + comment + "   ║";
  const frameBottom: string = "╚" + "═".repeat(width) + "╝";
  const asciiFrame: string = `${frameTop}\n${frameMiddle}\n${frameBottom}`;
  return asciiFrame;
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.createAsciiFrameCodeDivider",
    () => {
      vscode.window
        .showInputBox({ prompt: "Enter your comment for the ASCII frame" })
        .then((comment) => {
          if (comment) {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
              const asciiFrame: string = generateAsciiFrame(comment);
              editor.edit((editBuilder) => {
                const currentPosition = editor.selection.active;
                editBuilder.insert(currentPosition, asciiFrame);
              });
            }
          } else {
            vscode.window.showWarningMessage("No input provided.");
          }
        });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
