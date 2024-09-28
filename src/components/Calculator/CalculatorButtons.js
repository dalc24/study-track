import React from 'react';

const CalculatorButtons = ({ onClick, onClear, onCalculate, onToggleSign, onDeleteChar }) => {
    return (
        <div className="calculator-buttons">
            <button className="btn btn-clear" onClick={onClear}>AC</button>
            <button className="btn btn-delete" onClick={onDeleteChar}>DC</button>
            <button className="btn btn-toggle-sign" onClick={onToggleSign}>±</button>
            <button className="btn btn-operator" onClick={() => onClick('/')}>÷</button>


            <button className="btn btn-number" onClick={() => onClick('7')}>7</button>
            <button className="btn btn-number" onClick={() => onClick('8')}>8</button>
            <button className="btn btn-number" onClick={() => onClick('9')}>9</button>
            <button className="btn btn-operator" onClick={() => onClick('*')}>×</button>

            <button className="btn btn-number" onClick={() => onClick('4')}>4</button>
            <button className="btn btn-number" onClick={() => onClick('5')}>5</button>
            <button className="btn btn-number" onClick={() => onClick('6')}>6</button>
            <button className="btn btn-operator" onClick={() => onClick('-')}>-</button>

            <button className="btn btn-number" onClick={() => onClick('1')}>1</button>
            <button className="btn btn-number" onClick={() => onClick('2')}>2</button>
            <button className="btn btn-number" onClick={() => onClick('3')}>3</button>
            <button className="btn btn-operator" onClick={() => onClick('+')}>+</button>

            <button className="btn btn-wide" onClick={() => onClick('0')}>0</button>
            <button className="btn btn-number" onClick={() => onClick('.')}>.</button>
            <button className="btn btn-operator" onClick={onCalculate}>=</button>
        </div>
    );
};

export default CalculatorButtons;
