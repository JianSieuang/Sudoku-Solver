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
        sudoku[(index / Math.sqrt(inputs.length)) | 0][index % Math.sqrt(inputs.length)] = input.value
    })
    return false;
}

// hide solution button 
function hide(){
    return false;
    for(let i = 0; i < square; i++){
        sudoku[i] = [];
        for(let j = 0; j < row; j++){
            sudoku[i][j] = [];
            for(let k = 0; k < column; k++){
                sudoku[i][j][k] = document.getElementById(`s${i}r${j}c${k}`);
                if(sudoku[i][j][k].style.color == "blue"){//remove the ans
                    sudoku[i][j][k].value = "";
                    sudoku[i][j][k].style.color = "black"; 
                }
            }
        }
    }
    return false;
}