var pageCount = 1;
var madePages = 1;
var moving = false;
var translation = 0;
var rotation = 0;
var curPage;
var newPage;
var pages = [];
initPages();

window.requestAnimationFrame(runLoop);

function update(){
    if(moving)
	moveCurPage();
}
function draw(){
    if(moving)
	drawCurPageTransition();
}
function runLoop(){
    update();
    draw();
    window.requestAnimationFrame(runLoop);
}
function initPages(){
    let firstElement = document.getElementById("page0");
    pages.push(firstElement);
    curPage = firstElement;
}
function nextPage(){
    if(moving) return;
    startPageMoving();
    createPage();
    if(pageCount < 3)
	pageCount++;
    madePages++;
}
function startPageMoving(){
    moving = true;
    curPage.style.position = "absolute";
    curPage.style.zIndex = "5";
}

function moveCurPage(){
    translation -= 2.0833333333333;
    rotation += 3.75;
    if(translation <= -100)
	stopMoving();
}

function stopMoving(){
    moving = false;
    translation = 0;
    rotation = 0;
    curPage = newPage;
    if(pageCount >= 3)
	removePage();
}
function drawCurPageTransition(){
    curPage.style.transform = "translateX("+translation+"%) rotateY("+rotation+"deg) ";
}
function createPage(){
    const book = document.getElementById("book");
    page = document.createElement("div");
    page.setAttribute("id", "page"+madePages);
    page.setAttribute("class", "page");

    pageImage = document.createElement("img");
    pageImage.setAttribute("class", "pageImg");
    pageImage.setAttribute("src", getPageImage());
    page.appendChild(pageImage);

    book.appendChild(page);
    newPage = page;
    pages.push(page);
}
function removePage(){
    let shifted = pages.shift();
    const book = document.getElementById("book");
    book.removeChild(shifted);

    pageCount--;
}

function getPageImage(){
    return "assets/testPage.png";
}
