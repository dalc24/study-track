import React from 'react';

const CalculatorButton = ({ value, onClick }) => {
    return (
        <button onClick={() => onClick(value)}>
            {value}
        </button>
    );
};

export default CalculatorButton;
