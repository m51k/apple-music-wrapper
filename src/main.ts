import { app, components, BrowserWindow } from "electron";

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
		plugins: true,
		webSecurity: true
    }
  });

  mainWindow.loadURL("https://music.apple.com");
}

app.whenReady().then(async () => {
	await components.whenReady();
	createWindow();
});
