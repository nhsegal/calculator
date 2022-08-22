const btns = document.querySelectorAll('.key');
let state = 0;
let acceptDecimal = true;
let display = document.querySelector('#display');
let justEqualed = false;
let maxLength = 9;

//Need to set max digits, convert to/from sci not 
const numberFormat = new Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 8,
    maximumFractionDigits: 9,
    useGrouping: false
  });
 

let firstNum = '0';
let secondNum = '0';
let operation = undefined;



for (btn of btns) {
    btn.addEventListener('click', readInput); 
    btn.addEventListener('click', pressEffect);  
    btn.addEventListener('transitionend', removeTransition);
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
        //debug();
        return;
    }

    if (input === '+/-') {
        if (state === 0) {
            if (firstNum[0] != '-' && firstNum[0] != ''){
                firstNum = '-' + firstNum; 
            }
            else if (firstNum[0] === '-') {
                firstNum = firstNum.slice(1);
            }
        }

        if (state === 1) {
            if (secondNum[0] != '-' && secondNum[0] != ''){
                secondNum = '-' + secondNum; 
            }
            else if (secondNum[0] === '-') {
                secondNum = secondNum.slice(1);
            }
        } 
        writeToDisplay();
        //debug();
        return;   
    }
    
    if (input === '%') {
        if (state === 0) {
            firstNum = firstNum/100;
        }
        if (state === 1) {
            secondNum = secondNum/100;
        }
        writeToDisplay();
        //debug();
    }

    if (state === 0) {
        if ((input >= 0 && input <=9) || (input === '.' && acceptDecimal)) {
            if (justEqualed) {
                justEqualed = false;
                firstNum = input;
                if (input === '.'){
                    acceptDecimal = false;
                }
            }
            else if (firstNum.length < maxLength ){
                if (firstNum === '0' && input != '.') {
                    firstNum = input;
                }
                else {
                    firstNum += input;
                }
                if (input === '.'){
                    acceptDecimal = false;
                }
            }
        }
        else if (['+','-','*','/'].some((e)=> e===input)) {
            operation = input;
            acceptDecimal = true;
            state++;
        }           
        writeToDisplay();
        //debug();
        return;
    }

    if (state === 1) {
        if ((input >= 0 && input <=9) || (input === '.' && acceptDecimal)) {
            if (secondNum.length < maxLength) {
                if (secondNum === '0' && input != '.') {
                    secondNum = input;
                }
                else {
                    secondNum += input;
                }
                if (input === '.'){
                    acceptDecimal = false;
                }
            }
            writeToDisplay();
            //debug();
            return;
        }
        else if (['+','-','*','/','='].some((e)=> e===input)) {
            acceptDecimal = true;
            firstNum = Number(firstNum);
            secondNum = Number(secondNum);
            let result;
            switch (operation) {
                case ('+'):
                    result = add(firstNum,secondNum);
                    break;
                case ('-'):
                    result = subtract(firstNum,secondNum);
                    break;
                case ('*'):
                    result = multiply(firstNum,secondNum);
                    break;
                case ('/'):
                    result = numberFormat.format(divide(firstNum,secondNum));          
                    break;
                default:
                    console.log("error.")
            }
            let formattedNumber = numberFormat.format(result)
            firstNum = formattedNumber.toString();
            secondNum = '0';
            writeToDisplay();
            if (input === '=') {
                justEqualed = true;
                state = 0;   
                operation = undefined;
            }
            else {
                state = 1;   
                operation = input;
            }
        } 
        //debug();
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
    firstNum = '0';
    operation = undefined;
    secondNum = '0';
    acceptDecimal = true;
}

function writeToDisplay() {
   
    if (state === 0 || secondNum === '0') {
        display.textContent = firstNum;
        return;
    }
    display.textContent = secondNum;
    return;
}

function pressEffect(e){
    let key = document.querySelector(`button[value="${e.target.value}"]`);
    key.classList.add('pressed');
    console.log(key)
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('pressed'); 
}


function debug(){
    console.clear();
    console.log(`First is ${firstNum}`)
    console.log(`Operation is ${operation}.`)
    console.log(`Second is ${secondNum}`)
    console.log(`State is ${state}.`)
    //console.log(`AcceptDecimal is ${acceptDecimal}.`)
}