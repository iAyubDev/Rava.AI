import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoList.css'; 

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [filterCompleted, setFilterCompleted] = useState(false);
    const [editingTodo, setEditingTodo] = useState(null);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then(response => {
                setTodos(response.data);
            })
            .catch(error => {
                console.error('Error fetching todos: ', error);
            });
    }, []);

    const handleFilterChange = () => {
        setFilterCompleted(!filterCompleted);
    };

    const handleEdit = (id) => {
        setEditingTodo(id);
    };

    const handleDelete = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(() => {
                setTodos(todos.filter(todo => todo.id !== id));
            })
            .catch(error => {
                console.error('Error deleting todo: ', error);
            });
    };

    const handleSaveEdit = (id, newTitle) => {
        axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, { title: newTitle })
            .then(() => {
                const updatedTodos = todos.map(todo => {
                    if (todo.id === id) {
                        return { ...todo, title: newTitle };
                    }
                    return todo;
                });
                setTodos(updatedTodos);
                setEditingTodo(null);
            })
            .catch(error => {
                console.error('Error updating todo: ', error);
            });
    };

    const filteredTodos = filterCompleted ? todos.filter(todo => todo.completed) : todos;

    return (
        <div className="todo-container"> {/* Add a class for styling */}
            <button onClick={handleFilterChange}>
                {filterCompleted ? 'Show All Todos' : 'Show Completed Todos'}
            </button>
            <ul>
                {filteredTodos.map(todo => (
                    <li key={todo.id}>
                        <div className="todo-item"> {/* Add a class for styling */}
                            {editingTodo === todo.id ? (
                                <input
                                    type="text"
                                    value={todo.title}
                                    onChange={e => handleSaveEdit(todo.id, e.target.value)}
                                />
                            ) : (
                                <span>{todo.title} - {todo.completed ? 'Completed' : 'Incomplete'}</span>
                            )}
                            <div className="todo-buttons"> {/* Add a class for styling */}
                                {editingTodo !== todo.id && (
                                    <button onClick={() => handleEdit(todo.id)}>Edit</button>
                                )}
                                <button onClick={() => handleDelete(todo.id)}>Delete</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;

