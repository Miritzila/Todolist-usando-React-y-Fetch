import React, { useEffect, useState } from "react";

const Home = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(()=>{
        const options = {
            method: 'GET',
            headers: {'User-Agent': 'insomnia/8.6.0', 'Content-Type': 'application/json'}
        };
        
        fetch('https://playground.4geeks.com/apis/fake/todos/user/miritzila', options)
            .then(response => response.json())
            .then(response => {
                debugger
                setTasks(response)
            })
            .catch(err => console.error(err));
    }, [])

    const [newTask, setNewTask] = useState("");

    const handleNewTaskChange = (event) => {
        setNewTask(event.target.value);
    };

    const addTask = () => {
        if (newTask.trim() !== "") {
            setTasks([...tasks, newTask]);
            setNewTask("");
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    };

    const removeTask = (indexToRemove) => {
        setTasks(tasks.filter((_, index) => index !== indexToRemove));
    };

    const listItems = tasks.map((task, index) => (
        <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
            {task.label}
            <button onClick={() => removeTask(index)} className="btn btn-danger btn-sm">X</button>
        </li>
    ));

    return (
        <div className="container">
            <div className="w-50 text-center mb-3">
            </div>
            <ul className="list-group w-100">
                <li><input
                    className="form-control"
                    type="text"
                    placeholder="Añade una nueva tarea..."
                    value={newTask}
                    onChange={handleNewTaskChange}
                    onKeyPress={handleKeyPress}
                /></li>
                {listItems}
                <li className="list-group-item d-flex justify-content-between align-items-center"><strong>{tasks.length} tareas por hacer</strong></li>
            </ul>
        </div>
    );
};

export default Home;
