import React, { useState } from 'react';
import './Calculadora.css'; 

function Calculadora() {
  const [display, setDisplay] = useState('0');
  const [currentOperation, setCurrentOperation] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [previousValue, setPreviousValue] = useState('');
  const [operation, setOperation] = useState('');
  const [history, setHistory] = useState([]);

  const handleNumberClick = (num) => {
    if (display === '0' || operation) {
      setDisplay(num);
      setCurrentValue(num);
    } else {
      setDisplay(display + num);
      setCurrentValue(currentValue + num);
    }
    setCurrentOperation(currentOperation + num);
  };

  const handleOperationClick = (op) => {
    if (currentValue) {
      if (previousValue) {
        const result = calculate();
        setPreviousValue(result);
        setHistory([...history, `${currentOperation} = ${result}`]);
        setCurrentOperation(`${result} ${op} `);
      } else {
        setPreviousValue(currentValue);
        setCurrentOperation(`${currentValue} ${op} `);
      }
      setOperation(op);
      setCurrentValue('');
    } else if (previousValue) {
      setOperation(op);
      setCurrentOperation(`${previousValue} ${op} `);
    }
  };

  const calculate = () => {
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    let result = 0;
    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case 'x':
        result = prev * current;
        break;
      case '/':
        result = prev / current;
        break;
      default:
        return;
    }
    setDisplay(result.toString());
    return result.toString();
  };

  const handleEquals = () => {
    if (currentValue && previousValue) {
      const result = calculate();
      setHistory([...history, `${currentOperation} = ${result}`]);
      setPreviousValue('');
      setCurrentValue(result);
      setOperation('');
      setCurrentOperation('');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setCurrentValue('');
    setPreviousValue('');
    setOperation('');
    setCurrentOperation('');
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="Calculadora">
        <h2>CALCULADORA</h2>
        <div className="content">
            <div className="card">
                <div className="display">
                    <div>{currentOperation || '\u00A0'}</div>
                    <div>{display}</div>
                </div>
                <div className="grid">
                    <button className="button" onClick={() => handleNumberClick('7')}>7</button>
                    <button className="button" onClick={() => handleNumberClick('8')}>8</button>
                    <button className="button" onClick={() => handleNumberClick('9')}>9</button>
                    <button className="button" onClick={() => handleOperationClick('/')}>/</button>
                    <button className="button" onClick={() => handleNumberClick('4')}>4</button>
                    <button className="button" onClick={() => handleNumberClick('5')}>5</button>
                    <button className="button" onClick={() => handleNumberClick('6')}>6</button>
                    <button className="button" onClick={() => handleOperationClick('x')}>x</button>
                    <button className="button" onClick={() => handleNumberClick('1')}>1</button>
                    <button className="button" onClick={() => handleNumberClick('2')}>2</button>
                    <button className="button" onClick={() => handleNumberClick('3')}>3</button>
                    <button className="button" onClick={() => handleOperationClick('-')}>-</button>
                    <button className="button" onClick={() => handleNumberClick('0')}>0</button>
                    <button className="button" onClick={() => handleNumberClick('.')}>.</button>
                    <button className="button" onClick={() => handleOperationClick('+')}>+</button>
                    <button className="button button-clear" onClick={handleClear}>C</button>
                    <button className="button button-equal" onClick={handleEquals}>=</button>
                </div>
            </div>
            <div className="history">
              <div className="content-a">
                  <h3>Historial</h3>
                  <div className="history-list">
                      {history.map((item, index) => (
                          <p key={index}>{item}</p>
                      ))}
                  </div>
                  <button onClick={handleClearHistory} className="button">Borrar Historial</button>
              </div>
          </div>

        </div>
    </div>
  );
}

export default Calculadora;
