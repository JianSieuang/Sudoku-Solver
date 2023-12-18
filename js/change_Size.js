function changeSize(num) {
    let table = document.getElementById("mainContent")

    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    addElement(num)
    sudoku = Array(num).fill().map(() => 
             Array(num).fill(""));

    autoFocus()
    toggleList()
}