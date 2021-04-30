

let subFlag = true;
let equalFlag = true;
let checkFlag = false;
let micFlag = false;
let balanceFlag = true;
let checkBracket = 0;
// let closeBracket = 0;
onload = function run() {
  chooseOperator();
  chooseNumber();
  microphone();
}

let operators = document.getElementsByClassName('operator');
let numbers = document.getElementsByClassName('number');


function chooseOperator() {
  for (let i = 0; i < operators.length; i++ ) {
    operators[i].addEventListener('click', function(e) {
      let history = getHistory(); 
      let output = getOutput();
      if (this.id === 'AC') {
        setHistory('');
        setOutput('');
        subFlag = true;
      } else if (this.id === 'backspace') {
        if (equalFlag === false) {
          setHistory('');
          history = getHistory();
          history = history.concat(output);
          setHistory(history);
        }
        else if (history) {
          if (!isNaN(history[history.length - 1])) {
            history = history.substr(0,history.length - 1);
            setHistory(history);
          } else if (!isNaN(history[history.length - 1])) {
            history = history.substr(0,history.length - 1);
            setHistory(history);
            let tmp = history;
            tmp  = checkOperator(tmp);
            evaluate(tmp);
          }
        } 
        if (isNaN(history[history.length - 1])) {
          let tmp = history;
          tmp = tmp.substr(0,tmp.length - 1);
          tmp  = checkOperator(tmp);
          evaluate(tmp);
          
        }
        if (history === '') {
          setOutput('');
          subFlag = true;
        }
      } else if (this.id === '()') {
        if (equalFlag === false) {
  
              let hist = document.getElementById('history-value');
              hist.classList.toggle('history');
              let out = document.getElementById('output-value');
              out.classList.toggle('output');
              equalFlag = true;
              setHistory('');
              setOutput('');
              history = getHistory(history);
        }     
        let bracket = BalanceBrackets(history);
        history = history.concat(bracket);
        tmp = history;
        history = checkInput(history);
        setHistory(history);

        tmp  = checkOperator(tmp);
        evaluate(tmp);
      } else if (history === '') {
  
        if (this.id === '-' && subFlag === true) {
          history = history.concat(this.id);
          setHistory(history);
          subFlag = false;
        } 
        else if (this.id === '.') {
          history = history.concat('0.');
          setHistory(history);
        }
      } else {
        if (isNaN(history[history.length - 1])) {
          if (!(history[history.length - 1] === '(' || history[history.length - 1] === ')')) {
            history = history.substr(0,history.length - 1);
            setHistory(history);
          }
        }
        if (history !== '') {
          if (this.id === '=' && equalFlag === true) {
            let hist = document.getElementById('history-value');
            hist.classList.toggle('history');
            let out = document.getElementById('output-value');
            out.classList.toggle('output');
            equalFlag = false;

          } 
          if (this.id !== '=') {
            if (equalFlag === false) {
  
              let hist = document.getElementById('history-value');
              hist.classList.toggle('history');
              let out = document.getElementById('output-value');
              out.classList.toggle('output');
              
              
              setHistory('');
              history = getHistory();
              history = history.concat(output);
              setHistory(history);
              

              equalFlag = true;
            }
            
            if (history[history.length - 1] !== '(') {
              if (this.id === '/') {
              history = history.concat(this.innerHTML);
              setHistory(history);
              } else if (this.id === '*') {
              history = history.concat(this.innerHTML);
              setHistory(history);
              } else if (this.id === '%') {
                history = history.concat(this.innerHTML);
                setHistory(history);
              }
            } 
              
            if (this.id === '+' || this.id === '-' || this.id === '.') {
              history = history.concat(this.id);
              setHistory(history);
            } 
          }
        }
      } 
    }); 
  }   
}
function chooseNumber() {
  for (let i = 0; i < numbers.length; i++ ) {
    numbers[i].addEventListener('click', function() {
      let history = getHistory();
      
      

      history  = history.concat(this.id);
      let tmp = history;
      tmp  = checkOperator(tmp);
      evaluate(tmp); 
      if (equalFlag === false) {
        
        let hist = document.getElementById('history-value');
        hist.classList.toggle('history');
        let out = document.getElementById('output-value');
        out.classList.toggle('output');
              
        setHistory('');
        history = getHistory();  
        history = history.concat(this.id);  
        tmp = history; 
        setOutput('');
        setHistory(history);
        setOutput(history);
            
        equalFlag = true;
      }
      
      
    }); 
  }   
}
function checkOperator(tmp) {
  let divide = document.getElementById('/');
  let mult = document.getElementById('*');

  for (let i = 0; i < tmp.length; i++) {
    if (tmp[i] === divide.innerHTML) {
      tmp = tmp.replace(divide.innerHTML, '/');
      checkFlag = true;
    }
    if (tmp[i] === mult.innerHTML) {
      tmp = tmp.replace(mult.innerHTML, '*');
      checkFlag = true;
      }
    }
  return tmp;
  
}

function getHistory() {
  return document.getElementById('history-value').innerHTML;
}

function setHistory(num) {
  if (num === '') {
    document.getElementById('history-value').innerHTML = num;
  } 
  else {
    document.getElementById('history-value').innerHTML = num;
  }
}

function getOutput() {
  return document.getElementById('output-value').innerHTML;
}

function setOutput(num) {
  document.getElementById('output-value').innerHTML = num;
}

// function getFormattedNumber(num) {
//   if (num === '-') {
//     return '';
//   }

//   let n = Number(num);
//   let val = n.toLocaleString("en");
//   return val;
// }

// function reverseNumberFormat(num) {
//   return Number(num.replace(/,/g, ''));
// }


function microphone() {
  let mic = document.getElementById('microphone');

  mic.addEventListener('click', function() {
    mic.classList.add('record');
    let recognition = new (window.SpeechRecognition || 
      window.webkitSpeechRecognition || window.mozSpeechRecognition ||
      window.msSpeechRecognitin) ();
      recognition.lang = 'en-US';
      recognition.start();
      operations = {
        'plus': '+',
        'minus': '-',
        'multiply': '*',
        'multiplied': '*',
        'divide': '/',
        'divided': '/',
        'reminder': '%',
        'mode': '%',
        'mod': '%',
        'modulo': '%',
        'Open Bracket': '(',
        'close bracket': ')'
      }
      recognition.onresult = function(e) {
        let input = e.results[0][0].transcript;

        for (prop in operations) 
          input = input.replace(prop, operations[prop]);
        let tmp = checkInput(input); 
        setHistory(tmp);
        setTimeout(function() {
          micFlag = true;
          evaluate(tmp);
        }, 2000);
        recognition.stop();
        mic.classList.remove('record');
      }
  });
}

function evaluate(tmp) {
  let output = getOutput();
  let history = getHistory();
  
    if (micFlag) {
      try {
        tmp = checkOperator(tmp);
        let result = eval(tmp);
        setOutput(result);
        micFlag = false;

      } catch(e) {
        setHistory('');
        setOutput('');
        alert('Incorrect expression: ');
        
        
      }
    } else if (checkFlag && balanceFlag) {
      output = eval(tmp);
      history = checkInput(tmp);
      setHistory(history);
      setOutput(output);
      checkFlag = false;
    } else {
      if (balanceFlag) {
        
        output = eval(tmp);
        history = checkInput(tmp);
      } 
      history = checkInput(tmp);
      setHistory(history);
      setOutput(output);
    }
    
  
}


function checkInput(input) {
  let divide = document.getElementById('/');
  let mult = document.getElementById('*');
  
  for (let i = 0; i < input.length; i++) {
    if (input[i] === divide.id) {
      input = input.replace('/', divide.innerHTML);
    }
    if (input[i] === 'd') {
      input = input.replace(/d/g, '');
      break;
    }
    if (input[i] === mult.id) {
      input = input.replace('*', mult.innerHTML);
      }
    }
  return input;
  
}

function BalanceBrackets(history) {
  balanceFlag = false;

  if (history === '') {
    checkBracket++;
    return '(';
  } else if (history !== '') {
    if (isNaN(history[history.length - 1])) {
      if (history[history.length - 1] === '(') {
        checkBracket++;
        return '(';
      } else if (history[history.length - 1] === ')') {
        if (checkBracket === 0) {
          checkBracket++;
          return '*(';
        } else if (checkBracket === 1) {
          checkBracket--;
          balanceFlag = true;
          return ')';
        }
        checkBracket--;
        return ')';
      } else {
        checkBracket++;
        return '(';
      }  
    } else if (!isNaN(history[history.length - 1])) {
      if (checkBracket === 0) {
        checkBracket++;
        return '*(';
      } else if (checkBracket === 1) {
        checkBracket--;
        balanceFlag = true;
        return ')';
      } else {
        checkBracket--;
        return ')';
      }
    } 
  }
}
