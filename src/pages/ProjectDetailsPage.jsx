import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from './ProjectDetailsPage.module.css'; 

function ProjectDetailsPage() {
    const [project, setProject] = useState(null);
    const { projectId } = useParams();
    const [checked, setChecked] = useState(false);

    const storedToken = localStorage.getItem("authToken");

    const getProject = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}`, {
                headers: { Authorization: `Bearer ${storedToken}` }
            })
            .then((response) => {
                setProject(response.data);
                setChecked(response.data.isDone);
                
            })
            .catch((error) => console.log("Error fetching project:", error));
    };

    useEffect(() => {
        getProject();
    }, [projectId]);

    const handleCheckboxChange = (newChecked) => {
        setChecked(newChecked);

        axios
            .put(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}`, { isDone: newChecked }, {
                headers: { Authorization: `Bearer ${storedToken}` }
            })
            .then((response) => {
                getProject(); 
                console.log("Project status updated:", response.data);
            })
            .catch((error) => console.log("Error updating project status:", error));
    };

    const handleTaskCheckboxChange = (taskId, newChecked) => {
        axios
            .put(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}/tasks/${taskId}`, { isDone: newChecked }, {
                headers: { Authorization: `Bearer ${storedToken}` }
            })
            .then(() => {
                getProject(); // Refetch project data after task update
            })
            .catch((error) => console.log("Error updating task status:", error));
    };

    return (
        <main className={styles.projectDetails}>
            <div className={styles.container}>
                {project ? (
                    <>
                        <header className={styles.projectTitle}>
                            <h1>
                                <span className={styles.projectTitleMain}>{project.title}</span>
                            </h1>
                        </header>

                        {/* Merged ProjectInfo */}
                        <section className={styles.projectInfo}>
                            <h2 className={styles.projectInfoTitle}>{project.description}</h2>
                            <p className={styles.projectInfoDate}>Start Date: {new Date(project.startDate).toLocaleDateString()}</p>
                            <p className={styles.projectInfoDeadline}>Deadline: {project.deadline ? new Date(project.deadline).toLocaleDateString() : 'No Deadline'}</p>
                            <div className={styles.projectInfoActions}>
                                <div className={styles.checkboxWrapper}>
                                    <div
                                        className={`${styles.checkbox} ${checked ? styles.checked : ''}`}
                                        role="checkbox"
                                        tabIndex="0"
                                        aria-checked={checked}
                                        onClick={() => handleCheckboxChange(!checked)} // Toggle checkbox on click
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                handleCheckboxChange(!checked); // Handle keyboard interaction
                                            }
                                        }}
                                    >
                                        {checked && (
                                            <img
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/61ba7f039e75537d67906dec0e27a7633222f687b028504a12d4586b45961fb8?placeholderIfAbsent=true&apiKey=60afd9c2e7064e039d088416e43472c0"
                                                alt="Checkbox icon"
                                                className={styles.checkboxIcon}
                                            />
                                        )}
                                    </div>
                                </div>
                                <Link to={`/projects/edit/${projectId}`} state={{ project }} className={styles.editButton}>Edit</Link>
                            </div>
                        </section>

                        {/* Merged AddTaskForm */}
                        <form className={styles.addTaskForm}>
                            <h3 className={styles.addTaskTitle}>Add task</h3>
                            <div className={styles.inputWrapper}>
                                <label htmlFor="taskDescription" className="visually-hidden"></label>
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
                                    />
                                </div>
                            </div>
                            <br />
                            <div className={styles.inputWrapper}>
                                <label htmlFor="taskDeadline" className="visually-hidden"></label>
                                <div className={styles.inputContainer}>
                                    <input
                                        type="text"
                                        id="taskDeadline"
                                        className={styles.deadlineInput}
                                        placeholder="deadline"
                                    />
                                    <img
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7b71adf9c660d4bf197db4c60f874eef1364737d23e9e9e98fc61f2fff7493d2?placeholderIfAbsent=true&apiKey=60afd9c2e7064e039d088416e43472c0"
                                        alt=""
                                        className={styles.calendarIcon}
                                    />
                                </div>
                            </div>
                            <button type="submit" className={styles.addButton}>add!</button>
                        </form>

                        {/* Merged Task Cards */}
                        {project.tasks.map((task) => (
                            <article className={styles.taskCard} key={task._id}>
                                <div className={styles.taskContent}>
                                    <p className={styles.taskDeadline}>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
                                    <h3 className={styles.taskDescription}>{task.description}</h3>

                                    <button className={styles.deleteButton}>Delete</button>
                                    <div className={styles.checkboxWrapper}>
                                        <div
                                            className={`${styles.checkbox} ${task.isDone ? styles.checked : ''}`}
                                            role="checkbox"
                                            tabIndex="0"
                                            aria-checked={task.isDone}
                                            onClick={() => handleTaskCheckboxChange(task._id, !task.isDone)} // Toggle task checkbox
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    handleTaskCheckboxChange(task._id, !task.isDone);
                                                }
                                            }}
                                        >
                                            {task.isDone && (
                                                <img
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/51a1a671c4ae4c97ff9a3464d05eb5ce4d4db0939a6cef9e3149a9fd69a2757f?placeholderIfAbsent=true&apiKey=60afd9c2e7064e039d088416e43472c0"
                                                    className={styles.icon}
                                                    alt="Tick mark icon"
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </>
                ) : (
                    <p>Loading project data...</p>
                )}
            </div>
        </main>
    );
}

export default ProjectDetailsPage;
