import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import './Notepad.css';

export const NotepadWrapper = () => {
    const [isNotepadOpen, setIsNotepadOpen] = useState(false);
    const [noteText, setNoteText] = useState("");
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

    return (
        <div className="NotepadWrapper">
            <button className="notepad-toggle-btn" onClick={toggleNotepad}>
            <FontAwesomeIcon icon={faPencil} />
            </button>

            {isNotepadOpen && (
                <div className="notepad-wrapper" ref={notepadRef}>
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
