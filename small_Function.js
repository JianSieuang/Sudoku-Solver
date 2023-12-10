function toggleList() {
    let list = document.getElementById("list")
    list.style.display = list.style.display == "none"? "block": "none"
}

function changeSize(num) {
    let table = document.getElementById("mainContent")

    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    
    addElement(num)
    sudoku = Array(num).fill().map(() => 
             Array(num).fill(""));
}