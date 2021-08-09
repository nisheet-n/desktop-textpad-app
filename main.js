// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu} = require('electron');
const path = require('path');

// Set env
process.env.NODE_ENV = 'production';

function createWindow () {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
          	nodeIntegration: true,
          	contextIsolation: false,
		},
	})

	// and load the index.html of the app.
	mainWindow.loadFile('./src/index.html');

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	createWindow();

	app.on('activate', function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0)
			createWindow();
	})

	// Build Main menu from template
	const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
	
	// Insert the menu
	Menu.setApplicationMenu(mainMenu);
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
	if (process.platform !== 'darwin')
		app.quit();
})

// Create Menu Template
const mainMenuTemplate = [
	{
		label: 'File',
		submenu: [
			{
				role: 'reload'
			},
			{
				label: 'Quit',
				accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
				click() {
					app.quit();
				}
			},
		]
	},
];

// Add developer menu if not in production
if (process.env.NODE_ENV !== 'production') {
	mainMenuTemplate.push({
		label: 'DevTools',
		submenu: [
			{
				label: 'Toggle DevTools',
				accelerator: process.platform == 'darwin' ? 'Command+D' : 'Ctrl+D',
				click(item, focusedWindow) {
					focusedWindow.toggleDevTools();
				},
			},
		]
	})
}