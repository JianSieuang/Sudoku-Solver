// hambuger menu button
function toggleList() {
    // show or hide the menu list
    let list = document.getElementById("list")
    list.style.display = list.style.display == "none"? "block": "none"
}

// reset button
function resetInput(){
    // empty grid
    let inputs = document.querySelectorAll("input")
    inputs.forEach((input, index) =>{
        input.value = ""
        input.style.color = "black"
        sudoku[(index / Math.sqrt(inputs.length)) | 0][index % Math.sqrt(inputs.length)] = input.value
    })
    return false;
}

// hide solution button 
function hide(){
    let inputs = document.querySelectorAll("input")
    inputs.forEach((input, index) =>{
        if (input.style.color == "blue") {
            input.value = ""
            input.style.color = "black"
            sudoku[(index / Math.sqrt(inputs.length)) | 0][index % Math.sqrt(inputs.length)] = input.value
        }
    })
    return false;
}