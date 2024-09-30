import React, { useState, useEffect } from 'react';
import TimerDisplay from './TimerDisplay';
import './TimerWrapper.css';

const TimerWrapper = () => {
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [focusSeconds, setFocusSeconds] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [breakSeconds, setBreakSeconds] = useState(0);

  const [minutes, setMinutes] = useState(focusMinutes);
  const [seconds, setSeconds] = useState(focusSeconds);

  const [isFocusMode, setIsFocusMode] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const sound = new Audio(process.env.PUBLIC_URL + '/alert.mp3');

  useEffect(() => {
    let timer;
    if (isRunning && !isEditable) {
      timer = setInterval(() => {
        if (seconds === 0 && minutes === 0) {
          clearInterval(timer);
          sound.play();
          if (isFocusMode) {
            setIsFocusMode(false);
            setMinutes(breakMinutes);
            setSeconds(breakSeconds);
          } else {
            setIsFocusMode(true);
            setMinutes(focusMinutes);
            setSeconds(focusSeconds);
          }
          setIsRunning(true);
        } else if (seconds === 0) {
          if (minutes > 0) {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          } else {
            clearInterval(timer);
            sound.play();
            if (isFocusMode) {
              setIsFocusMode(false);
              setMinutes(breakMinutes);
              setSeconds(breakSeconds);
            } else {
              setIsFocusMode(true);
              setMinutes(focusMinutes);
              setSeconds(focusSeconds);
            }
            setIsRunning(true);
          }
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, seconds, minutes, isEditable, isFocusMode, breakMinutes, breakSeconds, focusMinutes, focusSeconds, sound]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleFocusMode = () => {
    setIsFocusMode(true);
    setMinutes(focusMinutes);
    setSeconds(focusSeconds);
    setIsRunning(false);
  };

  const handleBreakMode = () => {
    setIsFocusMode(false);
    setMinutes(breakMinutes);
    setSeconds(breakSeconds);
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsFocusMode(true);
    setMinutes(focusMinutes);
    setSeconds(focusSeconds);
  };

  const handleDefault = () => {
    setIsRunning(false);
    setIsFocusMode(true);
    setMinutes(25);
    setSeconds(0);
    setFocusMinutes(25);
    setFocusSeconds(0);
    setBreakMinutes(5);
    setBreakSeconds(0);
  };

  const updateTime = (newMinutes, newSeconds) => {
    if (isFocusMode) {
      setFocusMinutes(newMinutes);
      setFocusSeconds(newSeconds);
    } else {
      setBreakMinutes(newMinutes);
      setBreakSeconds(newSeconds);
    }
    setMinutes(newMinutes);
    setSeconds(newSeconds);
  };

  return (
    <div className="timer-wrapper">
      <div className="controls">
        <button onClick={handleFocusMode} className={isFocusMode ? 'active' : ''}>
          Focus
        </button>
        <button onClick={handleBreakMode} className={!isFocusMode ? 'active' : ''}>
          Break
        </button>
      </div>

      <TimerDisplay
        minutes={minutes}
        seconds={seconds}
        updateTime={updateTime}
        isEditable={isEditable}
        setIsEditable={setIsEditable}
      />

      <div className="action-buttons">
        <button onClick={handleStartPause} className="start-pause-button">
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleDefault} className="default-button">
            Default
        </button>
        <button onClick={handleReset} className="reset-button">
          Reset
        </button>
      </div>
    </div>
  );
};

export default TimerWrapper;