
window.onload = displayTime()

function displayTime() {
    const time = document.querySelector(".time")
    time.textContent = new Date().toLocaleTimeString()
    setTimeout(displayTime, 1000)
}

/* mathematical functions*/

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
    return operator(x, y)
}

/* button functionality */

let digitCount = 0;

const buttons = document.querySelectorAll("button")
const currDisplay = document.querySelector(".currentDisplay")
buttons.forEach(btn => btn.addEventListener("click", e => displayCharacter(e)))


function displayCharacter(e) {
    const lengthBoundaries = [7, 9, 13]

    if (digitCount % 3 === 0 && digitCount !== 0 && digitCount < 15) {
        currDisplay.textContent += ","
    }
    if ((digitCount < 15) && (e.target.classList[0] === "num")) {
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

