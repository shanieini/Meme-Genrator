'use strict'
// נתתונים גלובליים
var gNextId = 0;
const STORAGE_KEY = 'img';
var gImgs = [
    { id: 1, url: './imgs/1.jpg', keywords: ['politics', ' famous', 'man'] },
    { id: 2, url: './imgs/2.jpg', keywords: ['dog', 'happy', 'pets'] },
    { id: 3, url: './imgs/3.jpg', keywords: ['dog', 'baby', 'cute'] },
    { id: 4, url: './imgs/4.jpg', keywords: ['cat', 'sleep', 'pets'] },
    { id: 5, url: './imgs/5.jpg', keywords: ['baby', 'win'] },
    { id: 6, url: './imgs/6.jpg', keywords: ['science', 'explain', 'man'] },
    { id: 7, url: './imgs/7.jpg', keywords: ['boy', 'cute', 'suprise'] },
    { id: 8, url: './imgs/8.jpg', keywords: ['weird', 'problems', 'man'] },
    { id: 9, url: './imgs/9.jpg', keywords: ['baby', 'funny', 'laugh'] },
    { id: 10, url: './imgs/10.jpg', keywords: ['obama', 'politics', 'laugh', 'man'] },
    { id: 11, url: './imgs/11.jpg', keywords: ['kiss', 'man', 'angry'] },
    { id: 12, url: './imgs/12.jpg', keywords: ['famous', 'man', 'think'] },
    { id: 13, url: './imgs/13.jpg', keywords: ['famous', 'man', 'cheers'] },
    { id: 14, url: './imgs/14.jpg', keywords: ['famous', 'man', 'serious'] },
    { id: 15, url: './imgs/15.jpg', keywords: ['famous', 'man'] },
    { id: 16, url: './imgs/16.jpg', keywords: ['laugh', 'man', 'star wars'] },
    { id: 17, url: './imgs/17.jpg', keywords: ['putin', 'man', 'politics'] },
    { id: 18, url: './imgs/18.jpg', keywords: ['movie', 'show', 'buzz', 'toy'] },

]


// מחזיר את הגלובלי
function getImgs() {
    return gImgs
}

// עושה פעולןת בעזרה היידי
function getId(elImg) {
    localStorage.clear();
    var imgId = elImg.id;
    var img = getImgById(imgId)
    saveCurrImg(img)
    openCanvas()
    onOpenCanvas()
}

// מוצא תמונה לפי יידי
function getImgById(id) {
    var img = gImgs.find(img => +id === img.id)
    return img
}

// שומר באיחסון
function saveCurrImg(img) {
    saveToStorage(STORAGE_KEY, img);
}

// לוקח תמונה מהאיחסון
function getCurrImg() {
    var img = loadFromStorage(STORAGE_KEY);
    return img;
}


// ********* FILTER **********
function filterImgs(imgs) {
    var user = document.querySelector('input[name="search"]').value;
    if (user === '') return imgs;
    else return imgs.filter(function (img) {
        return img.keywords.some(function (keyword) {
            return keyword.substring(0, user.length) === user;
        });
    });
}
