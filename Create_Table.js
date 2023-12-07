document.body.onload = addElement
const position = ["tl", "t", "tr",
                  "l", "m", "r",
                  "bl", "b", "br"]

function addElement() {
    let row = 9
    let column = 9

    // create table
    for (let i = 0; i < row; i++) {
        let newTr = document.createElement("tr")
        newTr.setAttribute("id", `r${i}`)
        let parrentTable = document.getElementById("mainContent")
        parrentTable.appendChild(newTr)
        for (let j = 0; j < column; j++) {
            let newTd = document.createElement("td")
            newTd.setAttribute("class", `${position[(j % 3) + (i % 3) * 3]}`)  
            newTr.appendChild(newTd)

            let newInput = document.createElement("input")
            newInput.setAttribute("type", "text")
            newInput.setAttribute("autocomplete", "off")
            newInput.setAttribute("maxlength", "1")
            newTd.appendChild(newInput)
        }
    }
    
} 