import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import './Notepad.css';

export const NotepadWrapper = () => {
    const [isNotepadOpen, setIsNotepadOpen] = useState(false);
    const [noteText, setNoteText] = useState("");
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [noteId, setNoteId] = useState(null);
    const notepadRef = useRef(null);

    const toggleNotepad = () => {
        setIsNotepadOpen(!isNotepadOpen);
    };

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await fetch("http://localhost:5000/notes");
                const notes = await response.json();
                if (notes.length > 0) {
                    // text field from backend
                    setNoteText(notes[0].text); 
                    setNoteId(notes[0]._id);
                }
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        };

        fetchNote();
    }, []);

    const handleBlur = async () => {
        if (noteText.trim() === "") {
            console.log("Note text is empty, skipping save.");
            return;
        }

        try {
            if (noteId) {
                const response = await fetch(`http://localhost:5000/notes/${noteId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text: noteText }),
                });
                if (response.ok) {
                    console.log("Note updated", noteText);
                } else {
                    console.error("Failed to update note");
                }
            } else {
                const response = await fetch("http://localhost:5000/notes", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text: noteText }),
                });
                const newNote = await response.json();
                setNoteId(newNote._id);
                console.log("New note created", newNote);
            }
        } catch (error) {
            console.error("Error saving note:", error);
        }
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
