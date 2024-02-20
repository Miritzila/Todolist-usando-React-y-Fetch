import React, { useEffect, useState } from "react";

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {

        const loadTasks = () => {
            const options = {
                method: 'GET',
                headers: { 'User-Agent': 'insomnia/8.6.0', 'Content-Type': 'application/json' }
            };

            fetch('https://playground.4geeks.com/apis/fake/todos/user/miritzila', options)
                .then(response => response.json())
                .then(response => {
                    setTasks(response);
                })
                .catch(err => console.error(err));
        };

        loadTasks();
    }, []);

    const clearAllTasks = () => {
        const options = {
            method: 'DELETE',
            headers: { 'User-Agent': 'insomnia/8.6.0', 'Content-Type': 'application/json' }
        };

        fetch('https://playground.4geeks.com/apis/fake/todos/user/miritzila', options)
            .then(response => {
                if (response.ok) {
                    setTasks([]);
                }
            })
            .catch(err => console.error(err));
    };

    const handleNewTaskChange = (event) => {
        setNewTask(event.target.value);
    };

    const addTask = async () => {
        if (newTask.trim() !== "") {
            const taskToAdd = { label: newTask, done: false };
            const updatedTasks = [...tasks, taskToAdd];
    
            const options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTasks)
            };
    
            try {
                const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/miritzila', options);
                if (!response.ok) {
                    throw new Error('No se pudo actualizar la lista de tareas');
                }
                
                setTasks(updatedTasks);
                
                setNewTask("");
            } catch (error) {
                console.error(error);
            }
        }
    };    

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            addTask();
            event.preventDefault();
        }
    };

    const removeTask = async (indexToRemove) => {
        
        const updatedTasks = tasks.filter((_, index) => index !== indexToRemove);
        setTasks(updatedTasks);
    
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTasks)
        };
    
        try {
            const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/miritzila', options);
            if (!response.ok) {
                throw new Error('No se pudo actualizar la lista de tareas en el servidor');
            }
        } catch (error) {
            console.error(error);
        }
    };    

    const listItems = tasks.map((task, index) => (
        <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
            {task.label}
            <button onClick={() => removeTask(index)} className="btn btn-danger btn-sm">X</button>
        </li>
    ));

    return (
        <div className="container">
            <input
                className="form-control"
                type="text"
                placeholder="Añade una nueva tarea..."
                value={newTask}
                onChange={handleNewTaskChange}
                onKeyPress={handleKeyPress}
            />
            <ul className="list-group w-100">
                {listItems}
            </ul>
            <br />
            <button onClick={clearAllTasks} className="btn btn-warning">Limpiar Todas las Tareas</button>
        </div>
    );
};

export default Home;