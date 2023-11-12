// 通过robot来监听主进程消息

import { ipcMain } from 'electron'
import robot from 'robotjs'
const handleMouse = (data)=>{
    let {clientX,clientY,screen,video} = data
    const x = (clientX * screen.width) / video.width
    const y = (clientY * screen.height) / video.height
    robot.moveMouse(x,y)
    robot.mouseClick()
}
const handleKey = (data)=>{
    const modifiers: string[] = []
    if(data.meta) modifier.push('meta')
    if(data.ctrl) modifier.push('ctrl')
    if(data.shift) modifiers.push('shift')
    if(data.alt) modifiers.push('alt')
    // 键值对转换
    const key = vkey[data.keyCode].toLowerCase()
    robot.keyTap(key.modifiers)
}
export default function(){
    ipcMain.on('robot',(e,type,data)=>{
        console.log('main robot',type,data)
        if(type === 'mouse'){
            handleMouse(data)
        }else if(type === 'key'){
            handleKey(data)
        }
    })
}