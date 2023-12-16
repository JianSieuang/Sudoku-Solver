let sudoku = Array(9).fill().map(() => 
             Array(9).fill(""));
let square = 9;
let squareroot = Math.sqrt(square);
let row = 3;
let column = 3;
let checkrow = [];//[which row][which box]
let checkcol = [];

function checkAvailable() {
    let check = new Map()
    let col = new Map()
    let box = Math.sqrt(sudoku.length)

    // check row and col
    for (let i = 0; i < sudoku.length; i++) {
        for (let j = 0; j < sudoku.length; j++) {
            if (sudoku[i][j] != "") {
                if (check.get(sudoku[i][j]) == undefined){
                    check.set(sudoku[i][j], 0)
                }
                else {
                    return false
                }   
            } 
            if (sudoku[j][i] != "") {
                if (col.get(sudoku[j][i]) == undefined) {
                    col.set(sudoku[j][i], 0)
                }
                else {
                    return false
                }
            }     
        }
        check.clear()
        col.clear()
    }

    // check box
    for (let i = 0; i < sudoku.length; i += box) {
        for (let j = 0; j < sudoku.length; j += box) {
            for (let r = 0; r < box; r++) {
                for (let c = 0; c < box; c++) {
                    if (sudoku[i + r][j + c] != "") {
                        if (check.get(sudoku[i + r][j + c]) == undefined){
                            check.set(sudoku[i + r][j + c], 0)
                        }
                        else {
                            return false
                        }
                    }  
                }
            }
            check.clear()
        }
    }

    return true
}

// this logic only can function when there is one answer for one grid  

function showAns(){
    // if checkAvailable is false (invalid sudoku), show the error and return false
    console.log(checkAvailable()? "Valid Sudoku": "Invalid Sudoku")
    

    let notes = []
    for (let i = 0; i < sudoku.length; i++) {
        notes[i] = []
        for (let j = 0; j < sudoku.length; j++) {
            notes[i][j] = probabilityCheck(i, j)  
        }
    }

    console.log(notes)
    return false
    

    // result is the possible number for each grid Example : 123, 789 or 1357
    for(let i = 0; i < square; i++){
        result[i] = [];
        for(let j = 0; j < row; j++){
            result[i][j] = [];
            for(let k = 0; k < column; k++){
                if(sudoku[i][j][k].value == ""){
                    result[i][j][k] = probabilityCheck(sudoku, checkrow, checkcol, i, j, k);//how many numbers that can be wrote in the box
                    //console.log(result[i][j][k]);
                    //i need to create a variable to save possible numbers for each box.
                }
                else{
                    result[i][j][k] = sudoku[i][j][k].value
                }
            }
        }
        //checking row and column
        //if another two row didn't appear that number means that this row must include that number 
        for(let a = 0; a < row; a++){
            rowcheck(i, a, result, checkrow, sudoku);
            columncheck(i, a, result, checkcol, sudoku);
        }
    }
    return false;
}

function probabilityCheck (i, j){
    let result = 0;
    let possible = 0;


    // number that has possible to put in the grid
    let probability = []
    for(let i = 0; i < sudoku.length; i++){
        probability[i] = i + 1
    }

    //check row and col


    let x;//because of the naming style for small square box makes that need to be specific

    //for checking row
    x = i - i % squareroot;
    for(let a = x; a < x + squareroot; a++){
        for(let c = 0; c < squareroot; c++){
            for(let p = 0; p < square; p++){
                if(sudoku[a][j][c].value == p + 1)
                    probability[p] = false;
            } 
        }
    }
    //problem
    // row
    for(let b = 0; b < squareroot; b++){
        if(i % squareroot == b){//skip the same square box
            continue;
        }
        let store = checkrow[j + x][b];
        for(;checkrow[j + x][b] > 0; checkrow[j + x][b] = Math.trunc(checkrow[j + x][b] / 10)){
            probability[checkrow[j + x][b] % 10 - 1] = false;
        }
        checkrow[j + x][b] = store;
    }

    //for checking small square
    for(let b = 0; b < squareroot; b++){
        for(let c = 0; c < squareroot; c++){
            for(let p = 0; p < square; p++){
                if(sudoku[i][b][c].value == p + 1)
                    probability[p] = false;
            }
        }
    }

    //for checking column
    x = i % squareroot;

    for(let a = x; a < x + 1 + squareroot * (squareroot - 1); a += squareroot){
        for(let b = 0; b < squareroot; b++){
            for(let p = 0; p < square; p++){
            if(sudoku[a][b][k].value == p + 1)
                probability[p] = false;
            }
        }
    }

    //problem
    //column
    for(let b = 0; b < squareroot; b++){
        if(Math.trunc(i / 3) == b){//for skip the same square box
            continue;
        }
        let store = checkcol[k + x * squareroot][b];
        for(;checkcol[k + x * squareroot][b] > 0; checkcol[k + x * squareroot][b] = Math.trunc(checkcol[k + x * squareroot][b] / 10)){
            probability[checkcol[k + x * squareroot][b] % 10 - 1] = false;
        }
        checkcol[k + x * squareroot][b] = store;
    }

    for(let p = 0; p < square; p++){
        if(probability[p]){
            result++;
            possible = possible * 10 + p + 1;
        }   
    }

    for(let p = 0; p < square; p++){
        if(probability[p] && result == 1){
            sudoku[i][j][k].value = p + 1;
            sudoku[i][j][k].style.color = "blue";
            //lol this is shit
        }
    }

    return possible;
}

function rowcheck(i, r, result, checkrow, sudoku){
    let probability = [];
    for(let p = 0; p < square; p++){
        probability[p] = true;
    }

    for(let j = 0; j < row; j++){
        for(let k = 0; k < column; k++){
            if(r == j){
                continue;
            }
            let store = result[i][j][k];
            for(; result[i][j][k] > 0; result[i][j][k] = Math.trunc(result[i][j][k] / 10)){
                probability[result[i][j][k] % 10 - 1] = false; 
            }
            result[i][j][k] = store;
        }
    }
    
    //if that row got one empty then put the number 

    for(let p = 0; p < square; p++){
        if(probability[p]){
            checkrow[r + Math.trunc(i / 3) * 3][i % 3] = checkrow[r + Math.trunc(i / 3) * 3][i % 3] * 10 + p + 1;
        }   
    }
}

function columncheck(i, c, result, checkcol, sudoku){
    let probability = [];
    for(let p = 0; p < square; p++){
        probability[p] = true;
    }

    for(let j = 0; j < row; j++){
        for(let k = 0; k < column; k++){
            if(c == k){
                continue;
            }
            
            let store = result[i][j][k];
            for(; result[i][j][k] > 0; result[i][j][k] = Math.trunc(result[i][j][k] / 10) ){
                probability[result[i][j][k] % 10 - 1] = false;
                
            }
            result[i][j][k] = store;
        }
    }
            
    for(let p = 0; p < square; p++){
        if(probability[p]){
            checkcol[c + i % 3 * 3][Math.trunc(i / 3)] = checkcol[c + i % 3 * 3][Math.trunc(i / 3)] * 10 + p + 1;
        }   
    }
}