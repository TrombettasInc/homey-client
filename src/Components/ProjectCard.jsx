import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import styles from './ProjectCard.module.css';  // Use the CSS you provided



function ProjectCard({ title, isDone, projectId, getProject }) {
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
            <header className={styles.header}>
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/df815ec07b8c69a75a37f8b1d1fd22c58ef7d75971751f3b7bf6cc90c735e56f?placeholderIfAbsent=true&apiKey=60afd9c2e7064e039d088416e43472c0"
                    className={styles.logo}
                    alt="Project Logo"
                />
                <h1>homey</h1>
            </header>

            <div className={styles.content}>
                <div className={styles.frame}>
                    <p className={styles.createdDate}>12 March, 20</p>
                    <Link to={`/projects/${projectId}`}>
                        <h2 className={styles.projectTitle}>{title}</h2>
                    </Link>
                </div>

                <button className={styles.detailsButton}>
                    <span className={styles.detailsButtonText}>See details</span>
                </button>

                {/* Custom checkbox styled */}
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
                />
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/51a1a671c4ae4c97ff9a3464d05eb5ce4d4db0939a6cef9e3149a9fd69a2757f?placeholderIfAbsent=true&apiKey=60afd9c2e7064e039d088416e43472c0"
                    className={styles.icon}
                    alt="Icon"
                />
            </div>
        </article>
    );
}

export default ProjectCard;
