import { useState, useEffect } from "react";
import axios from "axios";
import ProjectCard from "../Components/ProjectCard";
import { useNavigate } from "react-router-dom";
import styles from './ProjectsList.module.css';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();  // Initialize useNavigate

  const colors = ['#E9E7FC', '#FFF3F8', '#FFF4CC', '#D6FCF7', '#FFE8E8']; //mudar as cores


  const getAllProjects = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/projects`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  const handleGoBack = () => {
    navigate('/create');
  };

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div>
      {projects.length === 0 ? (
        // Display the empty projects page when there are no projects
        <main className={styles.container}>
          <div className={styles.imageBg} role="img" aria-label="Decorative background image">
            <span className={styles.peoplecontainer}>
              <img
                src="/emptypage.png"
                alt=""
                className={styles.people}
              />
            </span>
          </div>
          <section className={styles.contentBox}>
            <h1 className={styles.title}>Let's go!</h1>
            <p className={styles.subtitle}>
              Looks like you don't currently have any projects, but no problem, click the button to
            </p>
            <button className={styles.button} onClick={handleGoBack}>
              <span className={styles.buttonContent}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/9ea4d14243520560bc7e62b21d3eeffb65ecfd04a01105b59e25604071f1481c?placeholderIfAbsent=true&apiKey=60afd9c2e7064e039d088416e43472c0"
                  alt=""
                  className={styles.buttonIcon}
                />
                <span className={styles.buttonText}>create!</span>
              </span>
            </button>
          </section>
        </main>
      ) : (
        // Map through the projects and display ProjectCard components
        projects.map((project) => (
          <ProjectCard
            key={project._id}
            projects={projects}
            projectId={project._id}
            title={project.title}
            isDone={project.isDone}
            startDate={project.startDate}
            getProject={getAllProjects}
            color={getRandomColor()} 
          />
        ))
      )}
    </div>
  );
}

export default ProjectList;
