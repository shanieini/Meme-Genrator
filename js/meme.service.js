'use strict'

// ********** GLOBAL ***********
var gCurrImg = getCurrImg()

var gMeme = {
    selectedImgId: gCurrImg.id,
    selectedLineIdx: 0,
    lines: [{
        isDrag: false,
        txt: 'ADD TEXT',
        size: 50,
        font: 'Impact',
        align: 'left',
        color: 'black',
        pos: { X: 150, Y: 50 }
    }, {
        isDrag: false,
        txt: 'ADD TEXT',
        size: 50,
        font: 'Impact',
        align: 'center',
        color: 'black',
        pos: { X: 250, Y: 400 }
    }]
}



function getMeme() {
    return gMeme
}


// ********** TEXT **************
function setLineText(txt) {
    var currLine = gMeme.selectedLineIdx
    gMeme.lines[currLine].txt = txt
}


function handleKey(ev) {
    if (ev.key === 'Backspace') renderCanvas();
}


// ********** COLOR ************
function setColor(elColor) {
    var currLine = gMeme.selectedLineIdx
    gMeme.lines[currLine].color = elColor.value
}


// ********** SIZEUP **************
function setSizeUp(sizeUp) {
    var currLine = gMeme.selectedLineIdx
    gMeme.lines[currLine].size += sizeUp
}


// ********** SIZEDOWN **************
function setSizeDown(sizeUp) {
    var currLine = gMeme.selectedLineIdx
    gMeme.lines[currLine].size += sizeUp
}


// ************ SWITCHLINE ************
function SwitchLine(idx) {
    if (idx === gMeme.selectedLineIdx) {
        gMeme.selectedLineIdx++
        if (gMeme.selectedLineIdx > gMeme.lines.length - 1) {
            gMeme.selectedLineIdx = 0
        }
    }
}


// ************* FONT **************
function setFont(elFont) {
    var currLine = gMeme.selectedLineIdx
    gMeme.lines[currLine].font = elFont.value
}


// ************** DRAG ****************
function moveMeme(dx, dy) {
    var meme = getMeme()
    var currLine = meme.selectedLineIdx
    meme.lines[currLine].pos.X = dx
    meme.lines[currLine].pos.Y = dy
}

function isMemeTxtClicked(clickedPos) {
    var meme = getMeme()
    var currLine = meme.selectedLineIdx
    const { X, Y } = meme.lines[currLine].pos
    // console.log(pos)
    const distance = Math.sqrt((X - clickedPos.X) ** 2 + (Y - clickedPos.Y) ** 2)
    return distance <= meme.lines[currLine].size
}

function setMemeDrag(isDrag) {
    var meme = getMeme()
    var currLine = meme.selectedLineIdx
    meme.lines[currLine].isDrag = isDrag
}

// ********* align *********
function textAlign(alignVal) {
    if (alignVal === 'left') {
        gMeme.lines[0].align = 'left'

    }
    if (alignVal === 'center') {
        gMeme.lines[0].align = 'center'
    }
    if (alignVal === 'right') {
        gMeme.lines[0].align = 'right'
    }
    updatePose()
}

function updatePose() {
    gMeme.lines.forEach((line) => {
        if (gMeme.lines[0].align === 'left') line.pos.X = 10
        if (gMeme.lines[0].align === 'right') line.pos.X = gElCanvas.width - 80
        if (gMeme.lines[0].align === 'center') line.pos.X = gElCanvas.width / 2 - 40
    })
    renderCanvas()
}


// *********** SHERE *************
function uploadImg() {
    const imgDataUrl = gElCanvas.toDataURL(`imgs/${gMeme.selectedImgId}.jpg`);

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl);
        var elShareContainer = document.querySelector('.share-container');
        elShareContainer.style.display = 'block';
        elShareContainer.innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`;
    }
    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('imgs', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}

// *********** SAVE ************

function drawImgFromlocal() {
    var img = new Image()
    img.src = `imgs/${gMeme.selectedImgId}.jpg`;
    img.onload = () => {
        // gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
    }
}

function drawImgFromRemote() {
    var img = new Image()
    img.src = 'https://steamcdn-a.akamaihd.net/steam/apps/431960/ss_39ed0a9730b67a930acb8ceed221cc968bee7731.1920x1080.jpg?t=1571786836';
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
    }
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'meme.jpg'
}

// ******** MOVE **********
function moveLineY(directionVal) {
    var currLine = gMeme.selectedLineIdx
    gMeme.lines[currLine].pos.Y += directionVal

}

function moveLineX(directionVal) {
    var currLine = gMeme.selectedLineIdx
    gMeme.lines[currLine].pos.X += directionVal
}

// 
function addLine() {
    gMeme.lines.push({
        isDrag: false,
        txt: 'Add Text',
        size: 50,
        font: 'Impact',
        align: 'center',
        color: 'black',
        pos: { X: 100, Y: 200 }
    })
}

