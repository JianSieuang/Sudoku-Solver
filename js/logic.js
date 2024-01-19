let sudoku = Array(9).fill().map(() => Array(9).fill(""));

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
            for (let r = i; r < i + box; r++) {
                for (let c = j; c < j + box; c++) {
                    if (sudoku[r][c] != "") {
                        if (check.get(sudoku[r][c]) == undefined){
                            check.set(sudoku[r][c], 0)
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

function showAns(){
    // if checkAvailable is false (invalid sudoku), show the error and return false
    // havent use it yet cus the algo havent finished
    console.log(checkAvailable()? "Valid Sudoku": "Invalid Sudoku")

    let loop
    let notes = Array(sudoku.length).fill().map(() => Array(sudoku.length).fill());

    // record all possible number for all grid
    for (let i = 0; i < sudoku.length; i++) {
        for (let j = 0; j < sudoku.length; j++) {
            if (sudoku[i][j] == "")
                notes[i][j] = probabilityCheck(i, j)
            else
            notes[i][j] = Array(sudoku.length).fill(false)
        }
    }
    // there is one way that no need to rewrite the notes
    // is write the ans and change the the possible of that row, col and box

    // make a few function to write down the ans and loop them if success to find out ans
    do {
        filterPossible(notes)
        loop = writeAns(notes)
    } while (loop)
    return false
}

function probabilityCheck (x, y){
    // number that has possibility to put in the grid
    let probability = Array(sudoku.length).fill(true)

    //check row and col
    for (let i = 0; i < sudoku.length; i++) {
        if (sudoku[x][i] != "")
            probability[sudoku[x][i] - 1] = false
        if (sudoku[i][y] != "")
            probability[sudoku[i][y] - 1] = false
    }
    
    //check which box
    let size = Math.sqrt(sudoku.length)
    let positionX = Math.floor(x / size) * size
    let positionY = Math.floor(y / size) * size

    // check small box
    for (let i = positionX; i < positionX + size; i++) {
        for (let j = positionY; j < positionY + size; j++) {
            if (sudoku[i][j] != "")
                probability[sudoku[i][j] - 1] = false
        }
    }

    return probability
}

function writeAns(notes) {
    // check the changes happend or not
    let box = Math.sqrt(sudoku.length)
    let num
    for (let x = 0; x < sudoku.length; x++) {
        // write the number if the grid only have one number possible
        for (let i = 0; i < sudoku.length; i++) {
            for (let j = y = z = 0; j < sudoku.length; j++) {
                if (notes[x][i][j]) {
                    z++
                    num = j + 1
                    y = i
                }
            }

            if (z == 1) {
                write(notes, x, y, num)
                console.log("1", x, y, num)
                return true
            }
        }
    }

    for (let x = 0; x < sudoku.length; x++) {
        // write the number if that row only one grid remaining for that certain number
        for (let i = 0; i < sudoku.length; i++) {
            for (let j = y = z = 0; j < sudoku.length; j++) {
                if (notes[x][j][i]) {
                    z++
                    num = i + 1
                    y = j
                }     
            }

            if (z == 1) {
                write(notes, x, y, num)
                console.log("2", x, y, num)
                return true
            }
        }
    }

    // write the number if that col only one grid remaining for that certain number
    for (let i = 0; i < sudoku.length; i++) {
        for (let j = 0; j < sudoku.length; j++) {
            for (let k = x = y = z = 0; k < sudoku.length; k++) {
                //check the first number in first col (loop the k)
                //then check the next number in first row (loop the j)
                //then change the row (loop the i)
                if (notes[k][i][j]) {
                    z++
                    num = j + 1
                    x = k
                    y = i
                }
            }

            if (z == 1) {
                write(notes, x, y, num)
                console.log("3", x, y, num)
                return true
            }
        }
    }

    // write the number if that box only one grid remaining for that certain number
    // I and J is for jumping box by box
    for (let I = 0; I < sudoku.length; I += box) {
        for (let J = 0; J < sudoku.length; J += box) {
            // i is for checking number one by one
            for (let i = 0; i < sudoku.length; i++) {  
                // j and k is check all grid in box 
                for (let j = x = y = z = 0; j < box; j++) {
                    for (let k = 0; k < box; k++) {
                        if (notes[I + j][J + k][i]) {
                            z++
                            num = i + 1
                            x = I + j
                            y = J + k
                        }
                    }
                }

                if (z == 1) {
                    write(notes, x, y, num)
                    console.log("4", x, y, num)
                    return true
                }
            }
        }
    }
    
    return false
}

function write(notes, x, y, num) {
    sudoku[x][y] = `${num}`
    notes[x][y] = []
    document.getElementById(y + x * sudoku.length).value = num
    document.getElementById(y + x * sudoku.length).style.color = "blue"

    //rewrite the probability
    //col and row
    for (let i = 0; i < sudoku.length; i++) {
        if (sudoku[i][y] == "")
            notes[i][y] = probabilityCheck(i, y)
        else
            notes[i][y] = Array(sudoku.length).fill(false)

        if (sudoku[x][i] == "")
            notes[x][i] = probabilityCheck(x, i)
        else
            notes[x][i] = Array(sudoku.length).fill(false)
    }

    //check which box
    let size = Math.sqrt(sudoku.length)
    let positionX = Math.floor(x / size) * size
    let positionY = Math.floor(y / size) * size

    // check small box
    for (let i = positionX; i < positionX + size; i++) {
        for (let j = positionY; j < positionY + size; j++) {
            if (sudoku[i][j] == "")
                notes[i][j] = probabilityCheck(i, j)
            else
                notes[i][j] = Array(sudoku.length).fill(false)
        }
    }
}