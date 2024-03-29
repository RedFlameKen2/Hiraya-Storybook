var pageCount = 1;
var madePages = 1;
var pages = [];
initPages();

function initPages(){
    let firstElement = document.getElementById("page0");
    pages.push(firstElement);
}
function nextPage(){
    const book = document.getElementById("book");
    page = document.createElement("img");
    page.setAttribute("id", "page"+madePages);
    page.setAttribute("class", "page");
    page.setAttribute("src", getPageImage());
    book.appendChild(page);
    pages.push(page);
    if(pageCount < 3)
	pageCount++;
    if(pageCount >= 3)
	removePage();
    
    madePages++;
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
