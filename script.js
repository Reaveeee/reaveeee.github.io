board = document.getElementById("board")

function generateTable() {
    var tableString = "<br><table class='table'>"
    var solution = []
    gridSize = document.getElementById("size").valueAsNumber
    if(gridSize < 2) gridSize = 2
    if(gridSize > 10) gridSize = 10

    for(i = 0; i < gridSize; i++){
        solution[i] = [];
    }

    for (row = -1; row < gridSize; row++) {
        tableString += "<tr height='50px'>"
        for (cell = -1; cell < gridSize; cell++) {
            if (row >= 0 && cell >= 0) {
                solution[row][cell] = Math.round(Math.random())
                let id = row.toString() + cell.toString()
                tableString += "<td width='50px' id='cell" + id + "' onClick='handleLeftClick(" + id + ")' class='blank'>" + " " + "</td>"
            }
            else if (cell < 0 && row >= 0) {
                tableString += "<td width='50px' id='vinst" + row + "'>" + "#" + "</td>"
            }
            else if (row < 0 && cell >= 0) {
                tableString += "<td width='50px' id='hinst" + cell + "'>" + "#" + "</td>"
            }
            else {
                tableString += "<td width='50px'>" + " " + "</td>"
            }
        }
        tableString += "</tr>"
    }
    tableString += "</table>"
    board.innerHTML = tableString

    for(row = 0; row < gridSize; row++){
        for (cell = 0; cell < gridSize; cell++){
            setupRightClickEvent(row.toString() + cell.toString())
        }
    }

    for (i = 0; i < gridSize; i++) {
        instructionObj = document.getElementById("vinst" + i)
        instructionObj.innerHTML = createVerticalInstruction(i, solution)
    }
    for (i = 0; i < gridSize; i++) {
        instructionObj = document.getElementById("hinst" + i)
        instructionObj.innerHTML = createHorizontalInstruction(i, solution)
    }
}

function handleLeftClick(cellID) {
    var cellObj = document.getElementById("cell" + cellID.toString().padStart(2, '0'))

    if(cellObj.className == "select"){
        cellObj.className = "blank"
    }
    else cellObj.className = "select"

    if (checkCompletion()) endGame()
}

function handleRightClick(cellID){
     var cellObj = document.getElementById("cell" + cellID.toString().padStart(2, '0'))

    if(cellObj.className == "blocked"){
        cellObj.className = "blank"
    }
    else cellObj.className = "blocked"

    if (checkCompletion()) endGame()
}

function checkCompletion() {
    var guesses = []
    for(i = 0; i < gridSize; i++){
        guesses[i] = [];
    }
    var correctRows = 0;
    var instructionObj
    var cellObj

    for (row = 0; row < gridSize; row++) {
        for (cell = 0; cell < gridSize; cell++) {
            cellObj = document.getElementById("cell" + row + cell)
            if (cellObj.className == "select") {
                guesses[row][cell] = 1;
            }
            else {
                guesses[row][cell] = 0;
            }
        }
    }

    for (i = 0; i < gridSize; i++) {
        instructionObj = document.getElementById("vinst" + i)
        if (instructionObj.innerHTML == createVerticalInstruction(i, guesses)) correctRows++
    }

    for (i = 0; i < gridSize; i++) {
        instructionObj = document.getElementById("hinst" + i)
        if (instructionObj.innerHTML == createHorizontalInstruction(i, guesses)) correctRows++
    }
    return correctRows == gridSize*2
}


function createVerticalInstruction(instructionIndex, selections) {
    var numbers = selections[instructionIndex]
    var instruction = ""
    for (k = 0; k < gridSize; k++) {
        instruction += numbers[k]
    }
    instruction = instruction.split("0")
    var instruction2 = ""
    for (k = 0; k < instruction.length; k++) {
        var charArray = [...instruction[k]]
        var counter = 0
        for (j = 0; j < charArray.length; j++) {
            counter += parseInt(charArray[j])
        }
        if (counter > 0) {
            instruction2 += counter + " "
        }
    }
    return instruction2
}

function createHorizontalInstruction(instructionIndex, selections) {
    var numbers = []
    var instruction = ""
    for (k = 0; k < gridSize; k++) {
        numbers[k] = (selections[k][instructionIndex])
    }
    for (k = 0; k < gridSize; k++) {
        instruction += numbers[k]
    }
    instruction = instruction.split("0")
    var instruction2 = ""
    for (k = 0; k < instruction.length; k++) {
        var charArray = [...instruction[k]]
        var counter = 0
        for (j = 0; j < charArray.length; j++) {
            counter += parseInt(charArray[j])
        }
        if (counter > 0) {
            instruction2 += counter + "<br>"
        }
    }
    return instruction2
}

function endGame(){
    alert("Finished")
}

function setupRightClickEvent(cellID){
    document.getElementById("cell" + cellID.toString().padStart(2, '0')).addEventListener("contextmenu", function(event) {
    event.preventDefault();
    handleRightClick(cellID)
});

}
