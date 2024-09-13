import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../pages/ProjectDetailsPage.module.css";


function TaskCard({ taskId, projectId, description, deadline, isDone, getProject }) {

    const [checked, setChecked] = useState(isDone);
    const [taskData, setTaskData] = useState([]);

    const navigate = useNavigate();

    const storedToken = localStorage.getItem('authToken');

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}`, {
                headers: { Authorization: `Bearer ${storedToken}` }
            })
            .then((response) => {
                const project = response.data
                setTaskData(project.tasks);
            })
            .catch((error) => console.log(error));

    }, [projectId, storedToken]);


    const handleCheckboxChange = (newChecked) => {
        setChecked(newChecked);

        axios.put(`${import.meta.env.VITE_API_URL}/api/tasks/${taskId}`,
            { isDone: newChecked },
            { headers: { Authorization: `Bearer ${storedToken}` } }
        )
            .then(() => {
                getProject();
                navigate(`/projects/${projectId}`)
            })
            .catch((error) => console.log(error));
    };


    const deleteTask = () => {

        const updatedTasks = taskData.filter(task => task._id !== taskId);

        axios
            .delete(`${import.meta.env.VITE_API_URL}/api/tasks/${taskId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } },
            )
            .then(() => {
                getProject();
                navigate(`/projects/${projectId}`)
            })
            .catch((error) => console.log(error));
    }


    return (
        <div className={styles.taskCard}>
            <div className={styles.taskContent}>
                <h4 className={styles.taskLabel}> description</h4>
                <h3 className={styles.taskDescription}>{description} </h3>

                <p className={styles.taskDeadline}>deadline: {deadline ? new Date(deadline).toLocaleDateString() : 'no deadline'}</p>
                <div className="checkBoxDeleteContainer">
                    <div className={styles.checkboxContainer}>
                        <div
                            className={`${styles.checkbox} ${checked ? styles.checked : ''}`}
                            role="checkbox"
                            tabIndex="0"
                            aria-checked={checked}
                            onClick={() => handleCheckboxChange(!checked)}
                        >
                            {checked && (
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/51a1a671c4ae4c97ff9a3464d05eb5ce4d4db0939a6cef9e3149a9fd69a2757f?placeholderIfAbsent=true&apiKey=60afd9c2e7064e039d088416e43472c0"
                                    className={styles.checkboxIcon}
                                    alt="task card tick mark icon"
                                />
                            )}

                        </div>
                        <button onClick={deleteTask} className={styles.deleteButton}>delete</button>
                    </div>
                </div>


            </div>
        </div>
    )
}
export default TaskCard;