import { app } from "electron";
import { mainWindow, createMainWindow } from "./electron/window";

const indexFile: string = "./dist/index.html";

app.allowRendererProcessReuse = true;
app.on("ready", () => {
  createMainWindow(indexFile);
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (mainWindow === null) {
    createMainWindow(indexFile);
  }
});

export { indexFile };
