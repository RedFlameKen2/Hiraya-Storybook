



function nextPage(){
    const book = document.getElementById("book");
    page = document.createElement("img");
    page.setAttribute("id", "page");
    page.setAttribute("src", getPageImage());
    book.appendChild(page);

}

function getPageImage(){

    return "assets/testPage.png";

}
