

onload = function run() {
  chooseOperator()
  chooseNumber()
}

let operators = document.getElementsByClassName('operator');
let numbers = document.getElementsByClassName('number');


function chooseOperator() {
  for (let i = 0; i < operators.length; i++ ) {
    operators[i].addEventListener('click', function() {
      if (this.id === 'AC') {
        console.log(this.id);
        setHistory('');
        setOutput('');
      } else if (this.id === 'backspace') {
        let output = reverseNumberFormat(getOutput()).toString();
        if (output) {
          output = output.substr(0,output.length - 1);
          setOutput(output)
        }
        
      //  else if ( this.id ==='.') {
      //   let output = getOutput();
      //   console.log(typeof output);
      //   let history = getHistory();
      //   if (output === '') {
      //     output = '0.';
      //   }
      //     output = output + this.id;
          
      //     console.log(output);
      //     setOutput(output);
        
      // } else if ( this.id ==='()') {
      //   console.log('click');
      } else {
        let output = getOutput();
        let history = getHistory();
        if (output === '' && history !== '') {
          if (isNaN(history[history.length - 1])) {
            history = history.substr(0, history.length - 1);
          }
        }
        if (output !== '' || history !== '') {
          output = (output === '') ? output : reverseNumberFormat(output);
          history += output;
          if (this.id === '=') {
            let result = eval(history);
            setOutput(result);
            setHistory('');
          } else {
            history += this.id;
            setHistory(history);
            setOutput('');
          }
          
        }
      }
        console.log(operators[i].innerText);
    }); 
  }   
}
function chooseNumber() {
  for (let i = 0; i < numbers.length; i++ ) {
    numbers[i].addEventListener('click', function() {
        let output = reverseNumberFormat(getOutput());
        if (output !== NaN) {
          output += this.id;
          setOutput(output);
        } 
        console.log(numbers[i].innerText);
    }); 
  }   
}


function getHistory() {
  return document.getElementById('history-value').innerText;
}

function setHistory(num) {
  document.getElementById('history-value').innerText = num;
}

function getOutput() {
  return document.getElementById('output-value').innerText;
}

function setOutput(num) {
  if (num === '') {
    document.getElementById('output-value').innerText = num;
  } 
  else {
    document.getElementById('output-value').innerText = getFormattedNumber(num);
  }
  
}

function getFormattedNumber(num) {
  if (num === '-') {
    return '';
  }

  let n = Number(num);
  let val = n.toLocaleString("en");
  return val;
}

function reverseNumberFormat(num) {
  return Number(num.replace(/,/g, ''));
}


