
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
let calculatedNum = false
const nums = "0123456789"
const currDisplay = document.querySelector(".currentDisplay")


// EVENT LISTENERS
const buttons = document.querySelectorAll("button")
buttons.forEach(btn => btn.addEventListener("click", e => applyUserInput(e)))


// Restrictions:
// Calculated numbers cannot be modified (ie. can only be operated on not extended by other numbers or a decimal)



// Checks what button was pressed by user then calls other handler functions
function applyUserInput(e) {
    switch (e.target.classList[0]) {
        case "num":
            if (!calculatedNum) {
                displayNumber(e)
                setAsOperand(e)
            } break
        case "clear":
            clearAll()
            break
        case "backspace":
            if (!calculatedNum) {backspace()}
            break
        case "decimal":
            if (decimalCount === 0 && !calculatedNum) { // 1 decimal per operand
                if (!nums.includes(getLastCharOnDisplay())) { 
                    getDecimalPlaceholder()
                }
                decimalCount++
                setAsOperand(e)
                displayCharacter(e)
            } break
        case "equal":
            if (currOperator !== "") {
                storeUserInput(e)
                calculateExpression()
                decimalCount === 1 ? decimalCount-- : decimalCount = 0 // reset it for new operand
            } break
        case "operator":
            if (nums.includes(getLastCharOnDisplay())) { // number comes before an operator
                storeUserInput(e)
                displayCharacter(e)
                
                if (stored.length === 2) { // if x and y operands are present, calculate it and display as current operator
                    calculateExpression()
                    storeUserInput(e)
                    displayCharacter(e)
                }
                if (stored.length === 1) {currOperator = e.target.classList[1]} // if only x is present, apply as current operator
                decimalCount === 1 ? decimalCount-- : decimalCount = 0
                calculatedNum = false // reset it for new operand
            } break
    }
}



// OPERATOR-RELATED FUNCTIONS
function storeUserInput(e) {
    stored.push(Number(operand))  // change to Number type in order to be calculable
    operand = ""
}


function calculateExpression() {
    if (currOperator === "divide" && stored[1] === 0) {
        divisionByZeroError()
    } else {
        calculated = operate(currOperator, stored[0], stored[1])
        displayCalculated()
        digitCount++
        stored = [] // removes previous expression
        operand = calculated
        currOperator = ""
    }
}


// DISPLAY-RELATED FUNCTIONS
function clearAll() {
    currDisplay.textContent = ""
    digitCount = 0
    decimalCount = 0
    stored = []
    calculated = 0
    currOperator = ""
    operand = ""
    calculatedNum = false
}


function backspace() {
    currDisplay.textContent = currDisplay.textContent.slice(0,-1)
    operand = operand.slice(0,-1)
}


function displayCalculated() {
    currDisplay.textContent = calculated.toFixed(3)
    calculatedNum = true
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

function divisionByZeroError() {
    currDisplay.textContent = "B R U H"
    setTimeout(function() {clearAll()}, 3000)
}

function getLastCharOnDisplay() {
    let lastChar = currDisplay.innerHTML[currDisplay.innerHTML.length-1]
    return lastChar
}
// NUMBER-RELATED FUNCTIONS

function setAsOperand(e) {
    operand += e.target.innerHTML
}

function getDecimalPlaceholder() {
    currDisplay.textContent += "0"
}




