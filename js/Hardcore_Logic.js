//this js is for filter not important possible and goodluck
//time spend : 7 hours
function filterPossible(notes){
    // inside small box
    let box = Math.sqrt(sudoku.length) 

    // talk about two possible numbers inside two grid and others grid dont have this two possible numbers
    // which means that we can confirm other possible numbers inside these two grid is not been possible 
    // also there is three possible in three grid only and four and five so on.

    // write down the possible into possible array 
    //this is just first box only, need to add on
    for (let I = 0; I < sudoku.length; I += box) {
        for (let J = 0; J < sudoku.length; J += box) {
            filterinnerbox(notes, I, J)
        }
    }

    // need to store the number if the certain number just appear in certain row or col in the box
    // which means that same row but different boxes are not allow to put that number
    // outside small box, between box and box

    for (let I = 0; I < sudoku.length; I += box) {
        for (let J = 0; J < sudoku.length; J += box) {
            filterouterbox(notes, I, J)
        }
    }
}

// function for inner box
function filterinnerbox(notes, I, J) {
    let box = Math.sqrt(sudoku.length) 
    let possible = Array(sudoku.length).fill().map(() => Array(sudoku.length).fill(false))

    for (let i = I; i < box + I; i++) {
        for (let j = J; j < box + J; j++) {
            for (let p = 0; p < possible.length; p++) {
                possible[p][i*box +j]= notes[i][j][p]
            }
        }
    }

    // from 2 pair until 9
    for(let i = 2; i < possible.length; i++) {
        let list = []
        for (let p = 0; p < possible.length - 1; p++) {
            //check the number that got how many places can put 
            let count = possible[p].filter(x => x == true).length
            // find the same number of places
            if (count == i) {
                // store it in a list
                list.push(p)
            }
        }
        // compare the list
        compare(notes, possible, list, i, I, J)
    }
}

function compare(notes, possible, list, number, I, J) {
    // if the list.length is smaller than the number, skip the process
    if (list.length > number) {
        for (let i = 0; i < list.length - 1; i++) {
            let temp = []
            temp.push(list[i])
            //fullfill then put into "temp" array
            for (let j = i + 1; j < list.length && temp.length < number; j++) {
                if (possible[list[i]].toString() == possible[list[j]].toString()) {
                    temp.push(list[j])
                }
            }
            // check the number of same place is fullfill for its number of places the number can put
            if (temp.length == number) {
                // check the grid that need to filter others possible exclude the pair we found
                // indexes are positions, temp are the numbers 
                let indexes = possible[temp[0]].map((element, index) => (element == true? index: -1)).filter((index)=> index !== -1)
                rewrite(notes, indexes, temp, I, J)
            }
            temp = []
        }
    }
}

function rewrite(notes, indexes, temp, I, J) {
    let box = Math.sqrt(sudoku.length) 
    for (let i = I; i < box + I; i++) {
        for (let j = J; j < box + J; j++) {
            // k is loop for indexes
            for (let k = 0; k < indexes.length; k++) {
                if (Math.floor(indexes[k] / box) == i && indexes[k] % box == j) {
                    notes[i][j] = Array(sudoku.length).fill(false)
                    
                    // l is loop for number possible
                    for (let l = 0; l < temp.length; l++) {
                        notes[i][j][temp[l]] = true
                    }
                }
            }
        }
    }
}

// function for outer box
function filterouterbox(notes, I, J) {
    let box = Math.sqrt(sudoku.length)

    let rowcheck = []
    let colcheck = []
    for (let p = 0; p < sudoku.length; p++) {
        for (let i = I; i < box + I; i++) {
            for (let j = J; j < box + J; j++) {
                if (notes[i][j][p]) {
                    rowcheck[i % box]++
                    colcheck[j % box]++
                }
            }
        }
        
        for (let i = 0; i < box; i++) {
            
        }



        rowcheck = []
        colcheck = []
    }
    


}
