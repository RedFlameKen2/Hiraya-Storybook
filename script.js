var pageCount = 1;
var madePages = 1;
var moving = false;
var translation = 0;
var curPage = 0;
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
    moving = true;
    curPage.style.position = "absolute";
    createPage();
    if(pageCount < 3)
	pageCount++;
    if(pageCount >= 3)
	setTimeout(() => removePage(), 1000);
    madePages++;
}

function moveCurPage(){
    translation -= 2.083;
    if(translation <= -100)
	moving = false;
}

function drawCurPageTransition(){
    curPage.style.transform = "translateX("+translation+"%)";
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
