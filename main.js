
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