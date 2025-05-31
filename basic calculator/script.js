const display = document.getElementById('calcDisplay');
let currentInput = '';

function appendToDisplay(value) {
    if (currentInput === '0' && value === '0') {
        return;
    }
    if (value === '.' && currentInput.includes('.')) {
        const lastNumber = currentInput.split(/[\+\-\*\/]/).pop();
        if (lastNumber.includes('.')) {
            return;
        }
    }
    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    display.value = currentInput;
}

function clearDisplay() {
    currentInput = '';
    display.value = '0';
}

function calculate() {
    try {
        if (currentInput === '') {
            display.value = '0';
            return;
        }
        if (currentInput.includes('/0')) {
            throw new Error('Division by zero');
        }
        let result = eval(currentInput);
        if (!isFinite(result)) {
            throw new Error('Result is undefined');
        }
        result = Math.round(result * 10000000000) / 10000000000;
        currentInput = result.toString();
        display.value = currentInput;
    } catch (error) {
        display.value = 'Error';
        currentInput = '';
    }
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if ((key >= '0' && key <= '9') || key === '.') {
        appendToDisplay(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput || '0';
    }
});
