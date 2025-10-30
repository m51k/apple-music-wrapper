// import { app, components, BrowserWindow } from "electron";
// import Store from "electron-store"
// import * as path from 'path';
const { app, components, nativeImage, BrowserWindow } = require("electron");
const Store = require("electron-store");
const path = require("path");
const fs = require("fs")

const store = new Store()
// const trayIcon = nativeImage.createFromPath(path.join(__dirname, "../resources/icon.png")
const appIcon = nativeImage.createFromPath(path.join(__dirname, "../resources/icon.png"))

function createWindow() {
	const win = new BrowserWindow({
		icon: appIcon,
		width: (store.get('width') as number) || 1200,
		height: (store.get('height') as number) || 800,
		// TODO: omit these when undefined
		// right now it opens in the corner
		x: (store.get("x") as number) || 0,
		y: (store.get("y") as number) || 0,
		webPreferences: {
			plugins: true,
		}
	});

	win.setMenuBarVisibility(false);
	win.loadURL("https://music.apple.com");

	function storeWindow() {
		const [width, height] = win.getSize();
		const [x, y] = win.getPosition();
		store.set({ width, height, x, y });
	}

	win.on("close", () => {
		storeWindow()
	})
}

app.whenReady().then(async () => {
	await components.whenReady();
	createWindow();
});
