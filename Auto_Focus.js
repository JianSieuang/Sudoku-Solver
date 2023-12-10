setTimeout(() =>{
    const inputs = document.querySelectorAll("input")

    inputs.forEach( (input, index) => {
        input.addEventListener(`input`, () =>{        
            if (!(input.value > 0)) {
                input.value = ""    
            }
            else{
                sudoku[(index / Math.sqrt(inputs.length)) | 0][index % Math.sqrt(inputs.length)] = input.value
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus()
                }
            }
            
        })  

        input.addEventListener(`keydown`, (e) =>{
            switch(e.key) {
                case "ArrowLeft":
                    if(index > 0)
                        inputs[index - 1].focus()
                    else 
                        inputs[inputs.length - 1].focus()
                    break
                case "ArrowRight":
                    if(index < inputs.length - 1)
                        inputs[index + 1].focus()
                    else
                        inputs[0].focus()
                    break
                case "ArrowUp":
                    if(index >  Math.sqrt(inputs.length) - 1)
                        inputs[index -  Math.sqrt(inputs.length)].focus()
                    break
                case "ArrowDown":
                    if(index < inputs.length -  Math.sqrt(inputs.length))
                        inputs[index +  Math.sqrt(inputs.length)].focus()
                    break
            }
        })

        input.addEventListener(`focus`, () =>{
            input.select()
        })
    })
}, 100)