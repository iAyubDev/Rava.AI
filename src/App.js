import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoList from './components/TodoList'; 

const App = () => {
    return (
        <div className="container">
            <h1>Todo List</h1>
            <TodoList />
        </div>
    );
};

export default App;
