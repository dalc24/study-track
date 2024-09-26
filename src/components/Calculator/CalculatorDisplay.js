import React from 'react';

const CalculatorDisplay = ({ value }) => {
    return (
        <input
            type="text"
            value={value}
            readOnly
            className="calculator-display"
        />
    );
};

export default CalculatorDisplay;
