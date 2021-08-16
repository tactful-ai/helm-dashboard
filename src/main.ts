import { app, BrowserWindow } from "electron";
import * as path from "path";

import { ipcMain } from "electron";
import { Helm } from "./helm-server";

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false
    },
    
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../index.html"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  setupHelmHandlers();
  createWindow();

 
  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.


// NotWorking .. does not get method names .. mostly because of transpiling
function setupHelmHandlersDynamic() {
    let helm: any = new Helm();
    
    let funcs = Object.keys(helm);
    console.log("helm members", funcs);
    funcs = funcs.filter((func: string) => (typeof helm[func]) === 'function');
    console.log("helm funcs", funcs);
    for (let func of funcs) {
        console.log("adding handler for", func);
        ipcMain.handle(func, async(event, ...args) => {return await helm[func](...args);});
    }
    
}

function setupHelmHandlers() {
  let helm: any = new Helm();

  ipcMain.handle("getReleases", async(event, ...args) => {return await helm.getReleases(...args);});
  ipcMain.handle("getReleaseValues", async(event, ...args) => {return await helm.getReleaseValues(...args);});
  ipcMain.handle("getReleaseHistory", async(event, ...args) => {return await helm.getReleaseHistory(...args);});
  ipcMain.handle("getHelmRepos", async(event, ...args) => {return await helm.getHelmRepos(...args);});
  ipcMain.handle("getChatVersion", async(event, ...args) => {return await helm.getChatVersion(...args);});
  ipcMain.handle("getChartName", async(event, ...args) => {return await helm.getChartName(...args);});
  ipcMain.handle("getDiff", async(event, ...args) => {return await helm.getDiff(...args);});
  
}