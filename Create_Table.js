document.body.onload = addElement(9)

function addElement(num) {
    let position = ["tl", "t", "tr","l", "m", "r", "bl", "b", "br"]
    let size = num
    let boxsize = Math.sqrt(size)

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

