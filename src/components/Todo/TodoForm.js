import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'; // Import the plus icon

export const TodoForm = ({ addToDo }) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (value) {
            addToDo(value);
            setValue('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="TodoForm">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)} 
                className="todo-input" 
                placeholder="What is your task"
            />
            <button type='submit' className='todo-btn'>
                <FontAwesomeIcon icon={faPlus} /> {/* Use the plus icon */}
            </button>
        </form>
    );
};
