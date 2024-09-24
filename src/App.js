import React from 'react';
import './App.css'; // Import global styles
import { TodoWrapper } from './components/Todo/ToDoWrapper'; // Make sure to match the casing

function App() {
  return (
    <div className="App">
      <div className='timer'> 30 : 00</div>
      <TodoWrapper />
    </div>
  );
}

export default App;
