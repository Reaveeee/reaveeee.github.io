board = document.getElementById("board")

function generateTable() {
    tableString = "<br><table class='table'>"
    solution = [[], [], [], [], []]

    for (row = -1; row < 5; row++) {
        tableString += "<tr height='50px'>"
        for (cell = -1; cell < 5; cell++) {
            if (row >= 0 && cell >= 0) {
                solution[row][cell] = Math.round(Math.random())
                id = row.toString() + cell.toString()
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
        numbers = solution[i]
        instruction = ""
        for (k = 0; k < 5; k++) {
            instruction += numbers[k]
        }
        instruction = instruction.split("0")
        instruction2 = ""
        for (k = 0; k < instruction.length; k++) {
            charArray = [...instruction[k]]
            counter = 0
            for (j = 0; j < charArray.length; j++) {
                counter += parseInt(charArray[j])
            }
            if (counter > 0) {
                instruction2 += counter + " "
            }
        }
        instructionObj.innerHTML = instruction2
    }
    for (i = 0; i < 5; i++) {
        instructionObj = document.getElementById("hinst" + i)
        numbers = []
        instruction = ""
        for (k = 0; k < 5; k++) {
            numbers[k] = (solution[k][i])
        }
        for (k = 0; k < 5; k++) {
            instruction += numbers[k]
        }
        instruction = instruction.split("0")
        instruction2 = ""
        for (k = 0; k < instruction.length; k++) {
            charArray = [...instruction[k]]
            counter = 0
            for (j = 0; j < charArray.length; j++) {
                counter += parseInt(charArray[j])
            }
            if (counter > 0) {
                instruction2 += counter + "<br>"
            }
        }
        instructionObj.innerHTML = instruction2
    }
}

function handleClick(cellID) {
    if (cellID.toString().length > 1) {
        cellObj = document.getElementById("cell" + cellID)
    }
    else {
        cellObj = document.getElementById("cell" + 0 + cellID)
    }

    setCellClass()

    if (checkCompletion()) alert("Fertig")

}

function checkCompletion() {
    guesses = [[], [], [], [], []]

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

    correctRows = 0;

    for (i = 0; i < 5; i++) {
        instructionObj = document.getElementById("vinst" + i)
        numbers = guesses[i]
        instruction = ""
        for (k = 0; k < 5; k++) {
            instruction += numbers[k]
        }
        instruction = instruction.split("0")
        instruction2 = ""
        for (k = 0; k < instruction.length; k++) {
            charArray = [...instruction[k]]
            counter = 0
            for (j = 0; j < charArray.length; j++) {
                counter += parseInt(charArray[j])
            }
            if (counter > 0) {
                instruction2 += counter + " "
            }
        }
        if (instructionObj.innerHTML == instruction2) correctRows++
    }

    for (i = 0; i < 5; i++) {
        instructionObj = document.getElementById("hinst" + i)
        numbers = []
        instruction = ""
        for (k = 0; k < 5; k++) {
            numbers[k] = (guesses[k][i])
        }
        for (k = 0; k < 5; k++) {
            instruction += numbers[k]
        }
        instruction = instruction.split("0")
        instruction2 = ""
        for (k = 0; k < instruction.length; k++) {
            charArray = [...instruction[k]]
            counter = 0
            for (j = 0; j < charArray.length; j++) {
                counter += parseInt(charArray[j])
            }
            if (counter > 0) {
                instruction2 += counter + "<br>"
            }
        }
        if (instructionObj.innerHTML == instruction2) correctRows++
    }
    return correctRows == 10
}

function setCellClass() {

    if (cellObj.className == "blank") {
        cellObj.className = "select"
        return
    }

    if (cellObj.className == "select") {
        cellObj.className = "blocked"
        return
    }

    cellObj.className = "blank"
}