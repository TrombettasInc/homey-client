import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from './ProjectDetailsPage.module.css';
import AddTask from "../Components/AddTask";
import TaskCard from "../Components/TaskCard";

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
                console.log("Project status updated:", response.data);
                getProject();
            })
            .catch((error) => console.log("Error updating project status:", error));
    };



    return (
        <div className={styles.projectDetails}>
            <div className={styles.projectDetailscontainer}>
                {project ? (
                    <>
                        <header className={styles.projectDetailsprojectTitle}>
                            <h1>
                                <span className={styles.projectDetailsprojectTitleMain}>{project.title}</span>
                            </h1>
                        </header>

                        {/* Merged ProjectInfo */}
                        <section className={styles.projectDetailsprojectInfo}>
                            <h2 className={styles.projectDetailsprojectInfoTitle}>{project.description}</h2>
                            <p className={styles.projectDetailsprojectInfoDate}>start date: {new Date(project.startDate).toLocaleDateString()}</p>
                            <p className={styles.projectDetailsprojectInfoDeadline}>deadline: {project.deadline ? new Date(project.deadline).toLocaleDateString() : 'No Deadline'}</p>
                            <div className={styles.projectDetailsprojectInfoActions}>
                                <div className={styles.projectDetailscheckboxContainer}>
                                    <div
                                        className={`${styles.projectDetailscheckbox} ${checked ? styles.projectDetailschecked : ''}`}
                                        role="checkbox"
                                        tabIndex="0"
                                        aria-checked={checked}
                                        onClick={() => handleCheckboxChange(!checked)}
                                    >
                                        {checked && (
                                            <img
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/61ba7f039e75537d67906dec0e27a7633222f687b028504a12d4586b45961fb8?placeholderIfAbsent=true&apiKey=60afd9c2e7064e039d088416e43472c0"
                                                className={styles.projectDetailscheckboxIcon}
                                                alt="project details tick mark icon"
                                            />
                                        )}
                                    </div>
                                </div>

                                <Link to={`/projects/edit/${projectId}`} state={{ project }} className={styles.projectDetailseditButton}>edit</Link>
                            </div>
                        </section>

                        {/* Merged AddTaskForm */}
                        <AddTask projectId={projectId} getProject={getProject} />

                        {/* Merged Task Cards */}
                        <section className={styles.tasksSection}>
                            {project.tasks.map((task) => (
                                <TaskCard
                                    key={task._id}
                                    taskId={task._id}
                                    projectId={projectId}
                                    description={task.description}
                                    deadline={task.deadline}
                                    isDone={task.isDone}
                                    getProject={getProject}
                                />
                            ))}
                        </section>
                    </>
                ) : (
                    <p>loading project data...</p>
                )}
            </div>
        </div>
    );
}

export default ProjectDetailsPage;
