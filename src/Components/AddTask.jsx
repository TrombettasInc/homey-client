import { useState } from "react";
import axios from "axios";
import styles from '../pages/ProjectDetailsPage.module.css';


function AddTask({ projectId, getProject }) {
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [isDone, setIsDone] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestBody = { description, deadline, isDone, projectId };

        const storedToken = localStorage.getItem('authToken');

        axios
            .post(`${import.meta.env.VITE_API_URL}/api/tasks`, requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                console.log('Task added:', response.data);
                setDescription("");
                setDeadline("");

                // Invoke the callback function coming through the props
                // from the ProjectDetailsPage, to refresh the project details
                getProject();
            })
            .catch((error) => console.log(error));
    };


    return (
        <div className="create-task">

            <form className={styles.addTaskForm} onSubmit={handleSubmit}>
                <h3 className={styles.addTaskTitle}>Add task</h3>
                <div className={styles.inputWrapper}>
                    <label htmlFor="taskDescription" ></label>
                    <div className={styles.inputContainer}>
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8fd8ced8adb21bec7b233af6670e3c4d3fba469c11155ff58bf5174dd5f6179?placeholderIfAbsent=true&apiKey=60afd9c2e7064e039d088416e43472c0"
                            alt=""
                            className={styles.inputIcon}
                        />
                        <input
                            type="text"
                            id="taskDescription"
                            className={styles.taskInput}
                            placeholder="task description"
                            value={description}
                            required
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <br />
                <div className={styles.inputWrapper}>
                    <label htmlFor="deadline" ></label>
                    <div className={styles.inputContainer}>
                        <input
                            type="date"
                            id="taskDeadline"
                            className={styles.deadlineInput}
                            placeholder="deadline"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            style={{ fontSize: "20px", border: "none" }}
                        />
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7b71adf9c660d4bf197db4c60f874eef1364737d23e9e9e98fc61f2fff7493d2?placeholderIfAbsent=true&apiKey=60afd9c2e7064e039d088416e43472c0"
                            alt="add task deadline dropdown icon"
                            className={styles.calendarIcon}
                        />
                    </div>
                </div>
                <button type="submit" className={styles.addButton}>add!</button>
            </form>
        </div>
    );
}

export default AddTask;