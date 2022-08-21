const btns = document.querySelectorAll('.key')
let state = 0;
let acceptDecimal = true;
let display = document.querySelector('#display')

for (btn of btns) {
    //btn.addEventListener('mouseon', highlight);
    btn.addEventListener('click', readInput);  
}

const expression = { 
    firstNum: '',
    secondNum: '',
    operation: undefined,
}

function readInput(e) {
    let input = e.target.value;
    console.log(input)
    if (state === 0 && 
        ((input >= 0 && input <=9) || (input === '.' && acceptDecimal === true))){
        if (input === '.') console.log(input)
        expression.firstNum += input;
        console.log(expression.firstNum)
        if (input === '.'){
            acceptDecimal = false;
        }
        display.textContent = expression.firstNum;
    }
    else if (state === 0 && ['+','-','*','/'].some((e)=> e===input)) {
        console.log(expression.firstNum)
        expression.operation = input;
        acceptDecimal = true;
        state++;
    }

    else if (state === 1 && (input >= 0 && input <=9) || (input === '.' && acceptDecimal === 'true')){
        expression.secondNum += input;
        acceptDecimal = false;
        if (input === '.'){
            acceptDecimal = false;
        }
        display.textContent = expression.secondNum;
    }

    else if (state === 1 && input == '='){
        state = 0;
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
                display.textContent = divide(firstNum,secondNum);
                break;
            default:
                console.log("error.")
           
          }
          expression.firstNum = display.textContent; 
          expression.secondNum = '';
          expression.operation = undefined;   
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