'use strict'

// ********** INIT *********
function onInit() {
    // creatImgs()
    gImgs
    renderGallery()
    drawImgFromlocal()
}

// *********** RENDER ***********
function renderGallery() {
    // var imgs = getImgs()
    var imgs = getImgsForDisplay()
    var strHtmls = imgs.map(img => `
    <img onclick =" getId(this)" id="${img.id}"  class="img img${img.id}" src="imgs/${img.id}.jpg" >
    `
    )
    document.querySelector('.gallery').innerHTML = strHtmls.join('');
}

// ************ SERCH ************
function onSerchImg() {
    renderGallery()
}

function getImgsForDisplay() {
    var imgs = [];
    imgs = filterImgs(gImgs)
    return imgs;
}