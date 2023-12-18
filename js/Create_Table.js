document.body.onload = addElement(9)

function addElement(size) {
    let position = [];
    let boxsize = Math.sqrt(size)

    // create class name attribute for table 
    for (let i = 0; i < boxsize; i++) {
        for (let j = 0; j < boxsize; j++) {
            if (i == 0) {
                if (j == 0) {
                    position[i*boxsize + j] = "tl"
                }
                else if (j == boxsize - 1) {
                    position[i*boxsize + j] = "tr"
                }
                else {
                    position[i*boxsize + j] = "t"
                }
            }
            else if (i == boxsize - 1) {
                if (j == 0) {
                    position[i*boxsize + j] = "bl"
                }
                else if (j == boxsize - 1) {
                    position[i*boxsize + j] = "br"
                }
                else {
                    position[i*boxsize + j] = "b"
                }
            }
            else {
                if (j == 0) {
                    position[i*boxsize + j] = "l"
                }
                else if (j == boxsize - 1) {
                    position[i*boxsize + j] = "r"
                }
                else {
                    position[i*boxsize + j] = "m"
                }
            }
        }
    }

    // create table
    for (let i = 0; i < size; i++) {
        let newTr = document.createElement("tr")
        newTr.setAttribute("id", `r${i}`)

        let parrentTable = document.getElementById("mainContent")
        parrentTable.appendChild(newTr)

        for (let j = 0; j < size; j++) {
            let newTd = document.createElement("td")
            newTd.setAttribute("class", `${position[(j % boxsize) + (i % boxsize) * boxsize]}`)  
            newTr.appendChild(newTd)

            let newInput = document.createElement("input")
            newInput.setAttribute("id", j + i*size)
            newInput.setAttribute("type", "text")
            newInput.setAttribute("onClick", "this.select()")
            newInput.setAttribute("autocomplete", "off")
            newInput.setAttribute("maxlength", "1")
            newTd.appendChild(newInput)
        }
    }
}

