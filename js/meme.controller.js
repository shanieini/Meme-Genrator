'use strict'
// ********** GLOBAL ************
var gElCanvas;
var gCtx;
var gCanvas;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']


// ********** OPEN ************
function onOpenCanvas() {
    gElCanvas = document.querySelector('#my-canvas');
    gCtx = gElCanvas.getContext('2d');
    // resizeCanvas()
    addListeners()
    renderCanvas()
}

function openCanvas() {
    document.querySelector('.gallery-container').style.display = 'none';
    document.querySelector('.main-container').style.display = 'block';
}


// ************* RENDER ************
function renderCanvas() {
    var img = getCurrImg();
    var imgCanvas = new Image();
    imgCanvas.src = img.url;
    imgCanvas.onload = function () {
        gCtx.drawImage(imgCanvas, 0, 0, gElCanvas.width, gElCanvas.height)
        renderText()

    };
}

function renderText() {
    var meme = getMeme()
    let lines = meme.lines
    lines.forEach(line => {
        gCtx.beginPath()
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.textAlign = line.align
        gCtx.lineWidth = 2
        gCtx.closePath()
        gCtx.strokeStyle = line.color
        gCtx.fillStyle = 'white'
        gCtx.fillText(line.txt, line.pos.X, line.pos.Y)
        gCtx.strokeText(line.txt, line.pos.X, line.pos.Y)
        gCtx.fill()
        gCtx.stroke()
    })
}





// ******** TEXT ***********
function onSetLineText(elTxt) {
    setLineText(elTxt.value)
    renderCanvas()
}


// ******** COLOR ***********
function onSetColor(elColor) {
    setColor(elColor)
    var meme = getMeme()
    var currLine = meme.selectedLineIdx
    gCtx.fillStyle = meme.lines[currLine].color
    gCtx.fill()
    renderCanvas()
}


// *********** CLEAR *************
function clearInput() {
    var elInput = document.querySelector('input[name="txt"]')
    elInput.value = ''
    var elFont = document.querySelector('select[name=Font]')
    elFont.value = 'none'
}


function clearCanvas() {
    clearInput()
    var meme = getMeme()
    var currLine = meme.selectedLineIdx
    gCtx.clearRect(0, 0, 400, 400);
    gMeme.lines[currLine].txt = ''
    renderCanvas()
}


// ********** SUBMIT ***********
function onSubmit(ev) {
    ev.preventDefault()
}


// ******* SIZEUP ********
function onSetSizeUp() {
    var size = 10
    setSizeUp(size)
    renderCanvas()
}


// *********** SIZEDOWN **********
function onSetSizeDown() {
    var size = -10
    setSizeUp(size)
    renderCanvas()
}


// ********** SWITCHLINE **********
function onSwitchLine() {
    var meme = getMeme()
    var idx = meme.selectedLineIdx
    SwitchLine(idx)
    clearInput()
}


// ********** FONT **********
function onSetFont(elFont) {
    setFont(elFont)
    var meme = getMeme()
    var currLine = meme.selectedLineIdx
    gCtx.font = meme.lines[currLine].font
    renderCanvas()
}


// ************* DRAG **************


function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        renderCanvas()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    var meme = getMeme();
    var currLine = meme.selectedLineIdx
    const pos = getEvPos(ev);
    if (!isMemeTxtClicked(pos)) return
    setMemeDrag(true)
    meme.lines[currLine].pos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    var meme = getMeme();
    var currLine = meme.selectedLineIdx
    if (!meme.lines[currLine].isDrag) return
    const pos = getEvPos(ev)
    const dx = pos.X - meme.lines[currLine].pos.X
    const dy = pos.Y - meme.lines[currLine].pos.Y
    moveMeme(dx, dy)
    meme.lines[currLine].pos = pos
    renderCanvas()
}

function onUp() {
    var meme = getMeme();
    var currLine = meme.selectedLineIdx
    meme.lines[currLine].isDrag = false
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    var pos = {
        X: ev.offsetX,
        Y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            X: ev.pageX - ev.target.offsetLeft,
            Y: ev.pageY - ev.target.offsetTop
        }
    }
    return pos
}

// ********** MOVE **********

function onMoveLineX(directionVal) {
    moveLineX(directionVal)
    renderCanvas()
}

function onMoveLineY(directionVal) {
    moveLineY(directionVal)
    renderCanvas()
}

function onAddLine() {
    addLine()
    renderCanvas()
}