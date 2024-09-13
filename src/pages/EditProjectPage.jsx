import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styles from './EditProjectPage.module.css';

function EditProjectPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [isDone, setIsDone] = useState(false);

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
                
                setIsDone(projectToEdit.isDone);
                const formattedDeadline = projectToEdit.deadline
                ? new Date(projectToEdit.deadline).toISOString().split('T')[0]
                : "";
                setDeadline(formattedDeadline);
            })
            .catch((error) => console.log(error));
    }, [projectId, storedToken]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const requestBody = { title, description, deadline, isDone };

        axios
            .put(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}`, requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                
                navigate(`/projects/${projectId}`);
            })
            .catch((error) => console.log("Error updating project:", error)); // Log the error if any
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
                <h1 className={styles.title}>edit Project</h1>
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
                        />
                    </div>
                </div>
                <div className={styles.dateContainer}>
                    <label htmlFor="deadline" className={styles.dateLabel}>deadline</label>
                    <input
                        id="deadline"
                        type="date"
                        className={styles.dateInput}
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        style={{ fontSize: "23px", padding: "5px", border: "none", fontFamily: "'Montserrat', sans-serif"  }}
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
                        style={{ fontSize: "23px", padding: "5px", border: "none", fontFamily: "'Montserrat', sans-serif", height: "300px" }}
                    />
                </div>
                <button type="submit" className={styles.button}>
                    <span className={styles.buttonText}>update</span>
                </button>
                <button type="button" onClick={deleteProject} className={styles.button}>
                    <span className={styles.buttonText}>delete</span>
                </button>
            </form>
        </main>
    );
}

export default EditProjectPage;
