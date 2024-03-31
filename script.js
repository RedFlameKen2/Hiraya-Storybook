var pageCount = 1;
var pageNumber = 0;
var moving = false;
var backflip = false;
var lastMode = 0;
var bookClosing = false;
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

function centerBook(){
       // Only center the first page if it's the current page
    if (curPage === pages[0]) {
        curPage.style.position = 'absolute';
        curPage.style.left = '50%';
        curPage.style.transform = 'translateX(-50%)';
    }
}

function initPages(){
    let firstElement = document.getElementById("page0");
    pages.push(firstElement);
    curPage = firstElement;
    centerBook();
}
function nextPage(){
    if(moving) return;
    pageNumber++;
    if(pageCount > 1 && lastMode == 1)
	curPage = newPage;
    startPageMoving();
    createPage();
    centerBook();
    if(pageCount < 3)
	pageCount++;
    lastMode = 1;
}
function prevPage(){
    if(moving || pageNumber == 0) return;
    if(pageNumber == 1 && pageCount == 2){
	closeBook();
	return;
    }
    pageNumber--;
    if(lastMode == 2)
	curPage = newPage;
    startPageMoving();
    backflip = true;
    rotation = -180;
    createPage();
    if(pageCount < 3)
	pageCount++;
    lastMode = 2;
}
function closeBook(){
    bookClosing = true;
    backflip = true;
    rotation = -180;
    if(lastMode == 2)
	curPage = newPage;
    startPageMoving();
}

function startPageMoving(){
    moving = true;
    curPage.style.position = "absolute";
    curPage.style.width = "100%";
    curPage.childNodes[0].style.width = "50%";
    curPage.style.justifyContent = "end";
    curPage.style.zIndex = "5";
}

function moveCurPage(){
    if(backflip){
	translation += 2.0833333333333;
	rotation += 3.75;
    } else {
	translation -= 2.0833333333333;
	rotation -= 3.75;
    }
    if(translation <= -100 || translation >= 100)
	stopMoving();
}

function stopMoving(){
    moving = false;
    curPage.style.width = "50%";
    curPage.childNodes[0].style.width = "100%";
    curPage.style.justifyContent = "center";
    if(backflip){
	curPage.style.transform = "translateX(100%) rotateY(0deg)";
    } else {
	curPage.style.transform = "translateX(-100%) rotateY(-180deg)";
    }
    if(pageCount >= 3 || bookClosing)
	removePage();
    if(backflip) backflip = false;
    translation = 0;
    rotation = 0;
    if(bookClosing){
	pageNumber = 0;
	bookClosing = false;
	centerBook();
    }
}
function drawCurPageTransition(){
    if(bookClosing && lastMode == 1){
	curPage.style.transform = "translate(-50%) rotateY("+rotation+"deg)";
	return;
    }
    if(bookClosing || curPage != pages[0]){
	curPage.style.transform = "rotateY("+rotation+"deg)";
	return;
    }
    curPage.style.transform = "translate(-50%) rotateY("+rotation+"deg)";
}
function createPage(){
    const book = document.getElementById("book");
    if(backflip){
	book.style.justifyContent = "start";
	book.style.flexDirection = "row-reverse";
    }
    else{
	book.style.justifyContent = "end";
	book.style.flexDirection = "row";
    }
    page = document.createElement("div");
    let prevInc = 0;
    if(backflip) prevInc = 1;
    page.setAttribute("id", "page"+(pageNumber-prevInc));
    page.setAttribute("class", "page");

    pageImage = document.createElement("img");
    pageImage.setAttribute("class", "pageImg");
    pageImage.setAttribute("src", getPageImage(prevInc));
    page.appendChild(pageImage);

    book.appendChild(page);
    newPage = page;
    if(backflip){
	pages.unshift(page);
	return;
    }
    pages.push(page);
}
function removePage(){
    if(backflip)
	popPage();
    else
	shiftPage();
    if(bookClosing){
	pageCount = 1;
	return;
    }
    pageCount--;
}
function shiftPage(){
    let shifted = pages.shift();
    const book = document.getElementById("book");
    book.removeChild(shifted);
}
function popPage(){
    let popped = pages.pop();
    const book = document.getElementById("book");
    book.removeChild(popped);
}
function getPageImage(prevInc){
    if(backflip){
	switch(pageNumber-prevInc){
	case 0:
	    return "assets/testPage.png";
	case 1:
	    return "assets/testPage.png";
	case 2:
	    return "assets/testPage.png";
	case 3:
	    return "assets/testPage.png";
	case 4:
	    return "assets/testPage.png";
	case 5:
	    return "assets/testPage.png";
	case 6:
	    return "assets/testPage.png";
	case 7:
	    return "assets/testPage.png";
	case 8:
	    return "assets/testPage.png";
	case 9:
	    return "assets/testPage.png";
	case 10:
	    return "assets/testPage.png";
	case 11:    
	    return "assets/testPage.png";
	case 12:
	    return "assets/testPage.png";
	case 13:
	    return "assets/testPage.png";
	case 14:
	    return "assets/testPage.png";
	case 15:
	    return "assets/testPage.png";
	case 16:
	    return "assets/testPage.png";
	case 17:
	    return "assets/testPage.png";
	case 18:
	    return "assets/testPage.png";

	}
    }
    switch(pageNumber-prevInc){
	case 0:
	    return "assets/textPage.png";
	case 1:
	    return "assets/textPage.png";
	case 2:
	    return "assets/textPage.png";
	case 3:
	    return "assets/textPage.png";
	case 4:
	    return "assets/textPage.png";
	case 5:
	    return "assets/textPage.png";
	case 6:
	    return "assets/textPage.png";
	case 7:
	    return "assets/textPage.png";
	case 8:
	    return "assets/textPage.png";
	case 9:
	    return "assets/textPage.png";
	case 10:
	    return "assets/textPage.png";
	case 11:    
	    return "assets/textPage.png";
	case 12:
	    return "assets/textPage.png";
	case 13:
	    return "assets/textPage.png";
	case 14:
	    return "assets/textPage.png";
	case 15:
	    return "assets/textPage.png";
	case 16:
	    return "assets/textPage.png";
	case 17:
	    return "assets/textPage.png";
	case 18:
	    return "assets/textPage.png";
    }
    return "assets/testPage.png";
}

function debugFunc(){
    console.log("pageCount: "+pageCount);
    console.log("pageNumber: "+pageNumber);
    console.log("lastMode: "+lastMode);
    console.log("backflip: "+backflip);
    console.log("curPage: "+curPage);
    console.log("newPage: "+newPage);
}
