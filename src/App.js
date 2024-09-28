import React from 'react';
import './App.css'; // Import global styles
import { TodoWrapper } from './components/Todo/ToDoWrapper'; // Make sure to match the casing
import { NotepadWrapper } from './components/Notepad/NotepadWrapper';
import CalculatorWrapper from './components/Calculator/CalculatorWrapper';
import TimerWrapper from './components/Timer/TimerWrapper';

function App() {
  return (
    <div className="App">
      <div className="websiteName"> StudyTrack </div>
      <TodoWrapper />
      <NotepadWrapper/>
      <CalculatorWrapper />
      <TimerWrapper />
    </div>
  );
}

export default App;
