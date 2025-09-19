board = document.getElementById("board")

function generateTable() {
    var tableString = "<br><table class='table'>"
    var solution = [[], [], [], [], []]

    for (row = -1; row < 5; row++) {
        tableString += "<tr height='50px'>"
        for (cell = -1; cell < 5; cell++) {
            if (row >= 0 && cell >= 0) {
                solution[row][cell] = Math.round(Math.random())
                let id = row.toString() + cell.toString()
                tableString += "<td width='50px' id='cell" + row + cell + "' onClick='handleClick(" + id + ")' class='blank'>" + " " + "</td>"
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

    for (i = 0; i < 5; i++) {
        instructionObj = document.getElementById("vinst" + i)
        instructionObj.innerHTML = createVerticalInstruction(i, solution)
    }
    for (i = 0; i < 5; i++) {
        instructionObj = document.getElementById("hinst" + i)
        instructionObj.innerHTML = createHorizontalInstruction(i, solution)
    }
}

function handleClick(cellID) {
    var cellObj = document.getElementById("cell" + cellID.toString().padStart(2, '0'))

    setCellClass(cellObj)

    if (checkCompletion()) alert("Fertig")
}

function checkCompletion() {
    var guesses = [[], [], [], [], []]
    var correctRows = 0;
    var instructionObj
    var cellObj

    for (row = 0; row < 5; row++) {
        for (cell = 0; cell < 5; cell++) {
            cellObj = document.getElementById("cell" + row + cell)
            if (cellObj.className == "select") {
                guesses[row][cell] = 1;
            }
            else {
                guesses[row][cell] = 0;
            }
        }
    }

    for (i = 0; i < 5; i++) {
        instructionObj = document.getElementById("vinst" + i)
        if (instructionObj.innerHTML == createVerticalInstruction(i, guesses)) correctRows++
    }

    for (i = 0; i < 5; i++) {
        instructionObj = document.getElementById("hinst" + i)
        if (instructionObj.innerHTML == createHorizontalInstruction(i, guesses)) correctRows++
    }
    return correctRows == 10
}

function setCellClass(cellObj) {
    switch(cellObj.className)
    {
        case "blank":
            cellObj.className = "select"
            break
        case "select":
            cellObj.className = "blocked"
            break
        case "blocked":
            cellObj.className = "blank"
    }
}

function createVerticalInstruction(instructionIndex, selections) {
    var numbers = selections[instructionIndex]
    var instruction = ""
    for (k = 0; k < 5; k++) {
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
    for (k = 0; k < 5; k++) {
        numbers[k] = (selections[k][instructionIndex])
    }
    for (k = 0; k < 5; k++) {
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