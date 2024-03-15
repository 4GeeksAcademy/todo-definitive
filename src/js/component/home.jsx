import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faBook, faCheck, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// Create your first component
const Home = () => {
    const [newTask, setNewTask] = useState("");
    const [taskList, setTaskList] = useState([]);
    const url = "https://playground.4geeks.com/apis/fake/todos/user/santiagodiaz";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    setTaskList(data);
                } else {
                    await createUser();
                    setTaskList([]);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchData();
    }, []);

    const createUser = async () => {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify([])
            });
            if (!response.ok) {
                console.error("Error creating user:", response.statusText);
            }
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    const createNewTask = async () => {
        if (newTask.trim() !== "") {
            const updatedTaskList = [
                ...taskList,
                {
                    label: newTask,
                    done: false
                }
            ];
            setTaskList(updatedTaskList);

            try {
                const response = await fetch(url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedTaskList)
                });
                if (!response.ok) {
                    console.error("Error updating task list:", response.statusText);
                }
            } catch (error) {
                console.error("Error updating task list:", error);
            }
            setNewTask("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            createNewTask();
        }
    };

    const toggleTaskDone = async (index) => {
        const updatedTasks = [...taskList];
        updatedTasks[index].done = !updatedTasks[index].done;
        setTaskList(updatedTasks);

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedTasks)
            });
            if (!response.ok) {
                console.error("Error updating task list:", response.statusText);
            }
        } catch (error) {
            console.error("Error updating task list:", error);
        }
    };

    const deleteTask = async (index) => {
        const updatedTasks = [...taskList];
        updatedTasks.splice(index, 1);
        setTaskList(updatedTasks);

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedTasks)
            });
            if (!response.ok) {
                console.error("Error updating task list:", response.statusText);
            }
        } catch (error) {
            console.error("Error updating task list:", error);
        }
    };

    const deleteAllTasks = async () => {
        setTaskList([]);

        try {
            const response = await fetch(url, {
                method: "DELETE"
            });
            if (!response.ok) {
                console.error("Error deleting all tasks:", response.statusText);
            }
        } catch (error) {
            console.error("Error deleting all tasks:", error);
        }
    };

    return (
        <div id="card" className="container border rounded d-flex flex-column bg-white mt-5">
            <h1 className="my-3 align-self-start">To-do List<FontAwesomeIcon id="pencil" className="mx-3" icon={faPencil} /><FontAwesomeIcon id="book" icon={faBook} /></h1>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Add a new task"
                    aria-label="Add a new task"
                    aria-describedby="button-addon2"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button
                    onClick={createNewTask}
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2">
                    Add Task
                </button>
            </div>
            <div className="task-list">
                {taskList.map((task, index) => (
                    <div key={index} className="task d-flex justify-content-between align-items-center">
                        <span className={task.done ? "text-decoration-line-through" : ""}>
                            {task.label}
                        </span>
                        <div>
                            <button
                                onClick={() => toggleTaskDone(index)}
                                className="btn btn-outline-success btn-sm me-2"
                            >
                                <FontAwesomeIcon icon={faCheck} />
                            </button>
                            <button
                                onClick={() => deleteTask(index)}
                                className="btn btn-outline-danger btn-sm"
                            >
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button
                onClick={deleteAllTasks}
                className="btn btn-danger mt-3 align-self-center"
                id="clearAll"
            >
                Delete All Tasks
            </button>
        </div>
    );
};

export default Home;
