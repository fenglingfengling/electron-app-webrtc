import { shell, BrowserWindow, desktopCapturer } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
let win
export const createWindow = () =>{
  // Create the browser window.
  win = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration:true,
      contextIsolation: false
    }
  })

  win.on('ready-to-show', () => {
    win.show() // 优化体验 瞬间打开 减少渲染界面有空白的时间
    desktopCapturer.getSources({types:['screen']}).then(async (success)=>{
      win.webContents.send('SET_SOURCE',success[0].id)
    })
  })

  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  // 不同环境加载不同资源
  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/pages/control/index.html`)
    win.webContents.openDevTools()
  } else {
    win.loadFile(join(__dirname, '../renderer/index.html'))
  }
}


// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
export const send = (channel,...args) => {
    win.webContents.send(channel,...args);
}