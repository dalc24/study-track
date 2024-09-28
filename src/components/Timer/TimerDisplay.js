import React from 'react';

const TimerDisplay = ({ minutes, seconds, updateTime, isEditable, setIsEditable }) => {
  const handleTimeChange = (e, type) => {
    const value = e.target.value ? parseInt(e.target.value, 10) : '';
    if (type === 'minutes') {
      updateTime(value, seconds);
    } else if (type === 'seconds') {
      updateTime(minutes, value); 
    }
  };

  const handleClick = () => {
    setIsEditable(true); 
  };

  const handleBlur = () => {
    setIsEditable(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setIsEditable(false);
    }
  };

  return (
    <div className="timer-display" onClick={handleClick}>
      {isEditable ? (
        <div className="editable-timer">
          <input
            type="number"
            value={minutes || ''}
            onChange={(e) => handleTimeChange(e, 'minutes')}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            max={99}
            min={0}
            placeholder="00"
            className="time-input"
          />
          <span>:</span>
          <input
            type="number"
            value={seconds || ''}
            onChange={(e) => handleTimeChange(e, 'seconds')}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            max={59}
            min={0}
            placeholder="00"
            className="time-input"
          />
        </div>
      ) : (
        <span className="display-time">
          {String(minutes).padStart(2, '0')} : {String(seconds).padStart(2, '0')}
        </span>
      )}
    </div>
  );
};

export default TimerDisplay;
