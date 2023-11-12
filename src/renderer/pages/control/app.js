import peer from './peer-control'

peer.on('add-stream', (stream)=>{
    play(stream)
})

const video = document.getElementById('screen-video')

function play(stream){
    video.srcObject = stream
    video.onloadedmetadata = ()=> video.play()
}
// 监听鼠标和键盘事件
window.onkeydown = (event)=>{
    // keycode meta ctrl shift alt
    let data = {
        keyCode: event.keyCode,
        meta: event.meta,
        ctrl: event.ctrl,
        shift: event.shift,
        alt: event.alt
    }
    peer.emit('root','key',data)
}

window.onmouseup = (e)=>{
    let data = {};
    data.clientX = e.clientX;
    data.clientY = e.clicentY;
    data.video = {
        width: video.getBoundingClientRect().width,
        height: video.getBoundingClientRect().height
    }
    peer.on('root','mouse',data)
}