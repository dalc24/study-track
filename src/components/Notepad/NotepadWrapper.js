import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import './Notepad.css';

export const NotepadWrapper = () => {
    const [isNotepadOpen, setIsNotepadOpen] = useState(false);
    const [noteText, setNoteText] = useState("");
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const notepadRef = useRef(null); 

    const toggleNotepad = () => {
        setIsNotepadOpen(!isNotepadOpen);
    };

    useEffect(() => {
        const savedNote = localStorage.getItem("userNote");
        if (savedNote) {
            setNoteText(savedNote);
        }
    }, []);

    const handleBlur = () => {
        localStorage.setItem("userNote", noteText);
        console.log("Note saved", noteText);
    };

    const handleMouseDown = (e) => {
        const offsetX = e.clientX - notepadRef.current.getBoundingClientRect().left;
        const offsetY = e.clientY - notepadRef.current.getBoundingClientRect().top;

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
        <div className="NotepadWrapper"
            style={{ left: position.x, top: position.y, position: 'fixed' }} 
            ref={notepadRef}
            onMouseDown={handleMouseDown}
        >
            <button className="notepad-toggle-btn" onClick={toggleNotepad}>
            <FontAwesomeIcon icon={faPencil} />
            </button>

            {isNotepadOpen && (
                <div className="notepad-wrapper">
                    <textarea
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        onBlur={handleBlur}
                        placeholder="Type your notes here..."
                    />
                </div>
            )}
        </div>
    );
};
