import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./Todo";
import { EditTodoForm } from "./EditTodoForm";
import { TodoForm } from "./TodoForm";
import './ToDoWrapper.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import confetti from "canvas-confetti"; 
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';


export const TodoWrapper = () => {
    const [todos, setToDos] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for toggling sidebar

    const addToDo = (todo) => {
        setToDos([
            ...todos,
            { id: uuidv4(), task: todo, completed: false, isEditing: false },
        ]);
    };

    const deleteToDo = (id) => 
        setToDos(todos.filter((todo) => todo.id !== id));

    const editToDo = (id) => {
        setToDos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
            )
        );
    };

    const editTask = (task, id) => {
        setToDos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
            )
        );
    };

 /*   const toggleComplete = (id) => {
        setToDos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }; */

    const toggleComplete = (id) => {
        setToDos(
            todos.map((todo) => {
                if (todo.id === id) {
                    if (!todo.completed) {
                        confetti({
                            particleCount: 100,
                            spread: 50,
                            origin: { x: 0.87, y: 0.7},
                        });
                    }
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            })
        );
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="ToDoWrapper">
          <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <h1>Get Things Done!</h1>
            <TodoForm addToDo={addToDo} />
      
            {todos.map((todo) =>
              todo.isEditing ? (
                <EditTodoForm editTodo={editTask} task={todo} />
              ) : (
                <Todo 
                  key={todo.id}
                  task={todo}
                  addToDo={addToDo}
                  editToDo={editToDo}
                  toggleComplete={toggleComplete}
                  deleteToDo={deleteToDo}
                />
              )
            )}
          </div>
      
          <button
            className="sidebar-toggle-btn"
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={isSidebarOpen ? faArrowRight : faArrowLeft} />
          </button>
        </div>
      );
      
};
