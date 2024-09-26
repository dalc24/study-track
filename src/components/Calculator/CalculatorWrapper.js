import React, { useState, useRef } from 'react';
import CalculatorDisplay from './CalculatorDisplay';
import CalculatorButtons from './CalculatorButtons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import './CalculatorWrapper.css';

const CalculatorWrapper = () => {
    const [input, setInput] = useState('');
    const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const calculatorRef = useRef(null);

    const toggleCalculator = () => {
        setIsCalculatorOpen(!isCalculatorOpen);
    };

    const handleButtonClick = (value) => {
        setInput((prevInput) => prevInput + value);
    };

    const handleClear = () => {
        setInput('');
    };

    const handleCalculate = () => {
        try {
            setInput(eval(input)); // not safe method
        } catch (error) {
            setInput('Error');
        }
    };

    const handleToggleSign = () => {
        setInput((prevInput) => (prevInput.startsWith('-') ? prevInput.slice(1) : '-' + prevInput));
    };

    const handleDeleteChar = () => {
        setInput((prevInput) => prevInput.slice(0, -1));
    };

    const handleMouseDown = (e) => {
        const offsetX = e.clientX - calculatorRef.current.getBoundingClientRect().left;
        const offsetY = e.clientY - calculatorRef.current.getBoundingClientRect().top;

        const mouseMoveHandler = (e) => {
            setPosition({ x: e.clientX - offsetX, y: e.clientY - offsetY });
        };

        const mouseUpHandler = () => {
            window.removeEventListener('mousemove', mouseMoveHandler);
            window.removeEventListener('mouseup', mouseUpHandler);
        };

        window.addEventListener('mousemove', mouseMoveHandler);
        window.addEventListener('mouseup', mouseUpHandler);
    };

    return (
        <div 
            className="CalculatorWrapper" 
            style={{ left: position.x, top: position.y, position: 'fixed' }} 
            ref={calculatorRef}
            onMouseDown={handleMouseDown}
        >
            <button className="calculator-toggle-btn" onClick={toggleCalculator}> 
                <FontAwesomeIcon icon={faCalculator} />
            </button>

            {isCalculatorOpen && (
                <div className='calculator-wrapper'>
                    <CalculatorDisplay value={input} />
                    <CalculatorButtons
                        onClick={handleButtonClick}
                        onClear={handleClear}
                        onCalculate={handleCalculate}
                        onToggleSign={handleToggleSign}
                        onDeleteChar={handleDeleteChar}
                    />
                </div>
            )}
        </div>
    );
};

export default CalculatorWrapper;
