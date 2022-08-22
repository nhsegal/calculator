const btns = document.querySelectorAll('.key');
let state = 0;
let acceptDecimal = true;
let display = document.querySelector('#display');
let justEqualed = false;
let maxLength = 9;

const numberFormat = new Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 9,
    maximumFractionDigits: 9,
    useGrouping: false
  });
 

var sNumber = '1124.5'
var number = Number(sNumber);
console.log(numberFormat.format(1000000))

for (btn of btns) {
    //btn.addEventListener('mouseon', highlight);
    btn.addEventListener('click', readInput);  
}

const expression = { 
    firstNum: '',
    secondNum: '',
    operation: undefined,
}

// In state 0, write to firstNum or operation. 
// In state 1, write to secondNum

// In state 1:
// After equals
// firstNum = display
// if input is a number, clear firstNum and put input in firstNum
// if input is operation, set operation to it and change to state 1


function readInput(e) {
    let input = e.target.value;
    if (input === 'AC') {
        allClear();
        return;
    }

    if (input === '+/-') {
        console.log ('here')
        if (state === 0) {
            if (expression.firstNum[0] != '-' && expression.firstNum[0] != ''){
                expression.firstNum = '-' + expression.firstNum; 
            }
            else if (expression.firstNum[0] === '-') {
                expression.firstNum = expression.firstNum.slice(1);
            }
            numberFormat.maximumFractionDigits = maxLength - firstNum.length - 1;
            display.textContent = numberFormat.format((Number(expression.firstNum)));
        }

        if (state === 1) {
            if (expression.secondNum[0] != '-' && expression.secondNum[0] != ''){
                expression.secondNum = '-' + expression.secondNum; 
            }
            else if (expression.secondNum[0] === '-') {
                expression.secondNum = expression.secondNum.slice(1);
            }
            display.textContent = numberFormat.format((Number(expression.secondNum)));
        } 
        return;   
    }
    
    if (input === '%') {
        if (state === 0) {
            expression.firstNum = expression.firstNum/100;
            display.textContent = numberFormat.format((Number(expression.firstNum)));
        }
        if (state === 1) {
            expression.secondNum = expression.secondNum/100;
            display.textContent = numberFormat.format((Number(expression.secondNum)));
        }
        
    }

    if (state === 0) {
        if ((input >= 0 && input <=9) || (input === '.' && acceptDecimal)) {
            if (justEqualed) {
                expression.firstNum = input;
                if (input === '.'){
                    acceptDecimal = false;
                }
            }
            else if (expression.firstNum.length < maxLength ){
                expression.firstNum += input;
                if (input === '.'){
                    acceptDecimal = false;
                }
            }
        }
        else if (['+','-','*','/'].some((e)=> e===input)) {
            expression.operation = input;
            acceptDecimal = true;
            state++;
        }           
        display.textContent = numberFormat.format((Number(expression.firstNum)));
        return;
    }

    if (state === 1) {
        if ((input >= 0 && input <=9) || (input === '.' && acceptDecimal)) {
            expression.secondNum += input;
            if (input === '.'){
                acceptDecimal = false;
            }
            display.textContent = expression.secondNum;
        }
        else if (['+','-','*','/','='].some((e)=> e===input)) {
            acceptDecimal = true;
            let firstNum = Number(expression.firstNum);
            let secondNum = Number(expression.secondNum);
            switch (expression.operation) {
                case ('+'):
                    display.textContent = add(firstNum,secondNum);
                    break;
                case ('-'):
                    display.textContent = subtract(firstNum,secondNum);
                    break;
                case ('*'):
                    display.textContent = multiply(firstNum,secondNum);
                    break;
                case ('/'):
                    display.textContent = numberFormat.format(divide(firstNum,secondNum));
                    
                    break;
                default:
                    console.log("error.")
            }
            expression.secondNum = '';
            if (input === '=') {
                justEqualed = true;
                state = 0;   
                expression.operation = undefined;
                expression.firstNum = display.textContent; 
            }
            else {
                state = 1;   
                expression.operation = input;
                expression.firstNum = display.textContent; 
            }
        } 
        return;
    }
}

function add(a,b) { 
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b){
    if (b == 0) {
        return "Error"
    }
    return a/b;
}

function operate(a, b, operator) {
    if (operator == '+') {
        return add(a,b)
    }
    else if (operator == '-') {
        return subtract(a,b)
    }
    else if (operator == '*') {
        return multiply(a,b)
    }
    else if (operator == '/') {
        return divide(a,b)
    }
}

function allClear(){
    display.textContent = 0;
    state = 0;
    expression.firstNum = '';
    expression.operation = undefined;
    expression.secondNum = '';
    acceptDecimal = true;
}


function debug(){
    console.log(`First is ${expression.firstNum}.`)
    console.log(`Operation is ${expression.operation}.`)
    console.log(`Second is ${expression.secondNum}.`)
    console.log(`State is ${state}.`)
    console.log(`AcceptDecimal is ${acceptDecimal}.`)
}