
window.onload = displayTime()

function displayTime() {
    const time = document.querySelector(".time")
    time.textContent = new Date().toLocaleTimeString()
    setTimeout(displayTime, 1000)
}


// MATHEMATICAL FUNCTIONS
function add(x, y) {
    return x + y
}

function subtract(x, y) {
    return x - y
}

function multiply(x, y) {
    return x * y
}

function divide(x, y) {
    return x / y
}

function operate(operator, x, y) {
    switch (operator) {
        case "add":
            return add(x, y)
        case "subtract":
            return subtract(x, y)
        case "multiply":
            return multiply(x, y)
        case "divide":
            return divide(x, y)
    }
}


// GLOBAL VARIABLES
let digitCount = 0
let decimalCount = 0
let stored = []
let calculated = 0
let currOperator = ""
let operand = ""  // temp variable
const currDisplay = document.querySelector(".currentDisplay")


// EVENT LISTENERS
const buttons = document.querySelectorAll("button")
buttons.forEach(btn => btn.addEventListener("click", e => applyUserInput(e)))


// checks what button was pressed by user then calls other handler functions
function applyUserInput(e) {
    switch (e.target.classList[0]) {
        case "num":
            displayNumber(e)
            setAsOperand(e)
            break
        case "clear":
            clearAll()
            break
        case "backspace":
            backspace()
            break
        case "decimal":
            if (decimalCount === 0) { // 1 decimal per operand
                decimalCount++
                setAsOperand(e)
                displayCharacter(e)
            }
            break
        case "operator":
            if (digitCount > 0) { // number comes before a decimal or an operator
                console.log(digitCount)
                storeUserInput(e)
                displayCharacter(e)
                decimalCount === 1 ? decimalCount -- : decimalCount = 0 // reset it for new operand
    
                if (stored.length === 2) {
                    calculateExpression()

                }
            }
            console.log(stored)
            break
    }
}



// OPERATOR-RELATED FUNCTIONS
function storeUserInput(e) {
    stored.push(Number(operand))  // change to Number type in order to be calculable
    operand = ""
    if (stored.length === 1) {
        currOperator = e.target.classList[1]
    }
}


function calculateExpression() {
    calculated = operate(currOperator, stored[0], stored[1])
    displayCalculated()
    digitCount++
    stored = [] // removes previous expression
    operand = calculated
}


// DISPLAY-RELATED FUNCTIONS
function clearAll() {
    currDisplay.textContent = ""
    digitCount = 0
    stored = []
    calculated = 0
    currOperator = ""
    operand = ""
}


function backspace() {
    currDisplay.textContent = currDisplay.textContent.slice(0,-1)
    operand = operand.slice(0,-1)
}


function displayCalculated() {
    currDisplay.textContent = calculated
}


function displayNumber(e) {
    const lengthBoundaries = [7, 9, 13]

    // if (digitCount % 3 === 0 && digitCount !== 0 && digitCount < 15) {
    //     currDisplay.textContent += ","
    // }
    if (digitCount < 15) {
        digitCount++
        currDisplay.textContent += e.target.innerHTML
        console.log("Displaying '" + e.target.innerHTML + "'")
        
        if (lengthBoundaries.includes(getDisplayCharLength())) {
            changeDisplayFont(getDisplayCharLength())
        }
    }
}


function getDisplayCharLength() {
    return (currDisplay.innerHTML).length
}


function changeDisplayFont(charLength) {
    switch (charLength) {
        case 7:
            currDisplay.classList.add("shrinkDisplay1")
            break;
        case 9:
            currDisplay.classList.add("shrinkDisplay2")
            break;
        case 13:
            currDisplay.classList.add("shrinkDisplay3")
            break;
    }
}


function displayCharacter(e) {
    currDisplay.textContent += e.target.innerHTML
    console.log("displaying non-numeric: " + e.target.innerHTML)
}


// NUMBER-RELATED FUNCTIONS

function setAsOperand(e) {
    operand += e.target.innerHTML
}




