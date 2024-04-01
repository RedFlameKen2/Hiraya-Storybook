var flipFrames = 30;
var translatePerFrame = 0;
var rotationPerFrame = 0;

var totalPages = 34;
var pageCount = 1;
var pageNumber = 0;
var moving = false;
var backflip = false;
var lastMode = 0;
var bookClosing = false;
var bookEnding = false;
var bookEnded = false;
var bookOpening = false;
var translation = 0;
var rotation = 0;
var curPage;
var newPage;
var pages = [];

init();

window.requestAnimationFrame(runLoop);

function update(){
    if(moving)
	moveCurPage();
    if((translation <= 51 && translation >= 49) || (translation >= -51 && translation <= -49))
	changeImage();
    if(translation <= -100 || translation >= 100)
	stopMoving();

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
        curPage.style.position = 'absolute';
        curPage.style.left = '50%';
        curPage.style.transform = 'translateX(-50%)';
}

function initPages(){
    let firstElement = document.getElementById("page0");
    pages.push(firstElement);
    curPage = firstElement;
    centerBook();
}
function init(){
    initPages();
    translatePerFrame = 100/flipFrames;
    rotationPerFrame = 180/flipFrames;
}
function nextPage(){
    if(moving || (pageNumber == totalPages && bookEnded)) return;
    if(pageNumber == totalPages && pageCount == 2){
	endBook();
	return;
    }
    if(pageNumber == 0)
	bookOpening = true;
    pageNumber++;
    if(pageCount > 1 && lastMode == 1)
	curPage = newPage;
    startPageMoving();
    createPage();
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
    if(bookEnded){ 
	bookEnded = false;
	bookOpening = true;
    }
    else
	pageNumber--;
    if(lastMode == 2)
	curPage = newPage;
    backflip = true;
    rotation = 0;
    startPageMoving();
    createPage();
    if(pageCount < 3)
	pageCount++;
    lastMode = 2;
}
function closeBook(){
    bookClosing = true;
    backflip = true;
    rotation = 0;
    if(lastMode == 2)
	curPage = newPage;
    startPageMoving();
}
function endBook(){
    bookEnding = true;
    if(lastMode == 1)
	curPage = newPage;
    startPageMoving();
}

function startPageMoving(){
    moving = true;
    curPage.style.position = "absolute";
    curPage.style.width = "100%";
    curPage.childNodes[0].style.width = "50%";
    if(backflip)
	curPage.style.justifyContent = "start";
    else
	curPage.style.justifyContent = "end";
    curPage.style.zIndex = "5";
}

function moveCurPage(){
    if(backflip){
	translation += translatePerFrame;
	rotation += rotationPerFrame;
    } else {
	translation -= translatePerFrame;
	rotation -= rotationPerFrame;
    }
}

function stopMoving(){
    moving = false;
    curPage.style.width = "50%";
    curPage.childNodes[0].style.width = "100%";
    curPage.style.justifyContent = "center";
    if(bookOpening && pageNumber == totalPages){
	curPage.style.transform = "rotateY(0deg)";
    }else if(backflip){
	curPage.style.transform = "translateX(100%) rotateY(0deg)";
    }else {
	curPage.style.transform = "translateX(-100%) rotateY(0deg)";
    }
    if(pageCount >= 3 || bookClosing || bookEnding)
	removePage();
    if(backflip) backflip = false;
    translation = 0;
    rotation = 0;
    if(bookClosing){
	pageNumber = 0;
	bookClosing = false;
	centerBook();
    }
    if(bookEnding){
	pageNumber = totalPages;
	bookEnding = false;
	bookEnded = true;
	lastMode = 1;
	centerBook();
    }
    if(bookOpening)
	bookOpening = false;
}
function drawCurPageTransition(){
    if(bookClosing && lastMode == 1){
	curPage.style.transform = "translateX(-50%) rotateY("+rotation+"deg)";
	return;
    }
    if(bookOpening || (pageNumber == totalPages && lastMode == 2)){
	curPage.style.transform = "translateX(-50%) rotateY("+rotation+"deg)";
	return;
    }
    curPage.style.transform = "rotateY("+rotation+"deg)";
    console.log("goofy ahh");
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
    console.log(page);
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
function changeImage(){
    let pageSrc;
    let pageNo = pageNumber;
    if(backflip){
		// Right side of the Page
	switch(pageNo){
	    case 1:
		pageSrc = "assets/Intro/panel1.png";
		break;
	    case 2:
		pageSrc = "assets/Intro/panel2.png";
		break;
	    case 3:
		pageSrc = "assets/Intro/panel3.png";
		break;
	    case 4:
		pageSrc = "assets/Intro/panel4.png";
		break;
	    case 5:
		pageSrc = "assets/Intro/panel5.png";
		break;
	    case 6:
		pageSrc = "assets/Intro/panel6.png";
		break;
	    case 7:
		pageSrc = "assets/Intro/panel7.png";
		break;
	    case 8:
		pageSrc = "assets/Exposition/Panel1.png";
		break;
	    case 9:
		pageSrc = "assets/Exposition/Panel2.png";
		break;
	    case 10:
		pageSrc = "assets/Exposition/Panel3.png";
		break;
	    case 11:    
		pageSrc = "assets/Exposition/Panel4.png";
		break;
	    case 12:
		pageSrc = "assets/Exposition/Panel5.png";
		break;
	    case 13:
		pageSrc = "assets/Exposition/Panel6.png";
		break;
	    case 14:
		pageSrc = "assets/Exposition/Panel7.png";
		break;
	    case 15:
		pageSrc = "assets/Rising_Action/TRAC1.png";
		break;
	    case 16:
		pageSrc = "assets/Rising_Action/TRAC2.png";
		break;
	    case 17:
		pageSrc = "assets/Rising_Action/TRAC3.png";
		break;
	    case 18:
		pageSrc = "assets/Rising_Action/TRAC4.png";
		break;
		case 19:
		pageSrc = "assets/Conflict/tcon1.png";
		break;
	    case 20:
		pageSrc = "assets/Conflict/tcon2.png";
		break;
	    case 21:
		pageSrc = "assets/Conflict/tcon3.png";
		break;
	    case 22:
		pageSrc = "assets/Conflict/tcon4.png";
		break;
	    case 23:
		pageSrc = "assets/Conflict/tcon5.png";
		break;
		case 24:
		pageSrc = "assets/Conflict/tcon6.png";
		break;
	    case 25:
		pageSrc = "assets/Climax_falling_conclu/tcl1.png";
		break;
	    case 26:
		pageSrc = "assets/Climax_falling_conclu/tcl2.png";
		break;
		case 27:
		pageSrc = "assets/Climax_falling_conclu/tfall1.png";
		break;
	    case 28:
		pageSrc = "assets/Climax_falling_conclu/tfall2.png";
		break;
	    case 29:
		pageSrc = "assets/Climax_falling_conclu/tconclu1.png";
		break;
		case 30:
		pageSrc = "assets/Climax_falling_conclu/tconclu2.0.png";
		break;
	    case 31:
		pageSrc = "assets/Climax_falling_conclu/tconclu2.1.png";
		break;
		case 32:
		pageSrc = "assets/Climax_falling_conclu/tconclu2.2.png";
		break;
	    case 33:
		pageSrc = "assets/Climax_falling_conclu/tconclu2.3.png";
		break;
		case 34:
		pageSrc = "assets/Climax_falling_conclu/tconclu3.png";
		break;
	}
    } else {
	pageNo--;
	switch(pageNo){
		// Left Side of the Page
	    case 0:
			// Intro Part
		pageSrc = "assets/Intro/intro1.png";
		break;
	    case 1:
		pageSrc = "assets/Intro/intro2.png";
		break;
	    case 2:
		pageSrc = "assets/Intro/intro3.0.png";
		break;
	    case 3:
		pageSrc = "assets/Intro/intro4.png";
		break;
	    case 4:
		pageSrc = "assets/Intro/intro5.png";
		break;
	    case 5:
		pageSrc = "assets/Intro/intro6.png";
		break;
	    case 6:
		pageSrc = "assets/Intro/intro7.png";
		break;
	    case 7:
			// Exposition Part
		pageSrc = "assets/Exposition/E1.png";
		break;
	    case 8:
		pageSrc = "assets/Exposition/E2.png";
		break;
	    case 9:
		pageSrc = "assets/Exposition/E3.png";
		break;
	    case 10:
		pageSrc = "assets/Exposition/E4.png";
		break;
	    case 11:    
		pageSrc = "assets/Exposition/E5.png";
		break;
	    case 12:
			// Rising Action Part
		pageSrc = "assets/Exposition/E6.png";
		break;
	    case 13:
		pageSrc = "assets/Exposition/E7.png";
		break;
	    case 14:
		pageSrc = "assets/Rising_Action/RAC1.png";
		break;
	    case 15:
		pageSrc = "assets/Rising_Action/RAC2.png";
		break;
	    case 16:
		pageSrc = "assets/Rising_Action/RAC3.png";
		break;
	    case 17:
		pageSrc = "assets/Rising_Action/RAC4.png";
		break;
	    case 18:
		pageSrc = "assets/Conflict/Con1.png";
		break;
		case 19:
		pageSrc = "assets/Conflict/Con2.png";
		break;
	    case 20:
		pageSrc = "assets/Conflict/Con3.png";
		break;
	    case 21:
		pageSrc = "assets/Conflict/Con4.png";
		break;
		case 22:
		pageSrc = "assets/Conflict/Con5.png";
		break;
	    case 23:
		pageSrc = "assets/Conflict/Con6.png";
		break;
	    case 24:
		pageSrc = "assets/Climax_falling_conclu/CL1.png";
		break;
		case 25:
		pageSrc = "assets/Climax_falling_conclu/CL2.png";
		break;
	    case 26:
		pageSrc = "assets/Climax_falling_conclu/FAC1.png";
		break;
		case 27:
		pageSrc = "assets/Climax_falling_conclu/FAC2.png";
		break;
	    case 28:
		pageSrc = "assets/Climax_falling_conclu/CONCLU1.png";
		break;
		case 29:
		pageSrc = "assets/Climax_falling_conclu/CONCLU2.png";
		break;
	    case 30:
		pageSrc = "assets/Climax_falling_conclu/CONCLU2.png";
		break;
		case 31:
		pageSrc = "assets/Climax_falling_conclu/CONCLU2.png";
		break;
	    case 32:
		pageSrc = "assets/Climax_falling_conclu/CONCLU2.png";
		break;
		case 33:
		pageSrc = "assets/Climax_falling_conclu/CONCLU3.png";
		break;
	}
    }
    if(bookClosing)
	pageSrc = "assets/NewCover.png";
    if(bookEnding)
	pageSrc = "assets/bookback.png";
    rotation -= 180;
    if(backflip)
	curPage.style.justifyContent = "end";
    else
	curPage.style.justifyContent = "start";
    curPage.childNodes[0].setAttribute("src", pageSrc);
}
function getPageImage(prevInc){
    if(backflip){
	switch(pageNumber-prevInc){
		// Left side of the Page
	case 0:
		// Intro Part
	    return "assets/Intro/intro1.png";
	case 1:
	    return "assets/Intro/intro2.png";
	case 2:
	    return "assets/Intro/intro3.0.png";
	case 3:
	    return "assets/Intro/intro4.png";
	case 4:
	    return "assets/Intro/intro5.png";
	case 5:
	    return "assets/Intro/intro6.png";
	case 6:
	    return "assets/Intro/intro7.png";
	case 7:
		// Exposition Part
	    return "assets/Exposition/E1.png";
	case 8:
	    return "assets/Exposition/E2.png";
	case 9:
	    return "assets/Exposition/E3.png";
	case 10:
	    return "assets/Exposition/E4.png";
	case 11:    
	    return "assets/Exposition/E5.png";
	case 12:
		// Rising Action Part
	    return "assets/Exposition/E6.png";
	case 13:
	    return "assets/Exposition/E7.png";
	case 14:
	    return "assets/Rising_Action/RAC1.png";
	case 15:
	    return "assets/Rising_Action/RAC2.png";
	case 16:
	    return "assets/Rising_Action/RAC3.png";
	case 17:
	    return "assets/Rising_Action/RAC4.png";
	case 18:
	    return "assets/Conflict/Con1.png";
	case 19:
	    return "assets/Conflict/Con2.png";
	case 20:
	    return "assets/Conflict/Con3.png";
	case 21:
	    return "assets/Conflict/Con4.png";
	case 22:
	    return "assets/Conflict/Con5.png";
	case 23:
	    return "assets/Conflict/Con6.png";
	case 24:
	    return "assets/Climax_falling_conclu/CL1.png";
	case 25:
	    return "assets/Climax_falling_conclu/CL2.png";
	case 26:
	    return "assets/Climax_falling_conclu/FAC1.png";
	case 27:
		return "assets/Climax_falling_conclu/FAC2.png";
	case 28:
		return "assets/Climax_falling_conclu/CONCLU1.png";
	case 29:
		return "assets/Climax_falling_conclu/CONCLU2.0.png";
	case 30:
		return "assets/Climax_falling_conclu/CONCLU2.1.png";
	case 31:
		return "assets/Climax_falling_conclu/CONCLU2.2.png";
	case 32:
		return "assets/Climax_falling_conclu/CONCLU2.3.png";
	case 33:
		return "assets/Climax_falling_conclu/CONCLU3.png";
	}
    }
    switch(pageNumber-prevInc){
		// Right Side of the Page
	case 1:
	    return "assets/Intro/panel1.png";
	case 2:
	    return "assets/Intro/panel2.png";
	case 3:
	    return "assets/Intro/panel3.png";
	case 4:
	    return "assets/Intro/panel4.png";
	case 5:
	    return "assets/Intro/panel5.png";
	case 6:
	    return "assets/Intro/panel6.png";
	case 7:
	    return "assets/Intro/panel7.png";
	case 8:
	    return "assets/Exposition/Panel1.png";
	case 9:
	    return "assets/Exposition/Panel2.png";
	case 10:
	    return "assets/Exposition/Panel3.png";
	case 11:    
	    return "assets/Exposition/Panel4.png";
	case 12:
	    return "assets/Exposition/Panel5.png";
	case 13:
	    return "assets/Exposition/Panel6.png";
	case 14:
	    return "assets/Exposition/Panel7.png";
	case 15:
	    return "assets/Rising_Action/TRAC1.png";
	case 16:
	    return "assets/Rising_Action/TRAC2.png";
	case 17:
	    return "assets/Rising_Action/TRAC3.png";
	case 18:
	    return "assets/Rising_Action/TRAC4.png";
	case 19:
	    return "assets/Conflict/tcon1.png";
	case 20:
	    return "assets/Conflict/tcon2.png";
	case 21:
	    return "assets/Conflict/tcon3.png";
	case 22:
	    return "assets/Conflict/tcon4.png";
	case 23:
	    return "assets/Conflict/tcon5.png";
	case 24:
		return "assets/Conflict/tcon6.png";
	case 25:
		return "assets/Climax_falling_conclu/tcl1.png";
	case 26:
		return "assets/Climax_falling_conclu/tcl2.png";
	case 27:
		return "assets/Climax_falling_conclu/tfall1.png";
	case 28:
		return "assets/Climax_falling_conclu/tfall2.png";
	case 29:
		return "assets/Climax_falling_conclu/tconclu1.png";
	case 30:
		return "assets/Climax_falling_conclu/tconclu2.0.png";
	case 31:
		return "assets/Climax_falling_conclu/tconclu2.1.png";
	case 32:
		return "assets/Climax_falling_conclu/tconclu2.2.png";
	case 33:
		return "assets/Climax_falling_conclu/tconclu2.3.png";	
	case 34:
		return "assets/Climax_falling_conclu/tconclu3.png";
    }
}

function debugFunc(){
    console.log("pageCount: "+pageCount);
    console.log("pageNumber: "+pageNumber);
    console.log("lastMode: "+lastMode);
    console.log("backflip: "+backflip);
    console.log("curPage: "+curPage);
    console.log("newPage: "+newPage);
}

var audio = new Audio('assets/Hiraya_bg_music.wav');
audio.loop = true;

function playMusic() {
	if (audio.paused) {
		audio.play();
	}
}
