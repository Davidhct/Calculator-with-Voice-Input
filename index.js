

onload = function run() {
  chooseOperator()
  chooseNumber()
}

let operators = document.getElementsByClassName('operator');
let numbers = document.getElementsByClassName('number');


function chooseOperator() {
  for (let i = 0; i < operators.length; i++ ) {
    operators[i].addEventListener('click', function(e) {
      if (this.id === 'AC') {
        console.log(this.id);
        setHistory('');
        setOutput('');
      } else if (this.id === 'backspace') {
        let history = reverseNumberFormat(getHistory()).toString();
        // reverseNumberFormat(getHistory()).toString();
        if (history) {
          history = history.substr(0,history.length - 1);
          setHistory(history);
        }
      } else if (this.id ==='.') {  
        
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
      }
       else {
        let output = getOutput();
        let history = getHistory();

        // check if 5 + 6 + the last +
        if (output !== '' && history === '') {
          if (isNaN(history[history.length - 1])) {
            history = history.substr(0, history.length - 1);
            console.log("0");
          }
        }
        if (history !== '' || output !== '') {
          
          history = (history === '') ? history : reverseNumberFormat(getHistory());
          console.log(this.id);
          history += this.id;
          console.log(history.includes());
          let flag = checkOperator(history);
          console.log(flag);
          let result = eval(tmp.toString());
          setOutput(result);
          if (this.id === '=') {
            // let result = eval(history);
            let hist = document.getElementById('history-value');
            console.log(hist.classList.toggle('history'));
            let out = document.getElementById('output-value');
            console.log(out.classList.toggle('output'));
            setOutput(result);

            // setOutput('');
          } else {
            let tmp = history;
            console.log(tmp);
            history += this.id;
            history = reverseNumberFormat(getHistory());
            console.log(tmp);
            // history = getFormattedNumber(getHistory())
            setHistory(tmp);
            // setHistory('');
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
        let history = reverseNumberFormat(getHistory());
        if (history !== NaN) {
          history += this.id;
          setHistory(history);
        } 
        // let history = getHistory()
        // history += this.id;
        // setHistory(history);
        // console.log(isNaN(history));
    }); 
  }   
}
function checkOperator(op) {
  let len = op.length;
  if (op.includes('+') || op.includes('-') || op.includes('*') || op.includes('/') || op.includes('%')) {
    let index = op.indexof
  }
}

function getHistory() {
  return document.getElementById('history-value').innerHTML;
}

function setHistory(num) {
  if (num === '') {
    document.getElementById('history-value').innerHTML = num;
  } 
  else {
    document.getElementById('history-value').innerHTML = getFormattedNumber(num);
  }
}

function getOutput() {
  return document.getElementById('output-value').innerHTML;
}

function setOutput(num) {
  document.getElementById('output-value').innerHTML = num;
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


