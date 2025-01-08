import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { EditTodoForm } from "./EditTodoForm";
import { TodoForm } from "./TodoForm";
import './ToDoWrapper.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import confetti from "canvas-confetti"; 
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export const TodoWrapper = () => {
    const [todos, setToDos] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // gets todos from backend
    useEffect(() => {
        fetch("http://localhost:5000/todos")
            .then((response) => response.json())
            .then((data) => setToDos(data))
            .catch((error) => console.error("Error fetching todos:", error));
    }, []);

    const addToDo = async (todo) => {
        try {
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ task: todo, completed: false }),
            });

            console.log('Response Status:', response.status);
            const newTodo = await response.json();
            console.log('New Todo:', newTodo);
    
            if (response.ok) {
                setToDos((prevTodos) => [...prevTodos, newTodo]);
            } else {
                throw new Error('Failed to add todo');
            }
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };
    
    const deleteToDo = async (id) => {
        try {
            await fetch(`http://localhost:5000/todos/${id}`, { method: "DELETE" });
            setToDos(todos.filter((todo) => todo._id !== id));
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    const editToDo = (id) => {
        setToDos(
            todos.map((todo) =>
                todo._id === id ? { ...todo, isEditing: !todo.isEditing } : todo 
            )
        );
    };

    const editTask = async (task, id) => {
        try {
            const response = await fetch(`http://localhost:5000/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                // send tasks data
                body: JSON.stringify({ task }),  
            });
    
            if (!response.ok) {
                throw new Error('Failed to update task');
            }
    
            const updatedTodo = await response.json();
            setToDos(
                todos.map((todo) =>
                    // sets editing to false after
                    todo._id === id ? { ...todo, task: updatedTodo.task, isEditing: false } : todo 
                )
            );
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    
    const toggleComplete = async (id) => {
        try {
            const todo = todos.find((todo) => todo._id === id);
            const response = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                // toggles if completed or not == strikethrough
                body: JSON.stringify({ completed: !todo.completed }), 
            });
            
            if (!response.ok) {
                throw new Error('Failed to update task completion');
            }
            
            const updatedTodo = await response.json();
            
            // confettii 
            if (!todo.completed) {
                confetti({
                    particleCount: 100,
                    spread: 50,
                    origin: { x: 0.87, y: 0.7 },
                });
            }

            // updates the todo state
            setToDos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
        } catch (error) {
            console.error("Error toggling todo:", error);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


    return (
        <div className="ToDoWrapper">
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <h1>Let's Get It Done!</h1>
                <TodoForm addToDo={addToDo} />
    
                {todos.map((todo) =>
                    todo.isEditing ? (
                        <EditTodoForm 
                            editTodo={(newTask) => editTask(newTask, todo._id)} 
                            task={todo.task} 
                        />
                    ) : (
                        <Todo
                            key={todo._id}
                            task={todo}
                            editToDo={() => editToDo(todo._id)} 
                            toggleComplete={() => toggleComplete(todo._id)}
                            deleteToDo={() => deleteToDo(todo._id)}
                        />
                    )
                )}
            </div>
    
            <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={isSidebarOpen ? faArrowRight : faArrowLeft} />
            </button>
        </div>
    );
};
