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

function showAns(){
    // if checkAvailable is false (invalid sudoku), show the error and return false
    // havent use it yet cus the algo havent finished
    console.log(checkAvailable()? "Valid Sudoku": "Invalid Sudoku")

    let loop
    let notes = Array(sudoku.length).fill().map(() => Array(sudoku.length).fill());

    // make a few function to write down the ans and loop them if success to find out ans
    do {
        // record all possible number for all grid
        for (let i = 0; i < sudoku.length; i++) {
            for (let j = 0; j < sudoku.length; j++) {
                if (sudoku[i][j] == "")
                    notes[i][j] = probabilityCheck(i, j)
                else
                    notes[i][j] = []
            }
        }

        loop = writeAns(notes)
    } while (false)

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
    let change = false
    let num

    notes.forEach((note, x) => {
        // write the number if the grid only have one number possible
        for (let i = 0; i < sudoku.length; i++) {
            for (let j = y = z = 0; j < sudoku.length; j++) {
                if (note[i][j]) {
                    z++
                    num = j + 1
                    y = i
                }
            }

            if (z == 1) {
                change = write(notes, x, y, num)
            }
        }
        // write the number if that row only one grid remaining for that certain number
        for (let i = 0; i < sudoku.length; i++) {
            for (let j = y = z = 0; j < sudoku.length; j++) {
                if (note[j][i]) {
                    z++
                    num = i + 1
                    y = j
                }     
            }

            if (z == 1) {
                change = write(notes, x, y, num)
            }
        }
    })

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
                change = write(notes, x, y, num)
            }
        }
    }


    // problem 
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
                    change = write(notes, x, y, num)
                }
            }
        }
    }
    
    return change
}

function write(notes, x, y, num) {
    sudoku[x][y] = `${num}`
    notes[x][y] = []
    document.getElementById(y + x * sudoku.length).value = num
    document.getElementById(y + x * sudoku.length).style.color = "blue"
    return true
}