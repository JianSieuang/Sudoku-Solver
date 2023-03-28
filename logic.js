let num = [];
let sudoku = [];
let square = 9;
let squareroot = Math.sqrt(square);
let row = 3;
let column = 3;
let checkrow = [];//[which row][which box]
let checkcol = [];
const inputs = document.querySelectorAll(`input`);

inputs.forEach( input => {
    input.addEventListener(`input`, next_input =>{
        let parentTag = input.parentNode.nextSibling;   
        while(parentTag){
            if(parentTag.nodeName === 'TD'){
                const nextInput = parentTag.querySelector('input');

                if(nextInput){
                    nextInput.focus();
                    break;
                }
            }
            parentTag = parentTag.nextSibling;
        }
    });
});

function hide(){
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

function resetInput(){
    for(let i = 0; i < square; i++){
        sudoku[i] = [];
        for(let j = 0; j < row; j++){
            sudoku[i][j] = [];
            for(let k = 0; k < column; k++){
                sudoku[i][j][k] = document.getElementById(`s${i}r${j}c${k}`);
                //remove ALL
                sudoku[i][j][k].value = "";
                sudoku[i][j][k].style.color = "black"; 
            }
        }
    }
    return false;
}

//the final logic for sudoku is if just only one box inside a small square can put that number, then put the number.
//using checkrow or col to determine the left number in that row or column.
//give ture for specific numbers then check the row and column.

function showAns(){
    for(let i = 0; i < square; i++){
        //i = small square
        sudoku[i] = [];
        checkcol[i] = [];
        checkrow[i] = [];        
        for(let j = 0; j < row; j++){
            //j = row
            sudoku[i][j] = [];
            checkcol[i][j] = 0;
            checkrow[i][j] = 0; 
            for(let k = 0; k < column; k++){
                //k = column
                sudoku[i][j][k] = document.getElementById(`s${i}r${j}c${k}`);
            }
        }
    }

    let result = [];
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

function probabilityCheck (sudoku, checkrow, checkcol, i, j, k){
    let result = 0;
    let possible = 0;
    let probability = [];

    for(let i = 0; i < square; i++){
        probability[i] = true;
    }

    let x;//because of  the naming style for small square box makes that need to be specific

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