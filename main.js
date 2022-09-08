
window.onload = displayTime()

function displayTime() {
    const time = document.querySelector(".time")
    time.textContent = new Date().toLocaleTimeString()
    setTimeout(displayTime, 1000)
}



// mathematical functions

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



// global variables
let digitCount = 0
let decimalCount = 0
let stored = []
let calculated = 0
let currOperator = ""
let operand = ""



// button and display functionality

const buttons = document.querySelectorAll("button")
const currDisplay = document.querySelector(".currentDisplay")
buttons.forEach(btn => btn.addEventListener("click", e => applyUserInput(e)))



function applyUserInput(e) {
    console.log("count " + digitCount)
    console.log(operand)
    // checks what button was pressed by user then calls other handler functions
    if (e.target.classList[0] === "num") {
        displayNumber(e)
        storeOperand(e)
    } else if (e.target.classList[0] === "clear")
        clearAll()

    if (digitCount > 0) { // a number should exist before a decimal or an operator
        if (e.target.classList[0] === "operator") {
            storeUserInput(e)
            if (stored.length === 2) {calculateExpression(e)}
            decimalCount === 1 ? decimalCount -- : decimalCount = 0 // resets back to zero 
        } else if (e.target.classList[0] === "decimal" && decimalCount === 0) { // only 1 decimal allowed per operand
            decimalCount++
            displayDecimal(e)
            storeOperand(e)
        }
    }
}

// non-operational related functions
function clearAll() {
    currDisplay.textContent = ""
    digitCount = 0
    stored = []
    calculated = 0
    currOperator = ""
    operand = ""
}


// history display
function updateDisplay() {
    currDisplay.textContent = calculated
}



// number-related functions 

function storeOperand(e) {
    operand += e.target.innerHTML
}


function displayNumber(e) {
    const lengthBoundaries = [7, 9, 13]

    // if (digitCount % 3 === 0 && digitCount !== 0 && digitCount < 15) {
    //     currDisplay.textContent += ","
    // }
    if (digitCount < 15) {
        digitCount++
        currDisplay.textContent += e.target.innerHTML
        
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

function displayDecimal(e) {
    currDisplay.textContent += e.target.innerHTML
}



// operator-related functions
function storeUserInput(e) {
    currDisplay.textContent += e.target.innerHTML
    stored.push(Number(operand))  // change to Number type in order to be calculable
    operand = ""
    if (stored.length === 1) {
        currOperator = e.target.classList[1]
    }
    console.log(stored)
}



function calculateExpression(e) {
    calculated = operate(currOperator, stored[0], stored[1])
    updateDisplay()
    stored = [calculated]
    digitCount++
    
}



