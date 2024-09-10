import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import styles from './ProjectCard.module.css';  // Use the CSS you provided



function ProjectCard({ title, isDone, startDate, projectId, getProject }) {
    const [checked, setChecked] = useState(isDone); // Manage the checkbox state

    const storedToken = localStorage.getItem('authToken');

    // Handle checkbox change with API update
    const handleCheckboxChange = () => {
        const newChecked = !checked;
        setChecked(newChecked);


        axios.put(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}`,
            { isDone: newChecked },
            { headers: { Authorization: `Bearer ${storedToken}` } }
        )
            .then(() => {
                getProject();  // Fetch the updated project list
            })
            .catch((error) => console.log(error));
    };

    return (
        <article className={styles.card}>


            <div className={styles.content}>
                <div className={styles.frame}>
                    <p className={styles.createdDate}>{new Date(startDate).toLocaleDateString()}</p>
                    <h2 className={styles.projectTitle}>{title}</h2>
                </div>

                <button className={styles.detailsButton}>
                    <Link to={`/projects/${projectId}`} className={styles.detailsButtonText}>See details</Link>
                </button>

                <div className={styles.checkboxContainer}>
                    <div
                        className={`${styles.checkbox} ${checked ? styles.checked : ''}`}
                        role="checkbox"
                        tabIndex="0"
                        aria-checked={checked}
                        onClick={handleCheckboxChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                handleCheckboxChange();
                            }
                        }}
                    >
                        {checked && (
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/51a1a671c4ae4c97ff9a3464d05eb5ce4d4db0939a6cef9e3149a9fd69a2757f?placeholderIfAbsent=true&apiKey=60afd9c2e7064e039d088416e43472c0"
                                className={styles.icon}
                                alt="Tick mark icon"
                            />
                        )}
                    </div>
                </div>
                </div>

        </article>
    );
}

export default ProjectCard;
