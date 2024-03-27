var pageCount = 1;
var pages = [];
initPages();

function initPages(){
    let firstElement = document.getElementById("page0");
    pages.push(firstElement);
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
    console.log(shifted);
    book.removeChild(shifted);

}

function getPageImage(){

    return "assets/testPage.png";

}
