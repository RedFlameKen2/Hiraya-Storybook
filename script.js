var pageCount = 1;
var madePages = 1;
var pages = [];
initPages();

function initPages(){
    let firstElement = document.getElementById("page0");
    pages.push(firstElement);
}
function nextPage(){
    createPage();
    if(pageCount < 3)
	pageCount++;
    if(pageCount >= 3)
	setTimeout(() => removePage(), 1000);
    madePages++;
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
