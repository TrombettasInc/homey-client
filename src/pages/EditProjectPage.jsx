import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styles from './EditProjectPage.module.css';

function EditProjectPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [isDone, setIsDone] = useState("");

    const { projectId } = useParams();
    const navigate = useNavigate();
    const storedToken = localStorage.getItem('authToken');

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                const projectToEdit = response.data;
                setTitle(projectToEdit.title);
                setDescription(projectToEdit.description);
                setDeadline(projectToEdit.deadline);
                setIsDone(projectToEdit.isDone);
            })
            .catch((error) => console.log(error));
    }, [projectId]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const requestBody = { title, description, deadline, isDone };

        axios
            .put(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}`, requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                navigate(`/projects/${projectId}`);
            });
    };

    const deleteProject = () => {
        axios
            .delete(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then(() => {
                navigate("/projects");
            })
            .catch((err) => console.log(err));
    };

    return (
        <main className={styles.container}>
            
            <header className={styles.header}>
                <h1 className={styles.title}>Edit Project</h1>
            </header>
            <form onSubmit={handleFormSubmit}>
                <div className={styles.inputContainer}>
                    <label htmlFor="projectTitle" className={styles.visuallyHidden}></label>
                    <div className={styles.inputWrapper}>
                        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/22a892083d9a2459f3d6034245b0adf402047a0091b4cdfbf717e8f1786b90fe?placeholderIfAbsent=true&apiKey=60afd9c2e7064e039d088416e43472c0" className={styles.inputIcon} alt="" />
                        <input
                            id="projectTitle"
                            className={styles.input}
                            type="text"
                            placeholder="Project Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{ fontSize: "16px", padding: "10px", border: "none" }}
                        />
                    </div>
                </div>
                <div className={styles.dateContainer}>
                    <label htmlFor="deadline" className={styles.dateLabel}>Deadline</label>
                    <input
                        id="deadline"
                        type="date"
                        className={styles.dateInput}
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        style={{ fontSize: "16px", padding: "10px", border: "none" }}
                    />
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ecbf590f99fffde6575863051d00cdb9fea318ce6dd7240a95a8d8b918d13e3e?placeholderIfAbsent=true&apiKey=60afd9c2e7064e039d088416e43472c0" className={styles.dateIcon} alt="Calendar icon" />
                </div>
                <div className={styles.descriptionContainer}>
                    <label htmlFor="projectDescription" className={styles.descriptionLabel}></label>
                    <textarea
                        id="projectDescription"
                        className={styles.textarea}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ fontSize: "16px", padding: "10px", border: "none" }}
                    />
                </div>
                <button type="submit" className={styles.button}>
                    <span className={styles.buttonText}>Update Project</span>
                </button>
                <button type="button" onClick={deleteProject} className={styles.button}>
                    <span className={styles.buttonText}>Delete Project</span>
                </button>
            </form>
        </main>
    );
}

export default EditProjectPage;
