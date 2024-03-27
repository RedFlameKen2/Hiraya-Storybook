
var pageCount = 1;
var pages = []
initPages();

function initPages(){
    pages.add(document.getElementById("page0"));
    let shifted = pages.shift();
    const book = document.getElementById("book");
    book.removeChild(shifted);
}
function nextPage(){
    if(pageCount >= 3)
	removePage();
    const book = document.getElementById("book");
    page = document.createElement("img");
    page.setAttribute("id", "page"+pageCount);
    page.setAttribute("class", "page");
    page.setAttribute("src", getPageImage());
    book.appendChild(page);
    pages.push(page);
    if(pages < 3)
	pageCount++;
}

function removePage(){
    let shifted = pages.shift();
    const book = document.getElementById("book");
    book.removeChild(shifted);

}

function getPageImage(){

    return "assets/testPage.png";

}
