import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from './AddProject.module.css';  


function AddProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [isDone, setIsDone] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, description, deadline, isDone };
    const storedToken = localStorage.getItem('authToken');

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/projects`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setTitle("");
        setDescription("");
        setDeadline("");
        setIsDone(false);

        const createdProjectId = response.data._id;
        navigate(`/projects/${createdProjectId}`);
      })
      .catch((error) => console.log(error));
  };


  return (
    <main className={styles.container}>

      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h1 className={styles.title}>create project</h1>

        {/* Project Title Field */}
        <div className={styles.inputWrapper}>
          <div className={styles.inputContent}>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/22a892083d9a2459f3d6034245b0adf402047a0091b4cdfbf717e8f1786b90fe?placeholderIfAbsent=true&apiKey=60afd9c2e7064e039d088416e43472c0"
              className={styles.inputIcon}
              alt="Title Icon"
            />
            <input
              type="text"
              id="projectTitle"
              className={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="project title"
              required
              style={{ fontSize: "16px", padding: "10px", border: "none" }}
            />
          </div>
        </div>

        {/* Deadline Field */}
        <div className={styles.dateWrapper}>
          <label htmlFor="deadline" className={styles.dateLabel}>deadline</label>
          <input
            type="date"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className={styles.input}
            required
            style={{ fontSize: "16px", padding: "10px", border: "none" }}
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ecbf590f99fffde6575863051d00cdb9fea318ce6dd7240a95a8d8b918d13e3e?placeholderIfAbsent=true&apiKey=60afd9c2e7064e039d088416e43472c0"
            className={styles.dateIcon}
            alt="add project deadline dropdown icon"
          />
        </div>

        {/* Project Description Field */}
        <div className={styles.inputWrapper}>
          <div className={styles.inputContent}>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4d671a9a3741b06f3c0c0a6f804e3b6f42b21f67fb759696e08a3541c9f23184?placeholderIfAbsent=true&apiKey=60afd9c2e7064e039d088416e43472c0"
              className={styles.inputIcon}
              alt="Description Icon"
            />
            <textarea
              id="projectDescription"
              className={styles.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="project description"
              required
              style={{
                fontSize: "16px",
                padding: "10px",
                border: "none",
                height: "100px",
                resize: "none",
              }}
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className={styles.submitButton}>
          create
        </button>
      </form>
    </main>
  );
}

export default AddProject;
