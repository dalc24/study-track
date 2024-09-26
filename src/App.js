import React from 'react';
import './App.css'; // Import global styles
import { TodoWrapper } from './components/Todo/ToDoWrapper'; // Make sure to match the casing
import { NotepadWrapper } from './components/Notepad/NotepadWrapper';
import CalculatorWrapper from './components/Calculator/CalculatorWrapper';

function App() {
  return (
    <div className="App">
      <div className="websiteName"> StudyTrack </div>
      <div className='timer'> 30 : 00</div>
      <TodoWrapper />
      <NotepadWrapper/>
      <CalculatorWrapper />
    </div>
  );
}

export default App;
